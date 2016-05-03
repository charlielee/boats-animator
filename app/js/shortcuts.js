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
            playAudio = !playAudio;
            // Toggle checkbox on related menubar item
            captureMenu.items[2].checked = !captureMenu.items[2].checked;
            notifyInfo(`Capture sounds ${playAudio ? "enabled" : "disabled"}.`);
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
      // Iterate through each feature of the shortcut group
      Object.keys(allShortcuts[groupName]).forEach(function(featureName) {
        // Iterate through each feature's array of shortcuts
        allShortcuts[groupName][featureName]["keys"].forEach(function(shortcut) {
          var option = {
            active:  allShortcuts[groupName][featureName].active,
            key: shortcut,
            failed : function(err) {
              console.error(err);
            }
          };
          curShortcuts[option.key] = new nw.Shortcut(option);
          nw.App.registerGlobalHotKey(curShortcuts[option.key]);
        });
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
      // Iterate through each feature of the shortcut group
      Object.keys(allShortcuts[groupName]).forEach(function(featureName) {
        // Iterate through each feature's array of shortcuts
        allShortcuts[groupName][featureName]["keys"].forEach(function(shortcut) {
          nw.App.unregisterGlobalHotKey(curShortcuts[shortcut]);
        });
      });

      activeGroups.splice(activeGroups.indexOf(groupName));
      console.info(`Removed ${groupName} shortcuts`);
    }
  }

  /**
   * Load a JSON file containing keyboard shortcuts.
   * Then match the shortcuts with their function.
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

          // Create an object for the group
          allShortcuts[groupName] = {};

          // Iterate through each feature in the group (eg takePicture, undoFrame)
          Object.keys(features[groupName]).forEach(function(featureName) {
            // Create an object for the feature
            allShortcuts[groupName][featureName] = {};

            var featureObject = {
              // The feature's function
              active : features[groupName][featureName],
              // Array of keyboard shortcuts for the feature
              keys: data[groupName][featureName],
            };
            allShortcuts[groupName][featureName] = featureObject;
          });
        });

        console.info(`Got shortcuts from "${location}":`);
        console.log(allShortcuts);
        addShortcuts("main");
      }
    });
  }

  /**
   * Pause keyboard shortcut operation.
   */
  function pauseShortcuts() {
    activeGroups.forEach(function(groupName) {
      removeShortcuts(groupName);
      pausedGroups.push(groupName);
    });
    console.info(`Paused shortcuts`);
  }

  /**
   * Resume keyboard shortcut operation after pausing it.
   */
  function resumeShortcuts() {
    pausedGroups.forEach(function(groupName) {
      addShortcuts(groupName);
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