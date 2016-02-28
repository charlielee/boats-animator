/*jslint browser: true, node: true, debug: true*/
/* global Buffer, process */

// Launcher window
var launcherVersion = document.querySelector("#app-version"),

    // GUI window
    gui = require("nw.gui"),
    win = gui.Window.get(),

    // Node modules
    file     = require("./js/file"),
    newsFeed = require("./js/newsfeed");

win.title = "About Boats Animator";
win.setShowInTaskbar(false);

win.on("blur", function() {
    win.show();
});

win.on("minimize", function() {
    win.close();
});

/**
 * Development Functions
 */
function dev() {
    "use strict";
    win.showDevTools();
}

function reload() {
    "use strict";
    win.reloadDev();
}

// Get the version number from the manifest file
launcherVersion.innerHTML = gui.App.manifest.version;