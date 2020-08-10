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

      // Html for the export video dialog
      let dialogContents = document.createElement("div");
      dialogContents.innerHTML = `
        <input id="exportLocationInput" type="file" nwsaveas="${DEFAULT_FILE_NAME}" nwworkingdir="${saveLocation}" style="display: none;">
        <label>Export location:</label>
        <br>
        <div id="currentVideoExportText">${defaultExportPath}</div>
        <button id="exportLocationBtn">Browse</button>

        <br>
        <br>

        <label for="presetSelect">FFMPEG quality preset:</label>
        <br>
        <select id="presetSelect">
          <option value="veryfast">Very fast</option>
          <option value="medium">Medium</option>
          <option value="veryslow">Very slow</option>
        </select>

        <br>
        <br>

        <label for="customArgumentsInput">FFMPeg arguments:</label>
        <br>
        <textarea id="customArgumentsInput" rows="5" style="width: 100%;"></textarea>
      `;

      // Elements
      const currentVideoExportText = dialogContents.querySelector("#currentVideoExportText")
      const exportLocationInput = dialogContents.querySelector("#exportLocationInput");
      const exportLocationBtn = dialogContents.querySelector("#exportLocationBtn");
      const presetSelect = dialogContents.querySelector("#presetSelect");
      const customArgumentsInput = dialogContents.querySelector("#customArgumentsInput");

      // Dialog values
      let outputPath = exportLocationInput.value ? exportLocationInput.value : defaultExportPath;
      let presetValue = presetSelect.value;

      // Export video parameters
      let frameLocation = saveLocation;
      let frameRate = global.projectInst.frameRate.frameRateValue;

      // Load in default FFMpeg arguments
      customArgumentsInput.value = ExportVideo.generateFFMpegArguments(outputPath, frameLocation, frameRate, presetValue);

      // Event listeners

      // Activate hidden input field on button click
      exportLocationBtn.addEventListener("click", function() {
        exportLocationInput.click();
      });

      // Listen for the choose save directory dialog being changed
      exportLocationInput.addEventListener("change", function() {
        if (this.value) {
          currentVideoExportText.innerText = this.value;
          outputPath = this.value;
          customArgumentsInput.value = ExportVideo.generateFFMpegArguments(outputPath, frameLocation, frameRate, presetValue);
        }
      });

      // Listen to the preset value dialog being changed
      presetSelect.addEventListener("change", function () {
        presetValue = this.value;
        customArgumentsInput.value = ExportVideo.generateFFMpegArguments(outputPath, frameLocation, frameRate, presetValue);
      });

      ConfirmDialog.confirmSet({
        title: "Export Video",
        text: " ",
        icon: " ",
        content: dialogContents,
        buttons: [true, "Export video"]
      })
      .then((response) => {
        // Confirm the take and render the video if "export video" selected
        if (response) {
          Loader.show("Confirming take");
          global.projectInst.currentTake.confirmTake(false)
          .then(() => {
            Loader.hide();
            ExportVideo.render(customArgumentsInput.value.split(" "), outputPath);
          });
        }
      });
    }

    /**
     * Renders a video from the frames in the selected frame location.
     * @param {Array} ffmpegArguments An array of ffmpeg arguments to use.
     * @param {String} exportPath The path to export video to
     */
    static render(ffmpegArguments, exportPath) {
      // Spawn an ffmpeg child process
      const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
      const spawn = require('child_process').spawn;
      const ffmpeg = spawn(ffmpegPath, ffmpegArguments);

      // Build a modal
      let exportStatusDialog = document.createElement("div");
      exportStatusDialog.setAttribute("id", "exportStatusDialog");
      ConfirmDialog.confirmSet({
        title: "Exporting video...",
        text: " ",
        content: exportStatusDialog,
        icon: " ",
        button: false,
        closeOnClickOutside: false,
        closeOnEsc: false
      });

      // Show the status of the export in the modal
      // All ffmpeg output goes to stderrdata (see https://stackoverflow.com/questions/35169650/)
      ffmpeg.stderr.on('data', function(e) {
        console.log("stderrdata", e.toString());
        exportStatusDialog.innerHTML = `${e.toString()}<hr>${exportStatusDialog.innerHTML}`;
        exportStatusDialog.scrollTo({ top: 0, behavior: 'smooth' });
      });

      // Stop loader at this point
      ffmpeg.on('exit', function (code) {
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
          // todo display whatever the error is
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

    /**
     * Generates an array of FFMpeg arguments
     * @param {String} exportPath The path to export video to.
     * @param {String} frameDirectory The location of the frames to render.
     * @param {Number} frameRate The frame rate to use in the export.
     * @param {String} preset The rendering preset to use (default: medium).
     * @param {Number} startFrameNo The frame to begin rendering from (default: 0 - ie the start).
     */
    static generateFFMpegArguments(exportPath, frameDirectory, frameRate, preset = "medium", startFrameNo = 0) {
      let endFrameNo = global.projectInst.currentTake.getTotalFrames();
      let framePath = path.join(frameDirectory, "frame_%04d.png");

      // TODO should the default startFrameNo be 0 or 1?

      // The ffmpeg arguments to use
      return [
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
      ].join(" ");
    }
  }

  module.exports = ExportVideo;
})();
