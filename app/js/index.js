/*jslint browser: true, node: true, debug: true*/
/* global nw */

(function() {
    "use strict";
    let win      = nw.Window.get(),
        newsFeed = require("./js/newsfeed"),
        qAppVersion = document.querySelector("#app-version");

   // Get the version number from the manifest file
    qAppVersion.innerHTML = nw.App.manifest.version;

    // Display the latest news
    newsFeed.load("http://charlielee.uk/api/core/get_category_posts/?id=12");

    /**
     * Occurs when "New Project" is pressed
     */
    function openAnimator() {
        nw.Window.open("animator.html", {
            position: "center",
            width: 1050,
            height: 715,
            min_width: 590,
            min_height: 500,
            focus: true,
            icon: "icons/icon.png",
        });

        // nw-TODO This ends up closing both windows
        // win.close();
    }

    // Open the animator
    document.querySelector("#new-project").addEventListener("click", openAnimator);

    /**
     * Development Functions
     */
    document.querySelector("#btn-dev-tools").addEventListener("click", function() {
        win.showDevTools();
    });

    document.querySelector("#btn-dev-reload").addEventListener("click", function() {
        // nw-TODO reloadDev() is not yet supported
        win.reload();
    });
}());
