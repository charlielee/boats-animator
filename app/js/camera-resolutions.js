module.exports = {};

(function() {
    "use strict";
    let logging     = false,
        cameraId    = null,
        curTestId   = 0,
        curStream   = null,
        supported   = [],
        videoStream = window.document.createElement("video");

    const camera = require("./camera"),
          notification = require("./notification"),
          previewArea = require("./previewArea");

    const preview = document.querySelector("#preview"),
          qResoluSelect = document.querySelector("#form-resolution-select");

    // Define the resolutions to scan for
    const resolutions = [
        {
            width : 3840,
            height: 2160
        },
        {
            width: 1920,
            height: 1080
        },
        {
            width: 1600,
            height: 1200
        },
        {
            width: 1280,
            height: 720
        },
        {
            width: 800,
            height: 600
        },
        {
            width: 640,
            height: 480
        },
        {
            width: 640,
            height: 360
        }
    ];

    function makeConstraints(resObj) {
        // console.info(`${resObj.width}x${resObj.height}`);
        return {
          audio: false,
          video: {
            deviceId: {exact: cameraId},
            width: {exact: resObj.width},
            height: {exact: resObj.height}
          }
        };
    }

    function playStream(testId) {
        let candidate = resolutions[testId];

        function onSuccess(stream) {
          curStream = stream;
          videoStream.width = candidate.width;
          videoStream.height = candidate.height;
          videoStream.src = window.URL.createObjectURL(stream);
          videoStream.play();
        }

        function onError(err) {
            if (logging) {
                console.error("Resolution not supported!");
                console.error(err);
            }
            runNextTest();
        }

        // Create the constraints
        let constraints = makeConstraints(candidate);
        if (logging) {
            console.log(`Testing camera ${cameraId.slice(0, 10)} for ${candidate.width}x${candidate.height} support`);
        }

        // Load the stream and display it
        navigator.mediaDevices.getUserMedia(constraints)
        .then(onSuccess)
        .catch(onError);
    }

    function getCameraResolutions(camId, debug) {;
      // Reset previous testing
      curTestId = 0;
      supported = [];

      // Clear previous resolutions list
      while (qResoluSelect.lastChild) {
        qResoluSelect.removeChild(qResoluSelect.lastChild);
      }

      cameraId = camId;
      logging = debug || false;
      playStream(curTestId);
    }

    function runNextTest() {
        // Run the next test if there is one
        if (curTestId + 1 < resolutions.length) {
            curTestId++;
            playStream(curTestId);
        } else {
          // Push avaliable resolutions when testing is complete
          module.exports.resolutions = supported;


          camera.Camera.list[cameraId].resolutions = supported;
        //   previewArea.curWindow.display();
          camera.Camera._updateResoluSelect(supported);
        //   _updateResoluSelect();

        //   // Update the preview area
        //   let cam = camera.get();
        //   cam.addEventListener("canplay", function() {
        //     if (preview.classList.contains("hidden")) {
        //       preview.classList.remove("hidden");
        //     }
        //     preview.src = cam.src;
        //   });

          console.log("OUTPUT:", supported);
        }
    }

    // Create menu selection options for each resolution in supported
    // function _updateResoluSelect() {
    //   let i = 0;
    //   supported.forEach(function(res) {
    //     let width = res.video.width.exact,
    //         height = res.video.height.exact;

    //     var option = window.document.createElement("option");
    //     option.text = `${width}x${height}`;
    //     option.value = i;
    //     qResoluSelect.appendChild(option);
    //     i++;
    //   });

    //   // Default select the last resolution (ie the lowest one)
    //   try {
    //     qResoluSelect.options[qResoluSelect.options.length - 1].selected = true;
    //   } catch (err) {
    //     notification.error(`${camera.getCurrentCameraName()} could not be loaded!`);
    //     previewArea.curWindow.display();
    //   }
    // }

    videoStream.addEventListener("canplay", function() {
        let candidate = resolutions[curTestId];

        if ((videoStream.videoWidth === candidate.width) && (videoStream.videoHeight === candidate.height)) {
          supported.push(makeConstraints(resolutions[curTestId]));

          // Stop the camera from streaming
          if (curStream) {
            let curTrack = curStream.getVideoTracks()[0];
            curTrack.stop();
          }
            // console.log("Is supported");
        } /*else {
            console.log("Not supported");
        } */

        // console.log(supported);

        // Run the next test
        runNextTest();
    });

    module.exports.get = getCameraResolutions;
}());
