// Main instances
// var projectInst = null;

(function() {
  "use strict";
  // Main imports
  const Project = require("./main/Project/Project");
  const Shortcuts = require("./main/Shortcuts/Shortcuts");

  // UI imports
  const CaptureOptions = require("./ui/CaptureOptions/CaptureOptions");
  const menubar = require("./ui/MenuBar/MenuBar");
  const WindowManager = require("./ui/WindowManager/WindowManager");

  function startup() {
    // Load the keyboard shortcuts
    Shortcuts.get("default", function() {
      Shortcuts.add("main");
      // Load top menu
      menubar.load();

      // Initialise the project
      global.projectInst = new Project("Untitled Project");
      global.projectInst.addTake();

      // UI initialisation
      CaptureOptions.setListeners();
      WindowManager.setListeners();
      global.projectInst.setListeners();

      // Set default view
      global.projectInst.setCurrentMode("capture");
    });
  }
  window.onload = startup;
})();