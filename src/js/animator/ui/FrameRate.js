(function() {
  // UI Imports
  var StatusBar = require("./StatusBar");

  var inputChangeFR = document.querySelector("#input-fr-change");

  /** Class for controlling the frame rate of a Project */
  class FrameRate {

    /**
     * Constructor for frame rate.
     * @param {Number} frameRateValue The initial frame rate of the Project.
     */
    constructor(frameRateValue) {
      this.frameRateValue = frameRateValue;
      inputChangeFR.value = frameRateValue;
      StatusBar.setFrameRate(frameRateValue);

      var self = this;

      // Listen for frame rate changes
      inputChangeFR.addEventListener("input", function(e) {
        if (inputChangeFR.value >= 1 && inputChangeFR.value <= 60) {
          self.frameRateValue = parseInt(this.value, 10);
        } else {
          self.frameRateValue = 15;
        }
        StatusBar.setFrameRate(self.frameRateValue);
        // todo Video should stop on frame rate change
        // if (PreviewArea.curWindow === PlaybackWindow) {
        //   videoStop();
        // }
      });

      // Listen for leaving frame rate input
      inputChangeFR.addEventListener("blur", function() {
        inputChangeFR.value = self.frameRateValue;
        // Reset frameRateValue to 15 if invalid
        if (
          inputChangeFR.value > 60 ||
          inputChangeFR.value < 1 ||
          Number.isNaN(inputChangeFR.value) ||
          inputChangeFR.length > 2
        ) {
          inputChangeFR.value = 15;
        }
      });
    }

    /**
     * Returns the current frame rate value.
     */
    getFrameRateValue() {
      return this.frameRateValue;
    }
  }

  module.exports = FrameRate;
}());