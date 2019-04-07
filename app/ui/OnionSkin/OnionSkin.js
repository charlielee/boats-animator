var onionSkinWindow = document.querySelector("#onion-skinning-frame");
var onionSkinSlider = document.querySelector("#input-onion-skin-opacity");

class OnionSkin {
  constructor() {
    // Listens to changes to the onion skin slider
    // onionSkinSlider.addEventListener("input", OnionSkin._setOpacityFromSlider);
  }

  /**
   * Sets the opacity of the onion skin window.
   * @param {integer} opacity - The opacity level of the window (value between 0 and 100).
   */
  static setOpacity(opacity) {
    onionSkinWindow.style.opacity = Math.abs(opacity / 100);
    onionSkinSlider.setAttribute("title", `${amount}%`);

    // Make it easier to switch off onion skinning
    if (amount >= -6 && amount <= 6) {
      onionSkinWindow.style.opacity = 0;
      onionSkinSlider.value = 0;
      onionSkinSlider.setAttribute("title", "0%");
    }
  }

  /**
   * Sets the image to display in the onion skin window.
   * @param {blob} imageSrc - The imageSrc of the frame.
   */
  static setFrame(imageSrc) {
    onionSkinWindow.setAttribute("src", imageSrc);
  }

  /**
   * Clears the frame in onion skin window.
   */
  static clear() {
    onionSkinWindow.removeAttribute("src");
  }

  /**
   * Sets opacity of the onion skin window when the slider is moved.
   * @param {Object} e - Event object from addEventListener.
   */
  static _setOpacityFromSlider(e) {
    var amount = e.target.value;
    OnionSkin.setOpacity(amount);
  }
}

module.exports = OnionSkin;