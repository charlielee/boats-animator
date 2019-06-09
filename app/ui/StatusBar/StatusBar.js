(function() {
  "use strict";
  // DOM elements
  var statusBarCurFrame = document.querySelector("#current-frame");
  var statusBarFrameNum = document.querySelector("#num-of-frames");
  var statusBarFrameRate = document.querySelector("#current-frame-rate span");
  var statusBarCurRes = document.querySelector("#current-resolution");
  var statusBarCurMode = document.querySelector("#current-mode span");

  // todo Set instance of StatusBar and generate html
  class StatusBar {
    constructor() {
      this.frameNo = 0;
      this.totalFrames = 0;
      this.frameRate = 0;
      this.resolution = "";
      this.mode = "";
    }

    /**
     * Changes the current frame number on the status bar.
     * @param {integer} frameNo The value to change the frame number to.
     */
    static setCurrentFrame(frameNo) {
      statusBarCurFrame.innerText = frameNo;
    }

    /**
     * Changes the total frames number on the status bar.
     * @param {integer} totalFramesNo The value to change the total frame number to.
     */
    static setTotalFrames(totalFramesNo) {
      statusBarFrameNum.innerText = totalFramesNo;
    }

    /**
     * Changes the frame rate on the status bar.
     * @param {integer} frameRateNo The value to change the frame rate to.
     */
    static setFrameRate(frameRateNo) {
      statusBarFrameRate.innerText = frameRateNo;
    }

    /**
     * Changes the resolution of the status bar.
     * @param {string} curRes The value of the resolution.
     */
    static setResolution(curRes) {
      statusBarCurRes.innerText = curRes;
    }

    /**
     * Changes the mode displayed on the status bar.
     * @param {string} mode Name of the mode (eg "Capture" or "Playback")
     */
    static setCurrentMode(mode) {
      statusBarCurMode.innerText = mode;
    }
  }

  module.exports = StatusBar;
}());