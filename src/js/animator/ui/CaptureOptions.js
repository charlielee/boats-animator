(function() {
  "use strict";
  const { ipcRenderer } = require("electron");

  const Camera = require("../core/Camera");
  const Notification = require("../../common/Notification");

  const cameraSelect = document.querySelector("#camera-source-select");
  const resolutionSelect = document.querySelector("#camera-resolution-select");
  const preview = document.querySelector("#preview");
  const previewAreaMessage = document.querySelector("#preview-area-message");

  class CaptureOptions {
    static setListeners() {
      // Set the blank camera on load
      Camera.setBlankCamera();

      // Get the resolutions for a camera upon changing it
      cameraSelect.addEventListener("change", function (e) {
        if (e.target.value === "#") {
          Notification.info(`${Camera.successCam.name} has been disconnected`);
          Camera.setBlankCamera();
        } else {
          let curCam = Camera.getSelectedCamera();
          curCam.showResolutions();

          // Hide the select camera message
          previewAreaMessage.classList.remove("visible-capture");
          // Set select element styling
          cameraSelect.classList.remove("input-border-danger");
        }
      });

      // Reload the camera on changing resolution
      resolutionSelect.addEventListener("change", function() {
        let curCam = Camera.getSelectedCamera();
        let feed = curCam.updateResolution(Camera.getSelectedResolution());
        Camera.display(feed, preview);
      });

      // Refresh camera list when device changes are detected
      navigator.mediaDevices.addEventListener("devicechange", function(e) {
        Camera.enumerateDevices();
      });
    }

    /**
     * Check the app has camera access and display a message if not
     * @returns {Boolean} True if access has been granted, false if not
     */
    static async checkForCameraAccess() {
      let currentStatus = await ipcRenderer.invoke("settings:check-for-camera-access");

      if (!currentStatus) {
        previewAreaMessage.innerHTML = `
        <h2>
          You have denied camera access to this application.
          <br>
          Please enable access in System Preferences and restart Boats Animator.
        </h2>`;
      }

      return currentStatus;
    }
  }

  module.exports = CaptureOptions;
}());