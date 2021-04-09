(function() {
  "use strict";
  var onionSkinWindow = document.querySelector("#onion-skinning-frame");
  var onionSkinSlider = document.querySelector("#input-onion-skin-opacity");

  /** Class for the onion skin feature. */
  class OnionSkin {
    constructor() {
      var onionSkinThis = this;
      // Listens to changes to the onion skin slider
      onionSkinSlider.addEventListener("input", function(e) {
        onionSkinThis._setOpacityFromSlider(e);
      });
    }

    /**
     * Sets the opacity of the onion skin window.
     * @param {integer} amount - The opacity level of the window (value between 0 and 100).
     */
    setOpacity(amount) {
      onionSkinWindow.style.opacity = Math.abs(amount / 100);
      onionSkinSlider.setAttribute("title", `Onion Skin ${amount}%`);

      // Make it easier to switch off onion skinning
      if (amount >= -6 && amount <= 6) {
        onionSkinWindow.style.opacity = 0;
        onionSkinSlider.value = 0;
        onionSkinSlider.setAttribute("title", "Onion Skin 0%");
      }
    }

    /**
     * Sets the image to display in the onion skin window.
     * @param {blob} imageSrc - The imageSrc of the frame.
     */
    setFrame(imageSrc) {
      onionSkinWindow.setAttribute("src", imageSrc);
    }

    /**
     * Clears the frame in onion skin window.
     */
    clear() {
      onionSkinWindow.removeAttribute("src");
    }

    /**
     * Hide/show the onion skin window
     * @param {Boolean} status Set to true to show the window
     */
    setVisibility(status = true) {
      onionSkinWindow.classList.toggle("hidden", !status);
    }

    /**
     * Sets opacity of the onion skin window when the slider is moved.
     * @param {Object} e - Event object from addEventListener.
     */
    _setOpacityFromSlider(e) {
      var amount = e.target.value;
      this.setOpacity(amount);
    }
  }

  module.exports = OnionSkin;
}());