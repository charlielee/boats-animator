module.exports = {};

(function () {
  "use strict";
  var curShortcuts = {},
      allShortcuts = {},
      activeGroups = [],
      pausedGroups = [],

      // All of the features that can be set as keyboard shortcuts.
      features = {
        // Features in the main window.
        main: {
          takePicture: function() {
            btnCaptureFrame.click();
          },
          undoFrame: undoFrame,
          audioToggle: function() {
            audioToggle.checked = !audioToggle.checked;
          },
          playPause: function() {
            btnPlayPause.click();
          },
          loopPlayback: function() {
            btnLoop.click();
          },
          liveView: function() {
            if (totalFrames > 0) {
              btnLiveView.click();
            }
          }
        },
        // Features in confirm prompts.
        confirm: {
          enter: function() {
            if (document.activeElement === btnConfirmOK) {
              btnConfirmOK.click();
            } else if (document.activeElement === btnConfirmCancel) {
              btnConfirmCancel.click();
            }
          },
          cancel: function() {
            btnConfirmCancel.click();
          }
        }
      };

  /**
   * Choose a group of shortcuts to activate.
   *
   * @param {String} groupName Which group of shortcuts should be enabled.
   *                           eg main or confirm.
   */
  function addShortcuts(groupName) {
    // Check the shortcut group hasn't already been added.
    if (!activeGroups.includes(groupName)) {
      allShortcuts[`${groupName}Shortcuts`].forEach(function(shortcut) {
        curShortcuts[`${shortcut.key}Shortcut`] = new nw.Shortcut(shortcut);
        nw.App.registerGlobalHotKey(curShortcuts[`${shortcut.key}Shortcut`]);
      });

      activeGroups.push(groupName);
      console.info(`Added ${groupName} shortcuts`);
    }
  }

  /**
   * Choose a group of shortcuts to remove.
   *
   * @param {String} groupName Which group of shortcuts should be removed.
   *                           eg main or confirm.
   */
  function removeShortcuts(groupName) {
    // Check the shortcut group can be removed.
    if (activeGroups.includes(groupName)) {
      allShortcuts[`${groupName}Shortcuts`].forEach(function(shortcut) {
        nw.App.unregisterGlobalHotKey(curShortcuts[`${shortcut.key}Shortcut`]);
      });

      activeGroups.splice(activeGroups.indexOf(groupName));
      console.info(`Removed ${groupName} shortcuts`);
    }
  }

  /**
   * Load a JSON file containing keyboard shortcuts.
   *
   * @param {String} location Location of file containing shortcut list.
   */
  function getShortcuts(location) {
    // Location is a parameter to allow for custom shortcuts in the future.
    if (location === "default") {
      location = "./json/default-shortcuts.json";
    }
    file.read(location, {
      success: function(data) {
        data = JSON.parse(data);

        // Iterate through each feature group object (eg main, confirm)
        Object.keys(features).forEach(function(groupName) {

          // Get object with each feature's function
          var functionsList = features[groupName]

          // Get object with each feature's array of shortcut keys
          var shortcutsList = data[groupName];
          
          // Create an object to output found shortcuts to
          allShortcuts[`${groupName}Shortcuts`] = [];
          
          console.info(`---- ${groupName} ----`);
          console.log(functionsList);
          console.log(shortcutsList);

          // Iterate through each feature in the group
          Object.keys(functionsList).forEach(function(feature) {

            // Iterate through each feature's array of shortcuts
            shortcutsList[feature].forEach(function(shortcut) {
              var option = {
                key : shortcut,
                active : functionsList[feature],
                failed : function(err) {
                  console.error(err);
                }
              };
              allShortcuts[`${groupName}Shortcuts`].push(option);
            });
          });
        });
        addShortcuts("main");
      }
    });
  }

  /**
   * Pause keyboard shortcut operation.
   */
  function pauseShortcuts() {
    activeGroups.forEach(function(i) {
      removeShortcuts(i);
      pausedGroups.push(i);
    });
    console.info(`Paused shortcuts`);
  }

  /**
   * Resume keyboard shortcut operation after pausing it.
   */
  function resumeShortcuts() {
    pausedGroups.forEach(function(i) {
      addShortcuts(i);
      pausedGroups.length = 0;
    });
    console.info(`Resumed shortcuts`);
  }

  // Public exports
  module.exports.add = addShortcuts;
  module.exports.remove = removeShortcuts;
  module.exports.get = getShortcuts;
  module.exports.pause = pauseShortcuts;
  module.exports.resume = resumeShortcuts;
}());