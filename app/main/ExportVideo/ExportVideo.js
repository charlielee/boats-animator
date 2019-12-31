(function() {
  "use strict";
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
          Loader.show("Confirming take");
          global.projectInst.currentTake.confirmTake(false)
          .then(() => {
            Loader.hide();
            ExportVideo.render(exportPath, frameLocation, frameRate, preset);
          });
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
    static render(exportPath, frameDirectory, frameRate, preset = "medium", startFrameNo = 0) {
      let endFrameNo = global.projectInst.currentTake.getTotalFrames();
      let framePath = path.join(frameDirectory, "frame_%04d.png");

      // TODO should the default startFrameNo be 0 or 1?
      // TODO implement ability for user to enter custom ffmpeg arguments

      // The ffmpeg arguments to use
      let args = [
        "-y", // Overwrite output file if it already exists
        "-framerate", frameRate,
        "-start_number", startFrameNo,
        "-i", framePath,
        "-frames:v", endFrameNo,
        "-c:v", "libx264",
        "-preset", preset,
        "-crf", "0",
        "-vf", "format=yuv420p",
        exportPath,
        "-hide_banner", // Hide ffmpeg library info from output
      ];

      // Spawn an ffmpeg child process
      const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
      const spawn = require('child_process').spawn;
      const ffmpeg = spawn(ffmpegPath, args);
      // Loader.show("Rendering video");

      // Build a modal
      let exportStatusDialog = document.createElement("div");
      exportStatusDialog.setAttribute("id", "exportStatusDialog");
      ConfirmDialog.confirmSet({
        title: "Exporting video...",
        text: " ",
        content: exportStatusDialog,
        icon: " ",
        buttons: false,
      });

      // Show the status of the export in the modal
      // All ffmpeg output goes to stderrdata (see https://stackoverflow.com/questions/35169650/)
      ffmpeg.stderr.on('data', function(e) {
        console.log("stderrdata", e.toString());
        exportStatusDialog.innerHTML = `${e.toString()}<hr>${exportStatusDialog.innerHTML}`;
        exportStatusDialog.scrollTo({ top: 0, behavior: 'smooth' });
      });

      // Stop loader at this point
      ffmpeg.on('exit', function(code) {
        // Display success/error dialog
        if (code === 0) {
          let dialogContent = document.createElement("p");
          dialogContent.innerHTML = "Video was successfully exported to:<br>";

          let videoExportPathLink = document.createElement("a");
          videoExportPathLink.setAttribute("href", "#");
          videoExportPathLink.innerText = exportPath;
          videoExportPathLink.addEventListener("click", () => {
            nw.Shell.showItemInFolder(exportPath);
          });
          dialogContent.appendChild(videoExportPathLink);
          dialogContent.appendChild(exportStatusDialog);

          ConfirmDialog.confirmSet({
            title: "Success",
            text: " ",
            content: dialogContent,
            icon: "success",
            buttons: {
              cancel: false,
              confirm: true,
            },
          });
        } else {
          ConfirmDialog.confirmSet({
            title: "Error",
            text: `An error occurred trying to export the current project to video. Please try again later.
            \n Exit code ${code}.
            `,
            icon: "error",
            buttons: {
              cancel: false,
              confirm: true,
            },
          });
        }
      }); 
    }

    /**
     * Sets whether the "export video" sidebar item can be selected or not.
     * @param {Boolean} status Set to true to hide the item.
     */
    static toggleSidebarOption(status) {
      exportVideoSidebarOption.classList.toggle("disabled", status);
    }
  }

  module.exports = ExportVideo;
})();
