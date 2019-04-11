// Main imports
var Take = require("../../main/Take/Take");

/** Represents a project (a series of takes) */
class Project {
  /**
   * Constructor for a project.
   * @param {String} title The project's title
   */
  constructor(title) {
    // this.frameRate = new FrameRate(15);
    // this.saveDirectory = new SaveDirectory("/some/file/location");
    this.title = title;
    this.takes = [];
  }

  /**
   * Adds a take to the project.
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

  /**
   * Updates the project frame rate
   * @param {Number} newFrameRate 
   */
  setFrameRate(newFrameRate) {
    // todo
  }

  /**
   * Returns the frame rate of the project.
   */
  getFrameRate() {
    // todo
  }
}

module.exports = Project;