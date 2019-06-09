module.exports = {};

/** A class for windows in the preview area. */
(function() {
  "use strict";
  // Loading Window
  var body = document.body;
  var loadingWindow = document.querySelector("#loading-window");
  var loadingWindowMessage = document.querySelector("#loading-window-message");
  var loadingWindowDots = document.querySelector("#loading-window-dots");

  /**
   * Constructor for PreviewArea windows.
   * @param {HTMLElement} el - the HTMLElement the window is associated with.
   */
  function PreviewArea(el) {
    this.el = el;
    this.isLoading = false;
    this.loadingMessage = "";
    this.loadingDots = true;
  }

  PreviewArea.curWindow = null;

  PreviewArea.prototype = {
    constructor: PreviewArea,

    /**
     * Displays the loading window are the current preview area.
     */
    showLoading: function(message = this.loadingMessage, dots = this.loadingDots) {
      this.loadingMessage = message;
      this.loadingDots = dots;
      this.isLoading = true;

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
    },

    /**
     * Displays a preview area instance.
     */
    display: function() {
      // Update the curWindow
      if (PreviewArea.curWindow) {
        PreviewArea.curWindow.el.classList.remove("active");
      }
      PreviewArea.curWindow = this;

      // Hide loading window
      this.isLoading = false;
      body.style.cursor = "initial"
      if (loadingWindow.classList.contains("active")) {
        loadingWindow.classList.remove("active");
      }

      // Display the new window
      if (!this.el.classList.contains("active")) {
        this.el.classList.add("active");
      }
    }
  };

  // Public exports
  module.exports = PreviewArea;
}());