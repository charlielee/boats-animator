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

  // Public exports
}());
