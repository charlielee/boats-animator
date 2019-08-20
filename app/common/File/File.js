module.exports = {};

(function() {
  "use strict";
  const fs = require("fs");

  /**
   * Update the callback object to add missing repsonse methods.
   * This works by using an empty function for the empty property.
   *
   * @param {!Object} callback - The original callback object.
   * @returns {Object} The revised callback object.
   */
  function update(callback) {
    function noop() {}

    if (!callback) {
      callback = {};
    }
    if (!callback.success) {
      callback.success = noop;
    }
    if (!callback.error) {
      callback.error = noop;
    }

    return callback;
  }

  /**
   * Copy a file on the hard drive.
   *
   * @param {String} oldPath - Absolute path to the file to be copied.
   * @param {String} newPath - Absolute path to the file to be created.
   * @param {Object} callback - The callback object.
   * @param {Function} callback.success - The success callback.
   * @param {Function} callback.error - The error callback.
   * @returns {void}
   */
  function copyFile(oldPath, newPath, callback) {
    callback = update(callback);

    var from = fs.createReadStream(oldPath),
      to = fs.createWriteStream(newPath);

    from.pipe(to);

    // An error occurred
    from.on("error", function(err) {
      console.error(err);
      console.error(`Unable to copy ${oldPath} to ${newPath}`);
    });

    // Copy process was a success
    to.on("close", function() {
      console.log(`Successfully copied ${oldPath} to ${newPath}`);
      callback.success();
    });
  }

  /**
   * Delete a file from the hard drive.
   *
   * @param {String} file - Absolute path to the file to be deleted.
   * @param {Object} callback - The callback object.
   * @param {Function} callback.success - The success callback.
   * @param {Function} callback.error - The error callback.
   * @returns {void}
   */
  function deleteFile(file, callback) {
    callback = update(callback);

    fs.unlink(file, function(err) {
      if (err) {
        console.error(err);
        callback.error();
      } else {
        console.log(`Successfully deleted ${file}`);
        callback.success();
      }
    });
  }

  /**
   * Read a file from the hard drive.
   *
   * @param {String} file - Absolute path to the file to be read.
   * @param {Object} callback - The callback object.
   * @param {Function} callback.success - The success callback,
   *                                      which will recieve the
   *                                      file contents.
   * @param {Function} callback.error - The error callback.
   * @returns {void}
   */
  function readFile(file, callback) {
    callback = update(callback);

    fs.readFile(file, "utf8", function(err, data) {
      if (err) {
        console.error(err);
        callback.error();
      } else {
        console.log(`Successfully read ${file}`);
        callback.success(data);
      }
    });
  }

  /**
   * Rename a file on the hard drive.
   *
   * @param {String} oldName - Absolute path to the file to the current file.
   * @param {String} newName - Absolute path to the file to the new file.
   * @param {Object} callback - The callback object.
   * @param {Function} callback.success - The success callback.
   * @param {Function} callback.error - The error callback.
   * @returns {void}
   */
  function renameFile(oldName, newName, callback) {
    // callback = update(callback);

    fs.rename(oldName, newName, function(err) {
      if (err) {
        console.error(err);
        callback(false);
        // callback.error();
      } else {
        console.log(`Successfully renamed ${oldName} to ${newName}`);
        callback(true)
        // callback.success();
      }
    });
  }

  /**
   * Rename a file on the hard drive.
   *
   * @param {String} oldName - Absolute path to the file to the current file.
   * @param {String} newName - Absolute path to the file to the new file. 
   */
  function renameFilePromise(oldName, newName) {
    return new Promise((resolve, reject) => {
      fs.rename(oldName, newName, function(err) {
        if (err) {
          reject(err);
        } else {
          console.log(`Successfully renamed ${oldName} to ${newName}`);
          resolve();
        }
      });
    });
  }

  /**
   * Write a file to the hard drive.
   *
   * @param {String} file - Absolute path to the file to be saved.
   * @param {*} data - The file data to be written.
   * @param {Object} callback - The callback object.
   * @param {Function} callback.success - The success callback.
   * @param {Function} callback.error - The error callback.
   * @returns {void}
   */
  function writeFile(file, data, callback) {
    callback = update(callback);

    fs.writeFile(file, data, function(err) {
      if (err) {
        console.error(err);
        callback.error();
      } else {
        console.log(`Successfully written ${file}`);
        callback.success();
      }
    });
  }


  // Public exports
  module.exports.copy = copyFile;
  module.exports.read = readFile;
  module.exports.write = writeFile;
  module.exports.rename = renameFile;
  module.exports.renamePromise = renameFilePromise;
  module.exports.delete = deleteFile;
}());