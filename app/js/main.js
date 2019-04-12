// Indicates whether or not we're currently streaming
// video from the camera. Obviously, we start at false.
var streaming = false,

  // The various HTML elements we need to configure or control.
  preview = document.querySelector("#preview"),

  // NW.js
  win = nw.Window.get();

  // Main imports
  var Project = require("./main/Project/Project");
  var SaveDirectory = require("./main/SaveDirectory/SaveDirectory");

  // Main instances
  var projectInst = new Project("Untitled Project");
  var takeInst = projectInst.addTake();

  // UI imports
  var Notification = require("./ui/Notification/Notification");
  var PlaybackCanvas = require("./ui/PlaybackCanvas/PlaybackCanvas");
  var PreviewArea = require("./ui/PreviewArea/PreviewArea");
  var StatusBar = require("./ui/StatusBar/StatusBar");

  // Mode switching
  var btnLiveView = document.querySelector("#btn-live-view"),
  CaptureWindow = new PreviewArea(document.querySelector("#capture-window")),
  PlaybackWindow = new PreviewArea(document.querySelector("#playback-window")),

  // Camera
  Camera = require("./js/camera"),

  // Capture
  btnCaptureFrame = document.querySelector("#btn-capture-frame"),
  btnDeleteLastFrame = document.querySelector("#btn-delete-last-frame"),

  // Playback
  isPlaying = false,
  isLooping = false,
  curPlayFrame = 0,
  playBackRAF = null,
  playBackTimeout = null,
  btnStop = document.querySelector("#btn-stop"),
  btnLoop = document.querySelector("#btn-loop"),
  btnPlayPause = document.querySelector("#btn-play-pause"),
  btnFrameNext = document.querySelector("#btn-frame-next"),
  btnFramePrevious = document.querySelector("#btn-frame-previous"),
  btnFrameFirst = document.querySelector("#btn-frame-first"),
  btnFrameLast = document.querySelector("#btn-frame-last"),

  cameraSelect = document.querySelector("#camera-select-td select"),
  resolutionSelect = document.querySelector("#resolution-select-td select"),

  // Frame export
  curDirDisplay = document.querySelector("#currentDirectoryName"),

  // Frame reel
  frameReelRow = document.querySelector("#area-frame-reel #reel-captured-imgs"),

  // Node modules
  shortcuts = require("./js/shortcuts"),
  menubar = require("./js/menubar"),
  swal = require("./lib/sweetalert"),

  // Sidebar
  dirChooseDialog = document.querySelector("#chooseDirectory"),
  btnDirectoryChange = document.querySelector("aside #btn-dir-change");

/**
 * Occurs when "Main Menu" is pressed
 */
function openIndex() {
  "use strict";
  nw.Window.open("app/index.html", {
    position: "center",
    width: 730,
    height: 450,
    min_width: 730,
    min_height: 450,
    icon: "icons/icon.png"
  }, function(newWin) {
    win.close(true);
  });
}

/**
 * Occurs when "Main Menu" is pressed
 */
function openAbout() {
  "use strict";
  nw.Window.open("app/about.html", {
    position: "center",
    width: 650,
    height: 300,
    icon: "icons/icon.png",
    resizable: false,
  });
}

/**
 * Confirm prompt when animator is closed.
 */
win.on("close", function () {
  "use strict";
  confirmSet({text: "Are you sure you want to exit Boats Animator?"})
  .then((response) => {
    if (response) {
      closeAnimator();
    }
  });
});

function closeAnimator() {
  "use strict";
  win.close(true);
  nw.App.closeAllWindows();
}

