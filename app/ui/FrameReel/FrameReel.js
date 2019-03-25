var frameReelArea = document.querySelector("#area-frame-reel");
var frameReelMsg = document.querySelector("#area-frame-reel > p");
var frameReelRow = document.querySelector("#area-frame-reel #reel-captured-imgs");
var frameReelTable = document.querySelector("#area-frame-reel table");

var btnLiveView = document.querySelector("#btn-live-view");
var liveViewframeNo = document.querySelector("#live-view-frame-no");

// todo
class FrameReel {
  constructor() {
    // The id of the currently selected frame
    this.curSelectedFrame = null;
    // Whether the live view button is selected or not
    this.liveViewButtonSelected = false;
  }

  /**
   * Adds a frame to the frame reel.
   * @param {integer} id The id of the frame to add (note ids should start at 1).
   */
  addFrame(id) {
    // Deselect the currently selected frame
    this._deselectFrame();

  }

  /**
   * Removes a frame from the frame reel.
   * @param {integer} id The id of the frame to remove (note ids should start at 1).
   */
  removeFrame(id) {

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
    curSelectedFrame = id;
  }

  /**
   * Deselects the currently frame on the frame reel.
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
   * Chooses whether an outline should be displayed around the live view button.
   * @param {boolean} select Set to true to select the live view button,
   *                         false to deselect it.
   */
  selectLiveViewButton(select) {
    this.liveViewButtonSelected = select;
    btnLiveView.classList.toggle("selected", select);
  }
}

module.exports = FrameReel;