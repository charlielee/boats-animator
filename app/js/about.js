/*eslint-env browser, node, es6*/
/* global Buffer, process */

// Launcher window
var launcherVersion = document.querySelector("#app-version"),

    // GUI window
    gui = require("nw.gui"),
    win = gui.Window.get();

win.title = "About Boats Animator";
win.setShowInTaskbar(false);

win.on("blur", function() {
    win.show();
});

win.on("minimize", function() {
    win.close();
});

// Get the version number from the manifest file
launcherVersion.innerHTML = gui.App.manifest.version;
