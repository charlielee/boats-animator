module.exports = {};

(function() {
    "use strict";
  
    const gui = require("nw.gui"),
          win = gui.Window.get();
  
    /**
     * Open a URL in the user's browser.
     *
     * @param {String} url - The URL to open.
     */
    function openURL(url) {
       gui.Shell.openExternal(url);
    }
  
    /**
     * Open the browser developer tools.
     */
    function showDev() {
      // TODO Because nw.js 0.13 only has the dev tools in the
      // SDK build and not release build, we will need to make sure
      // this method exists when before running it when we upgrade
      win.showDevTools();
    }

    /**
     * Reload the current page.
     */
    function reloadPage() {
      win.reloadDev();
    }

    module.exports.openURL    = openURL;
    module.exports.reloadPage = reloadPage;
    module.exports.showDev    = showDev;
}());
