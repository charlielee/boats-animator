(function() {
  "use strict";

  /**
   * Provides additional features to any range elements
   */
  class Slider {
    static initialise() {
      document.querySelectorAll("input[type=range").forEach((el) => {
        Slider.setDualColorRange(el, "var(--ba-lightred)");

        // Hoverover
        el.addEventListener("mouseover", () => {
          Slider.setDualColorRange(el, "var(--ba-lightred-hover)");
        });

        // Drag start
        el.addEventListener("pointerdown", () => {
          Slider.setDualColorRange(el, "var(--ba-lightred-active)");
        });

        // Drag in progress
        el.addEventListener("input", () => {
          Slider.setDualColorRange(el, "var(--ba-lightred-active)");
        });

        // Drag finish
        el.addEventListener("pointerup", () => {
          Slider.setDualColorRange(el, "var(--ba-lightred)");
        });
        el.addEventListener("pointerleave", () => {
          Slider.setDualColorRange(el, "var(--ba-lightred)");
        });
        el.addEventListener("touchend", () => {
          Slider.setDualColorRange(el, "var(--ba-lightred)");
        });
      });
    }

    /**
     * Enable left side of slider to be different background color to right
     * @param {HTMLElement} el The element to update
     * @param {String} color The color to make the left side of the slider
     */
    static setDualColorRange(el, color) {
      let range = el.max - el.min;
      let positionFromStart = el.value - el.min;
      let percentage = (positionFromStart / range) * 100;

      el.style.backgroundImage = `linear-gradient(
        to right,
        ${color} 0%,
        ${color} ${percentage}%,
        var(--ba-border-active) ${percentage}%,
        var(--ba-border-active) 100%
      )`;
    }
  }


  module.exports = Slider;
}());