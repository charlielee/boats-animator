(function () {
  const { BrowserWindow } = require('electron');

  /**
   * Class for managing app windows
   */
  class Win {
    constructor() {
      this.currentWindow = null;
    }

    /**
     * Switches the current window of the app.
     * @param {String} winName The name of the window to switch to
     */
    switchWindow(winName) {
      const originalWindow = this.currentWindow;

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
      this.currentWindow = new BrowserWindow({
        backgroundColor: '#2B2B2B',
        width: 1050,
        height: 715,
        webPreferences: {
          nodeIntegration: true
        }
      });
      this.currentWindow.loadFile('src/animator.html');
      return this.currentWindow;
    }

    /**
     * Loads the launcher window
     */
    loadLauncher() {
      this.currentWindow = new BrowserWindow({
        backgroundColor: '#2B2B2B',
        width: 730,
        height: 540,
        webPreferences: {
          nodeIntegration: true
        }
      });
      this.currentWindow.loadFile('src/launcher.html');
      return this.currentWindow;
    }
  }

  module.exports = Win;
})();