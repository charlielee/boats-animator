(function () {
  const ConfirmDialog = require("../../common/ConfirmDialog/ConfirmDialog");

  // NW.js window
  const win = nw.Window.get();

  class WindowManager {
    static setListeners() {
      // Maximise window
      win.maximize();

      /**
       * Confirm prompt when animator is closed.
       */
      win.on("close", function () {
        "use strict";
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
      "use strict";
      nw.Window.open("app/index.html", {
        position: "center",
        width: 730,
        height: 450,
        min_width: 730,
        min_height: 450,
        icon: "icons/icon.png"
      }, function (newWin) {
        win.close(true);
      });
    }

    /**
     * Occurs when "Main Menu" is pressed
     */
    static openAbout() {
      "use strict";
      nw.Window.open("app/about.html", {
        position: "center",
        width: 650,
        height: 300,
        icon: "icons/icon.png",
        resizable: false,
      });
    }

    static closeAnimator() {
      "use strict";
      win.close(true);
      nw.App.closeAllWindows();
    }
  }

  module.exports = WindowManager;
}());