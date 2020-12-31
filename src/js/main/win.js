(function () {
  const { BrowserWindow, dialog } = require('electron');
  const settings = new (require('./settings'));
  const MenuBar = require('./MenuBar');

  /**
   * Class for managing app windows
   */
  class Win {
    constructor() {
      this.menuBar = new MenuBar();
      this.menuBar.load();

      // Notify the renderer process when menu bar items are clicked
      this.menuBar.eventEmitter.on("menubar:click", (menuItemName) => {
        BrowserWindow.getFocusedWindow().webContents.send('menubar:click', menuItemName);
      });
    }

    /**
     * Switches the current window of the app.
     * @param {String} winName The name of the window to switch to
     */
    switchWindow(winName) {
      const originalWindow = BrowserWindow.getFocusedWindow();

      switch (winName) {
        case 'animator': {
          this.loadAnimator();
          originalWindow.destroy();
          break;
        }
        case 'launcher': {
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
        backgroundColor: '#2B2B2B',
        height: 715,
        minHeight: 400,
        minWidth: 640,
        show: true,
        title: "Boats Animator",
        webPreferences: {
          nodeIntegration: true
        },
        width: 1050
      };

      // Load last dimensions of the window
      if (!settings.get('windows.animator.isMaximized')) {
        Object.assign(options, settings.get('windows.animator.winBounds'));
      }

      let animatorWin = new BrowserWindow(options);
      animatorWin.loadFile('src/animator.html');

      animatorWin.setMenuBarVisibility(true);
      this.menuBar.toggleAnimatorItems(true);

      // Restore maximization status
      if (!settings.get('windows.animator.isMaximized')) {
        animatorWin.maximize();
      }

      // Display warning prompt when closing the window
      animatorWin.on('close', (e) => {
        let confirmClose = self.confirmCloseAnimator(animatorWin);

        if (!confirmClose) {
          e.preventDefault();
        }
      });
    }

    /**
     * Loads the launcher window
     */
    loadLauncher() {
      let launcherWin = new BrowserWindow({
        backgroundColor: '#2B2B2B',
        height: 540,
        minHeight: 400,
        minWidth: 640,
        show: true,
        title: "Boats Animator",
        webPreferences: {
          nodeIntegration: true
        },
        width: 730
      });

      launcherWin.loadFile('src/launcher.html');

      // Hides the menubar (Windows/Linux only) and disables menu items
      launcherWin.setMenuBarVisibility(false);
      this.menuBar.toggleAnimatorItems(false);
    }

    /**
     * Display confirm prompt when closing the window
     * @param {BrowserWindow} animatorWin The Animator window
     */
    confirmCloseAnimator(animatorWin) {
      let choice = dialog.showMessageBoxSync(animatorWin,
        {
          type: 'question',
          buttons: ['OK', 'Cancel'],
          title: 'Boats Animator',
          message: 'Are you sure you want to exit Boats Animator?'
        });

      if (choice === 0) {
        // Store window dimensions on close
        settings.set('windows.animator.isMaximized', animatorWin.isMaximized());
        settings.set('windows.animator.winBounds', animatorWin.getBounds());

        return true;
      } else {
        return false;
      }
    }
  }

  module.exports = Win;
})();