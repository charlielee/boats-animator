(function () {
  // Main imports
  var shortcuts = require("../../main/Shortcuts/Shortcuts");
  var menubar = require("../../ui/MenuBar/MenuBar");

  // Library imports
  var swal = require("../../lib/sweetalert");

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
      swalArgs.buttons = swalArgs.buttons ? swalArgs.buttons : true;

      // Pause main shortcuts and menubar items
      shortcuts.remove("main");
      shortcuts.add("confirm");
      menubar.toggleItems();

      return new Promise(function (resolve, reject) {
        // Create a SweetAlert dialogue with the selected arguments
        swal(swalArgs)
          .then((response) => {
            // Resume main shortcuts and menubar items
            shortcuts.remove("confirm");
            shortcuts.add("main");
            menubar.toggleItems();

            // Resolve the promise
            resolve(response);
          });
      });
    }
  }

  module.exports = ConfirmDialog;
}());