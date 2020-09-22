const utils = (function() {
  "use strict";

  /**
   * Open a URL in the user's browser.
   *
   * @param {String} url - The URL to open.
   * @returns {void}
   */
  function openURL(url) {
    nw.Shell.openExternal(url);
  }

  return {
    openURL: openURL
  };
}());
