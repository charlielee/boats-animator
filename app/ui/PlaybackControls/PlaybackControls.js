(function() {
  "use strict";
  const btnStop = document.querySelector("#btn-stop");
  const btnLoop = document.querySelector("#btn-loop");
  const btnPlayPause = document.querySelector("#btn-play-pause");
  const btnFrameNext = document.querySelector("#btn-frame-next");
  const btnFramePrevious = document.querySelector("#btn-frame-previous");
  const btnFrameFirst = document.querySelector("#btn-frame-first");
  const btnFrameLast = document.querySelector("#btn-frame-last");

  class PlaybackControls {
    static setListeners(playback) {
      let takeInst = playback.project.getCurrentTake();


      // Toggle preview looping
      btnLoop.addEventListener("click", function() {
        playback.toggleVideoLoop();
      });

      // Play/pause the preview
      btnPlayPause.addEventListener("click", function() {
        if (takeInst.getTotalFrames() > 0) {
          if (playback.isPlaying) {
            playback.videoPause();
          } else {
            playback.previewCapturedFrames();
          }
          // (playback.isPlaying ? playback.videoPause : playback.previewCapturedFrames)();
        }
      });

      // Stop the preview
      btnStop.addEventListener("click", function() {
        if (playback.project.getCurrentMode() === "playback") {
          playback.videoStop();
        }
      });

      // Preview one frame to the right on framereel
      btnFrameNext.addEventListener("click", function() {
        if (takeInst.frameReel.curSelectedFrame) {
          if (takeInst.frameReel.curSelectedFrame !== takeInst.getTotalFrames()) {
            playback._displayFrame(takeInst.frameReel.curSelectedFrame + 1);
          } else {
            playback.project.setCurrentMode("capture");
          }
        }
      });

      // Preview one frame to the left on framereel
      btnFramePrevious.addEventListener("click", function() {
        if (takeInst.frameReel.curSelectedFrame > 1) {
          playback._displayFrame(takeInst.frameReel.curSelectedFrame - 1);
        } else if (playback.project.getCurrentMode() === "capture" && takeInst.getTotalFrames()) {
          playback.project.setCurrentMode("playback");
          playback._displayFrame(takeInst.getTotalFrames());
        }
      });

      // Preview first frame on framereel
      btnFrameFirst.addEventListener("click", function() {
        if (playback.project.getCurrentMode() === "capture" && takeInst.getTotalFrames()) {
          playback.project.setCurrentMode("playback");
        }
        playback._displayFrame(1);
      });

      // Preview last frame on framereel
      btnFrameLast.addEventListener("click", function() {
        if (takeInst.frameReel.curSelectedFrame) {
          (takeInst.frameReel.curSelectedFrame !== takeInst.getTotalFrames() ? playback.videoStop() : playback.project.setCurrentMode("capture"));
        }
      });
    }
  }

  module.exports = PlaybackControls;
})();