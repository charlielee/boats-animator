(function() {
  "use strict";
  const ConfirmDialog = require("../../common/ConfirmDialog/ConfirmDialog");

  const DEFAULT_FILE_NAME = "output.mp4";

  class ExportVideo {
    // /**
    //  * Constructors a new video export.
    //  * @param {String} exportLocation The directory to export video to.
    //  * @param {String} exportName The name to give the output video.
    //  * @param {String} frameLocation The location of the frames to render.
    //  * @param {Number} frameRate The frame rate to use in the export.
    //  * @param {String} preset The rendering preset to use (default: medium).
    //  * @param {Number} startFrame The frame to begin rendering from (default: 0 - ie the start).
    //  */
    // constructor(exportLocation, exportName, frameLocation, frameRate, preset = "medium", startFrame = 0) {
    //   this.exportLocation = exportLocation;
    //   this.exportName = exportName;
    //   this.frameLocation = frameLocation;
    //   this.frameRate = frameRate;
    //   this.preset = preset;
    //   this.startFrame = startFrame;
    // }

    /**
     * Renders a video from the frames in the selected frame location.
     * @param {String} exportPath The path to export video to.
     * @param {String} frameDirectory The location of the frames to render.
     * @param {Number} frameRate The frame rate to use in the export.
     * @param {String} preset The rendering preset to use (default: medium).
     * @param {Number} startFrame The frame to begin rendering from (default: 0 - ie the start).
     */
    static render(exportPath, frameDirectory, frameRate, preset = "medium", startFrame = 0) {
      let args = [
        "-framerate", frameRate,
        "-start_number", startFrame,
        "-i", `${frameDirectory}/frame_%04d.png`,
        "-tune", "animation",
        "-c:v", "libx264",
        "-preset", preset,
        "-crf", "0",
        "-vf", "format=yuv420p",
        exportPath
      ];

      const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
      const spawn = require('child_process').spawn;
      const ffmpeg = spawn(ffmpegPath, args);
      ffmpeg.on('exit', function(e) {
        console.log(e);
      });
    }

    static displayExportVideoDialog() {
      let saveLocation = global.projectInst.saveDirectory.saveDirLocation;

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
      exportText.innerText = `${saveLocation}\\${DEFAULT_FILE_NAME}`;

      // Button
      let exportButton = document.createElement("button");
      exportButton.innerText = "Browse";
      dialogContents.appendChild(exportButton);
      exportButton.addEventListener("click", function() {
        exportLocationInput.click();
      });

      // Line break
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
        buttons: [true, "Export video"],
      })
      .then((response) => {
        // Dialog values
        let outputPath = exportLocationInput.value;
        let presetValue = presetSelect.value;

        // Export video parameters
        let exportPath = outputPath;
        let frameLocation = saveLocation;
        let frameRate = global.projectInst.frameRate.frameRateValue;
        let preset = presetValue;

        // Render the video if "export video selected";
        if (response) {
          ExportVideo.render(exportPath, frameLocation, frameRate, preset);
        }
      });
    }
  }

  module.exports = ExportVideo;
})();