function startup() {
  "use strict";
  let path = SaveDirectory.get();

  // There is no set save directory or the directory does not exist
  if (!path) {
    console.error("No save directory has been set!");
    SaveDirectory.set(null);
    _changeSaveDirectory();

    // There is a valid save directory
  } else {
    _displaySaveDirectory(path);
  }

  // Set default view
  switchMode(CaptureWindow);

  // Maximise window
  win.maximize();

  // Load the keyboard shortcuts
  shortcuts.get("default", function () {
    shortcuts.add("main");
    // Load top menu
    menubar.load();

    // Check the current save directory is clean
    SaveDirectory.checkDirHasNoFrames(path, function(hasFrames) {
      if (hasFrames) {
        confirmSet({
          title: "Warning",
          text: "The current save directory already contains captured frames! Please switch save directory or they will be overwritten.",
          buttons: ["Continue", "Change save directory"]
        })
        .then((response) => {
          if (response) {
            _changeSaveDirectory();
          }
        });
      }
    });
  });

  // Initialises the preview window
  preview.addEventListener("canplay", function () {
    if (!streaming) {
      PlaybackCanvas.setDimensions(preview.videoWidth.toString(), preview.videoHeight.toString())
      streaming = true;
    }
  });

  /* ======= Listeners ======= */

  // Get the resolutions for a camera upon changing it
  cameraSelect.addEventListener("change", function () {
    var curCam = Camera.getSelectedCamera();
    curCam.showResolutions();
  });

  // Reload the camera on changing resolution
  resolutionSelect.addEventListener("change", function () {
    var curCam = Camera.getSelectedCamera();
    var feed = curCam.updateResolution(Camera.getSelectedResolution());
    Camera.display(feed, preview);
  });

  // Refresh camera list when device changes are detected
  navigator.mediaDevices.addEventListener("devicechange", function (e) {
    Camera.enumerateDevices();
  });

  // Capture a frame
  btnCaptureFrame.addEventListener("click", takeFrame);

  // Undo last captured frame
  btnDeleteLastFrame.addEventListener("click", undoFrame);

  // Toggle preview looping
  btnLoop.addEventListener("click", _toggleVideoLoop);

  // Change the default save directory
  btnDirectoryChange.addEventListener("click", _changeSaveDirectory);

  // Choose save directory dialog
  dirChooseDialog.addEventListener("change", function () {
    if (this.value) {
      SaveDirectory.set(this.value);
      SaveDirectory.make(this.value);
      _displaySaveDirectory(this.value);
      SaveDirectory.checkDirHasNoFrames(this.value, function(hasFrames) {
        if (hasFrames) {
          confirmSet({
            text: "The current save directory already contains captured frames! Please switch save directory or they will be overwritten.",
            buttons: ["Continue", "Change save directory"]
          })
          .then((response) => {
            if (response) {
              _changeSaveDirectory();
            }
          });
        }
      });
    }
  });

  // Play/pause the preview
  btnPlayPause.addEventListener("click", function () {
    if (takeInst.getTotalFrames() > 0) {
      (isPlaying ? videoPause : previewCapturedFrames)();
    }
  });

  // Stop the preview
  btnStop.addEventListener("click", function () {
    if (PreviewArea.curWindow === PlaybackWindow) {
      videoStop();
    }
  });

  // Preview one frame to the right on framereel
  btnFrameNext.addEventListener("click", function () {
    if (takeInst.frameReel.curSelectedFrame) {
      if (takeInst.frameReel.curSelectedFrame !== takeInst.getTotalFrames()) {
        _displayFrame(takeInst.frameReel.curSelectedFrame + 1);
      } else {
        switchMode(CaptureWindow);
      }
    }
  });

  // Preview one frame to the left on framereel
  btnFramePrevious.addEventListener("click", function () {
    if (takeInst.frameReel.curSelectedFrame > 1) {
      _displayFrame(takeInst.frameReel.curSelectedFrame - 1);
    } else if (PreviewArea.curWindow === CaptureWindow && takeInst.getTotalFrames()) {
      switchMode(PlaybackWindow);
      _displayFrame(takeInst.getTotalFrames());
    }
  });

  // Preview first frame on framereel
  btnFrameFirst.addEventListener("click", function () {
    if (PreviewArea.curWindow === CaptureWindow && takeInst.getTotalFrames()) {
      switchMode(PlaybackWindow);
    }
    _displayFrame(1);
  });

  // Preview last frame on framereel
  btnFrameLast.addEventListener("click", function () {
    if (takeInst.frameReel.curSelectedFrame) {
      (takeInst.frameReel.curSelectedFrame !== takeInst.getTotalFrames() ? videoStop() : switchMode(CaptureWindow));
    }
  });

  // Switch from frame preview back to live view
  btnLiveView.addEventListener("click", function() {
    switchMode(CaptureWindow);
  });

  // Preview a captured frame
  frameReelRow.addEventListener("click", function (e) {
    if (e.target.className === "frame-reel-img") {
      if (PreviewArea.curWindow !== PlaybackWindow) {
        switchMode(PlaybackWindow);
      }

      // Display the selected frame
      var imageID = parseInt(e.target.id.match(/^img-(\d+)$/)[1], 10);
      _displayFrame(imageID);
    }
  });
}
window.onload = startup;

