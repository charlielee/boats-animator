const utils = (function() {
  "use strict";

  // Get live reload setting from current session
  let liveReload = sessionStorage.getItem("ba-dev-live-reload");
  if (liveReload) {
    setLiveReload(liveReload === "true");
  }

  /**
   * Open a URL in the user's browser.
   *
   * @param {String} url - The URL to open.
   * @returns {void}
   */
  function openURL(url) {
    nw.Shell.openExternal(url);
  }

  /**
   * Enable live code reloading for development purposes.
   *
   * @param {Boolean} [reload=true] - Set to false to disable.
   * @returns {void}
   */
  function setLiveReload(reload=true) {
    document.querySelector("#dev-reload-script").src = (
      reload ? "../node_modules/nw-dev/lib/dev.js" : "");
    sessionStorage.setItem("ba-dev-live-reload", `${reload}`);
  }

  return {
    openURL: openURL,
    setLiveReload: setLiveReload
  };
}());
