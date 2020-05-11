(function() {
  "use strict";
  const ConfirmDialog = require("../../common/ConfirmDialog/ConfirmDialog");

  // NW.js window
  const win = nw.Window.get();

  class WindowManager {
    static setListeners() {
      
      /**
       * Confirm prompt when animator is closed.
       */
      win.on("close", function() {
        ConfirmDialog.confirmSet({ text: "Are you sure you want to exit Boats Animator?" })
          .then((response) => {
            if (response) {
              WindowManager.closeAnimator();
            }
          });
      });
    }

    /**
   * Occurs when "Main Menu" is pressed
   */
    static openIndex() {
      nw.Window.open("app/index.html", {
        position: "center",
        width: 730,
        height: 450,
        min_width: 730,
        min_height: 450,
        icon: "icons/icon.png"
      }, function(newWin) {
        win.close(true);
      });
    }

    static closeAnimator() {
      win.close(true);
      nw.App.closeAllWindows();
    }
  }

  module.exports = WindowManager;
}());