(function() {
  "use strict";
  const btnStop = document.querySelector("#btn-stop");
  const btnLoop = document.querySelector("#btn-loop");
  const btnPlayPause = document.querySelector("#btn-play-pause");
  const btnFrameNext = document.querySelector("#btn-frame-next");
  const btnFramePrevious = document.querySelector("#btn-frame-previous");
  const btnFrameFirst = document.querySelector("#btn-frame-first");
  const btnShortPlay = document.querySelector("#btn-short-play");
  const btnFrameLast = document.querySelector("#btn-frame-last");

  class PlaybackControls {
    static setListeners() {
      let takeInst = global.projectInst.currentTake;


      // Toggle preview looping
      btnLoop.addEventListener("click", function() {
        global.projectInst.playback.toggleVideoLoop();
      });

      // Short Play
      btnShortPlay.addEventListener("click", function() {
        global.projectInst.playback.shortPlay();
      })

      // Play/pause the preview
      btnPlayPause.addEventListener("click", function() {
        if (takeInst.getTotalFrames() > 0) {
          if (global.projectInst.playback.isPlaying) {
            global.projectInst.playback.videoPause();
          } else {
            global.projectInst.playback.previewCapturedFrames();
          }
          // (global.projectInst.playback.isPlaying ? global.projectInst.playback.videoPause : global.projectInst.playback.previewCapturedFrames)();
        }
      });

      // Stop the preview
      btnStop.addEventListener("click", function() {
        if (global.projectInst.getCurrentMode() === "playback") {
          global.projectInst.playback.videoStop();
        }
      });

      // Preview one frame to the right on framereel
      btnFrameNext.addEventListener("click", function() {
        if (takeInst.frameReel.curSelectedFrame) {
          if (takeInst.frameReel.curSelectedFrame !== takeInst.getTotalFrames()) {
            global.projectInst.playback._displayFrame(takeInst.frameReel.curSelectedFrame + 1);
          } else {
            global.projectInst.setCurrentMode("capture");
          }
        }
      });

      // Preview one frame to the left on framereel
      btnFramePrevious.addEventListener("click", function() {
        if (takeInst.frameReel.curSelectedFrame > 1) {
          global.projectInst.playback._displayFrame(takeInst.frameReel.curSelectedFrame - 1);
        } else if (global.projectInst.getCurrentMode() === "capture" && takeInst.getTotalFrames()) {
          global.projectInst.setCurrentMode("playback");
          global.projectInst.playback._displayFrame(takeInst.getTotalFrames());
        }
      });

      // Preview first frame on framereel
      btnFrameFirst.addEventListener("click", function() {
        if (global.projectInst.getCurrentMode() === "capture" && takeInst.getTotalFrames()) {
          global.projectInst.setCurrentMode("playback");
        }
        global.projectInst.playback._displayFrame(1);
      });

      // Preview last frame on framereel
      btnFrameLast.addEventListener("click", function() {
        if (takeInst.frameReel.curSelectedFrame) {
          (takeInst.frameReel.curSelectedFrame !== takeInst.getTotalFrames() ? global.projectInst.playback.videoStop() : global.projectInst.setCurrentMode("capture"));
        }
      });
    }
  }

  module.exports = PlaybackControls;
})();