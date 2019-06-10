(function() {
  "use strict";
  const btnLiveView = document.querySelector("#btn-live-view");
  const frameReelRowObj = document.querySelector("#area-frame-reel #reel-captured-imgs");

  class FrameReelRow {
    static setListeners() {
      // Switch from frame preview back to live view
      btnLiveView.addEventListener("click", function() {
        global.projectInst.setCurrentMode("capture");
      });

      // Preview a captured frame
      frameReelRowObj.addEventListener("click", function(e) {
        if (e.target.className === "frame-reel-img") {
          if (global.projectInst.getCurrentMode() !== "playback") {
            global.projectInst.setCurrentMode("playback");
          }

          // Display the selected frame
          var imageID = parseInt(e.target.id.match(/^img-(\d+)$/)[1], 10);
          global.projectInst.playback._displayFrame(imageID);
        }
      });
    }
  }

  module.exports = FrameReelRow;
})();