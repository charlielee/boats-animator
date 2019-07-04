(function() {
  "use strict";
  // Main imports
  const PreviewOverlay = require("./main/PreviewOverlay/PreviewOverlay");
  const Project = require("./main/Project/Project");
  const ExportVideo = require("./main/ExportVideo/ExportVideo");
  global.AppShortcuts = require("./main/Shortcuts/Shortcuts");

  // UI imports
  const CaptureOptions = require("./ui/CaptureOptions/CaptureOptions");
  const FrameReelRow = require("./ui/FrameReelRow/FrameReelRow");
  global.AppMenuBar = require("./ui/MenuBar/MenuBar");
  const WindowManager = require("./ui/WindowManager/WindowManager");

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
      FrameReelRow.setListeners();
      PreviewOverlay.initialise();
      WindowManager.setListeners();
      global.projectInst.setListeners();

      // Set default view
      global.projectInst.setCurrentMode("capture");

      ExportVideo.displayExportVideoDialog();
    });
  }
  window.onload = startup;
})();