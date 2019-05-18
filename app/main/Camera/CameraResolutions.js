module.exports = {};

(function() {
    "use strict";
    let logging     = false,
        cameraId    = null,
        curTestId   = 0,
        curStream   = null,
        supported   = [],
        videoStream = window.document.createElement("video");

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
          videoStream.srcObject = stream;
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
          // Push available resolutions when testing is complete
          const Camera = require("./Camera");
          Camera.list[cameraId].resolutions = supported;
          Camera._updateResoluSelect(supported);
          console.log("Supported resolutions:", supported);
        }
    }

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
