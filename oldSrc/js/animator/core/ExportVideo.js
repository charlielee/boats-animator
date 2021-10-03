(function() {
  "use strict";
  const { ipcRenderer, shell } = require("electron");
  const path = require("path");

  const ConfirmDialog = require("../ui/ConfirmDialog");
  const Camera = require("./Camera");
  const Notification = require("../../common/Notification");

  const DEFAULT_FILE_NAME = "output.mp4";

  const btnExportVideo = document.querySelector("#btn-export-video");

  class ExportVideo {
    static setListeners() {
      let self = this;

      // Export video sidebar button
      btnExportVideo.addEventListener("click", function() {
        if (global.projectInst.currentTake.getTotalFrames() > 0) {
          ExportVideo.displayExportVideoDialog();
        }
      });
    }

    /**
     * Displays the export video dialog box.
     */
    static async displayExportVideoDialog() {
      // File path to export the video to
      let exportFrameDir = await ipcRenderer.invoke("settings:get", "projectDefaults.exportFrameDir");
      let outputPath = `${exportFrameDir}/${DEFAULT_FILE_NAME}`;

      // Html for the export video dialog
      let dialogContents = document.createElement("div");
      dialogContents.innerHTML = `
        <label>Export location:</label>
        <br>
        <div id="currentVideoExportText">${outputPath}</div>
        <button id="exportLocationBtn">Browse</button>

        <br>
        <br>

        <label for="presetSelect">FFmpeg quality preset:</label>
        <br>
        <select id="presetSelect">
          <option value="veryslow">Very slow</option>
          <option value="medium" selected>Medium</option>
          <option value="veryfast">Very fast</option>
        </select>

        <br>
        <br>

        <label for="customArgumentsInput">FFmpeg arguments:</label>
        <br>
        <textarea id="customArgumentsInput" rows="5" style="width: 100%;"></textarea>
      `;

      // Elements
      const currentVideoExportText = dialogContents.querySelector("#currentVideoExportText")
      const exportLocationBtn = dialogContents.querySelector("#exportLocationBtn");
      const presetSelect = dialogContents.querySelector("#presetSelect");
      const customArgumentsInput = dialogContents.querySelector("#customArgumentsInput");

      // Dialog values
      let presetValue = presetSelect.value;

      // Export video parameters
      let frameRate = global.projectInst.frameRate.frameRateValue;

      // Load in default FFmpeg arguments
      customArgumentsInput.value = ExportVideo.generateFfmpegArguments(outputPath, exportFrameDir, frameRate, presetValue);

      // Set blank camera
      Camera.setBlankCamera();

      // Event listeners

      // Activate choose export video file path dialog on button click
      exportLocationBtn.addEventListener("click", async () => {
        outputPath = await ipcRenderer.invoke("settings:show-export-video-file-path-dialog", outputPath);
        currentVideoExportText.innerText = outputPath;
        customArgumentsInput.value = ExportVideo.generateFfmpegArguments(outputPath, exportFrameDir, frameRate, presetValue);
      });

      // Listen to the preset value dialog being changed
      presetSelect.addEventListener("change", function () {
        presetValue = this.value;
        customArgumentsInput.value = ExportVideo.generateFfmpegArguments(outputPath, exportFrameDir, frameRate, presetValue);
      });

      ConfirmDialog.confirmSet({
        title: "Export Video",
        text: " ",
        icon: " ",
        content: dialogContents,
        buttons: [true, "Export video"]
      })
      .then(async (response) => {
        // Conform the take and render the video if "export video" selected
        if (response) {
          let isTakeConformed = await global.projectInst.currentTake.conformTake(false);

          if (isTakeConformed) {
            // The render method expects an array so convert input from string into array
            // Regexes are to handle arguments in quotes
            // https://stackoverflow.com/a/56119602
            let argumentsArray = customArgumentsInput.value.match(/[^\s"']+|"([^"]*)"/gmi);
            argumentsArray = argumentsArray.map((arg) => arg.replace(/"|'/g, ""));

            ExportVideo.render(argumentsArray, outputPath);
          } else {
            Notification.error("Unable to export video due to an error renaming files with conform take.");
          }
        }
      });

      // Auto-click the export location button upon load to prompt user to select an export location
      exportLocationBtn.click();
    }

    /**
     * Renders a video from the frames in the selected frame location.
     * @param {Array} ffmpegArguments An array of ffmpeg arguments to use.
     * @param {String} exportPath The path to export video to
     */
    static render(ffmpegArguments, exportPath) {
      // Spawn an FFmpeg child process, the replace is needed as per:
      // https://github.com/kribblo/node-ffmpeg-installer#wrong-path-under-electron-with-asar-enabled
      const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path.replace("app.asar", "app.asar.unpacked");
      const spawn = require("child_process").spawn;
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
      ffmpeg.stderr.on("data", function(e) {
        console.log("stderrdata", e.toString());
        exportStatusDialog.innerHTML = `${e.toString()}<hr>${exportStatusDialog.innerHTML}`;
        exportStatusDialog.scrollTo({ top: 0, behavior: "smooth" });
      });

      // Stop loader at this point
      ffmpeg.on("exit", function (code) {
        let exportCompleteDialog = document.createElement("div");

        // Display success/error dialog
        if (code === 0) {
          // Add link to the exported video file
          exportCompleteDialog.insertAdjacentHTML("beforeend", `
            <p>Video was successfully exported to:</p>
            <p><a id="videoExportPathLink" href="#">${exportPath}</a></p>
          `);

          // Handle clicking said link
          exportCompleteDialog.querySelector("#videoExportPathLink").addEventListener("click", () => {
            shell.showItemInFolder(exportPath);
          });
        } else {
          // Display whatever the error is
          exportCompleteDialog.insertAdjacentHTML("beforeend", `
            <p>An error occurred trying to export the current project to video. Please try again later.</p>
            <p>Exit code ${code}.</p>
          `);
        }

        // Show previous error/success output
        exportCompleteDialog.appendChild(exportStatusDialog);

        ConfirmDialog.confirmSet({
          title: code === 0 ? "Success" : "Error",
          text: " ",
          content: exportCompleteDialog,
          icon: code === 0 ? "success" : "error",
          buttons: {
            cancel: false,
            confirm: true
          },
        });
      });
    }

    /**
     * Generates an array of FFmpeg arguments
     * @param {String} exportPath The path to export video to.
     * @param {String} frameDirectory The location of the frames to render.
     * @param {Number} frameRate The frame rate to use in the export.
     * @param {String} preset The rendering preset to use (default: medium).
     * @param {Number} startFrameNo The frame to begin rendering from (default: 0 - ie the start).
     */
    static generateFfmpegArguments(exportPath, frameDirectory, frameRate, preset = "medium", startFrameNo = 0) {
      let currentTake = global.projectInst.currentTake;
      let endFrameNo = currentTake.getTotalFrames();
      let frameFileName = currentTake.buildFileName("%05d");
      let framePath = path.join(frameDirectory, frameFileName);

      // TODO should the default startFrameNo be 0 or 1?

      // The ffmpeg arguments to use
      return [
        "-y", // Overwrite output file if it already exists
        "-framerate", frameRate,
        "-start_number", startFrameNo,
        "-i", `\"${framePath}\"`,
        "-frames:v", endFrameNo,
        "-c:v", "libx264",
        "-preset", preset,
        "-crf", "17",
        "-vf", "format=yuv420p",
        `\"${exportPath}\"`,
        "-hide_banner", // Hide FFmpeg library info from output
      ].join(" ");
    }
  }

  module.exports = ExportVideo;
})();
