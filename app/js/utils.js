const utils = (function() {
  "use strict";
  let devLiveReloadScript = document.querySelector("#dev-reload-script"),
      liveReload          = false;

  // Get live reload setting from current session
  if (sessionStorage.getItem("ba-dev-live-reload")) {
    liveReload = (sessionStorage.getItem("ba-dev-live-reload") === "true");
    setLiveReload(liveReload);
  }

  /**
   * Open a URL in the user's browser.
   *
   * @param {String} url - The URL to open.
   */
  function openURL(url) {
    nw.Shell.openExternal(url);
  }

  /**
   * Sets whether to live reload or not (for development purposes).
   * 
   * @param {boolean} reload - Set to true to enable live reloading.
   */
  function setLiveReload(reload) {
    // Update script tag src
    devLiveReloadScript.src = (reload ? "../node_modules/nw-dev/lib/dev.js" : "");

    // Update session storage item
    sessionStorage.setItem("ba-dev-live-reload", reload);
  }

  return {
    openURL: openURL,
    setLiveReload: setLiveReload
  };
}());
