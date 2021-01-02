(function () {
  const { BrowserWindow, dialog, systemPreferences } = require("electron");
  const Store = require("electron-store");

  /**
   * Managing app global settings
   */
  class Settings {
    constructor() {
      this.store = new Store({
        name: "settings",
        schema: {
          // Default project settings
          "projectDefaults": {
            type: "object",
            properties: {
              "exportFrameDir": {
                type: "string"
              }
            }
          },

          // App windows
          "windows": {
            type: "object",
            properties: {
              // Animator window
              "animator": {
                type: "object",
                properties: {
                  // Last maximize status of the window
                  "isMaximized": {
                    type: "boolean",
                    default: false
                  },
                  // Last dimensions of the window
                  "winBounds": {
                    type: "object",
                    properties: {
                      "x": {
                        type: "number"
                      },
                      "y": {
                        type: "number"
                      },
                      "width": {
                        type: "number"
                      },
                      "height": {
                        type: "number"
                      }
                    }
                  }
                }
              }
            }
          }
        }
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
     * Displays the system dialog requesting camera access if the app doesn't already have it
     * (mostly applicable to macOS)
     * @returns {Boolean} Returns true if access is granted, false if it is denied
     */
    async checkForCameraAccess() {
      let currentStatus = systemPreferences.getMediaAccessStatus("camera");

      if (currentStatus === "granted") {
        return true;
      } else {
        let requestAccess = await systemPreferences.askForMediaAccess("camera");
        return requestAccess;
      }
    }

    /**
     * Loads a generic confirm dialog box
     * @param {String} message The text to display in the dialog box
     * @returns {Boolean} Returns true if OK is pressed, false if cancelled
     */
    showConfirmDialog(message) {
      let win = BrowserWindow.getFocusedWindow();
      let choice = dialog.showMessageBoxSync(win,
        {
          buttons: ["OK", "Cancel"],
          title: "Boats Animator",
          message: message
        });

      return choice === 0;
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
        // Title for macOS
        message: "Select a directory to save captured frames",
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

    /**
     * Opens the export video file path dialog.
     * @param {String} curFilePath The initial file path to display in the dialog
     * @returns {String} The selected file path, the previous file path is used if the dialog is "cancelled"
     */
    async showExportVideoFilePathDialog(curFilePath) {
      let win = BrowserWindow.getFocusedWindow();

      let result = await dialog.showSaveDialog(win, {
        title: "Select the location to save the exported video file",
        // Title for macOS
        message: "Select the location to save the exported video file",
        defaultPath: curFilePath,
        properties: ["createDirectory", "showOverwriteConfirmation"]
      });

      if (!result.canceled && result.filePath) {
        return result.filePath;
      } else {
        // Return the current export dir if a new one isn't set
        return curFilePath;
      }
    }
  }

  module.exports = Settings;
})();