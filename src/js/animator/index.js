(function() {
  "use strict";
  // Main imports
  const ExportVideo = require("./js/animator/core/ExportVideo");
  const PreviewOverlay = require("./js/animator/core/PreviewOverlay");
  const Project = require("./js/animator/projects/Project");
  global.AppShortcuts = require("./js/animator/core/Shortcuts");

  // UI imports
  const CaptureOptions = require("./js/animator/ui/CaptureOptions");
  const FrameReelRow = require("./js/animator/ui/FrameReelRow");
  global.AppMenuBar = require("./js/animator/ui/MenuBar");

  function startup() {
    // Load the keyboard shortcuts
    global.AppShortcuts.get("default", function() {
      global.AppShortcuts.add("main");
      // Load top menu
      global.AppMenuBar.load();

      // Initialise the project
      global.projectInst = new Project("Untitled Project");
      global.projectInst.addTake();

      // UI initialisation
      CaptureOptions.setListeners();
      ExportVideo.setListeners();
      FrameReelRow.setListeners();
      PreviewOverlay.initialise();
      global.projectInst.setListeners();

      // Set default view
      global.projectInst.setCurrentMode("capture");
    });
  }
  window.onload = startup;
})();