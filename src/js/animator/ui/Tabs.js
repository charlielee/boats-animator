(function() {
  "use strict";

  class Tabs {
    /**
     * Activate tabs
     */
    static setListeners() {
      document.querySelector(".tabs").addEventListener("click", function (e) {
        // Get the active pane
        let activeTab = document.querySelector(".tabs .active");
        let activeTabPane = document.querySelector(".tab-pane.active");

        // Switch pane if a tab is found
        let newTab = e.target;
        if (newTab.getAttribute("data-toggle") === "tab") {
          // Get the new tab pane
          let newTabPaneTarget = newTab.getAttribute("href");
          let newTabPane = document.querySelector(newTabPaneTarget);

          activeTab.classList.remove("active");
          activeTabPane.classList.remove("active");
          newTab.classList.add("active");
          newTabPane.classList.add("active");
        }

        e.preventDefault();
      });
    }
  }

  module.exports = Tabs;
})();
