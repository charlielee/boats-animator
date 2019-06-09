(function() {
  "use strict";
  const btnLiveView = document.querySelector("#btn-live-view");
  const frameReelRowObj = document.querySelector("#area-frame-reel #reel-captured-imgs");

  class FrameReelRow {
    static setListeners(project) {
      // Switch from frame preview back to live view
      btnLiveView.addEventListener("click", function() {
        project.setCurrentMode("capture");
      });

      // Preview a captured frame
      frameReelRowObj.addEventListener("click", function(e) {
        if (e.target.className === "frame-reel-img") {
          if (project.getCurrentMode() !== "playback") {
            project.setCurrentMode("playback");
          }

          // Display the selected frame
          var imageID = parseInt(e.target.id.match(/^img-(\d+)$/)[1], 10);
          project.playback._displayFrame(imageID);
        }
      });
    }
  }

  module.exports = FrameReelRow;
})();