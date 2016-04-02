module.exports = {};

(function () {
  "use strict";
  var curShortcuts = {};

  /**
   * Choose an array of shortcuts to activate.
   *
   * @param {Array} shortcutArray Which array of shortcuts should be enabled.
   *                              eg mainKeys or confirmKeys.
   */
  function addShortcuts(shortcutArray) {
    if (!enableShortcuts) {
      shortcutArray.forEach(function(shortcut) {
        var option = {
          key : shortcut.key,
          active : shortcut.active,
          failed : function(err) {
            console.error(err);
          }
        }
        curShortcuts[`${shortcut.key}Shortcut`] = new nw.Shortcut(option);
        nw.App.registerGlobalHotKey(curShortcuts[`${shortcut.key}Shortcut`]);
      });

      enableShortcuts = true;
      console.log("added shortcuts");
    }
  }

  /**
   * Choose an array of shortcuts to remove.
   * @param {Array} shortcutArray Which array of shortcuts should be removed.
   *                              eg mainKeys or confirmKeys.
   */
  function removeShortcuts(shortcutArray) {
    if (enableShortcuts) {
      shortcutArray.forEach(function(shortcut) {
        nw.App.unregisterGlobalHotKey(curShortcuts[`${shortcut.key}Shortcut`]);
      });

      enableShortcuts = false;
      console.log("removed shortcuts");
    }
  }

  // Public exports
  module.exports.add = addShortcuts;
  module.exports.remove = removeShortcuts;
}());