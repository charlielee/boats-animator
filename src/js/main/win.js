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
    }

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
          enableRemoteModule: true,
          nodeIntegration: true
        }
      };

      // Load last dimensions of the window
      if (!settings.get('windows.animator.isMaximized')) {
        Object.assign(options, settings.get('windows.animator.winBounds'));
      }

      let animatorWin = new BrowserWindow(options);
      animatorWin.loadFile('src/animator.html');

      // Restore maximization status
      if (!settings.get('windows.animator.isMaximized')) {
        animatorWin.maximize();
      }

      // Delay opening the window
      animatorWin.once('ready-to-show', () => {
        animatorWin.show();
      });

      // Display warning prompt when closing the window
      animatorWin.on('close', (e) => {
        let choice = dialog.showMessageBoxSync(animatorWin,
          {
            type: 'question',
            buttons: ['OK', 'Cancel'],
            title: 'Boats Animator',
            message: 'Are you sure you want to exit Boats Animator?'
         });

        if (choice === 1){
          e.preventDefault();
        } else {
          // Store window dimensions on close
          settings.set('windows.animator.isMaximized', animatorWin.isMaximized());
          settings.set('windows.animator.winBounds', animatorWin.getBounds());
        }
      });

      // Notify the renderer process when menu bar items are clicked
      this.menuBar.eventEmitter.on("menubar:click", function (menuItemName) {
        animatorWin.webContents.send('menubar:click', menuItemName);
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