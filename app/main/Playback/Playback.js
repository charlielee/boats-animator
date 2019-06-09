const btnLoop = document.querySelector("#btn-loop");
const btnPlayPause = document.querySelector("#btn-play-pause");

class Playback {
  constructor(project) {
    this.project = project;

    this.curPlayFrame = 0;
    this.isLooping = false;
    this.isPlaying = false;
    this.playBackRAF = null;
    this.playBackTimeout = null;

    // Add the event listeners
    PlaybackControls.setListeners(this);
  }
  /**
   * Toggle captured frames preview looping.
   */
  toggleVideoLoop() {
    // Disable looping
    if (this.isLooping) {
      this.isLooping = false;
      btnLoop.children[0].classList.remove("active");

      // Enable looping
    } else {
      this.isLooping = true;
      btnLoop.children[0].classList.add("active");
    }

    console.info(`Loop playback: ${this.isLooping}`);
  }

  /**
   * Pause captured frames preview video.
   */
  videoPause() {
    // Only pause if needed
    if (this.isPlaying) {
      this.isPlaying = false;
      cancelAnimationFrame(this.playBackRAF);
      clearTimeout(this.playBackTimeout);

      // Change the play/pause button
      btnPlayPause.children[0].classList.remove("fa-pause");
      btnPlayPause.children[0].classList.add("fa-play");
      console.info("Playback paused");
    }
  }

  /**
   * Fully stop captured frames preview video.
   */
  videoStop() {
    this.videoPause();
    this.curPlayFrame = 0;
    if (this.project.currentTake.getTotalFrames() > 0 && PreviewArea.curWindow === PlaybackWindow) {
      _displayFrame(this.project.currentTake.getTotalFrames());
    }
    console.info("Playback stopped");
  }

  /**
   * Pause playback and view a specific frame in the preview area.
   *
   * @param {Integer} id - The frame ID to preview.
   */
  _displayFrame(id) {
    if (this.project.currentTake.getTotalFrames() > 0) {
      // Reset the player
      videoPause();

      // Preview selected frame ID
      this.project.currentTake.frameReel.selectFrame(id);
      PlaybackCanvas.drawImage(this.project.currentTake.capturedFrames[id - 1]);
      StatusBar.setCurrentFrame(id);
    }

    // Set the current play frame
    this.curPlayFrame = id - 1;
  }

  /**
   * Play captured frames preview video.
   */
  _videoPlay() {
    this.playBackTimeout = setTimeout(function () {
      this.playBackRAF = requestAnimationFrame(_videoPlay);

      // There are no more frames to preview
      if (this.curPlayFrame >= this.project.currentTake.getTotalFrames()) {
        // We are not looping, stop the playback
        if (!this.isLooping) {
          this.project.setCurrentMode("capture");
          return;
        }

        // Loop the playback
        console.info("Playback looped");
        this.curPlayFrame = 0;
      }

      // Display each frame and update the UI accordingly
      PlaybackCanvas.drawImage(this.project.currentTake.capturedFrames[this.curPlayFrame]);
      StatusBar.setCurrentFrame(this.curPlayFrame + 1);
      this.project.currentTake.frameReel.selectFrame(this.curPlayFrame + 1);

      this.curPlayFrame++;
    }, 1000 / projectInst.frameRate.getFrameRateValue());
  }

  /**
   * Preview the captured frames.
   */
  previewCapturedFrames() {
    // Display playback window
    if (PreviewArea.curWindow === CaptureWindow) {
      this.project.setCurrentMode("playback");
      this.curPlayFrame = 0;
    }

    // Reset canvas to first frame if playing from start
    if (this.curPlayFrame == 0) {
      PlaybackCanvas.drawImage(this.project.currentTake.capturedFrames[0]);
    }

    // Update the play/pause button
    btnPlayPause.children[0].classList.remove("fa-play");
    btnPlayPause.children[0].classList.add("fa-pause");

    // Begin playing the frames
    console.info("Playback started");
    this.isPlaying = true;
    _videoPlay();
  }
}