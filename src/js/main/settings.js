(function () {
  const { BrowserWindow, dialog } = require('electron');
  const Store = require('electron-store');
  // const appVersion =  require('../../package').version;

  /**
   * Managing app global settings
   */
  class Settings {
    constructor() {
      this.store = new Store({
        name: 'settings',
        schema: {
          // Default project settings
          'projectDefaults': {
            type: 'object',
            properties: {
              'exportFrameDir': {
                type: 'string'
              },
              'exportVideoDir': {
                type: 'string'
              }
            }
          },

          // App windows
          'windows': {
            type: 'object',
            properties: {
              // Animator window
              'animator': {
                type: 'object',
                properties: {
                  // Last maximize status of the window
                  'isMaximized': {
                    type: 'boolean',
                    default: false
                  },
                  // Last dimensions of the window
                  'winBounds': {
                    type: 'object',
                    properties: {
                      'x': {
                        type: 'number'
                      },
                      'y': {
                        type: 'number'
                      },
                      'width': {
                        type: 'number'
                      },
                      'height': {
                        type: 'number'
                      }
                    }
                  }
                }
              }
            }
          }
        }
        // },
        // migrations: {
        //   '0.10.0': store => {
        //     store.set('version', appVersion);
        //   }
        // }
      });
    }

    /**
     * Returns a single setting
     * @param {String} key The name of the setting to return
     */
    get(key) {
      return this.store.get(key);
    }

    /**
     * Updates a single setting
     * @param {String} key The name of the setting to update
     * @param {String} value The value to update the setting to
     */
    set(key, value) {
      this.store.set(key, value);
    }

    /**
     * Opens the export frame directory dialog.
     * @returns {String} The selected dir path, or the previous dir if the dialog is "cancelled"
     *                   "null" is return if this fallback fails
     */
    async showExportFrameDirDialog() {
      let win = BrowserWindow.getFocusedWindow();
      let curDir = this.get("projectDefaults.exportFrameDir");

      let result = await dialog.showOpenDialog(win, {
        title: "Select a directory to save captured frames",
        defaultPath: curDir,
        properties: ["openDirectory", "createDirectory"]
      });

      if (!result.canceled && result.filePaths[0]) {
        this.set("projectDefaults.exportFrameDir", result.filePaths[0]);
        return result.filePaths[0];
      } else {
        // Return the current export dir if a new one isn't set
        return curDir;
      }
    }

    showExportVideoDirDialog() {
      // TODO
      const options = {
        title: "Select a directory to save the exported video file",
        // defaultPath: 
        properties: ["openDirectory", "createDirectory"]
      };
    }
  }

  module.exports = Settings;
})();