/**
 * Toggle between playback and capture windows.
 *
 * @param {PreviewArea} NewWindow - The PreviewArea window to switch to.
 * Possible values are CaptureWindow and PlaybackWindow.
 */
function switchMode(NewWindow) {
  "use strict";
  NewWindow.display();

  if (PreviewArea.curWindow === CaptureWindow) {
    videoStop();
    StatusBar.setCurrentFrame(takeInst.getTotalFrames() + 1);
    StatusBar.setMode("Capture");
    takeInst.frameReel.selectLiveViewButton();

  } else if (PreviewArea.curWindow === PlaybackWindow) {
    takeInst.frameReel.selectLiveViewButton(false);
    StatusBar.setMode("Playback");
  }

  console.log(`Switched to: ${NewWindow.el.id}`);
}

/**
 * Delete an individual frame.
 *
 * @param {Number} id The frame ID to delete.
 */
function deleteFrame(id) {
  "use strict";
  takeInst.deleteFrame(id);
  switchMode(CaptureWindow);
  console.info(`Total frames captured: ${takeInst.getTotalFrames()}`);
}

/**
 * Trigger frame capturing.
 * Prevents capturing if a save directory is not set.
 *
 * @returns {Boolean} True if a frame was captured, false otherwise.
 */
function takeFrame() {
  "use strict";
  // Prevent taking frames without a set output path
  if (!SaveDirectory.get()) {
    Notification.error("A save directory must be first set!");
    return false;
  }

  _captureFrame();
  return true;
}

/**
 * Delete the previously taken frame.
 */
function undoFrame() {
  "use strict";
  // Make sure there is a frame to delete
  if (takeInst.getTotalFrames() > 0) {
    // Display warning alert to confirm deletion
    confirmSet({text: "Are you sure you want to delete the last frame captured?"})
    .then((response) => {
      if (response) {
        deleteFrame(takeInst.getTotalFrames());
      }
    });
  } else {
    Notification.error("There is no previous frame to undo!");
  }
}

function _captureFrame() {
  "use strict";

  // Stop playback
  videoStop();

  switchMode(CaptureWindow);

  // Take a picture
  if (streaming) {
    takeInst.captureFrame();
  }
}

/**
 * Toggle captured frames preview looping.
 */
function _toggleVideoLoop() {
  "use strict";
  // Disable looping
  if (isLooping) {
    isLooping = false;
    btnLoop.children[0].classList.remove("active");

    // Enable looping
  } else {
    isLooping = true;
    btnLoop.children[0].classList.add("active");
  }

  console.info(`Loop playback: ${isLooping}`);
}

/**
 * Pause captured frames preview video.
 */
function videoPause() {
  "use strict";
  // Only pause if needed
  if (isPlaying) {
    isPlaying = false;
    cancelAnimationFrame(playBackRAF);
    clearTimeout(playBackTimeout);

    // Change the play/pause button
    btnPlayPause.children[0].classList.remove("fa-pause");
    btnPlayPause.children[0].classList.add("fa-play");
    console.info("Playback paused");
  }
}

/**
 * Fully stop captured frames preview video.
 */
