// Main imports
var Take = require("../../main/Take/Take");
var SaveDirectory = require("../../main/SaveDirectory/SaveDirectory");

// UI imports
var FrameRate = require("../../ui/FrameRate/FrameRate");

// Mode switching
const btnLiveView = document.querySelector("#btn-live-view");
const CaptureWindow = new PreviewArea(document.querySelector("#capture-window"));
const PlaybackWindow = new PreviewArea(document.querySelector("#playback-window"));

/** Represents a project (a series of takes) */
class Project {
  /**
   * Constructor for a project.
   * @param {String} title The project's title
   */
  constructor(title) {
    this.frameRate = new FrameRate(15);
    this.currentTake = null;
    this.saveDirectory = new SaveDirectory(SaveDirectory.getLocalStorageDir());
    this.title = title;
    this.takes = [];
  }

  /**
   * The event listeners for a project
   */
  setListeners() {

  }

  /**
   * Adds a Take to the project.
   * Returns the new Take.
   */
  addTake() {
    var takeNumber = this.takes.length + 1;
    var take = new Take(takeNumber, this.saveDirectory);
    this.takes.push(take);
    return take;
  }

  /**
   * Gets a take by a given take number.
   * @param {Number} takeNumber The number of the take to retrieve.
   */
  getTake(takeNumber) {
    this.currentTake = this.takes[takeNumber - 1];
    return this.currentTake;
  }
}

module.exports = Project;