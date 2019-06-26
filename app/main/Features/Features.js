(function() {
  "use strict";
  const AudioManager = require("../../common/AudioManager/AudioManager");
  const ConfirmDialog = require("../../common/ConfirmDialog/ConfirmDialog");

  const WindowManager = require("../../ui/WindowManager/WindowManager");

  const btnCaptureFrame = document.querySelector("#btn-capture-frame");
  const btnDeleteFrame = document.querySelector("#btn-delete-frame");
  const btnDeleteLastFrame = document.querySelector("#btn-delete-last-frame");
  const btnLoop = document.querySelector("#btn-loop");
  const btnPlayPause = document.querySelector("#btn-play-pause");
  const btnFrameNext = document.querySelector("#btn-frame-next");
  const btnFramePrevious = document.querySelector("#btn-frame-previous");
  const btnFrameFirst = document.querySelector("#btn-frame-first");
  const btnFrameLast = document.querySelector("#btn-frame-last");

  const btnLiveView = document.querySelector("#btn-live-view");

  class Features {
    // File menu

    static mainMenu() {
      ConfirmDialog.confirmSet({ text: "Returning to the menu will cause any unsaved work to be lost!" })
        .then((response) => {
          if (response) {
            WindowManager.openIndex();
          }
        });
    }

    static exitApp() {
      ConfirmDialog.confirmSet({ text: "Are you sure you want to exit Boats Animator?" })
        .then((response) => {
          if (response) {
            WindowManager.closeAnimator();
          }
        });
    }

    // Main program features

    static takePicture() {
      btnCaptureFrame.click();
    }

    static undoFrame() {
      btnDeleteLastFrame.click();
    }

    static deleteCurSelectedFrame() {
      btnDeleteFrame.click();
    }

    static confirmTake() {
      global.projectInst.currentTake.confirmTake();
    }

    static audioToggle() {
      AudioManager.setEnabled(!AudioManager.getEnabled())
    }

    static playPause() {
      btnPlayPause.click();
    }

    static loopPlayback() {
      btnLoop.click();
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

    // Preview overlay features

    static toggleGridOverlay() {
      let gridOverlayBtn = document.querySelector(".grid-overlay-toggle-btn[data-id='gridOverlay']");
      gridOverlayBtn.click();
    }

    static toggleAspectRatioOverlay() {
      let aspectOverlayBtn = document.querySelector(".grid-overlay-toggle-btn[data-id='aspectRatioMask']");
      aspectOverlayBtn.click();
    }

    // Features in confirm prompts

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

  module.exports = Features;
})();