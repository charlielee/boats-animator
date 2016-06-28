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
        nw.Window.open("app/animator.html", {
            position: "center",
            width: 1050,
            height: 715,
            min_width: 590,
            min_height: 500,
            focus: true,
            icon: "icons/icon.png",
        });
        win.close();
    }

    // Open the animator
    document.querySelector("#new-project").addEventListener("click", openAnimator);

}());
