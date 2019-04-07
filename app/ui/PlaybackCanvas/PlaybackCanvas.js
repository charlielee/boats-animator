var preview = document.querySelector("#preview");
var playback = document.querySelector("#playback");
var context = playback.getContext("2d");

class PlaybackCanvas {
  constructor() {
  }

  getSrc() {
    return playback.toDataURL("image/png");
  }

  drawImage(imgSrc) {
    context.drawImage(imgSrc, 0, 0, preview.videoWidth, preview.videoHeight);
  }

  setDimensions(width, height) {
    playback.setAttribute("width", width);
    playback.setAttribute("height", height);
  }
}