(function() {
  "use strict";
  const ConfirmDialog = require("../../common/ConfirmDialog/ConfirmDialog");

  class AboutWindow {
    static show() {
      ConfirmDialog.confirmSet({
        title: `Boats Animator ${nw.App.manifest.version}`,
        icon: "info",
        text: `
        Boats Animator is a free, open-source stop motion animation program.\n
        © 2020 Charlie Lee
        `,
        buttons: {
          license: {
            text: "License",
            value: "license",
            closeModal: false
          },
          credits: {
            text: "Credits",
            value: "credits",
            closeModal: false
          },
          website: {
            text: "Website",
            value: "website",
            closeModal: false
          }
        }
      })
      .then((response) => {
        switch(response) {
          case "license":
            utils.openURL('https://github.com/charlielee/boats-animator/blob/master/LICENSE');
            break;
          case "credits":
            utils.openURL('https://github.com/charlielee/boats-animator/graphs/contributors');
            break;
          case "website":
            utils.openURL('https://www.charlielee.uk/boats-animator');
            break;
        }
      });
    }
  }

  module.exports = AboutWindow;
}());