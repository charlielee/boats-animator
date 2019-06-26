(function () {
  "use strict";

  // Common imports
  const ConfirmDialog = require("../../common/ConfirmDialog/ConfirmDialog");

  // Main imports
  const Take = require("../../main/Take/Take");
  const Playback = require("../../main/Playback/Playback");
  const SaveDirectory = require("../../main/SaveDirectory/SaveDirectory");

  // UI imports
  const FrameRate = require("../../ui/FrameRate/FrameRate");
  const Notification = require("../../ui/Notification/Notification");
  const PlaybackCanvas = require("../../ui/PlaybackCanvas/PlaybackCanvas");
  const PreviewOverlay = require("../../main/PreviewOverlay/PreviewOverlay");
  const StatusBar = require("../../ui/StatusBar/StatusBar");

  // The various HTML elements we need to configure or control.
  const btnCaptureFrame = document.querySelector("#btn-capture-frame");
  const btnDeleteLastFrame = document.querySelector("#btn-delete-last-frame");
  const btnDeleteFrame = document.querySelector("#btn-delete-frame");
  const preview = document.querySelector("#preview");
  const previewAreaEl = document.querySelector("#preview-area");
  const frameModLeftControls = document.querySelector("#left-controls");

  /** Represents a project (a series of takes) */
  class Project {
    /**
     * Constructor for a project.
     * @param {String} title The project's title
     */
    constructor(title) {
      // Initialise the project
      this.frameRate = new FrameRate(15);
      this.currentMode = null;
      this.currentTake = null;
      this.playback = null;
      this.saveDirectory = new SaveDirectory(SaveDirectory.getLocalStorageDir());
      // Indicates whether or not we're currently streaming
      // video from the camera. Obviously, we start at false.
      this.streaming = false;
      this.title = title;
      this.takes = [];
    }

    /**
     * The event listeners for a project
     */
    setListeners() {
      var self = this;

      self.playback = new Playback(self);

      // Initialises the preview window
      preview.addEventListener("play", function () {
        PlaybackCanvas.setDimensions(preview.videoWidth.toString(), preview.videoHeight.toString())
        self.streaming = true;
        // Reload preview overlays
        PreviewOverlay.drawAll();
      });

      // Capture a frame
      btnCaptureFrame.addEventListener("click", function () {
        self.takeFrame();
      });

      // Undo last captured frame
      btnDeleteLastFrame.addEventListener("click", function () {
        self.undoFrame();
      });

      // Delete any frame
      btnDeleteFrame.addEventListener("click", function () {
        self.deleteCurrentSelectedFrame();
      });
    }

    /**
     * Adds a Take to the project.
     * Returns the new Take.
     */
    addTake() {
      var takeNumber = this.takes.length + 1;
      var take = new Take(takeNumber, this.saveDirectory);
      this.takes.push(take);
      this.currentTake = this.takes[takeNumber - 1];
      return take;
    }

    /**
     * Gets a take by a given take number.
     * @param {Number} takeNumber The number of the take to retrieve.
     */
    getTake(takeNumber) {
      this.currentTake = this.takes[takeNumber - 1];
      return this.currentTake;
    }

    /**
     * Trigger frame capturing.
     */
    takeFrame() {
      var self = this;
      // Stop playback
      this.playback.videoStop();
      this.setCurrentMode("capture");

      // Take a picture
      if (self.streaming) {
        self.currentTake.captureFrame()
          .then(function () {
            // Scroll to the end of the framereel
            self.currentTake.frameReel.selectLiveViewButton();
          });
      }
    }

    /**
     * Delete the previously taken frame.
     */
    undoFrame() {
      this._deleteFrame(this.currentTake.getTotalFrames());
    }

    /**
     * Delete the current selected frame.
     */
    deleteCurrentSelectedFrame() {
      if (this.currentTake.frameReel.curSelectedFrame) {
        this._deleteFrame(this.currentTake.frameReel.curSelectedFrame);
      } else {
        this.undoFrame();
      }
    }

    /**
     * Delete an individual frame.
     *
     * @param {Number} id The frame ID to delete.
     */
    _deleteFrame(id) {
      // Make sure there is a frame to delete
      if (this.currentTake.getTotalFrames() > 0) {
        // Display warning alert to confirm deletion
        ConfirmDialog.confirmSet({ text: `Are you sure you want to delete frame ${id}?` })
          .then((response) => {
            if (response) {
              // Remove the frame from the take
              this.currentTake.deleteFrame(id);
              this.setCurrentMode("capture");
              console.info(`Total frames captured: ${this.currentTake.getTotalFrames()}`);
            }
          });
      } else {
        Notification.error("There are no captured frames to delete!");
      }
    }

    getCurrentMode() {
      return this.currentMode;
    }

    setCurrentMode(modeName) {
      this.currentMode = modeName;
      this._switchMode(modeName);
    }

    /**
     * Toggle between playback and capture windows.
     *
     * Possible values are CaptureWindow and PlaybackWindow.
     */
    _switchMode(newModeName) {
      var takeInst = this.currentTake;

      if (newModeName === "capture") {
        // Update preview area
        previewAreaEl.classList.toggle("capture-mode", true);
        previewAreaEl.classList.toggle("playback-mode", false);
        // Update frame management buttons
        frameModLeftControls.classList.toggle("capture-mode", true);
        frameModLeftControls.classList.toggle("playback-mode", false);

        // Stop playback
        this.playback.videoStop();
        // Update status bar and frame reel
        StatusBar.setCurrentFrame(takeInst.getTotalFrames() + 1);
        StatusBar.setCurrentMode("Capture");
        takeInst.frameReel.selectLiveViewButton();

      } else if (newModeName === "playback") {
        // Update preview area
        previewAreaEl.classList.toggle("capture-mode", false);
        previewAreaEl.classList.toggle("playback-mode", true);
        // Update frame management buttons
        frameModLeftControls.classList.toggle("capture-mode", false);
        frameModLeftControls.classList.toggle("playback-mode", true);

        // Update statusbar and frame reel
        StatusBar.setCurrentMode("Playback");
        takeInst.frameReel.selectLiveViewButton(false);
      }

      console.log(`Switched to: ${newModeName} mode`);
    }
  }

  module.exports = Project;
}());