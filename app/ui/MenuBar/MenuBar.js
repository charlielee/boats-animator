(function() {
  "use strict";
  // Main imports
  const Features = require("../../main/Features/Features");
  const SaveDirectory = require("../../main/SaveDirectory/SaveDirectory");
  const Shortcuts = require("../../main/Shortcuts/Shortcuts");

  // UI imports
  const Notification = require("../../ui/Notification/Notification");
  const WindowManager = require("../../ui/WindowManager/WindowManager");


  var controlKey = (process.platform === "darwin" ? "command" : "ctrl");

  /**
   * Displays the top menu
   */
  function loadMenu() {
    // Menu items to add
    var menuItems = {
      "File": [
        {
          label: "New project...",
          click: function() {
            Notification.info("This feature is not yet available!")
          },
          key: "n",
          modifiers: controlKey,
        },
        {
          label: "Open project...",
          click: function() {
            Notification.info("This feature is not yet available!")
          },
          key: "o",
          modifiers: controlKey,
        },
        {
          label: "Main Menu",
          click: function() {
            Features.mainMenu();
          },
          key: "w",
          modifiers: controlKey,
        },
        { type: "separator" },
        {
          label: "Exit",
          click: function() {
            Features.exitApp();
          },
          key: "q",
          modifiers: controlKey,
        }
      ],
      "Edit": [
        {
          label: "Delete last frame",
          click: function() {
            Features.undoFrame();
          },
          key: Shortcuts.getPrimaryKey("undoFrame"),
          modifiers: Shortcuts.getPrimaryModifiers("undoFrame"),
        }
      ],
      "Capture": [
        {
          label: "Capture frame",
          click: function() {
            Features.takePicture();
          },
          key: Shortcuts.getPrimaryKey("takePicture"),
          modifiers: Shortcuts.getPrimaryModifiers("takePicture"),
        },
        {
          label: "Confirm take",
          click: function() {
            Features.confirmTake();
          },
        },
        { type: "separator" },
        {
          label: "Play capture sounds",
          click: function() {
            Features.audioToggle();
          },
          type: "checkbox",
          checked: true,
          key: Shortcuts.getPrimaryKey("audioToggle"),
          modifiers: Shortcuts.getPrimaryModifiers("audioToggle"),
        },
        {
          label: "Change capture destination",
          click: function() {
            SaveDirectory.openDirChooseDialog();
          }
        }
      ],
      "Playback": [
        {
          label: "Loop playback",
          click: function() {
            Features.loopPlayback();
          },
          type: "checkbox",
          checked: false,
          key: Shortcuts.getPrimaryKey("loopPlayback"),
          modifiers: Shortcuts.getPrimaryModifiers("loopPlayback"),
        },
        { type: "separator" },
        {
          label: "Display first frame",
          click: function() {
            Features.firstFrame();
          },
          key: Shortcuts.getPrimaryKey("firstFrame"),
          modifiers: Shortcuts.getPrimaryModifiers("firstFrame"),
        },
        {
          label: "Display last frame",
          click: function() {
            Features.lastFrame();
          },
          key: Shortcuts.getPrimaryKey("lastFrame"),
          modifiers: Shortcuts.getPrimaryModifiers("lastFrame"),
        }
      ],
      "Help": [
        {
          label: "Documentation",
          click: function() {
            utils.openURL("http://boatsanimator.readthedocs.io/");
          },
          key: "F1",
          modifiers: "",
        },
        {
          label: "Give feedback",
          click: function() {
            utils.openURL("https://github.com/charlielee/boats-animator/issues");
          },
        },
        { type: "separator" },
        {
          label: "About Boats Animator",
          click: function() {
            WindowManager.openAbout();
          }
        }
      ]
    };

    // Create top menu and sub-menus
    let menuBar = new nw.Menu({ type: "menubar" });

    // Create Mac menu
    if (process.platform === "darwin") {
      menuBar.createMacBuiltin("Boats Animator", {
        hideEdit: true,
        hideWindow: true
      });
    }

    // Add each sub menu
    Object.keys(menuItems).forEach(function(subMenuName) {
      let subMenu = new nw.Menu();

      // Append items to submenu
      menuItems[subMenuName].map(
        item => subMenu.append(new nw.MenuItem(item))
      );

      // Append submenu to top menu
      menuBar.append(new nw.MenuItem({
        label: subMenuName,
        submenu: subMenu
      }));
    });

    // Append main menu to Window
    nw.Window.get().menu = menuBar;
  }

  /**
   * Toggles whether the menu items are disabled or not (excluding the file menu).
   */
  function toggleItems() {
    const menu = nw.Window.get().menu;
    const toggleableMenus = ["Edit", "Capture", "Playback"];

    menu.items.forEach(function(menuItem) {
      if (toggleableMenus.includes(menuItem.label)) {
        menuItem.submenu.items.forEach(function(subMenuItem) {
          subMenuItem.enabled = !subMenuItem.enabled;
        });
      }
    });
  }

  module.exports = {};
  module.exports.load = loadMenu;
  module.exports.toggleItems = toggleItems;
}());
