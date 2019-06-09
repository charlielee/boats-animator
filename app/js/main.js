// Main instances
var projectInst = null;

(function () {
  // Main imports
  const Project = require("./main/Project/Project");
  const Shortcuts = require("./main/Shortcuts/Shortcuts");

  // UI imports
  const CaptureOptions = require("./ui/CaptureOptions/CaptureOptions");
  const menubar = require("./ui/MenuBar/MenuBar");
  const WindowManager = require("./ui/WindowManager/WindowManager");

  function startup() {
    "use strict";
    // Load the keyboard shortcuts
    Shortcuts.get("default", function () {
      Shortcuts.add("main");
      // Load top menu
      menubar.load();

      // Initialise the project
      projectInst = new Project("Untitled Project");
      projectInst.addTake();

      // UI initialisation
      CaptureOptions.setListeners();
      WindowManager.setListeners();
      projectInst.setListeners();

      // Set default view
      projectInst.setCurrentMode("capture");
    });
  }
  window.onload = startup;
})();