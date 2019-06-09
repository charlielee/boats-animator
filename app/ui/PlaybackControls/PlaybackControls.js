const btnStop = document.querySelector("#btn-stop");
const btnLoop = document.querySelector("#btn-loop");
const btnPlayPause = document.querySelector("#btn-play-pause");
const btnFrameNext = document.querySelector("#btn-frame-next");
const btnFramePrevious = document.querySelector("#btn-frame-previous");
const btnFrameFirst = document.querySelector("#btn-frame-first");
const btnFrameLast = document.querySelector("#btn-frame-last");

class PlaybackControls {
  static setListeners(playback) {
    // Toggle preview looping
    btnLoop.addEventListener("click", _toggleVideoLoop);

    // Play/pause the preview
    btnPlayPause.addEventListener("click", function () {
      if (takeInst.getTotalFrames() > 0) {
        (isPlaying ? videoPause : previewCapturedFrames)();
      }
    });

    // Stop the preview
    btnStop.addEventListener("click", function () {
      if (PreviewArea.curWindow === PlaybackWindow) {
        videoStop();
      }
    });

    // Preview one frame to the right on framereel
    btnFrameNext.addEventListener("click", function () {
      if (takeInst.frameReel.curSelectedFrame) {
        if (takeInst.frameReel.curSelectedFrame !== takeInst.getTotalFrames()) {
          _displayFrame(takeInst.frameReel.curSelectedFrame + 1);
        } else {
          playback.project.setCurrentMode("capture");
        }
      }
    });

    // Preview one frame to the left on framereel
    btnFramePrevious.addEventListener("click", function () {
      if (takeInst.frameReel.curSelectedFrame > 1) {
        _displayFrame(takeInst.frameReel.curSelectedFrame - 1);
      } else if (PreviewArea.curWindow === CaptureWindow && takeInst.getTotalFrames()) {
        playback.project.setCurrentMode("playback");
        _displayFrame(takeInst.getTotalFrames());
      }
    });

    // Preview first frame on framereel
    btnFrameFirst.addEventListener("click", function () {
      if (PreviewArea.curWindow === CaptureWindow && takeInst.getTotalFrames()) {
        playback.project.setCurrentMode("playback");
      }
      _displayFrame(1);
    });

    // Preview last frame on framereel
    btnFrameLast.addEventListener("click", function () {
      if (takeInst.frameReel.curSelectedFrame) {
        (takeInst.frameReel.curSelectedFrame !== takeInst.getTotalFrames() ? videoStop() : playback.project.setCurrentMode("capture"));
      }
    });
  }
}