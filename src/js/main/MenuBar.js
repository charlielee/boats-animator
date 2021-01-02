(function() {
  "use strict";
  const { app, Menu, shell } = require("electron");
  const events = require("events");

  const shortcutStore = new (require("./ShortcutStore"));

  const isMac = (process.platform === "darwin");

  class MenuBar {
    constructor() {
      this.eventEmitter = new events.EventEmitter();
      this.animatorItemsEnabled = true;
    }

    /**
     * Displays the top menu
     */
    load() {
      let self = this;

      // Menu items to add
      let menuItems = [
        // App Menu (macOS only)
        ...(isMac ? [{
          label: "Boats Animator",
          submenu: [
            {
              label: "About Boats Animator",
              role: "about"
            },
            { type: "separator" },
            { role: "services" },
            { type: "separator" },
            {
              label: "Hide Boats Animator",
              role: "hide"
            },
            { role: "hideothers" },
            { role: "unhide" },
            { type: "separator" },
            {
              label: "Quit Boats Animator",
              role: "quit"
            }
          ]
        }] : []),
        // File
        {
          label: "File",
          submenu: [
            // New project
            {
              label: "New project...",
              click: function () {
                self._sendClickEvent("newProject");
              },
              accelerator: "CommandOrControl+n"
            },
            // Open project
            {
              label: "Open project...",
              click: function () {
                self._sendClickEvent("openProject");
              },
              accelerator: "CommandOrControl+o"
            },
            // Return to main menu
            {
              label: "Main Menu",
              click: function () {
                self._sendClickEvent("mainMenu");
              },
              accelerator: "CommandOrControl+w"
            },
            // Quit app (Windows/Linux)
            ...(!isMac ? [
              { type: "separator" },
              {
                label: "Exit",
                role: "quit",
                accelerator: "CommandOrControl+q"
              }
            ] : [])
          ]
        },
        // Edit
        {
          label: "Edit",
          submenu: [
            {
              label: "Delete last frame",
              click: function () {
                self._sendClickEvent("undoFrame");
              },
              accelerator: self._getAccelerator("animator.undoFrame"),
              registerAccelerator: false
            }
          ]
        },
        // Capture
        {
          label: "Capture",
          submenu: [
            {
              label: "Capture frame",
              click: function () {
                self._sendClickEvent("takePicture");
              },
              accelerator: self._getAccelerator("animator.takePicture"),
              registerAccelerator: false
            },
            {
              label: "Confirm take",
              click: function () {
                self._sendClickEvent("confirmTake");
              }
            },
            { type: "separator" },
            {
              label: "Play capture sounds",
              click: function () {
                self._sendClickEvent("audioToggle");
              },
              type: "checkbox",
              checked: true,
              accelerator: self._getAccelerator("animator.audioToggle"),
              registerAccelerator: false
            },
            {
              label: "Change capture destination",
              click: function () {
                self._sendClickEvent("openDirChooseDialog");
              }
            }
          ]
        },
        // Playback
        {
          label: "Playback",
          submenu: [
            {
              label: "Loop playback",
              click: function () {
                self._sendClickEvent("loopPlayback");
              },
              type: "checkbox",
              checked: false,
              accelerator: self._getAccelerator("animator.loopPlayback"),
              registerAccelerator: false
            },
            { type: "separator" },
            {
              label: "Display first frame",
              click: function () {
                self._sendClickEvent("firstFrame");
              },
              accelerator: self._getAccelerator("animator.firstFrame"),
              registerAccelerator: false
            },
            {
              label: "Display last frame",
              click: function () {
                self._sendClickEvent("lastFrame");
              },
              accelerator: self._getAccelerator("animator.lastFrame"),
              registerAccelerator: false
            }
          ]
        },
        // View
        {
          label: "View",
          submenu: [
            // Only show reload options in development mode
            ...(!app.isPackaged ? [
              { role: "reload" },
              { role: "forceReload" }
            ] : []),
            { role: "toggleDevTools" },
            { type: "separator" },
            { role: "resetZoom" },
            { role: "zoomIn" },
            { role: "zoomOut" },
            { type: "separator" },
            { role: "togglefullscreen" }
          ]
        },
        // Help
        {
          label: "Help",
          submenu: [
            {
              label: "Documentation",
              click: function () {
                shell.openExternal("https://boatsanimator.readthedocs.io/");
              },
              accelerator: "F1"
            },
            {
              label: "Give feedback",
              click: function () {
                shell.openExternal("https://github.com/charlielee/boats-animator/issues");
              }
            },
            { type: "separator" },
            {
              label: "View license",
              click: function () {
                shell.openExternal("https://github.com/charlielee/boats-animator/blob/master/LICENSE");
              }
            },
            {
              label: "Official Website",
              click: function () {
                shell.openExternal("https://www.charlielee.uk/boats-animator");
              }
            }
          ]
        }
      ];

      // Create top menu and sub-menus
      let menuBar = Menu.buildFromTemplate(menuItems);
      Menu.setApplicationMenu(menuBar);
    }

    /**
     * Toggles whether the menu items specific to the animator window are disabled or not.
     * @param {Boolean} forceState The boolean value to set the checkbox to
     */
    toggleAnimatorItems(forceState = null) {
      let self = this;
      let menu = Menu.getApplicationMenu();
      const toggleableMenus = ["Edit", "Capture", "Playback"];

      self.animatorItemsEnabled = (forceState === null ? !self.animatorItemsEnabled : forceState);

      menu.items.forEach(function(menuItem) {
        if (toggleableMenus.includes(menuItem.label)) {
          menuItem.submenu.items.forEach(function(subMenuItem) {
            subMenuItem.enabled = self.animatorItemsEnabled;
          });
        }
      });
    }

    /**
     * Checks or unchecks a given checkout menu item
     * @param {String} itemName The name of the menu item to change (possible values "captureSounds" or "loopPlayback")
     * @param {Boolean} state The boolean value to set the checkbox to
     */
    toggleCheckbox(itemName, state) {
      const menu = Menu.getApplicationMenu();
      // Handle mac having an extra appName menu item
      const macOffset = (isMac ? 1 : 0);

      const checkboxItems = {
        captureSounds: menu.items[2+macOffset].submenu.items[3],
        loopPlayback: menu.items[3+macOffset].submenu.items[0]
      };

      if (Object.keys(checkboxItems).includes(itemName)) {
        checkboxItems[itemName].checked = state;
      }
    }

    /**
     * Gets the primary shortcut of a given feature to display on the menubar
     * @param {String} key The name of the shortcut to fetch
     */
    _getAccelerator(key) {
      let shortcuts = shortcutStore.get(key);
      if (shortcuts.length > 0) {
        // Electron uses "CommandOrControl" instead of "mod"
        return shortcuts[0].replace("mod", "CommandOrControl");
      }
    }

    /**
     * Emit an event when a menubar item is clicked
     * @param {String} menuItemName The name of the menu bar item that was clicked
     */
    _sendClickEvent(menuItemName) {
      this.eventEmitter.emit("menubar:click", menuItemName);
    }
  }

  module.exports = MenuBar;
}());
