(function() {
  "use strict";
  const { ipcRenderer } = require("electron");
  const Shortcuts = require("./Shortcuts");

  // Loading Window
  const body = document.body;
  const loadingWindow = document.querySelector("#loading-window");
  const loadingWindowMessage = document.querySelector("#loading-window-message");
  const loadingWindowDots = document.querySelector("#loading-window-dots");

  class Loader {
    static show(message = "", dots = true) {
      // Pause main shortcuts and menubar items
      Shortcuts.pause();
      ipcRenderer.send("menubar:toggle-items", false);

      // See which elements should be displayed
      if (!loadingWindow.classList.contains("active")) {
        loadingWindow.classList.add("active");
      }
      if (loadingWindowMessage.classList.contains("hidden") && message !== "") {
        loadingWindowMessage.classList.remove("hidden");
      }

      if (dots) {
        body.style.cursor = "progress"
        if (loadingWindowDots.classList.contains("hidden")) {
          loadingWindowDots.classList.remove("hidden")
        }
      } else {
        loadingWindowDots.classList.add("hidden");
      }

      // Update loading window message
      loadingWindowMessage.innerHTML = message;
    }

    static hide() {
      // Resume main shortcuts and menubar items
      Shortcuts.unpause();
      ipcRenderer.send("menubar:toggle-items", true);

      // Hide loading window
      this.isLoading = false;
      body.style.cursor = "initial"
      if (loadingWindow.classList.contains("active")) {
        loadingWindow.classList.remove("active");
      }
    }
  }

  module.exports = Loader;
})();