const utils = (function() {
    "use strict";

    const win = nw.Window.get();

    /**
     * Open a URL in the user's browser.
     *
     * @param {String} url - The URL to open.
     */
    function openURL(url) {
        nw.Shell.openExternal(url);
    }

    return {
        openURL: openURL
    };
}());
