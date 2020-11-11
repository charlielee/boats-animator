(function() {
  "use strict";
  // Main imports
  const ExportVideo = require("./js/animator/core/ExportVideo");
  const PreviewOverlay = require("./js/animator/core/PreviewOverlay");
  const Project = require("./js/animator/projects/Project");
  global.AppShortcuts = require("./js/animator/core/Shortcuts");

  // UI imports
  const CaptureOptions = require("./js/ui/CaptureOptions");
  const FrameReelRow = require("./js/ui/FrameReelRow");
  global.AppMenuBar = require("./js/ui/MenuBar");
  const WindowManager = require("./js/ui/WindowManager");

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
      WindowManager.setListeners();
      global.projectInst.setListeners();

      // Set default view
      global.projectInst.setCurrentMode("capture");
    });
  }
  window.onload = startup;
})();