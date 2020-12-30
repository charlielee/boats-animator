(async function() {
  "use strict";
  const { ipcRenderer } = require('electron');

  const newsFeed = require("./js/launcher/NewsFeed");
  const Notification = require("./js/common/Notification");

  const newProjectBtn = document.querySelector("#new-project");
  const loadProjectBtn = document.querySelector("#load-project");
  const qAppVersion = document.querySelector("#app-version");

  // Get the version number from the manifest file
  qAppVersion.innerHTML = require('../package').version;

  // Display the latest news
  newsFeed.load("http://charlielee.uk/feed/boats-animator.json");

  // Open the animator when new project is pressed
  newProjectBtn.addEventListener("click", () => {
    ipcRenderer.send('win:switch-window', 'animator');
  });

  // Display error notification when "Open Project is selected"
  loadProjectBtn.addEventListener("click", () => {
    Notification.info("This feature is not yet available!");
  });

  // Display development mode notification
  let isPackaged = await ipcRenderer.invoke('app:is-packaged');
  
  if (!isPackaged) {
    Notification.info("Boats Animator has been started in development mode.")
  }
}());
