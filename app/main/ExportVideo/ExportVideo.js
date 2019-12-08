(function() {
  "use strict";
  const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
  const ffmpeg = require('fluent-ffmpeg');
  const path = require("path");

  const ConfirmDialog = require("../../common/ConfirmDialog/ConfirmDialog");
  const Loader = require("../../common/Loader/Loader");

  const DEFAULT_FILE_NAME = "output.mp4";

  const btnExportVideo = document.querySelector("#btn-export-video");
  const exportVideoSidebarOption = document.querySelector("#exportVideoSidebarOption");

  class ExportVideo {
    static setListeners() {
      let self = this;

      // Export video sidebar button
      btnExportVideo.addEventListener("click", function() {
        if (global.projectInst.currentTake.getTotalFrames() > 0) {
          ExportVideo.displayExportVideoDialog();
        }
      });
      self.toggleSidebarOption(false);
    }

    /**
     * Displays the export video dialog box.
     */
    static displayExportVideoDialog() {
      let saveLocation = global.projectInst.saveDirectory.saveDirLocation;
      let defaultExportPath = path.join(saveLocation, DEFAULT_FILE_NAME);

      let dialogContents = document.createElement("div");

      // Export location file picker
      let exportLocationInput = document.createElement("input");
      dialogContents.appendChild(exportLocationInput);
      exportLocationInput.id = "exportLocationInput";
      exportLocationInput.setAttribute("type", "file");
      exportLocationInput.setAttribute("nwsaveas", DEFAULT_FILE_NAME);
      exportLocationInput.setAttribute("nwworkingdir", saveLocation);
      exportLocationInput.style.display = "none";
      // todo make sure output file is only of a video file type

      // Listen for the choose save directory dialog being activated
      exportLocationInput.addEventListener("change", function() {
        if (this.value) {
          exportText.innerText = this.value;
        }
      });

      // Export location label
      let exportLabel = document.createElement("label");
      dialogContents.appendChild(exportLabel);
      exportLabel.innerText = "Export location:";

      // Line break
      dialogContents.appendChild(document.createElement("br"));

      // Export location text
      let exportText = document.createElement("div");
      dialogContents.appendChild(exportText);
      exportText.id = "currentVideoExportText";
      exportText.innerText = defaultExportPath;

      // Button
      let exportButton = document.createElement("button");
      exportButton.innerText = "Browse";
      dialogContents.appendChild(exportButton);
      exportButton.addEventListener("click", function() {
        exportLocationInput.click();
      });

      // Line breaks
      dialogContents.appendChild(document.createElement("br"));
      dialogContents.appendChild(document.createElement("br"));

      // FFMpeg preset label
      let presetLabel = document.createElement("label");
      dialogContents.appendChild(presetLabel);
      presetLabel.setAttribute("for", "presetSelect");
      presetLabel.innerText = "FFMPEG quality preset:";

      // Line break
      dialogContents.appendChild(document.createElement("br"));

      // FFMpeg preset picker
      let presetSelect = document.createElement("select");
      dialogContents.appendChild(presetSelect);
      presetSelect.id = "presetSelect";
      let presets = ["ultrafast","superfast","veryfast","faster","fast","medium","slow","slower","veryslow"];

      // Create an "option" element for each preset
      presets.forEach(function(presetValue) {
        let presetOption = document.createElement("option");
        presetOption.innerText = presetValue;
        presetOption.setAttribute("value", presetValue);
        presetSelect.appendChild(presetOption);

        // Default select medium
        if (presetValue === "medium") {
          presetOption.setAttribute("selected", "selected");
        }
      });

      ConfirmDialog.confirmSet({
        title: "Export Video",
        text: " ",
        icon: " ",
        content: dialogContents,
        buttons: [true, "Export video"]
      })
      .then((response) => {
        // Dialog values
        let outputPath = exportLocationInput.value;
        let presetValue = presetSelect.value;

        // Export video parameters
        let exportPath = (!outputPath ? defaultExportPath : outputPath);
        let frameLocation = saveLocation;
        let frameRate = global.projectInst.frameRate.frameRateValue;
        let preset = presetValue;

        // Confirm the take and render the video if "export video" selected
        if (response) {
          global.projectInst.currentTake.confirmTake()
          .then(() => {
            ExportVideo.render2(exportPath, frameLocation, frameRate, preset);
            // ExportVideo.render(exportPath, frameLocation, frameRate, preset);
          })
        }
      });
    }

    /**
     * Renders a video from the frames in the selected frame location.
     * @param {String} exportPath The path to export video to.
     * @param {String} frameDirectory The location of the frames to render.
     * @param {Number} frameRate The frame rate to use in the export.
     * @param {String} preset The rendering preset to use (default: medium).
     * @param {Number} startFrameNo The frame to begin rendering from (default: 0 - ie the start).
     */
    static render2(exportPath, frameDirectory, frameRate, preset = "medium", startFrameNo = 0) {
      let endFrameNo = global.projectInst.currentTake.getTotalFrames();
      let framePath = path.join(frameDirectory, "frame_%04d.png");

      // TODO should the default startFrameNo be 0 or 1?
      // TODO implement ability for user to enter custom ffmpeg arguments

      // The ffmpeg arguments to use
      let args = [
        `-framerate`, frameRate,
        `-start_number`, startFrameNo,
        `-frames:v`, endFrameNo,
        `-i`, framePath,
        `-c:v`, `libx264`,
        `-preset`, preset,
        `-crf`, `0`,
        `-vf`, `format=yuv420p`,
        exportPath
      ];

      // Spawn an ffmpeg child process
      const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
      const spawn = require('child_process').spawn;
      const ffmpeg = spawn(ffmpegPath, args);

      // Show the status of the process in the modal
      ffmpeg.stdout.on('data', function(e) {
        console.log("stdoutdata", e.toString());
      });
      ffmpeg.stderr.on('data', function(e) {
        console.log("stderrdata", e.toString());
      });

      // Stop loader at this point
      ffmpeg.on('exit', function(e) {
        console.log("exit", e);
      }); 
    }

    /**
     * Renders a video from the frames in the selected frame location.
     * @param {String} exportPath The path to export video to.
     * @param {String} frameDirectory The location of the frames to render.
     * @param {Number} frameRate The frame rate to use in the export.
     * @param {String} preset The rendering preset to use (default: medium).
     * @param {Number} startFrame The frame to begin rendering from (default: 0 - ie the start).
     */
    static render(exportPath, frameDirectory, frameRate, preset = "medium", startFrame = 0) {
      // Use the current platform's ffmpeg path
      ffmpeg.setFfmpegPath(ffmpegPath);

      let framePath = path.join(frameDirectory, "frame_%04d.png");
      // FFmpeg absolute inputs MUST be forward slashes
      framePath = framePath.replace(/\\/g, "/");
      console.log("framePath", framePath);

      // The ffmpeg arguments
      let args = [
        `-framerate ${frameRate}`,
        `-start_number ${startFrame}`,
        `-i ${framePath}`,
        `-tune animation`,
        `-c:v libx264`,
        `-preset ${preset}`,
        `-crf 0`,
        `-vf format=yuv420p`
      ];
        // todo might need to manually specify that the input files are of png format

      // Start rendering
      let command = ffmpeg()
        .format("mp4") // bug fix: https://github.com/fluent-ffmpeg/node-fluent-ffmpeg/issues/802#issuecomment-366469595
        // .addInput(framePath)
        .outputOptions(args)
        .on('start', function(cmd) {
          // Display loading window on start
          console.log('Started ' + cmd);
          Loader.show("Rendering video");
        })
        .on('error', function(err) {
          Loader.hide();
          // Display dialog with errors
          console.log('An error occurred: ' + err.message);
          ConfirmDialog.confirmSet({
            title: "Error",
            text: `An error occurred trying to export the current project to video. Please try again later.
            \n ${err.message}
            `,
            icon: "error",
            buttons: {
              cancel: false,
              confirm: true,
            },
          });
        })
        .on('end', function() {
          Loader.hide();
          // Display dialog when rendering is complete
          console.log('Processing finished!');
          ConfirmDialog.confirmSet({
            title: "Success",
            text: `Video was successfully exported to ${exportPath}`,
            icon: "Success",
            buttons: {
              cancel: false,
              confirm: true,
            },
          });
        })
        .save(exportPath);

      var ffstream = command.pipe();
      ffstream.on('data', function(chunk) {
        console.log('ffmpeg just wrote ' + chunk.length + ' bytes');
      });

      // handle errors? fails silently

      // todo work out deployment in a cross platform way.

      // todo use list of frame paths rather than -i

      // todo overwrite warning

      // todo error handling

      
      // const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
      // const spawn = require('child_process').spawn;
      // const ffmpeg = spawn(ffmpegPath, args);

      // ffmpeg.on('message', function(e) {
      //   console.log(e);
      // })

      // ffmpeg.on('exit', function(e) {
      //   console.log(e);
      // });
    }

    static toggleSidebarOption(status) {
      exportVideoSidebarOption.classList.toggle("disabled", status);
    }
  }

  module.exports = ExportVideo;
})();
