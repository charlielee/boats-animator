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

/**
 * Occurs when "New Project" is pressed
 */
function openAnimator() {
    "use strict";
    gui.Window.open("animator.html", {
        position: "center",
        width: 1050,
        height: 715,
        min_width: 590,
        min_height: 500,
        toolbar: false,
        focus: true,
        icon: "icons/icon.png",
    });
    win.close();
}

/**
 * Check if we can display the latest news feed
 * and if we cannot, say so.
 */
function canDisplayNews() {
    "use strict";
    newsFeed.load("http://charlielee.uk/api/core/get_category_posts/?id=12");
}

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
