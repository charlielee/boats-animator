module.exports = {};

(function () {
  "use strict";
  var controlKey = (process.platform === "darwin" ? "command" : "ctrl");
  // Create top menu and sub-menus
  var menuBar = new nw.Menu({ type: "menubar" });
  var subMenus = {
    file: new nw.Menu(),
    edit: new nw.Menu(),
    capture: new nw.Menu(),
    playback: new nw.Menu(),
    help: new nw.Menu(),
  };

  /**
   * Displays the top menu
   */
  function loadMenu() {
    // Menu items to add
    var menuItems = {
      file: [
        {
          label: "New project...",
          click: function () {
            notification.info("This feature is not yet available!")
          },
          key: "n",
          modifiers: controlKey,
        },
        {
          label: "Open project...",
          click: function () {
            notification.info("This feature is not yet available!")
          },
          key: "o",
          modifiers: controlKey,
        },
        {
          label: "Main Menu",
          click: function () {
            shortcuts.pause();
            confirmSet({text: "Returning to the menu will cause any unsaved work to be lost!"})
            .then((response) => {
              if (response) {
                openIndex();
              }
              shortcuts.resume();
            });
          },
          key: "w",
          modifiers: controlKey,
        },
        { type: "separator" },
        {
          label: "Exit",
          click: function () {
            shortcuts.pause();
            confirmSet({text: "Are you sure you want to exit Boats Animator?"})
            .then((response) => {
              if (response) {
                closeAnimator();
              }
              shortcuts.resume();
            });
          },
          key: "q",
          modifiers: controlKey,
        }
      ],
      edit: [
        {
          label: "Delete last frame",
          click: undoFrame,
          key: shortcuts.getPrimaryKey("undoFrame"),
          modifiers: shortcuts.getPrimaryModifiers("undoFrame"),
        }
      ],
      capture: [
        {
          label: "Capture frame",
          click: takeFrame,
          key: shortcuts.getPrimaryKey("takePicture"),
          modifiers: shortcuts.getPrimaryModifiers("takePicture"),
        },
        { type: "separator" },
        {
          label: "Play capture sounds",
          click: function () {
            playAudio = !playAudio;
            notification.info(`Capture sounds ${playAudio ? "enabled" : "disabled"}.`);
          },
          type: "checkbox",
          checked: true,
          key: shortcuts.getPrimaryKey("audioToggle"),
          modifiers: shortcuts.getPrimaryModifiers("audioToggle"),
        },
        {
          label: "Change capture destination",
          click: _changeSaveDirectory
        }
      ],
      playback: [
        {
          label: "Loop playback",
          click: function () {
            btnLoop.click()
          },
          type: "checkbox",
          checked: false,
          key: shortcuts.getPrimaryKey("loopPlayback"),
          modifiers: shortcuts.getPrimaryModifiers("loopPlayback"),
        },
        { type: "separator" },
        {
          label: "Display first frame",
          click: function () {
            btnFrameFirst.click();
          },
          key: shortcuts.getPrimaryKey("firstFrame"),
          modifiers: shortcuts.getPrimaryModifiers("firstFrame"),
        },
        {
          label: "Display last frame",
          click: function () {
            btnFrameLast.click();
          },
          key: shortcuts.getPrimaryKey("lastFrame"),
          modifiers: shortcuts.getPrimaryModifiers("lastFrame"),
        }
      ],
      help: [
        {
          label: "Documentation",
          click: function () {
            utils.openURL("http://boatsanimator.readthedocs.io/");
          },
          key: "F1",
          modifiers: "",
        },
        {
          label: "Give feedback",
          click: function () {
            utils.openURL("https://github.com/charlielee/boats-animator/issues");
          },
        },
        { type: "separator" },
        {
          label: "About Boats Animator",
          click: openAbout
        }
      ]
    };

    Object.keys(subMenus).forEach(function (curSubMenuName) {
      // Append items to submenu
      menuItems[curSubMenuName].forEach(function (menuItem) {
        subMenus[curSubMenuName].append(new nw.MenuItem(menuItem));
      });
      var subMenuName = curSubMenuName.charAt(0).toUpperCase() + curSubMenuName.slice(1);
      // Append submenu to main menu
      menuBar.append(new nw.MenuItem({
        label: subMenuName,
        submenu: subMenus[curSubMenuName]
      }));
    });

    // Append main menu to Window
    nw.Window.get().menu = menuBar;

    // Create Mac menu
    if (process.platform === "darwin") {
      menuBar.createMacBuiltin("Boats Animator", {
        hideEdit: true
      });
    }
  }

  /**
   * Toggles whether the menu items are disabled or not (excluding the file menu).
   */
  function toggleItems() {
    Object.keys(subMenus).forEach(function (subMenuName) {
      if (subMenuName != "file") {
        subMenus[subMenuName].items.forEach(function (menuItem) {
          menuItem.enabled = !menuItem.enabled;
        });
      }
    });
  }

  module.exports.subMenus = subMenus;
  module.exports.load = loadMenu;
  module.exports.toggleItems = toggleItems;
}());