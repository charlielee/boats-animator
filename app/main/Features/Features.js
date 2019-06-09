(function () {
  const AudioManager = require("../../common/AudioManager/AudioManager");

  const menubar = require("../../ui/MenuBar/MenuBar");
  const Notification = require("../../ui/Notification/Notification");

  const btnCaptureFrame = document.querySelector("#btn-capture-frame");
  const btnDeleteLastFrame = document.querySelector("#btn-delete-last-frame");
  const btnLoop = document.querySelector("#btn-loop");
  const btnPlayPause = document.querySelector("#btn-play-pause");
  const btnFrameNext = document.querySelector("#btn-frame-next");
  const btnFramePrevious = document.querySelector("#btn-frame-previous");
  const btnFrameFirst = document.querySelector("#btn-frame-first");
  const btnFrameLast = document.querySelector("#btn-frame-last");

  class Features {
    static takePicture() {
      btnCaptureFrame.click();
    }

    static undoFrame() {
      btnDeleteLastFrame.click();
    }

    static audioToggle() {
      AudioManager.setEnabled(!AudioManager.getEnabled())
      // Toggle checkbox on related menubar item
      menubar.subMenus.capture.items[2].checked = !menubar.subMenus.capture.items[2].checked;
      Notification.info(`Capture sounds ${AudioManager.getEnabled() ? "enabled" : "disabled"}.`);
    }

    static playPause() {
      btnPlayPause.click();
    }

    static loopPlayback() {
      btnLoop.click();
      // Toggle checkbox on related menubar item
      menubar.subMenus.playback.items[0].checked = !menubar.subMenus.capture.items[0].checked;
    }

    static liveView() {
      btnLiveView.click();
    }

    static firstFrame() {
      btnFrameFirst.click();
    }

    static lastFrame() {
      btnFrameLast.click();
    }

    static nextFrame() {
      btnFrameNext.click();
    }

    static previousFrame() {
      btnFramePrevious.click();
    }

    // Features in confirm prompts.

    static confirmEnter() {
      // Confirm messages
      var btnConfirmOK = document.querySelector(".swal-button--confirm");
      var btnConfirmCancel = document.querySelector(".swal-button--cancel");

      if (document.activeElement === btnConfirmOK) {
        btnConfirmOK.click();
      } else if (document.activeElement === btnConfirmCancel) {
        btnConfirmCancel.click();
      }
    }

    static confirmCancel() {
      var btnConfirmCancel = document.querySelector(".swal-button--cancel");
      btnConfirmCancel.click();
    }
  }
})()