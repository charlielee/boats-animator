/**
 * @type {Object}
 * Boats Animator-specific details
 */
document.BoatsAnimator = {
  /**
   * Provide abstract access to common DOM elements.
   *
   * @param   {String} elementName Key to access common variables.
   * @returns {String} jQuery/querySelector* compatible selector.
   */
  getVariable: function(elementName) {
    var variables = {
      onionSkinToggle: "#btn-onion-skin-toggle",
      onionSkinOptions: "#options-onion-skin",
      onionSkinFrame: "#onion-skinning-frame",
      inputFRChange: "#input-fr-change"
    };
    return variables[elementName];
  }
};
