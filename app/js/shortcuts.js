module.exports = {};

(function () {
  "use strict";
  var notification = require("./notification"),
      Mousetrap    = require("mousetrap"),
      curShortcuts = {},
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
            notification.info(`Capture sounds ${playAudio ? "enabled" : "disabled"}.`);
          },
          playPause: function() {
            btnPlayPause.click();
          },
          loopPlayback: function() {
            btnLoop.click();
             // Toggle checkbox on related menubar item
            playbackMenu.items[0].checked = !playbackMenu.items[0].checked;
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
          Mousetrap.bind(option.key, option.active);
          curShortcuts[option.key] = option;
          // curShortcuts[option.key] = new nw.Shortcut(option);
          // nw.App.registerGlobalHotKey(curShortcuts[option.key]);
        });
      });

      activeGroups.push(groupName);
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
          Mousetrap.unbind(shortcut);
          // nw.App.unregisterGlobalHotKey(curShortcuts[shortcut]);
          
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
   */
  function getShortcuts(location) {
    // Location is a parameter to allow for custom shortcuts in the future.
    if (location === "default") {
      location = "./app/json/default-shortcuts.json";
    }
    file.read(location, {
      success: function(data) {
        data = JSON.parse(data);
        console.log(data);

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
  }

  /**
   * Resume keyboard shortcut operation after pausing it.
   */
  function resumeShortcuts() {
    pausedGroups.forEach(function(groupName) {
      addShortcuts(groupName);
      pausedGroups.length = 0;
    });
  }

  module.exports.get    = getShortcuts;
  module.exports.features = features;


  // Public exports
  module.exports.add    = addShortcuts;
  
  module.exports.pause  = pauseShortcuts;
  module.exports.remove = removeShortcuts;
  module.exports.resume = resumeShortcuts;
}());
