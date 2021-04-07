(function() {
  "use strict";
  // Imports
  const ToggleButton = require("../ui/ToggleButton");
  const Features = require("./Features");

  // HTML elements
  const preview = document.querySelector("#preview");
  const hiddenPreview = document.querySelector("#hidden-preview");
  const autoTakeList = document.querySelector("#auto-take-list");

  var autoTakeDaemon = null;

  /**
   * Class for automatically taking picture after detecting the connected DSLR video stream has taken a photo.
   * This is useful when DSLRs have their video output connected to an HDMI capture card, such as Cam Link.
   * While DSLRs are capturing a photo, their video stream becomes black. After the photo is taken, it is
   * previewed on the video output for around 1-2 seconds before switching back to the live view. This transition
   * can be detected, so the high-quality image preview can be captured off the video stream.
   */
  class AutoTake {

    /**
     * Initializes the AutoTake sidebar menu, and class variables.
     */
    static initialise() {
      AutoTake.autoTakeDaemon = null;  // Timer Interval for detecting brightness change
      AutoTake.enabled = true; // Is AutoTake is enabled?
      AutoTake.isDark = false; // Is the current video frame dark (brightness below threshold)?
      AutoTake.brightnessThreshold = 1.2;  // Brightness Threshold

      // Add a list item to settings dialog
      let autoTakeItem = document.createElement("li");
      autoTakeList.appendChild(autoTakeItem);

      // Item title
      let itemTitle = document.createElement("div");
      let itemTitleText = document.createElement("div");

      let itemToggleBtn = document.createElement("div"); // Item toggle button

      let itemSettingsContainer = document.createElement("div");
      let brightnessThresholdInput = document.createElement("input"); // Brightness Threshold input
      let brightnessThresholdText = document.createElement("div");

      // Set title
      autoTakeItem.appendChild(itemTitle);
      itemTitle.classList.add("flex");
      itemTitle.appendChild(itemTitleText);
      itemTitleText.innerText = "Auto-Take";

      // Add toggle button
      itemTitle.appendChild(itemToggleBtn);
      itemToggleBtn.setAttribute("style", "text-align: right");
      itemToggleBtn.classList.add("auto-take-toggle-btn");
      new ToggleButton(itemToggleBtn, function() {
        if (AutoTake.enabled) {
          clearInterval(AutoTake.autoTakeDaemon);
          AutoTake.autoTakeDaemon = null;
          AutoTake.enabled = false;
        }
        else {
          // Start daemon to check webcam brightness 30 times per second. TODO: Make the interval time configurable
          AutoTake.autoTakeDaemon = setInterval(AutoTake.checkBrightnessThreshold, 1000 / 30); // 30 FPS
          AutoTake.enabled = true;
        }
        itemSettingsContainer.classList.toggle("hidden");
      });

      // Create item settings container to hold configurable inputs
      autoTakeItem.appendChild(itemSettingsContainer);
      itemSettingsContainer.classList.add("flex");
      itemSettingsContainer.setAttribute("style", "align-items: center");

      // Create brightness threshold text label and input
      itemSettingsContainer.appendChild(brightnessThresholdText);
      brightnessThresholdText.classList.add("flex");
      brightnessThresholdText.setAttribute("style", "flex-basis: 80%");
      brightnessThresholdText.innerText = "Brightness Threshold:";
      itemSettingsContainer.appendChild(brightnessThresholdInput);
      brightnessThresholdInput.style.margin = "0 0 0 0.5em";
      brightnessThresholdInput.setAttribute("type", "number");
      brightnessThresholdInput.setAttribute("min", "0");
      brightnessThresholdInput.setAttribute("max", "255");
      brightnessThresholdInput.setAttribute("step", "0.1");
      brightnessThresholdInput.setAttribute("value", 1.2);

      // Listen to the input being updated
      brightnessThresholdInput.addEventListener("input", function(e) {
        let val = e.target.value;
        // Limit value to range [0-255]
        if (val > 255) {
          val == 255;
        }
        else if (val < 0) {
          val = 0;
        }
        AutoTake.brightnessThreshold = val;
      });
    }

    static checkBrightnessThreshold() {
      var w = preview.videoWidth;
      var h = preview.videoHeight;

      if (w == 0 || h == 0) {
        return;  // Return if video stream not setup
      }

      hiddenPreview.width = w;
      hiddenPreview.height = h;
      var context = hiddenPreview.getContext('2d');

      context.drawImage(preview, 0, 0, w, h);

      var imgData = context.getImageData(0, 0, w, h)
      var data = imgData.data;
      var r, g, b, a, avg;
      var colorSum = 0;
      var totalPixels = 0;

      for (var x = 0, len = data.length; x < len; x += 4) {
        r = data[x];
        g = data[x+1];
        b = data[x+2];
        a = data[x+3];

        if (a > 0) {
          avg = (r + b + g) / 3;
          colorSum += avg;
          totalPixels += 1;
        }
      }

      var brightness = colorSum / totalPixels;

      if (brightness > AutoTake.brightnessThreshold) {
        if (AutoTake.isDark) {  // Take picture if live image transitions from dark to light.
          Features.takePicture();
        }
        AutoTake.isDark = false;
      }
      else {
        AutoTake.isDark = true;
      }
    }
  }

  module.exports = AutoTake;
})();