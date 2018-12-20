module.exports = {};

/** A class for managing camera. */
(function () {
  "use strict";
  // Import modules
  var cameraResolutions = require("./camera-resolutions");
  var notification = require("./notification");
  var previewArea = require("./previewArea");

  // The current video stream
  let curStream = null;

  // Get the DOM selectors needed
  let qResoluSelect   = document.querySelector("#form-resolution-select"),
      qCameraSelect   = document.querySelector("#camera-select-td select"),
      statusBarCurRes = document.querySelector("#current-resolution"),
      videoCapture    = document.createElement("video");

  /** Class variables */

  /** Contains a list of all the Camera objects created */
  Camera.list = {};
  /** The last camera selected that successfully connected */
  Camera.successCam = {};

  /**
   * Constructor for a Camera.
   * @param {ConstrainDOMString} id - the camera's MediaTrackConstraints.deviceId.
   * @param {String} name - the user friendly name of the camera
   * @param {MediaTrackConstraints[]} resolutions - an array of MediaTrackConstraints defining each
   *                                                resolution supported by the camera (optional).
   */
  function Camera(id, name, resolutions = {}) {
    this.id = id;
    this.name = name;
    this.curResolution = null;
    this.resolutions = resolutions;
    this.responsive = null;
  }

  /** Instance methods */
  Camera.prototype = {
    constructor: Camera,

    /**
     * Gets the resolutions of a camera and update the select element listing them.
     */
    showResolutions: function () {
      // Display loading window
      previewArea.curWindow.showLoading(`Loading ${this.name}`, true);
      // See if resolutions have already been found
      if (this.resolutions.length > 0) {
        Camera._updateResoluSelect(this.resolutions);
      } else {
        // Find resolutions
        cameraResolutions.get(this.id);
      }
    },

    /**
     * Updates the resolution of a camera.
     * @param {Integer} index - the position in the camera's array of resolutions to update to.
     * @return A video feed with the upload resolution.
     */
    updateResolution: function (index) {
      this.curResolution = index;
      return getCamera(this, this.resolutions[index])
    }
  }

  /** Static methods */

  /**
   * Displays the stream from a video onto another video element.
   * @param {HTMLVideoElement} feed - the source element.
   * @param {HTMLVideoElement} output - the target element.
   */
  Camera.display = function (feed, output) {
    feed.addEventListener("canplay", function () {
      output.src = feed.src;
    });
  }

  /**
   * Get the array index of the user-selected resolution.
   * @return {String} The corresponding key for the equivalent constraint.
   */
  Camera.getSelectedResolution = function () {
    return qResoluSelect.options[qResoluSelect.options.selectedIndex].value;
  }

  /**
   * Get the user-selected Camera.
   * @return {string} The deviceId of the camera the user has selected.
   */
  Camera.getSelectedCamera = function () {
    var camId = qCameraSelect.options[qCameraSelect.options.selectedIndex].value;
    return Camera.list[camId];
  }

  /**
   * Create menu selection options for each resolution in supported
   * @param {MediaTrackConstraints[]} supported - an array of MediaTrackConstraints defining
   *                                              each resolution supported by the camera.
   * */
  Camera._updateResoluSelect = function (supported) {
    qResoluSelect.innerHTML = "";
    supported.forEach(function(res, i) {
      let width = res.video.width.exact,
          height = res.video.height.exact;

      var option = window.document.createElement("option");
      option.text = `${width}x${height}`;
      option.value = `${i}`;
      qResoluSelect.appendChild(option);
    });

    // Get selected camera
    var curCam = Camera.getSelectedCamera();

    // Default select the last chosen or lowest resolution (ie the last one in the list)
    try {
      var index = (curCam.curResolution ? curCam.curResolution : qResoluSelect.options.length - 1);
      qResoluSelect.options[index].selected = true;

      // Get video feed with updated resolution
      var feed = curCam.updateResolution(index);
      // Display this feed in the preview area
      Camera.display(feed, document.querySelector("#preview"));
    } catch (err) {
      notification.error(`${curCam.name} could not be loaded!`);
      document.querySelector("#preview").src = "#";
    } finally {
      previewArea.curWindow.display();
    }
  }

  /**
   * Get the available cameras and updates the camera list.
   */
  Camera.enumerateDevices = function () {
    navigator.mediaDevices.enumerateDevices()
    .then(_findVideoSources)
    .catch(function (error) {
      console.error(error);
    });
  }

  /**
   * Add each video source to the "current camera" menu.
   *
   * @param {Array} sources - @todo.
   */
  function _findVideoSources(sources) {
    // If no camera has been selected yet add "no camera selected option"
    if (qCameraSelect.length == 0) {
      const option = window.document.createElement("option");
      option.text = "No camera selected";
      option.setAttribute("disabled", true);
      option.setAttribute("style", "display: none;");
      option.setAttribute("value", "#");
      qCameraSelect.appendChild(option);
      qCameraSelect.value = "#";
    }

    // Remove all camera select options except "No camera selected"
    var num = qCameraSelect.options.length;
    if (num) {
      while (num-- > 1) {
        qCameraSelect.options.remove(num);
      }
    }

    // Reset check for if current camera is connected
    var isCurCamStillConnected = false;

    // Filter out all non-video streams
    sources = sources.filter(source => source.kind === "videoinput");
    // Add any new devices that have been connected and check for the currently connected camera
    sources.forEach(function(source, i) {
      // Get the proper camera name
      let cameraName = `Camera #${i + 1}`;
      if (source.label) {
        cameraName = source.label.substr(0, source.label.indexOf("(") - 1);
      }

      // Create the menu selection
      const option = window.document.createElement("option");
      option.text = cameraName;
      option.value = source.deviceId;
      qCameraSelect.appendChild(option);

      // Add to camera list if new
      if (!(source.deviceId in Camera.list)) {
        const cam = new Camera(source.deviceId, cameraName);
        Camera.list[source.deviceId] = cam;
        notification.success(`Detected ${cam.name}`);
      }

      // Check if device is the current camera
      if (source.deviceId === Camera.successCam.id) {
        isCurCamStillConnected = true;
      }
    });

    // Switch to "no camera selected" if current success camera is no longer connected
    if (Object.keys(Camera.successCam).length > 0 && !isCurCamStillConnected) {
      notification.info(`${Camera.successCam.name} has been removed`);
      Camera.successCam = {};

      // Switch to "no camera selected"
      qCameraSelect.value = "#";
      // Reset resolution select
      qResoluSelect.innerHTML = "";
    }
  }

  /** getUserMedia functions */

  /**
   * Creates a video element with a source of the camera
   * and resolution the user selected.
   *
   * @param {Camera} cam - the camera object to use.
   * @param {Integer} res - the corresponding key for the equivalent
   *                        constraint in the Camera's resolution object.
   */
  function getCamera(cam, res = null) {
    if (!res) {
      res = cam.curResolution;
    }
    _getMedia(cam.id, res);
    return videoCapture;
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
    .catch(mediaError);
  }

  /**
   * Play hidden video in the correct resolution.
   */
  function mediaSuccessCapture(mediaStream) {
    var curCam = Camera.getSelectedCamera();
    var curRes = qResoluSelect.options[Camera.getSelectedResolution()].innerText;
    // Notify whether this is a new camera connection or a resolution change
    if (Camera.successCam === curCam) {
      notification.success(`${curCam.name} resolution is now ${curRes}`);
    } else {
      notification.success(`${curCam.name} successfully connected`);
      Camera.successCam = curCam;
    }

    // Update resolution in status bar
    statusBarCurRes.innerText = curRes;

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

  /** On load get cameras */
  Camera.enumerateDevices();

  /** Public exports */
  module.exports = Camera;
}());