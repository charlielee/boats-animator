module.exports = {};

(function() {
    "use strict";
    let logging     = false,
        cameraId    = null,
        curTestId   = 0,
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
        console.info(`${resObj.width}x${resObj.height}`);
        return {
          audio: false,
          video: {
              mandatory: {
                  sourceId: cameraId,
                  minWidth: resObj.width,
                  minHeight: resObj.height,
                  maxWidth: resObj.width,
                  maxHeight: resObj.height
              }
          }
        };
    }

    function playStream(testId) {
        let candidate = resolutions[testId];

        function onSuccess(stream) {
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
        window.navigator.getUserMedia = window.navigator.getUserMedia || window.navigator.webkitGetUserMedia;
        window.navigator.getUserMedia(constraints, onSuccess, onError);
    }

    function getCameraResolutions(camId, debug) {
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
            module.exports.resolutions = supported;
        }
    }

    videoStream.addEventListener("canplay", function() {
        let candidate = resolutions[curTestId];

        if ((videoStream.videoWidth === candidate.width) && (videoStream.videoHeight === candidate.height)) {
            supported.push(makeConstraints(resolutions[curTestId]));
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
