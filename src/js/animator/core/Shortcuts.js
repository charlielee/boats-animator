(function () {
  "use strict";
  const { ipcRenderer } = require("electron");
  const Features = require("./Features");

  class Shortcuts {
    /**
     * Load all of the animator window's keyboard shortcuts
     */
    static async load() {
      // Get object with arrays of shortcuts for each feature
      const shortcuts = (await ipcRenderer.invoke("shortcut-store:get-all"))["animator"];

      for (const [featureName, keys] of Object.entries(shortcuts)) {
        // The function to execute on activating the shortcut
        let action = Features[featureName];

        for (const key of keys) {
          Mousetrap.bind(key, action);
        }
      }
    }

    /**
     * Pause keyboard shortcut operation.
     * @returns {void}
     */
    static pause() {
      Mousetrap.pause();
    }

    /**
     * Resume keyboard shortcut operation after pausing it.
     * @returns {void}
     */
    static unpause() {
      Mousetrap.unpause();
    }
  }

  module.exports = Shortcuts;
})();