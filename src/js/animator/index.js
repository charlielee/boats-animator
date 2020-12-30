(function() {
  "use strict";
  const { ipcRenderer } = require("electron");

  // Main imports
  const ExportVideo = require("./js/animator/core/ExportVideo");
  const Features = require("./js/animator/core/Features");
  const PreviewOverlay = require("./js/animator/core/PreviewOverlay");
  const Project = require("./js/animator/projects/Project");
  global.AppShortcuts = require("./js/animator/core/Shortcuts");

  // UI imports
  const CaptureOptions = require("./js/animator/ui/CaptureOptions");
  const FrameReelRow = require("./js/animator/ui/FrameReelRow");

  function startup() {
    // Load the keyboard shortcuts
    global.AppShortcuts.get("default", function() {
      global.AppShortcuts.add("main");

      // Initialise the project
      global.projectInst = new Project("Untitled Project");
      global.projectInst.addTake();

      // Handle menu bar items being clicked in the main thread
      ipcRenderer.on("menubar:click", (e, menuItemName) => {
        // Get the feature with the matching string name
        console.log(`Selected feature ${menuItemName}`);
        Features[menuItemName]();
      });

      // UI initialisation
      CaptureOptions.checkForCameraAccess()
      .then((accessStatus) => {
        if (accessStatus) {
          CaptureOptions.setListeners();
        }
      })
      ExportVideo.setListeners();
      FrameReelRow.setListeners();
      PreviewOverlay.initialise();
      global.projectInst.setListeners();
      global.projectInst.checkExportFrameDir();

      // Set default view
      global.projectInst.setCurrentMode("capture");
    });
  }
  window.onload = startup;
})();