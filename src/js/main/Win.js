(function () {
  const { BrowserWindow, dialog, screen } = require("electron");
  const settings = new (require("./Settings"))();
  const MenuBar = require("./MenuBar");

  /**
   * Class for managing app windows
   */
  class Win {
    constructor() {
      let self = this;

      this.menuBar = new MenuBar();
      this.menuBar.load();

      // Notify the renderer process when menu bar items are clicked
      this.menuBar.eventEmitter.on("menubar:click", (menuItemName) => {
        let currentWindow =
          BrowserWindow.getFocusedWindow() || BrowserWindow.getAllWindows()[0];

        // Ensure current window is visible
        if (currentWindow && !currentWindow.isVisible()) {
          currentWindow.restore();
        }

        // Open the launcher if the app is open but there are no windows open (only possible on macOS)
        if (!currentWindow) {
          self.loadLauncher();
        }

        currentWindow.webContents.send("menubar:click", menuItemName);
      });
    }

    /**
     * Switches the current window of the app.
     * @param {String} winName The name of the window to switch to
     */
    switchWindow(winName) {
      const originalWindow =
        BrowserWindow.getFocusedWindow() || BrowserWindow.getAllWindows()[0];

      switch (winName) {
        case "animator": {
          this.loadAnimator();
          originalWindow.destroy();
          break;
        }
        case "launcher": {
          if (this.confirmCloseAnimator(originalWindow)) {
            this.loadLauncher();
            originalWindow.destroy();
          }
          break;
        }
      }
    }

    /**
     * Loads the animator window
     */
    loadAnimator() {
      let self = this;
      let options = {
        backgroundColor: "#2b2b2b",
        height: 715,
        minHeight: 400,
        minWidth: 640,
        show: true,
        title: "Boats Animator",
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
        },
        width: 1050,
      };

      // Load last dimensions of the window
      Object.assign(options, self.restoreAnimatorWindowSize());

      let animatorWin = new BrowserWindow(options);
      animatorWin.loadFile("src/animator.html");

      animatorWin.setMenuBarVisibility(true);
      this.menuBar.toggleAnimatorItems(true);

      // Restore maximization status
      if (settings.get("windows.animator.isMaximized")) {
        animatorWin.maximize();
      }

      // Display warning prompt when closing the window
      animatorWin.on("close", (e) => {
        let confirmClose = self.confirmCloseAnimator(animatorWin);

        if (!confirmClose) {
          e.preventDefault();
        }
      });

      // Disable menu items on minimise
      let reenableMenuItemsAfterMinimize = false;
      animatorWin.on("minimize", () => {
        if (this.menuBar.animatorItemsEnabled) {
          this.menuBar.toggleAnimatorItems(false);
          reenableMenuItemsAfterMinimize = true;
        }
      });

      // Enable menu items on restore
      animatorWin.on("restore", () => {
        if (reenableMenuItemsAfterMinimize) {
          this.menuBar.toggleAnimatorItems(true);
          reenableMenuItemsAfterMinimize = false;
        }
      });
    }

    /**
     * Loads the launcher window
     */
    loadLauncher() {
      let launcherWin = new BrowserWindow({
        backgroundColor: "#2b2b2b",
        height: 540,
        minHeight: 400,
        minWidth: 640,
        show: true,
        title: "Boats Animator",
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
        },
        width: 730,
      });

      launcherWin.loadFile("src/launcher.html");

      // Hides the menubar (Windows/Linux only) and disables menu items
      launcherWin.setMenuBarVisibility(false);
      this.menuBar.toggleAnimatorItems(false);
    }

    /**
     * Display confirm prompt when closing the window
     * @param {BrowserWindow} animatorWin The Animator window
     */
    confirmCloseAnimator(animatorWin) {
      let choice = dialog.showMessageBoxSync(animatorWin, {
        type: "question",
        buttons: ["OK", "Cancel"],
        title: "Boats Animator",
        message: "Are you sure you want to exit Boats Animator?",
      });

      if (choice === 0) {
        // Store window dimensions on close
        settings.set("windows.animator.isMaximized", animatorWin.isMaximized());
        settings.set(
          "windows.animator.winBounds",
          animatorWin.getNormalBounds()
        );

        return true;
      } else {
        return false;
      }
    }

    /**
     * Returns the previous the size of the animator window if it will fit on screen
     * @returns {Rectangle|Object} Returns a "rectangle" object with the previous x, y, width and height bounds
     *                             or a blank object.
     */
    restoreAnimatorWindowSize() {
      // Size of the current display
      let displayWorkAreaSize = screen.getPrimaryDisplay().workAreaSize;

      // Previous dimensions of the animator window
      let appBounds = Object.assign(
        {},
        settings.get("windows.animator.winBounds")
      );

      // Check the window will fit in the x and y dimensions
      // +10 is to allow for a small amount of leeway
      let doesXFit =
        displayWorkAreaSize["width"] + 10 >=
        appBounds["x"] + appBounds["width"];
      let doesYFit =
        displayWorkAreaSize["height"] + 10 >=
        appBounds["y"] + appBounds["height"];

      if (doesXFit && doesYFit) {
        return appBounds;
      } else {
        return {};
      }
    }
  }

  module.exports = Win;
})();
