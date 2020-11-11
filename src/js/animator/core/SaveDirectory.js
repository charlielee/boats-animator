(function() {
  "use strict";
  // Library imports
  const fs = require("fs");
  const mkdirp = require("mkdirp");

  // UI imports
  var Notification = require("../../ui/Notification/Notification");

  // Common imports
  const ConfirmDialog = require("../../common/ConfirmDialog/ConfirmDialog");

  // Class variables
  const SAVE_DIRECTORY_KEY = "ba-save-dir";

  var curDirDisplay = document.querySelector("#currentDirectoryName");
  var dirChooseDialog = document.querySelector("#chooseDirectory");
  var btnDirectoryChange = document.querySelector("aside #btn-dir-change");

  class SaveDirectory {
    /**
     * Constructor.
     * @param {String} saveDirlocation The path of the folder to save the Project to.
     */
    constructor(saveDirlocation) {
      var self = this;
      // Set the save directory location
      this.saveDirLocation = null;
      this.setSaveDirectoryLocation(saveDirlocation);

      // Listen for the choose save directory dialog being activated
      dirChooseDialog.addEventListener("change", function() {
        if (this.value) {
          self.setSaveDirectoryLocation(this.value);
        }
      });

      // Listen for clicking the change default save directory button
      btnDirectoryChange.addEventListener("click", function() {
        SaveDirectory.openDirChooseDialog()
      });
    }

    /**
     * Sets the save directory location, or displays the choose directory dialog if invalid.
     * @param {String} newLocation The location of to save exported frames.
     */
    setSaveDirectoryLocation(newLocation) {
      // There is no set save directory or the directory does not exist
      if (!newLocation) {
        console.error("No save directory has been set!");
        SaveDirectory.openDirChooseDialog();

      } else {
        // Make the save directory if it doesn't exist
        if (!SaveDirectory.checkDir(newLocation)) {
          SaveDirectory.makeDir(newLocation);
        }

        // Update the new save directory
        this.saveDirLocation = newLocation;
        SaveDirectory._setLocalStorageDir(newLocation);
        SaveDirectory.displaySaveDirectory(newLocation);
      }
    }

    /** Static methods */

    /**
     * Get the app save directory from localStorage.
     * TODO remove when projects are fully implemented.
     * @returns {!String} The stored directory if available, null otherwise.
     */
    static getLocalStorageDir() {
      return localStorage.getItem(SAVE_DIRECTORY_KEY);
    }

    /**
     * Set the app save directory fromLocalStorage.
     * TODO remove when projects are fully implemented.
     * @param {String} dir The directory to save.
     */
    static _setLocalStorageDir(dir) {
      localStorage.setItem(SAVE_DIRECTORY_KEY, dir);
    }

    /**
     * Create the app save directory.
     *
     * @param {String} dir - The directory to create.
     */
    static makeDir(dir) {
      mkdirp(dir, function(err) {
        if (err) {
          console.error(err);
          Notification.error(`Failed to create save directory at ${dir}`);
        }
      });
    }

    /**
     * Check if the app save directory exists on the file system.
     *
     * @param {String} dir - The directory to check.
     * @returns {Boolean} True if the directory exists, false otherwise.
     */
    static checkDir(dir) {
      return fs.existsSync(dir);
    }

    /**
    * Display the app save directory in the UI.
    *
    * @param {String} dir The directory to display.
    */
    static displaySaveDirectory(dir) {
      "use strict";
      curDirDisplay.innerHTML = dir;
      document.title = `Boats Animator (${dir})`;
      Notification.success(`Current save directory is ${dir}`);
    }

    /**
     * Change the app save directory by opening
     * the system's native directory selection dialog.
     */
    static openDirChooseDialog() {
      document.querySelector("#chooseDirectory").click();
    }
  }

  module.exports = SaveDirectory;
})();
