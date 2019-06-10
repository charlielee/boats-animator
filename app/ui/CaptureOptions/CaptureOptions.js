(function() {
  "use strict";
  const Camera = require("../../main/Camera/Camera");

  const cameraSelect = document.querySelector("#camera-select-td select");
  const resolutionSelect = document.querySelector("#resolution-select-td select");
  const preview = document.querySelector("#preview");

  class CaptureOptions {
    static setListeners() {
      // Get the resolutions for a camera upon changing it
      cameraSelect.addEventListener("change", function() {
        var curCam = Camera.getSelectedCamera();
        curCam.showResolutions();
      });

      // Reload the camera on changing resolution
      resolutionSelect.addEventListener("change", function() {
        var curCam = Camera.getSelectedCamera();
        var feed = curCam.updateResolution(Camera.getSelectedResolution());
        Camera.display(feed, preview);
      });

      // Refresh camera list when device changes are detected
      navigator.mediaDevices.addEventListener("devicechange", function(e) {
        Camera.enumerateDevices();
      });
    }
  }

  module.exports = CaptureOptions;
}());