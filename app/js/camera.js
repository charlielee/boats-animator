module.exports = {};

(function() {
  "use strict";
  let cameraResolutions = require("./camera-resolutions"),
      notification = require("./notification"),
      curStream = null,
      curResolutions = [];

  // Get the DOM selectors needed
  let qResoluSelect = document.querySelector("#form-resolution-select"),
      qCameraSelect = document.querySelector("#camera-select-td select"),
      videoCapture  = document.createElement("video");

  // Get the available cameras
  navigator.mediaDevices.enumerateDevices()
  .then(_findVideoSources)
  .catch(function(error) {
    console.error(error);
  });

  // Add each video source to the "current camera" menu
  function _findVideoSources(sources) {
    let i = 1;
    sources.forEach(function(source) {
      if (source.kind === "videoinput") {
        // Get the proper camera name
        let cameraName = `Camera ${i}`;
        if (source.label) {
          cameraName = source.label.substr(0, source.label.indexOf("(") - 1);
        }

        // Create the menu selection
        var option = window.document.createElement("option");
        option.text = cameraName;
        option.value = source.deviceId;
        qCameraSelect.appendChild(option);
        i++;
      }
    });
  }

  /**
   * Creates a video element with a source of the camera
   * and resolution the user selected.
   */
  function getCamera() {
    curResolutions = cameraResolutions.resolutions;
    _getMedia(_getSelectedCamera(), curResolutions[_getSelectedResolution()]);
    return videoCapture;
  }

  /**
   * Get the user-selected resolution.
   * @return {String} The corresponding key for the equivalent constraint.
   */
  function _getSelectedResolution() {
      return qResoluSelect.options[qResoluSelect.options.selectedIndex].value;
  }

  /**
   * Gets the user-selected camera.
   * @return {string} The deviceId of the camera the user has selected.
   */
  function _getSelectedCamera() {
    return qCameraSelect.options[qCameraSelect.options.selectedIndex].value;
  }

  function _getMedia(camId, constraints) {
    // Stop the previous camera from streaming
    if (curStream) {
      let curTrack = curStream.getVideoTracks()[0];
      curTrack.stop();
    }

    // Update the user-selected camera
    constraints["video"]["deviceId"] = camId;

    // Load the stream and display it
    navigator.mediaDevices.getUserMedia(constraints)
    .then(mediaSuccessCapture)
    .catch(mediaError);;
  }

  /**
   * Play hidden video in the correct resolution.
   */
  function mediaSuccessCapture(mediaStream) {
    notification.success("Camera successfully connected.");
    videoCapture.src = window.URL.createObjectURL(mediaStream);
    videoCapture.play();

    curStream = mediaStream;

    // Make the capture stream available for public access
    module.exports.videoCapture = videoCapture;
  }

  function mediaError(err) {
    notification.error("Could not find a camera to use!");
    console.error(err);
  }

  function getResolutions() {
    cameraResolutions.get(_getSelectedCamera());
  }

  // Public exports
  module.exports.get = getCamera;
  module.exports.getResolutions = getResolutions;
}());