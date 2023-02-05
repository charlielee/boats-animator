(function () {
  "use strict";
  const { ipcRenderer } = require("electron");
  const AudioManager = require("./AudioManager");
  const ConfirmDialog = require("../ui/ConfirmDialog");
  const Notification = require("../../common/Notification");

  const btnCaptureFrame = document.querySelector("#btn-capture-frame");
  const btnDeleteFrame = document.querySelector("#btn-delete-frame");
  const btnDeleteLastFrame = document.querySelector("#btn-delete-last-frame");
  const btnLoop = document.querySelector("#btn-loop");
  const btnPlayPause = document.querySelector("#btn-play-pause");
  const btnFrameNext = document.querySelector("#btn-frame-next");
  const btnFramePrevious = document.querySelector("#btn-frame-previous");
  const btnFrameFirst = document.querySelector("#btn-frame-first");
  const btnFrameLast = document.querySelector("#btn-frame-last");
  const btnShortPlay = document.querySelector("#btn-short-play");

  const btnDirectoryChange = document.querySelector("#btn-dir-change");

  const btnLiveView = document.querySelector("#btn-live-view");

  /**
   * Common way of executing app functions. Used for keyboard shortcuts and the menubar
   */
  class Features {
    // Window management

    static mainMenu() {
      ipcRenderer.send("win:switch-window", "launcher");
    }

    // Projects

    static openDirChooseDialog() {
      btnDirectoryChange.click();
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

    static conformTake() {
      global.projectInst.currentTake.conformTake();
    }

    static audioToggle() {
      AudioManager.setEnabled(!AudioManager.getEnabled());
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

    static shortPlay() {
      btnShortPlay.click();
    }

    // Preview overlay features

    static toggleGridOverlay() {
      let gridOverlayBtn = document.querySelector(
        ".switch-btn[data-id='gridOverlay']"
      );
      gridOverlayBtn.click();
    }

    static toggleAspectRatioOverlay() {
      let aspectOverlayBtn = document.querySelector(
        ".switch-btn[data-id='aspectRatioMask']"
      );
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
