module.exports = {};

(function() {
    "use strict";
    var fs = require("fs");

    /**
     * Update the callback object to add missing repsonse methods.
     * This works by using an empty function for the empty property.
     *
     * @param {Object} callback - The original callback object.
     * @returns {Object} The revised callback object.
     */
    function update(callback) {
        function noop() { }

        if (!callback.success) {
            callback.success = noop;
        }
        if (!callback.error) {
            callback.error = noop;
        }

        return callback;
}

    /**
     * Delete a file from the hard drive.
     *
     * @param {String} file - Absolute path to the file to be deleted.
     * @param {Object} callback - The callback object.
     * @param {Function} callback.success - The success callback.
     * @param {Function} callback.error - The error callback.
     */
    function deleteFile(file, callback) {
        callback = update(callback);

        fs.unlink(file, function(err) {
            if (err) {
                throw err;
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
     */
    function readFile(file, callback) {
        callback = update(callback);

        fs.readFile(file, "utf8", function(err, data) {
            if (err) {
                throw err;
                callback.error();
            } else {
                console.log(`Successfully read ${file}`);
                callback.success(data);
            }
        });
    }

    /**
     * Write a file to the hard drive.
     *
     * @param {String} file - Absolute path to the file to be saved.
     * @param {Binary} data - The file data to br written.
     * @param {Object} callback - The callback object.
     * @param {Function} callback.success - The success callback.
     * @param {Function} callback.error - The error callback.
     */
    function writeFile(file, data, callback) {
        callback = update(callback);

        fs.writeFile(file, data, function(err) {
            if (err) {
                throw err;
                callback.error();
            } else {
                console.log(`Successfully written ${file}`);
                callback.success();
            }
        });
    }

    // Public exports
    module.exports.read   = readFile;
    module.exports.write  = writeFile;
    module.exports.delete = deleteFile;
}());
