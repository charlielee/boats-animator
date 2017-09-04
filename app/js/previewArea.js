module.exports = {};

/** A class for windows in the preview area. */
(function () {
  "use strict";
  // Loading Window
  loadingWindow        = document.querySelector("#loading-window"),
  loadingWindowMessage = document.querySelector("#loading-window-message"),
  loadingWindowDots    = document.querySelector("#loading-window-dots"),

  // Currently active PreviewArea
  currentWindow = null;

  /**
   * Objects for Preview Area windows.
   */
  function PreviewArea(el) {
    this.el = el;
    this.isLoading = false;
    this.loadingMessage = "";
    this.loadingDots = true;
  }

  PreviewArea.prototype = {
    constructor: PreviewArea,

    /**
     * Displays the loading window are the current preview area.
     */
    showLoading: function(message = this.loadingMessage, dots = this.loadingDots) {
      // Hide current window
      if (!loadingWindow.classList.contains("active")) {
        this.el.classList.remove("active");
      }

      // See which elements should be displayed
      if (!loadingWindow.classList.contains("active")) {
        loadingWindow.classList.add("active");
      }
      if (loadingWindowMessage.classList.contains("hidden") && message != "") {
        loadingWindowMessage.classList.remove("hidden");
      }
      if (loadingWindowDots.classList.contains("hidden") && dots) {
        loadingWindowDots.classList.remove("hidden");
      }

      // Update loading window message
      loadingWindowMessage.innerHTML = loadingMessage;
    },

    /**
     * Displays a preview area instance.
     */
    display: function() {
      // Update the currentWindow
      if (currentWindow) {
        currentWindow.el.classList.remove("active");
      }
      currentWindow = this;

      // Check if new window is loading
      if (this.isLoading) {
        this.showLoading();
      } else {
        // Display the new window
        if (!this.el.classList.contains("active")) {
          this.el.classList.add("active");
        }
      }
    }
  };

  // Public exports
  module.exports = PreviewArea;
}());