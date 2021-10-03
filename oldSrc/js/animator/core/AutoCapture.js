(function() {
  "use strict";
  // Imports
  const Features = require("./Features");

  // HTML elements
  const preview = document.querySelector("#preview");
  const hiddenPreview = document.querySelector("#hidden-preview");
  const autoCaptureList = document.querySelector("#auto-capture-list");

  /**
   * Class for automatically taking picture after detecting the connected DSLR video stream has taken a photo.
   * This is useful when DSLRs have their video output connected to an HDMI capture card, such as Cam Link.
   * While DSLRs are capturing a photo, their video stream becomes black. After the photo is taken, it is
   * previewed on the video output for around 1-2 seconds before switching back to the live view. This transition
   * can be detected, so the high-quality image preview can be captured off the video stream.
   */
  class AutoCapture {

    /**
     * Initializes the AutoCapture sidebar menu, and class variables.
     */
    static initialise() {
      AutoCapture.autoCaptureDaemon = null;  // Timer Interval for detecting brightness change
      AutoCapture.enabled = false; // Is AutoCapture is enabled?
      AutoCapture.isDark = false; // Is the current video frame dark (brightness below threshold)?
      AutoCapture.brightnessThreshold = 1.2;  // Brightness Threshold

      // Add a list item to settings dialog
      let autoCaptureItem = document.createElement("li");
      autoCaptureList.appendChild(autoCaptureItem);

      let itemSettingsContainer = document.createElement("div");
      let brightnessThresholdInput = document.createElement("input"); // Brightness Threshold input
      let brightnessThresholdText = document.createElement("div");

      // Toggle switch:
      // <div class="switch-container">
      //   <label for="example">Example</label>
      //   <input type="checkbox" id="example" class="switch-btn">
      // </div>

      let switchContainer = document.createElement("div");
      switchContainer.classList.add("switch-container");
      autoCaptureItem.appendChild(switchContainer);

      let switchLabel = document.createElement("label");
      switchLabel.setAttribute("for", `auto-capture-toggle-switch`);
      switchLabel.innerText = "Auto-Capture";
      switchContainer.appendChild(switchLabel);

      let switchCheckbox = document.createElement("input");
      switchCheckbox.classList.add("switch-btn");
      switchCheckbox.setAttribute("type", "checkbox");
      switchCheckbox.setAttribute("id", `auto-capture-toggle-switch`);
      switchContainer.appendChild(switchCheckbox);

      switchCheckbox.addEventListener("change", function (e) {
        if (AutoCapture.enabled) {
          clearInterval(AutoCapture.autoCaptureDaemon);
          AutoCapture.autoCaptureDaemon = null;
          AutoCapture.enabled = false;
        } else {
          // Start daemon to check webcam brightness 30 times per second. TODO: Make the interval time configurable
          AutoCapture.autoCaptureDaemon = setInterval(AutoCapture.checkBrightnessThreshold, 1000 / 30); // 30 FPS
          AutoCapture.enabled = true;
        }
        itemSettingsContainer.classList.toggle("hidden");
      });

      // Create item settings container to hold configurable inputs
      autoCaptureItem.appendChild(itemSettingsContainer);
      itemSettingsContainer.classList.add("flex", "hidden");
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
          val = 255;
        } else if (val < 0) {
          val = 0;
        }
        e.target.value = val;  // Set input back to corrected value.
        AutoCapture.brightnessThreshold = val;
      });
    }

    static checkBrightnessThreshold() {
      let w = preview.videoWidth;
      let h = preview.videoHeight;

      if (w === 0 || h === 0) {
        return;  // Return if video stream not setup
      }

      hiddenPreview.width = w;
      hiddenPreview.height = h;
      let context = hiddenPreview.getContext('2d');

      context.drawImage(preview, 0, 0, w, h);

      let imgData = context.getImageData(0, 0, w, h)
      let data = imgData.data;
      let r, g, b, a, avg;
      let colorSum = 0;
      let totalPixels = 0;

      for (let x = 0, len = data.length; x < len; x += 4) {
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

      let brightness = colorSum / totalPixels;

      if (brightness > AutoCapture.brightnessThreshold) {
        if (AutoCapture.isDark) {  // Take picture if live image transitions from dark to light.
          Features.takePicture();
        }
        AutoCapture.isDark = false;
      } else {
        AutoCapture.isDark = true;
      }
    }
  }

  module.exports = AutoCapture;
})();