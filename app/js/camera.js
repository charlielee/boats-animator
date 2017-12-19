module.exports = {};

/** A class for managing camera. */
(function() {
  "use strict";
  // Import modules
  var cameraResolutions = require("./camera-resolutions");
  var notification = require("./notification");
  var previewArea = require("./previewArea");

  let curStream = null,
      curResolutions = [],
      cameraNames = {};

  // Get the DOM selectors needed
  let qResoluSelect = document.querySelector("#form-resolution-select"),
      qCameraSelect = document.querySelector("#camera-select-td select"),
      videoCapture  = document.createElement("video");

  /** Class variables */

  // Contains a list of all the Camera objects created
  Camera.list = {};

  // The id of the currently selected camera
  Camera.curId = null;

  /**
   * Constructor for a camera.
   * @param {HTMLElement} el - the HTMLElement the window is associated with.
   */
  function Camera(id, name, resolutions = {}) {
    this.id = id;
    this.name = name;
    this.curResolution;
    this.resolutions = resolutions;
    this.responsive = null;
    Camera.list[id] = this;
  }

  /** On load */

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
        cameraNames[source.deviceId] = cameraName;

        // Create the menu selection
        var option = window.document.createElement("option");
        option.text = cameraName;
        option.value = source.deviceId;
        qCameraSelect.appendChild(option);
        i++;

        // Add to camera list if new
        if (!(source.deviceId in Camera.list)) {
          var cam = new Camera(source.deviceId, cameraName);
          console.log(cam);
        }
      }
    });
  }

  /** Instance methods */
  Camera.prototype = {
    constructor: Camera,

    /**
     * Gets the resolutions of a camera and update the select object
     */
    showResolutions: function() {
      // Display loading window
      previewArea.curWindow.showLoading(`Loading ${this.name}`, true);
      // See if resolutions have already been found
      if (this.resolutions.length > 0) {
        Camera._updateResoluSelect(this.resolutions);
      } else {
        // Find resolutions
        getResolutions();
      }
    },

    /**
     * Updates the resolution of a camera
     * 
     * @param {integer} index - the position in the camera's array of resolutions to update to. 
     * 
     * @return A video feed with the upload resolution.
     */
    updateResolution: function (index) {
      return getCamera2(this, this.resolutions[index])
    }
  }

  /** Static methods */

  // Displays a camera feed onto another video object
  Camera.display = function(feed, output) {
    feed.addEventListener("canplay", function() {
      output.src = feed.src;
    });
  }

  // Returns a camera object from an id
  Camera.getCameraById = function (id) {
    return Camera.list[id];
  }

  /**
   * Get the user-selected resolution.
   * @return {String} The corresponding key for the equivalent constraint.
   */
  Camera.getSelectedResolution = function () {
    return qResoluSelect.options[qResoluSelect.options.selectedIndex].value;
  }

  /**
   * Gets the user-selected camera.
   * @return {string} The deviceId of the camera the user has selected.
   */
  Camera.getSelectedCamera = function () {
    var camId = qCameraSelect.options[qCameraSelect.options.selectedIndex].value;
    return Camera.list[camId];
  }

  // Create menu selection options for each resolution in supported
  Camera._updateResoluSelect = function (supported) {
    qResoluSelect.innerHTML = "";
    let i = 0;
    supported.forEach(function(res) {
      let width = res.video.width.exact,
          height = res.video.height.exact;

      var option = window.document.createElement("option");
      option.text = `${width}x${height}`;
      option.value = i;
      qResoluSelect.appendChild(option);
      i++;
    });

    // Get selected camera
    var curCam = Camera.getSelectedCamera();

    // Default select the lowest resolution (ie the last one in the list)
    try {
      var index = qResoluSelect.options.length - 1;
      qResoluSelect.options[index].selected = true;

      // Get video feed with updated resolution
      var feed = curCam.updateResolution(index);
      // Display this feed in the preview area
      Camera.display(feed, document.querySelector("#preview"));
    } catch (err) {
      notification.error(`${curCam.name} could not be loaded!`);
    } finally {
      previewArea.curWindow.display();
    }
  }


  /**
   * Creates a video element with a source of the camera
   * and resolution the user selected.
   */
  function getCamera2(cam, res = null) {
    if (!res) {
      res = cam.curResolution;
    }
    _getMedia(cam.id, res);
    return videoCapture;
  }


    // Returns the user friendly name of the current source
    function getCurrentCameraName() {
      return cameraNames[_getSelectedCamera()];
    }

  /**
   * Creates a video element with a source of the camera
   * and resolution the user selected.
   */
  function getCamera() {
    curResolutions = cameraResolutions.resolutions;
    console.log(curResolutions);
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

  /** getUserMedia functions */

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
    .catch(mediaError);
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
  module.exports.getCurrentCameraName = getCurrentCameraName;
  module.exports.getResolutions = getResolutions;
  module.exports.Camera = Camera;
}());