function videoStop() {
  "use strict";
  videoPause();
  curPlayFrame = 0;
  if (takeInst.getTotalFrames() > 0 && PreviewArea.curWindow === PlaybackWindow) {
    _displayFrame(takeInst.getTotalFrames());
  }
  console.info("Playback stopped");
}

/**
 * Pause playback and view a specific frame in the preview area.
 *
 * @param {Integer} id - The frame ID to preview.
 */
function _displayFrame(id) {
  "use strict";
  if (takeInst.getTotalFrames() > 0) {
    // Reset the player
    videoPause();

    // Preview selected frame ID
    takeInst.frameReel.selectFrame(id);
    PlaybackCanvas.drawImage(takeInst.capturedFrames[id - 1]);
    StatusBar.setCurrentFrame(id);
  }

  // Set the current play frame
  curPlayFrame = id - 1;
}

/**
 * Play captured frames preview video.
 */
function _videoPlay() {
  "use strict";
  playBackTimeout = setTimeout(function () {
    playBackRAF = requestAnimationFrame(_videoPlay);

    // There are no more frames to preview
    if (curPlayFrame >= takeInst.getTotalFrames()) {
      // We are not looping, stop the playback
      if (!isLooping) {
        switchMode(CaptureWindow);
        return;
      }

      // Loop the playback
      console.info("Playback looped");
      curPlayFrame = 0;
    }

    // Display each frame and update the UI accordingly
    PlaybackCanvas.drawImage(takeInst.capturedFrames[curPlayFrame]);
    StatusBar.setCurrentFrame(curPlayFrame + 1);
    takeInst.frameReel.selectFrame(curPlayFrame + 1);

    curPlayFrame++;
  }, 1000 / projectInst.frameRate.getFrameRateValue());
}

/**
 * Preview the captured frames.
 */
function previewCapturedFrames() {
  "use strict";
  // Display playback window
  if (PreviewArea.curWindow === CaptureWindow) {
    switchMode(PlaybackWindow);
    curPlayFrame = 0;
  }

  // Reset canvas to first frame if playing from start
  if (curPlayFrame == 0) {
    PlaybackCanvas.drawImage(takeInst.capturedFrames[0]);
  }

  // Update the play/pause button
  btnPlayPause.children[0].classList.remove("fa-play");
  btnPlayPause.children[0].classList.add("fa-pause");

  // Begin playing the frames
  console.info("Playback started");
  isPlaying = true;
  _videoPlay();
}

/**
 * Change the app save directory by opening
 * the system's native directory selection dialog.
 */
function _changeSaveDirectory() {
  "use strict";
  document.querySelector("#chooseDirectory").click();
}

/**
 * Display the app save directory in the UI.
 *
 * @param {String} dir The directory to display.
 */
function _displaySaveDirectory(dir) {
  "use strict";
  curDirDisplay.innerHTML = dir;
  document.title = `Boats Animator (${dir})`;
  Notification.success(`Current save directory is ${dir}`);
}

/**
 * Creates a dialogue box
 * @param {Object} swalArgs The SweetAlert arguments to use.
 * @returns {Promise} Returns a Promise with the outcome of the dialogue.
 *                    Resolves true if confirm was selected and null if the alert was dismissed.
 */
function confirmSet(swalArgs) {
  "use strict";
  // Set default SweetAlert argument values
  swalArgs.title = swalArgs.title ? swalArgs.title : "Confirm";
  swalArgs.text = swalArgs.text ? swalArgs.text : "Are you sure?";
  swalArgs.icon = swalArgs.icon ? swalArgs.icon : "warning";
  swalArgs.buttons = swalArgs.buttons ? swalArgs.buttons : true;

  // Pause main shortcuts and menubar items
  shortcuts.remove("main");
  shortcuts.add("confirm");
  menubar.toggleItems();

  return new Promise(function(resolve, reject) {
    // Create a SweetAlert dialogue with the selected arguments
    swal(swalArgs)
    .then((response) => {
      // Resume main shortcuts and menubar items
      shortcuts.remove("confirm");
      shortcuts.add("main");
      menubar.toggleItems();

      // Resolve the promise
      resolve(response);
    });
  });
}
