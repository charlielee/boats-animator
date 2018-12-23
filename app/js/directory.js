module.exports = {};

(function() {
  "use strict";

  const fs = require("fs");
  const path = require("path");
  const FILTERED_FILES = ["thumbs.db", "ehthumbs.db", "desktop.ini", ".ds_store"];


  function getDirectoryContents(dir) {
    let dirInfo = fs.readdirSync(dir, {withFileTypes: true});

    // Get all the images in the directory,
    // filtering out image-related files and all directories
    dirInfo = dirInfo.filter(function(file) {
      return !FILTERED_FILES.includes(file.name) && !file.isDirectory();
    });

    // Get absolute paths to each file
    const frames = dirInfo.map(file => {
      let img = new Image();
      img.src = file.name;
      return img;
    });

    return {
      total: frames.length,
      files: frames
    };
  }


  // Public exports
  module.exports.getDirectoryContents = getDirectoryContents;
}());
