var preview = document.querySelector("#preview");
var playback = document.querySelector("#playback");
var context = playback.getContext("2d");

class PlaybackCanvas {
  /**
   * Draws an image onto the playback canvas.
   * @param {Image} img The image to display on the canvas.
   */
  static drawImage(img) {
    context.drawImage(img, 0, 0, preview.videoWidth, preview.videoHeight);
  }

  /**
   * Updates the dimensions of the playback canvas.
   * @param {Number} width The new width of the playback canvas.
   * @param {Number} height The new height of the playback canvas.
   */
  static setDimensions(width, height) {
    playback.setAttribute("width", width);
    playback.setAttribute("height", height);
  }
}

module.exports = PlaybackCanvas;