(function () {
  const { BrowserWindow } = require('electron');
  const settings = new (require('./settings'));

  /**
   * Class for managing app windows
   */
  class Win {
    /**
     * Switches the current window of the app.
     * @param {String} winName The name of the window to switch to
     */
    switchWindow(winName) {
      const originalWindow = BrowserWindow.getFocusedWindow();

      switch (winName) {
        case 'animator':
          this.loadAnimator();
          break;
        case 'launcher':
          this.loadLauncher();
          break;
      }

      originalWindow.close();
    }

    /**
     * Loads the animator window
     */
    loadAnimator() {
      let options = {
        backgroundColor: '#2B2B2B',
        width: 1050,
        height: 715,
        webPreferences: {
          nodeIntegration: true
        }
      };

      // Load last dimensions of the window
      Object.assign(options, settings.get("windows.animator.winBounds"));

      let animatorWin = new BrowserWindow(options);
      animatorWin.loadFile('src/animator.html');

      // Maximise the window if set
      if (settings.get("windows.animator.isMaximized")) {
        animatorWin.maximize();
      }

      // Store window dimensions on close
      animatorWin.on('close', () => {
        settings.set("windows.animator.isMaximized", animatorWin.isMaximized());
        settings.set("windows.animator.winBounds", animatorWin.getBounds());
      });

      return animatorWin;
    }

    /**
     * Loads the launcher window
     */
    loadLauncher() {
      let launcherWin = new BrowserWindow({
        backgroundColor: '#2B2B2B',
        width: 730,
        height: 540,
        webPreferences: {
          nodeIntegration: true
        }
      });
      launcherWin.loadFile('src/launcher.html');
      return launcherWin;
    }
  }

  module.exports = Win;
})();