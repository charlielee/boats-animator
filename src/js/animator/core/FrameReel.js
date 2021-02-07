(function() {
  "use strict";
  let body = document.body;
  var frameReelArea = document.querySelector("#area-frame-reel");
  var frameReelMsg = document.querySelector("#area-frame-reel > p");
  var frameReelRow = document.querySelector("#area-frame-reel #reel-captured-imgs");
  var frameReelTable = document.querySelector("#area-frame-reel table");

  var btnLiveView = document.querySelector("#btn-live-view");
  var liveViewFrameNo = document.querySelector("#live-view-frame-no");

  class FrameReel {
    constructor() {
      // The id of the currently selected frame
      this.curSelectedFrame = null;
      // Total number of frames in the frame reel
      this.totalFrames = 0;
      // Whether the live view button is selected or not
      this.liveViewButtonSelected = false;

      body.setAttribute("data-has-frames", "false");
    }

    /**
     * Adds a frame to the frame reel.
     * @param {integer} id The id of the frame to add (note ids should start at 1).
     */
    addFrame(id) {
      // Deselect the currently selected frame
      this._deselectFrame();

      // Insert the new frame into the reel
      frameReelRow.insertAdjacentHTML("beforeend", `<td><div class="frame-reel-preview">
    <div class="frame-reel-no" title="Frame ${id}">${id}</div>
    <div class="frame-reel-img" id="img-${id}" title="Frame ${id}">
    </div></div></td>`);
      this.totalFrames++;

      // Update frame numbers
      this._updateFrameNos();

      // Hide no frames message
      this._showNoFramesMessage(false);
      body.setAttribute("data-has-frames", "true");
    }

    /**
     * Sets the thumbnail of a frame reel item.
     * @param {Number} id The id of the frame to add (note ids should start at 1).
     * @param {Blob} imageSrc The imageSrc of the frame.
     */
    setFrameThumbnail(id, imageSrc) {
      document.querySelector(`#img-${id}`).style.backgroundImage = `url("${imageSrc}")`;
    }

    /**
     * Removes a frame from the frame reel.
     * @param {integer} id The id of the frame to remove (note ids should start at 1).
     */
    removeFrame(id) {
      // Deselect the currently selected frame
      this._deselectFrame();

      frameReelRow.removeChild(frameReelRow.children[id - 1]);
      this.totalFrames--;

      // Show the "No frames captured" message
      if (this.totalFrames === 0) {
        this._showNoFramesMessage();
        body.setAttribute("data-has-frames", "false");
      }

      // Update frame numbers
      this._updateFrameNos();
    }

    /**
     * Highlights and scrolls to a given frame on the frame reel.
     * @param {integer} id The id of the frame to highlight and scroll to (note ids should start at 1).
     */
    selectFrame(id) {
      // Deselect the currently selected frame
      this._deselectFrame();
      this.selectLiveViewButton(false);

      // Highlight the chosen frame
      document.querySelector(`.frame-reel-img#img-${id}`).classList.add("selected");
      this.curSelectedFrame = id;

      // Scroll the chosen frame into view
      this._scrollToFrame(id);
    }

    /**
     * Chooses whether an outline should be displayed around the live view button.
     * @param {boolean} select Set to true to select the live view button,
     *                         false to deselect it.
     */
    selectLiveViewButton(select = true) {
      this.liveViewButtonSelected = select;

      if (select) {
        this._deselectFrame();
        this._scrollToLiveView();
      }
      btnLiveView.classList.toggle("selected", select);
    }

    /**
     * Deselects the currently selected frame on the frame reel.
     */
    _deselectFrame() {
      var selectedFrame = document.querySelector(".frame-reel-img.selected");
      if (selectedFrame) {
        selectedFrame.classList.remove("selected");
        this.curSelectedFrame = null;
        return true;
      }
      return false;
    }

    /**
     * Indicates whether the "No frames captured" message should be displayed or not.
     * @param {boolean} show True to show the message, false to hide it (default true)
     */
    _showNoFramesMessage(show = true) {
      if (show) {
        frameReelMsg.classList.remove("hidden");
        frameReelTable.classList.add("hidden");
      } else {
        frameReelMsg.classList.add("hidden");
        frameReelTable.classList.remove("hidden");
      }
    }

    /**
     * Scrolls the frame reel to make a given frame id visible.
     * @param {integer} id The id of the frame to show.
     */
    _scrollToFrame(id) {
      // Scroll so currently played frame is in view
      document.querySelector(`.frame-reel-img#img-${id}`).parentNode.scrollIntoView();
    }

    /**
     * Scrolls the frame reel to show the live view button.
     */
    _scrollToLiveView() {
      // Scroll the frame reel to the end
      frameReelArea.scrollLeft = frameReelArea.scrollWidth;
    }

    /**
     * Updates all of the frame numbers.
     */
    _updateFrameNos() {
      // Get all of the frame reel items
      let frameReelItems = document.querySelectorAll(`#reel-captured-imgs .frame-reel-preview`);
      frameReelItems.forEach(function(item, index) {
        item.children[0].setAttribute("title", `Frame ${index + 1}`);
        item.children[0].innerText = index + 1;
        item.children[1].id = `img-${index + 1}`;
        item.children[1].setAttribute("title", `Frame ${index + 1}`);
      });

      // Update the last frame number above the live view button
      liveViewFrameNo.innerText = this.totalFrames + 1;
    }
  }

  module.exports = FrameReel;
}());