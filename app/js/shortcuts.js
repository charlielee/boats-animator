module.exports = {};

(function () {
  "use strict";
  var notification = require("./notification"),
      allShortcuts = {},
      activeGroups = [],

      // All of the features that can be set as keyboard shortcuts.
      features = {
        // Features in the main window.
        main: {
          takePicture: function() {
            btnCaptureFrame.click();
          },
          undoFrame: undoFrame,
          audioToggle: function() {
            playAudio = !playAudio;
            // Toggle checkbox on related menubar item
            menubar.subMenus.capture.items[2].checked = !menubar.subMenus.capture.items[2].checked;
            notification.info(`Capture sounds ${playAudio ? "enabled" : "disabled"}.`);
          },
          playPause: function() {
            btnPlayPause.click();
          },
          loopPlayback: function() {
            btnLoop.click();
             // Toggle checkbox on related menubar item
             menubar.subMenus.playback.items[0].checked = !menubar.subMenus.capture.items[0].checked;
          },
          liveView: function() {
            switchToLiveView();
          },
          firstFrame: function() {
            btnFrameFirst.click();
          },
          lastFrame: function() {
            btnFrameLast.click();
          },
          nextFrame: function() {
            btnFrameNext.click();
          },
          previousFrame: function() {
            btnFramePrevious.click();
          }
        },
        // Features in confirm prompts.
        confirm: {
          enter: function() {
            // Confirm messages
            var btnConfirmOK = document.querySelector(".swal-button--confirm");
            var btnConfirmCancel = document.querySelector(".swal-button--cancel");

            if (document.activeElement === btnConfirmOK) {
              btnConfirmOK.click();
            } else if (document.activeElement === btnConfirmCancel) {
              btnConfirmCancel.click();
            }
          },
          cancel: function() {
            var btnConfirmCancel = document.querySelector(".swal-button--cancel");
            btnConfirmCancel.click();
          }
        }
      };

  /**
   * Choose a group of shortcuts to activate.
   *
   * @param {String} groupName - Which group of shortcuts should be removed,
   *                             e.g., main or confirm.
   * @returns {void}
   */
  function addShortcuts(groupName) {
    // Check the shortcut group hasn't already been added.
    if (!activeGroups.includes(groupName)) {
      // Iterate through each feature of the shortcut group
      Object.keys(allShortcuts[groupName]).forEach(function(featureName) {
        // Iterate through each feature's array of shortcuts
        allShortcuts[groupName][featureName]["keys"].forEach(function(shortcut) {
          var option = {
            active:  allShortcuts[groupName][featureName].active,
            key: shortcut
          };
          Mousetrap.bind(option.key, option.active);
        });
      });
      activeGroups.push(groupName);
    }
  }

  /**
   * Choose a group of shortcuts to remove.
   *
   * @param {String} groupName - Which group of shortcuts should be removed,
   *                             e.g., main or confirm.
   * @returns {void}
   */
  function removeShortcuts(groupName) {
    // Check the shortcut group can be removed.
    if (activeGroups.includes(groupName)) {
      // Iterate through each feature of the shortcut group
      Object.keys(allShortcuts[groupName]).forEach(function(featureName) {
        // Iterate through each feature's array of shortcuts
        allShortcuts[groupName][featureName]["keys"].forEach(function(shortcut) {
          Mousetrap.unbind(shortcut);
        });
      });

      activeGroups.splice(activeGroups.indexOf(groupName));
    }
  }

  /**
   * Load a JSON file containing keyboard shortcuts.
   * Then match the shortcuts with their function.
   *
   * @param {String} location Location of file containing shortcut list.
   * @param {Function} callback - The callback that handles the response.
   * @returns {void}
   */
  function getShortcuts(location, callback) {
    // Location is a parameter to allow for custom shortcuts in the future.
    if (location === "default") {
      location = "./app/json/default-shortcuts.json";
    }
    file.read(location, {
      success: function(data) {
        data = JSON.parse(data);

        // Iterate through each feature group object (eg main, confirm)
        Object.keys(features).forEach(function(groupName) {

          // Create an object for the group
          allShortcuts[groupName] = {};

          // Iterate through each feature in the group (eg takePicture, undoFrame)
          Object.keys(features[groupName]).forEach(function(featureName) {
            // Create an object for the feature
            allShortcuts[groupName][featureName] = {};

            var featureObject = {
              // The feature's function
              active: features[groupName][featureName],
              // Array of keyboard shortcuts for the feature
              keys: data[groupName][featureName],
            };
            allShortcuts[groupName][featureName] = featureObject;
          });
        });
        callback(allShortcuts);
      }
    });
  }

  /**
   * Pause keyboard shortcut operation.
   * @returns {void}
   */
  function pauseShortcuts() {
    Mousetrap.pause();
  }

  /**
   * Resume keyboard shortcut operation after pausing it.
   * @returns {void}
   */
  function resumeShortcuts() {
    Mousetrap.unpause();
  }

  /**
   * Get a feature's primary shortcut key to use for a menubar item.
   * @param {String} featureName - Name of the shortcut feature.
   * @returns {String}
   */
  function getPrimaryKey(featureName) {
    var shortcut = allShortcuts["main"][featureName]["keys"][0],
        key      = shortcut.substr(shortcut.lastIndexOf("+") + 1);

    return key;
  }

  /**
   * Get a feature's primary shortcut modifiers to use for a menubar item.
   * @param {String} featureName - Name of the shortcut feature.
   * @returns {String}
   */
  function getPrimaryModifiers(featureName) {
    var shortcut = allShortcuts["main"][featureName]["keys"][0],
        modifiers = shortcut.substring(0, shortcut.lastIndexOf("+"));

    if (modifiers) {
      // Ctrl === Command on Mac OS
      if (modifiers.includes("mod")) {
        return modifiers.replace("mod", ((process.platform === "darwin") ? "command" : "ctrl"));
      } else {
        return modifiers;
      }
    } else {
      return "";
    }
  }

  // Public exports
  module.exports.add    = addShortcuts;
  module.exports.get    = getShortcuts;
  module.exports.pause  = pauseShortcuts;
  module.exports.remove = removeShortcuts;
  module.exports.resume = resumeShortcuts;
  module.exports.getPrimaryKey = getPrimaryKey;
  module.exports.getPrimaryModifiers = getPrimaryModifiers;
}());
