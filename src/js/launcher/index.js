(function() {
  "use strict";

  const newsFeed = require("./js/launcher/NewsFeed");
  const qAppVersion = document.querySelector("#app-version");
  const { ipcRenderer } = require('electron');

  // Get the version number from the manifest file
  qAppVersion.innerHTML =  require('../package').version;

  // Display the latest news
  newsFeed.load("http://charlielee.uk/feed/boats-animator.json");

  /**
   * Occurs when "New Project" is pressed.
   * @returns {void}
   */
  function openAnimator() {
    ipcRenderer.send('win:switch-window', 'animator');
  }

  // Open the animator
  document.querySelector("#new-project").addEventListener("click", openAnimator);
}());
