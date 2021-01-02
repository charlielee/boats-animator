(function() {
  "use strict";
  const { ipcRenderer } = require("electron");
  const Shortcuts = require("../core/Shortcuts");


  // Library imports
  var swal = require("sweetalert");

  class ConfirmDialog {
    /**
     * Creates a dialogue box
     * @param {Object} swalArgs The SweetAlert arguments to use.
     * @returns {Promise} Returns a Promise with the outcome of the dialogue.
     *                    Resolves true if confirm was selected and null if the alert was dismissed.
     */
    static confirmSet(swalArgs) {
      // Set default SweetAlert argument values
      swalArgs.title = swalArgs.title ? swalArgs.title : "Confirm";
      swalArgs.text = swalArgs.text ? swalArgs.text : "Are you sure?";
      swalArgs.icon = swalArgs.icon ? swalArgs.icon : "warning";

      if (!("button" in swalArgs)) {
        swalArgs.buttons = swalArgs.buttons ? swalArgs.buttons : true;
      }

      // Pause main shortcuts and menubar items
      Shortcuts.pause();
      ipcRenderer.send("menubar:toggle-items", false);

      return new Promise(function(resolve, reject) {
        // Create a SweetAlert dialogue with the selected arguments
        swal(swalArgs)
          .then((response) => {
            swal.stopLoading();

            // Resume main shortcuts and menubar items
            Shortcuts.unpause();
            ipcRenderer.send("menubar:toggle-items", true);

            // Resolve the promise
            resolve(response);
          });
      });
    }
  }

  module.exports = ConfirmDialog;
}());
