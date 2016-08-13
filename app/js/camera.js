module.exports = {};

(function() {
  "use strict";
      let cameraResolutions = require("./camera-resolutions"),
      constraints = {
        "1080p": {
          video: {width: {exact: 1920}, height: {exact: 1080}}
        },
        "720p": {
          video: {width: {exact: 1280}, height: {exact: 720}}
        },
        "480p": {
          video: {width: {exact: 640}, height: {exact: 480}}
        },
        "320p": {
          video: {width: {exact: 320}, height: {exact: 240}}
        }
      };


  // Get the DOM selectors needed
  let qResoluSelect = document.querySelector("#form-resolution-select"),
      qCameraSelect = document.querySelector("#camera-select-td select"),
      videoCapture  = document.createElement("video");

    function _findVideoSources(sources) {
      let i = 1;
      sources.forEach(function(source) {
        if (source.kind === "video") {
          // Get the proper camera name
          let cameraName = `Camera ${i}`;
          if (source.label) {
            cameraName = source.label.substr(0, source.label.indexOf("(") - 1);
          }

          // Create the menu selection
          var option = window.document.createElement("option");
          option.text = cameraName;
          option.value = source.id;
          qCameraSelect.appendChild(option);
          i++;
        }
      });

      // Default select the first camera
      qCameraSelect.options[0].selected = true;
    }

    // Get the available cameras
    window.MediaStreamTrack.getSources(_findVideoSources);
  // Public exports
}());
