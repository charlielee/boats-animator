module.exports = {};

(function () {
  "use strict";
  /**
   * Display top menu
   */
  // Create top menu and sub-menus
  var menuBar = new nw.Menu({ type: "menubar" });
  var menuItems = {},
    fileMenu = new nw.Menu(),
    editMenu = new nw.Menu(),
    captureMenu = new nw.Menu(),
    playbackMenu = new nw.Menu(),
    helpMenu = new nw.Menu();

  
  /**
   * Adds an item to the menubar.
   * @param {nw.Menu} menu - the menu to add the item to.
   * @param {nw.MenuItem} menuItem - the menu item too add.
   */
  function addItem(menu, menuItem) {
    "use strict";
    menu.append(menuItem);
  }


  function loadMenu() {
    "use strict";
    var controlKey = (process.platform === "darwin" ? "command" : "ctrl");

    // File menu items
    fileMenu.append(new nw.MenuItem({
      label: "New project...",
      click: function () {
        notification.info("This feature is not yet available!")
      },
      key: "n",
      modifiers: controlKey,
    }));
    fileMenu.append(new nw.MenuItem({
      label: "Open project...",
      click: function () {
        notification.info("This feature is not yet available!")
      },
      key: "o",
      modifiers: controlKey,
    }));
    fileMenu.append(new nw.MenuItem({
      label: "Main Menu",
      click: function () {
        confirmSet(openIndex, "", "Returning to the menu will cause any unsaved work to be lost!");
      },
      key: "w",
      modifiers: controlKey,
    }));
    fileMenu.append(new nw.MenuItem({ type: "separator" }));
    fileMenu.append(new nw.MenuItem({
      label: "Exit",
      click: function () {
        confirmSet(closeAnimator, "", "Are you sure you to exit Boats Animator?");
      },
      key: "q",
      modifiers: controlKey,
    }));


    // Edit menu items
    editMenu.append(new nw.MenuItem({
      label: "Delete last frame",
      click: undoFrame,
      key: "z",
      modifiers: controlKey,
    }));

    // Capture menu items
    captureMenu.append(new nw.MenuItem({
      label: "Capture frame",
      click: takeFrame,
      key: "1",
      modifiers: controlKey,
    }));

    captureMenu.append(new nw.MenuItem({ type: "separator" }));

    captureMenu.append(new nw.MenuItem({
      label: "Play capture sounds",
      click: function () {
        playAudio = !playAudio;
        notification.info(`Capture sounds ${playAudio ? "enabled" : "disabled"}.`);
      },
      type: "checkbox",
      checked: true,
      key: "m",
      modifiers: controlKey,
    }));

    captureMenu.append(new nw.MenuItem({
      label: "Change capture destination",
      click: _changeSaveDirectory
    }));

    // Playback menu items
    playbackMenu.append(new nw.MenuItem({
      label: "Loop playback",
      click: function () {
        btnLoop.click()
      },
      type: "checkbox",
      checked: false,
      key: "8",
      modifiers: controlKey,
    }));

    playbackMenu.append(new nw.MenuItem({ type: "separator" }));

    playbackMenu.append(new nw.MenuItem({
      label: "Display first frame",
      click: function () {
        btnFrameFirst.click();
      },
      key: "left",
      modifiers: controlKey,
    }));

    playbackMenu.append(new nw.MenuItem({
      label: "Display last frame",
      click: function () {
        btnFrameLast.click();
      },
      key: "right",
      modifiers: "",
    }));

    // Help menu items
    helpMenu.append(new nw.MenuItem({
      label: "Documentation",
      click: function () {
        utils.openURL("http://boatsanimator.readthedocs.io/");
      },
      key: "F1",
      modifiers: "",
    }));
    helpMenu.append(new nw.MenuItem({
      label: "Give feedback",
      click: function () {
        utils.openURL("https://github.com/BoatsAreRockable/animator/issues");
      },
    }));

    helpMenu.append(new nw.MenuItem({ type: "separator" }));

    helpMenu.append(new nw.MenuItem({
      label: "About Boats Animator",
      click: openAbout
    }));

    // Append sub-menus to main menu
    menuBar.append(
      new nw.MenuItem({
        label: "File",
        submenu: fileMenu
      })
    );

    menuBar.append(
      new nw.MenuItem({
        label: "Edit",
        submenu: editMenu
      })
    );

    menuBar.append(
      new nw.MenuItem({
        label: "Capture",
        submenu: captureMenu
      })
    );

    menuBar.append(
      new nw.MenuItem({
        label: "Playback",
        submenu: playbackMenu
      })
    );

    menuBar.append(
      new nw.MenuItem({
        label: "Help",
        submenu: helpMenu
      })
    );

    // Append main menu to Window
    nw.Window.get().menu = menuBar;

    // Create Mac menu
    if (process.platform === "darwin") {
      menuBar.createMacBuiltin("Boats Animator", {
        hideEdit: true
      });
    }
  }
  module.exports.check = checkDir;
}());