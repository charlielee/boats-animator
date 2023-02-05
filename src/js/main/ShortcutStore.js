(function () {
  const Store = require("electron-store");

  /**
   * Store for shortcut configuration
   */
  class ShortcutStore {
    constructor() {
      // Standard options for each shortcut feature
      const featureOptions = {
        items: {
          type: "string",
        },
        type: "array",
        uniqueItems: true,
      };

      this.store = new Store({
        name: "shortcuts",
        schema: {
          animator: {
            type: "object",
            properties: {
              // Note each property should match a method name in Features.js
              takePicture: featureOptions,
              undoFrame: featureOptions,
              deleteCurSelectedFrame: featureOptions,
              audioToggle: featureOptions,
              playPause: featureOptions,
              loopPlayback: featureOptions,
              liveView: featureOptions,
              firstFrame: featureOptions,
              lastFrame: featureOptions,
              nextFrame: featureOptions,
              previousFrame: featureOptions,
              toggleGridOverlay: featureOptions,
              toggleAspectRatioOverlay: featureOptions,
              shortPlay: featureOptions,
            },
          },
        },
        // Default shortcuts for each feature
        // Note these are in the format used by Mousetrap https://craig.is/killing/mice
        // "mod" should be used to represent "command" on macOS and "ctrl" on Windows/Linux
        defaults: {
          animator: {
            takePicture: ["mod+1", "enter"],
            undoFrame: ["mod+z", "*"],
            deleteCurSelectedFrame: ["del", "backspace"],
            audioToggle: ["mod+m"],
            playPause: ["space", "0"],
            loopPlayback: ["8"],
            liveView: ["l", "3"],
            firstFrame: ["mod+left"],
            lastFrame: ["mod+right"],
            nextFrame: ["right", "2"],
            previousFrame: ["left", "1"],
            toggleGridOverlay: ["4"],
            toggleAspectRatioOverlay: ["5"],
            shortPlay: ["p", "."],
          },
        },

        migrations: {
          "0.13.0": (store) => {
            console.log("Migrated ShortcutStore to 0.13.0");
            store.set("animator.shortPlay", ["p", "."]);
          },
        },
      });
    }

    /**
     * Return an array of shortcuts for a given feature
     * @param {String} key The name of the shortcut to fetch
     */
    get(key) {
      return this.store.get(key);
    }

    /**
     * Load object containing the app shortcuts
     */
    getAll() {
      return this.store.store;
    }

    /** TODO Custom shortcuts implementation will go here */
  }

  module.exports = ShortcutStore;
})();
