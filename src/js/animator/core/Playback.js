(function () {
  "use strict";
  const { ipcRenderer } = require("electron");

  const btnLoop = document.querySelector("#btn-loop");
  const btnPlayPause = document.querySelector("#btn-play-pause");

  const PlaybackCanvas = require("../ui/PlaybackCanvas");
  const PlaybackControls = require("../ui/PlaybackControls");
  const StatusBar = require("../ui/StatusBar");

  class Playback {
    constructor() {
      this.curPlayFrame = 0;
      this.isLooping = false;
      this.isPlaying = false;
      this.playBackRAF = null;
      this.playBackTimeout = null;
      this.playBackRAFPreviousTime = null;

      // Add the event listeners
      PlaybackControls.setListeners();
    }

    /**
     * Toggle captured frames preview looping.
     */
    toggleVideoLoop() {
      // Disable looping
      if (this.isLooping) {
        this.isLooping = false;
        btnLoop.children[0].classList.remove("active");

        // Enable looping
      } else {
        this.isLooping = true;
        btnLoop.children[0].classList.add("active");
      }

      // Toggle checkbox on related menubar item
      ipcRenderer.send(
        "menubar:toggle-checkbox",
        "loopPlayback",
        this.isLooping
      );

      console.info(`Loop playback: ${this.isLooping}`);
    }

    /**
     * Pause captured frames preview video.
     */
    videoPause() {
      // Only pause if needed
      if (this.isPlaying) {
        this.isPlaying = false;
        cancelAnimationFrame(this.playBackRAF);
        clearTimeout(this.playBackTimeout);

        // Change the play/pause button
        btnPlayPause.children[0].classList.remove("fa-pause");
        btnPlayPause.children[0].classList.add("fa-play");
        console.info("Playback paused");
      }
    }

    /**
     * Fully stop captured frames preview video.
     */
    videoStop() {
      this.videoPause();
      this.curPlayFrame = 0;
      if (
        global.projectInst.currentTake.getTotalFrames() > 0 &&
        global.projectInst.getCurrentMode() === "playback"
      ) {
        this._displayFrame(global.projectInst.currentTake.getTotalFrames());
      }
      console.info("Playback stopped");
    }

    /**
     * Previews the last 5 captured frames.
     */
    shortPlay() {
      if (global.projectInst.currentTake.getTotalFrames() > 0) {
        if (!this.isPlaying) {
          const totalFrames = global.projectInst.currentTake.getTotalFrames();
          const number = totalFrames - 5;
          if (totalFrames <= 5) {
            this.previewCapturedFrames();
            return;
          }
          this.previewCapturedFrames(number);
        } else {
          console.log("already playing...");
        }
      }
    }

    /**
     * Pause playback and view a specific frame in the preview area.
     *
     * @param {Integer} id - The frame ID to preview.
     */
    _displayFrame(id) {
      if (global.projectInst.currentTake.getTotalFrames() > 0) {
        // Reset the player
        this.videoPause();

        // Preview selected frame ID
        global.projectInst.currentTake.frameReel.selectFrame(id);
        PlaybackCanvas.drawImage(
          global.projectInst.currentTake.capturedFrames[id - 1]
        );
        StatusBar.setCurrentFrame(id);
      }

      // Set the current play frame
      this.curPlayFrame = id - 1;
    }

    /**
     * Preview the captured frames.
     *
     * @param {Integer} number - Frame number that previewing begins
     */
    previewCapturedFrames(number = 0) {
      // Display playback window
      if (global.projectInst.getCurrentMode() === "capture") {
        global.projectInst.setCurrentMode("playback");
        this.curPlayFrame = number;
      }

      // Reset canvas to first frame if playing from start
      if (this.curPlayFrame === 0) {
        PlaybackCanvas.drawImage(
          global.projectInst.currentTake.capturedFrames[0]
        );
      }

      // Update the play/pause button
      btnPlayPause.children[0].classList.remove("fa-play");
      btnPlayPause.children[0].classList.add("fa-pause");

      // Begin playing the frames
      console.info("Playback started");
      this.isPlaying = true;

      global.projectInst.playback.playBackRAF = requestAnimationFrame(
        Playback._videoPlay
      );
    }

    /**
     * Play captured frames preview video.
     */
    static _videoPlay(newTime = 0) {
      if (global.projectInst.playback.playBackRAFPreviousTime === null) {
        global.projectInst.playback.playBackRAFPreviousTime = newTime;
      }
      const delay = 1000 / global.projectInst.frameRate.getFrameRateValue();
      const incrementIfExceedsTime = Math.floor(
        global.projectInst.playback.playBackRAFPreviousTime + delay
      );

      // Stop or loop at last frame
      if (
        newTime >= incrementIfExceedsTime &&
        global.projectInst.playback.curPlayFrame >=
          global.projectInst.currentTake.getTotalFrames()
      ) {
        if (!global.projectInst.playback.isLooping) {
          global.projectInst.setCurrentMode("capture");
          return;
        }

        console.info("Playback looped");
        global.projectInst.playback.curPlayFrame = 0;
      }

      if (newTime >= incrementIfExceedsTime) {
        global.projectInst.playback.playBackRAFPreviousTime = newTime;

        PlaybackCanvas.drawImage(
          global.projectInst.currentTake.capturedFrames[
            global.projectInst.playback.curPlayFrame
          ]
        );
        StatusBar.setCurrentFrame(global.projectInst.playback.curPlayFrame + 1);
        global.projectInst.currentTake.frameReel.selectFrame(
          global.projectInst.playback.curPlayFrame + 1
        );

        global.projectInst.playback.curPlayFrame++;
      }

      global.projectInst.playback.playBackRAF = requestAnimationFrame(
        Playback._videoPlay
      );
    }
  }

  module.exports = Playback;
})();
