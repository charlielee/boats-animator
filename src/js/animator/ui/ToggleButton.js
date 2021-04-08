(function() {
  "use strict";
  class ToggleButton {
    /**
     * Defines a toggle button element
     * @param {element} container The container of the button.
     * @param {*} toggleMethod The element to excute on toggling
     * @param {*} status The initial state of the button (default: false/off).
     */
    constructor(container, toggleMethod, status = false) {
      // The element to contain the toggle button
      this.container = container;
      // The method to execute on toggleing
      this.toggleMethod = toggleMethod;
      // The current status of the toggle button
      this.status = status;
      // Initialise the button
      this.toggle(this.status);

      // Add an event listener
      let self = this;
      container.addEventListener("click", function() {
        self.toggle();
      });
    }

    /**
     * Toggles the state of the button.
     * @param {boolean} status The on/off status to set on the button (default: toggle the current state).
     */
    toggle(status = !this.status) {
      this.status = status;
      if (this.status) {
        this.container.innerHTML = "<i class='fa fa-toggle-on' title='Toggle off' style='font-size: 1.5em; cursor: pointer; color: var(--ba-red);'></i>";
      } else {
        this.container.innerHTML = "<i class='fa fa-toggle-off' title='Toggle on' style='font-size: 1.5em; cursor: pointer;'></i>";
      }

      // Execute the toggle method
      this.toggleMethod();

      // Returns the current state of the button
      return this.status;
    }
  }

  module.exports = ToggleButton;
})();