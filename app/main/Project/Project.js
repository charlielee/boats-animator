(function() {
  "use strict";

  // Common imports
  const ConfirmDialog = require("../../common/ConfirmDialog/ConfirmDialog");

  // Main imports
  const Take = require("../../main/Take/Take");
  const Playback = require("../../main/Playback/Playback");
  const SaveDirectory = require("../../main/SaveDirectory/SaveDirectory");

  // UI imports
  const FrameRate = require("../../ui/FrameRate/FrameRate");
  const PlaybackCanvas = require("../../ui/PlaybackCanvas/PlaybackCanvas");
  const PreviewArea = require("../../ui/PreviewArea/PreviewArea");
  const StatusBar = require("../../ui/StatusBar/StatusBar");

  // Mode switching
  const CaptureWindow = new PreviewArea(document.querySelector("#capture-window"));
  const PlaybackWindow = new PreviewArea(document.querySelector("#playback-window"));

  // The various HTML elements we need to configure or control.
  const btnCaptureFrame = document.querySelector("#btn-capture-frame");
  const btnDeleteLastFrame = document.querySelector("#btn-delete-last-frame");
  const preview = document.querySelector("#preview");

  /** Represents a project (a series of takes) */
  class Project {
    /**
     * Constructor for a project.
     * @param {String} title The project's title
     */
    constructor(title) {
      // Initialise the project
      this.frameRate = new FrameRate(15);
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
      preview.addEventListener("canplay", function() {
        if (!self.streaming) {
          PlaybackCanvas.setDimensions(preview.videoWidth.toString(), preview.videoHeight.toString())
          self.streaming = true;
        }
      });

      // Capture a frame
      btnCaptureFrame.addEventListener("click", function() {
        self.takeFrame();
      });

      // Undo last captured frame
      btnDeleteLastFrame.addEventListener("click", function() {
        self.undoFrame();
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
        .then(function() {
          // Scroll to the end of the framereel
          self.currentTake.frameReel.selectLiveViewButton();
        });
      }
    }

    /**
     * Delete an individual frame.
     *
     * @param {Number} id The frame ID to delete.
     */
    deleteFrame(id) {
      this.currentTake.deleteFrame(id);
      this.setCurrentMode("capture");
      console.info(`Total frames captured: ${this.currentTake.getTotalFrames()}`);
    }

    /**
     * Delete the previously taken frame.
     */
    undoFrame() {
      // Make sure there is a frame to delete
      if (this.currentTake.getTotalFrames() > 0) {
        // Display warning alert to confirm deletion
        ConfirmDialog.confirmSet({ text: "Are you sure you want to delete the last frame captured?" })
          .then((response) => {
            if (response) {
              this.deleteFrame(this.currentTake.getTotalFrames());
            }
          });
      } else {
        Notification.error("There is no previous frame to undo!");
      }
    }

    getCurrentMode() {
      if (PreviewArea.curWindow === CaptureWindow) {
        return "capture";
      } else if (PreviewArea.curWindow === PlaybackWindow) {
        return "playback";
      } else {
        return null;
      }
    }

    setCurrentMode(modeName) {
      switch (modeName) {
        case "capture":
          this._switchMode(CaptureWindow);
          break;
        case "playback":
          this._switchMode(PlaybackWindow);
          break;
      }
    }

    /**
     * Toggle between playback and capture windows.
     *
     * @param {PreviewArea} NewWindow - The PreviewArea window to switch to.
     * Possible values are CaptureWindow and PlaybackWindow.
     */
    _switchMode(NewWindow) {
      var takeInst = this.currentTake;
      NewWindow.display();

      if (PreviewArea.curWindow === CaptureWindow) {
        this.playback.videoStop();
        StatusBar.setCurrentFrame(takeInst.getTotalFrames() + 1);
        StatusBar.setCurrentMode("Capture");
        takeInst.frameReel.selectLiveViewButton();

      } else if (PreviewArea.curWindow === PlaybackWindow) {
        takeInst.frameReel.selectLiveViewButton(false);
        StatusBar.setCurrentMode("Playback");
      }

      console.log(`Switched to: ${NewWindow.el.id}`);
    }
  }

  module.exports = Project;
}());