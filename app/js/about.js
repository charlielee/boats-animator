// Launcher window
var launcherVersion = document.querySelector("#app-version"),
    win = nw.Window.get();

win.setShowInTaskbar(false);

win.on("blur", function() {
    win.show();
});

win.on("minimize", function() {
    win.close();
});

// Get the version number from the manifest file
launcherVersion.innerHTML = nw.App.manifest.version;
