(function () {
  // Whether audio should be played or not
  var audioEnabled = true;

  /** Class for controlling audio playback */
  class AudioManager {
    /**
     * Plays an audio file from a specified path.
     * @param {String} filePath The location of the file.
     */
    static play(filePath) {
      if (audioEnabled) {
        var audio = new Audio(filePath);
        audio.play();
      }
    }

    /**
     * Sets whether audio should be played or not.
     * @param {Boolean} enabled True means audio should be played,
     *                          false means it should not.
     */
    static setEnabled(enabled) {
      audioEnabled = enabled;
    }

    /**
     * Get whether audio is currently enabled or not.
     */
    static getEnabled() {
      return audioEnabled;
    }
  }

  module.exports = AudioManager;
}());