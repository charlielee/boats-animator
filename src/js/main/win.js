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
        show: false,
        webPreferences: {
          nodeIntegration: true
        }
      };
      let animatorWin = new BrowserWindow(options);
      animatorWin.loadFile('src/animator.html');

      // Load last dimensions of the window
      if (settings.get('windows.animator.isMaximized')) {
        animatorWin.maximize();
      } else {
        Object.assign(options, settings.get('windows.animator.winBounds'));
      }

      animatorWin.once('ready-to-show', () => {
        animatorWin.show();
      });

      // Store window dimensions on close
      animatorWin.on('close', () => {
        settings.set('windows.animator.isMaximized', animatorWin.isMaximized());
        settings.set('windows.animator.winBounds', animatorWin.getBounds());
      });
    }

    /**
     * Loads the launcher window
     */
    loadLauncher() {
      let launcherWin = new BrowserWindow({
        backgroundColor: '#2B2B2B',
        width: 730,
        height: 540,
        show: false,
        webPreferences: {
          nodeIntegration: true
        }
      });
      launcherWin.loadFile('src/launcher.html');

      launcherWin.once('ready-to-show', () => {
        launcherWin.show();
      });
    }
  }

  module.exports = Win;
})();