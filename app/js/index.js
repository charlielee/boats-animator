/*jslint browser: true, node: true, debug: true*/
/* global Buffer, process */

(function() {
    "use strict";
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

    // Get the version number from the manifest file
    launcherVersion.innerHTML = gui.App.manifest.version;

    // Load the news feed
    newsFeed.load("http://charlielee.uk/api/core/get_category_posts/?id=12");

    // Start a new project
    document.querySelector("#new-project").addEventListener("click", openAnimator);

    // Developer buttons
    document.querySelector("#btn-open-dev-tools").addEventListener("click", utils.showDev);
    document.querySelector("#btn-reload-page").addEventListener("click", utils.reloadPage);
}());
