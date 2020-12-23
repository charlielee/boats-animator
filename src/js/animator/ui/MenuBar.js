(function() {
  "use strict";
  const { remote, shell } = require("electron");
  const { Menu, MenuItem } = remote;

  // Main imports
  const Features = require("../core/Features");
  const SaveDirectory = require("../core/SaveDirectory");
  const Shortcuts = require("../core/Shortcuts");

  // UI imports
  const AboutWindow = require("./AboutWindow");
  const Notification = require("./Notification");

  // var controlKey = (process.platform === "darwin" ? "command" : "ctrl");

  /**
   * Displays the top menu
   */
  function loadMenu() {
    // Menu items to add
    let menuItems = [
      {
        label: "File",
        submenu: [
          {
            label: "New project...",
            click: function() {
              Notification.info("This feature is not yet available!")
            },
            accelerator: "CommandOrControl+n"
          },
          {
            label: "Open project...",
            click: function() {
              Notification.info("This feature is not yet available!")
            },
            accelerator: "CommandOrControl+o"
          },
          {
            label: "Main Menu",
            click: function() {
              Features.mainMenu();
            },
            accelerator: "CommandOrControl+w"
          },
          { type: "separator" },
          {
            label: "Exit",
            click: function() {
              Features.exitApp();
            },
            accelerator: "CommandOrControl+q"
          }
        ]
      },
      {
        label: "Edit",
        submenu: [
          {
            label: "Delete last frame",
            click: function() {
              Features.undoFrame();
            },
            accelerator: `${Shortcuts.getPrimaryModifiers("undoFrame")}+${Shortcuts.getPrimaryKey("undoFrame")}`
          }
        ]
      },
      {
        label: "Capture",
        submenu: [
          {
            label: "Capture frame",
            click: function() {
              Features.takePicture();
            },
            accelerator: `${Shortcuts.getPrimaryModifiers("takePicture")}+${Shortcuts.getPrimaryKey("takePicture")}`
          },
          {
            label: "Confirm take",
            click: function() {
              Features.confirmTake();
            }
          },
          { type: "separator" },
          {
            label: "Play capture sounds",
            click: function() {
              Features.audioToggle();
            },
            type: "checkbox",
            checked: true,
            accelerator: `${Shortcuts.getPrimaryModifiers("audioToggle")}+${Shortcuts.getPrimaryKey("audioToggle")}`
          },
          {
            label: "Change capture destination",
            click: function() {
              SaveDirectory.openDirChooseDialog();
            }
          }
        ]
      },
      {
        label: "Playback",
        submenu: [
          {
            label: "Loop playback",
            click: function() {
              Features.loopPlayback();
            },
            type: "checkbox",
            checked: false,
            accelerator: `${Shortcuts.getPrimaryModifiers("loopPlayback")}+${Shortcuts.getPrimaryKey("loopPlayback")}`
          },
          { type: "separator" },
          {
            label: "Display first frame",
            click: function() {
              Features.firstFrame();
            },
            accelerator: `${Shortcuts.getPrimaryModifiers("firstFrame")}+${Shortcuts.getPrimaryKey("firstFrame")}`
          },
          {
            label: "Display last frame",
            click: function() {
              Features.lastFrame();
            },
            accelerator: `${Shortcuts.getPrimaryModifiers("lastFrame")}+${Shortcuts.getPrimaryKey("lastFrame")}`
          }
        ]
      },
      {
        label: "View",
        submenu: [
          { role: "reload" },
          { role: "forceReload" },
          { role: "toggleDevTools" },
          { type: "separator" },
          { role: "resetZoom" },
          { role: "zoomIn" },
          { role: "zoomOut" },
          { type: "separator" },
          { role: "togglefullscreen" }
        ]
      },
      {
        label: "Help",
        submenu: [
          {
            label: "Documentation",
            click: function() {
              shell.openExternal("https://boatsanimator.readthedocs.io/");
            },
            accelerator: "F1"
          },
          {
            label: "Give feedback",
            click: function() {
              shell.openExternal("https://github.com/charlielee/boats-animator/issues");
            }
          },
          { type: "separator" },
          {
            label: "About Boats Animator",
            click: function() {
              AboutWindow.show();
            }
          }
        ]
      }
    ];

    // Create top menu and sub-menus
    let menuBar = Menu.buildFromTemplate(menuItems);
    Menu.setApplicationMenu(menuBar);

    // // Create Mac menu
    // if (process.platform === "darwin") {
    //   menuBar.createMacBuiltin("Boats Animator", {
    //     hideEdit: true,
    //     hideWindow: true
    //   });
    // }

    // // Add each sub menu
    // Object.keys(menuItems).forEach(function(subMenuName) {
    //   let subMenu = new nw.Menu();

    //   // Append items to submenu
    //   menuItems[subMenuName].map(
    //     item => subMenu.append(new nw.MenuItem(item))
    //   );

    //   // Append submenu to top menu
    //   menuBar.append(new nw.MenuItem({
    //     label: subMenuName,
    //     submenu: subMenu
    //   }));
    // });

    // // Append main menu to Window
    // nw.Window.get().menu = menuBar;
  }

  /**
   * Toggles whether the menu items are disabled or not (excluding the file menu).
   */
  function toggleItems() {
    const menu = Menu.getApplicationMenu()
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
