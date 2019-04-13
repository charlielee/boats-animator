// Main imports
var Take = require("../../main/Take/Take");
var SaveDirectory = require("../../main/SaveDirectory/SaveDirectory");

// UI imports
var FrameRate = require("../../ui/FrameRate/FrameRate");

/** Represents a project (a series of takes) */
class Project {
  /**
   * Constructor for a project.
   * @param {String} title The project's title
   */
  constructor(title) {
    this.frameRate = new FrameRate(15);
    this.saveDirectory = new SaveDirectory(SaveDirectory.getDir());
    this.title = title;
    this.takes = [];
  }

  /**
   * Adds a Take to the project.
   * Returns the new Take.
   */
  addTake() {
    var takeNumber = this.takes.length + 1;
    var take = new Take(takeNumber);
    this.takes.push(take);
    return take;
  }

  /**
   * Gets a take by a given take number.
   * @param {Number} takeNumber The number of the take to retrieve.
   */
  getTake(takeNumber) {
    return this.takes[takeNumber - 1];
  }
}

module.exports = Project;