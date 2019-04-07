// Indicates whether or not we're currently streaming
// video from the camera. Obviously, we start at false.
var streaming = false,

  // The various HTML elements we need to configure or control.
  preview = document.querySelector("#preview"),
  playback = document.querySelector("#playback"),
  context = playback.getContext("2d"),

  // NW.js
  win = nw.Window.get();

  // UI
  var FrameReel = new (require("./ui/FrameReel/FrameReel"))();
  var Notification = require("./ui/Notification/Notification");
  var OnionSkin = require("./ui/OnionSkin/OnionSkin");
  var PreviewArea = require("./ui/PreviewArea/PreviewArea");
  var StatusBar = require("./ui/StatusBar/StatusBar");

  // Mode switching
  var btnLiveView = document.querySelector("#btn-live-view"),
  CaptureWindow = new PreviewArea(document.querySelector("#capture-window")),
  PlaybackWindow = new PreviewArea(document.querySelector("#playback-window")),

  // Camera
  Camera = require("./js/camera"),

  // Capture
  capturedFrames = [],
  totalFrames = 0,
  btnCaptureFrame = document.querySelector("#btn-capture-frame"),
  btnDeleteLastFrame = document.querySelector("#btn-delete-last-frame"),

  // Playback
  frameRate = 15,
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
  inputChangeFR = document.querySelector("#input-fr-change"),

  // Audio
  captureAudio = "audio/camera.wav",
  playAudio = true,

  cameraSelect = document.querySelector("#camera-select-td select"),
  resolutionSelect = document.querySelector("#resolution-select-td select"),

  // Frame export
  exportedFramesList = [],
  curDirDisplay = document.querySelector("#currentDirectoryName"),

  // Frame reel
  frameReelRow = document.querySelector("#area-frame-reel #reel-captured-imgs"),

  // Node modules
  file = require("./js/file"),
  shortcuts = require("./js/shortcuts"),
  saveDirectory = require("./js/savedirectory"),
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
  let path = saveDirectory.get();

  // There is no set save directory or the directory does not exist
  if (!path) {
    console.error("No save directory has been set!");
    saveDirectory.set(null);
    _changeSaveDirectory();

    // There is a valid save directory
  } else {
    _displaySaveDirectory(path);
  }

  // Set default frame rate
  StatusBar.setFrameRate(frameRate);
  inputChangeFR.value = frameRate;

  // Set default view
  switchMode(CaptureWindow);

  // Maximise window
  win.maximize();

  // Windows specific code
  if (process.platform === "win32") {
    document.querySelector("body").classList.add("platform-win");
  }

  // Load the keyboard shortcuts
  shortcuts.get("default", function () {
    shortcuts.add("main");
    // Load top menu
    menubar.load();

    // Check the current save directory is clean
    saveDirectory.checkDirHasNoFrames(path, function(hasFrames) {
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
      playback.setAttribute("width", preview.videoWidth.toString());
      playback.setAttribute("height", preview.videoHeight.toString());
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
      saveDirectory.set(this.value);
      saveDirectory.make(this.value);
      _displaySaveDirectory(this.value);
      saveDirectory.checkDirHasNoFrames(this.value, function(hasFrames) {
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
    if (totalFrames > 0) {
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
    if (FrameReel.curSelectedFrame) {
      if (FrameReel.curSelectedFrame !== totalFrames) {
        _displayFrame(FrameReel.curSelectedFrame + 1);
      } else {
        switchMode(CaptureWindow);
      }
    }
  });

  // Preview one frame to the left on framereel
  btnFramePrevious.addEventListener("click", function () {
    if (FrameReel.curSelectedFrame > 1) {
      _displayFrame(FrameReel.curSelectedFrame - 1);
    } else if (PreviewArea.curWindow === CaptureWindow && totalFrames) {
      switchMode(PlaybackWindow);
      _displayFrame(totalFrames);
    }
  });

  // Preview first frame on framereel
  btnFrameFirst.addEventListener("click", function () {
    if (PreviewArea.curWindow === CaptureWindow && totalFrames) {
      switchMode(PlaybackWindow);
    }
    _displayFrame(1);
  });

  // Preview last frame on framereel
  btnFrameLast.addEventListener("click", function () {
    if (FrameReel.curSelectedFrame) {
      (FrameReel.curSelectedFrame !== totalFrames ? videoStop : switchMode(CaptureWindow))();
    }
  });

  // Listen for frame rate changes
  inputChangeFR.addEventListener("input", function () {
    if (inputChangeFR.value >= 1 && inputChangeFR.value <= 60) {
      frameRate = parseInt(this.value, 10);
    } else {
      frameRate = 15;
    }
    StatusBar.setFrameRate(frameRate);
    if (PreviewArea.curWindow === PlaybackWindow) {
      videoStop();
    }
  });

  // Listen for leaving frame rate input
  inputChangeFR.addEventListener("blur", function () {
    inputChangeFR.value = frameRate;
    if (
      inputChangeFR.value > 60 ||
      inputChangeFR.value < 1 ||
      Number.isNaN(inputChangeFR.value) ||
      inputChangeFR.length > 2
    ) {
      inputChangeFR.value = 15;
    }
  });

  // Switch from frame preview back to live view
  btnLiveView.addEventListener("click", switchMode(CaptureWindow));

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

  var onionSkinSlider = document.querySelector("#input-onion-skin-opacity");
  onionSkinSlider.addEventListener("input", OnionSkin._setOpacityFromSlider);
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
    StatusBar.setCurrentFrame(totalFrames + 1);
    StatusBar.setMode("Capture");
    FrameReel.selectLiveViewButton();

  } else if (PreviewArea.curWindow === PlaybackWindow) {
    FrameReel.selectLiveViewButton(false);
    StatusBar.setMode("Playback");
  }

  console.log(`Switched to: ${NewWindow.el.id}`);
}

/**
 * Update the frame reel display as needeed.
 *
 * @param {String} action Update the frame reel depending on the
 *                        action performed. Possible values are
 *                        "capture" and "delete".
 * @param {Number} id The image ID to use in the update.
 */
function updateFrameReel(action, id) {
  "use strict";
  var onionSkinFrame = id - 1;
  // Display number of captured frames in status bar
  StatusBar.setTotalFrames(totalFrames);

  // Add the newly captured frame
  if (action === "capture") {
    FrameReel.addFrame(id, capturedFrames[id - 1].src);

    // Remove the chosen frame
  } else if (action === "delete") {
    if (id !== totalFrames) {
      onionSkinFrame = id - 2;
    }
    FrameReel.removeFrame(id)
  }

  // Switch to capture mode
  // todo in the future "delete any frame" may mean sometimes
  // we should switch to playback mode
  switchMode(CaptureWindow);

  // We have frames, display them
  if (totalFrames > 0) {
    // Update onion skin frame
    OnionSkin.setFrame(capturedFrames[onionSkinFrame].src);
  } else {
    // Clear the onion skin window
    OnionSkin.clear();
  }
}

/**
 * Delete an individual frame.
 *
 * @param {Number} id The frame ID to delete.
 */
function deleteFrame(id) {
  "use strict";
  file.delete(exportedFramesList[id - 1], {
    success: function () {
      Notification.success("File successfully deleted.");
    }
  });

  exportedFramesList.splice(id - 1, 1);
  capturedFrames.splice(id - 1, 1);
  totalFrames--;
  updateFrameReel("delete", id);
  console.info(`Total frames captured: ${totalFrames}`);
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
  if (!saveDirectory.get()) {
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
  if (totalFrames > 0) {
    // Display warning alert to confirm deletion
    confirmSet({text: "Are you sure you want to delete the last frame captured?"})
    .then((response) => {
      if (response) {
        deleteFrame(totalFrames);
      }
    });
  } else {
    Notification.error("There is no previous frame to undo!");
  }
}

/**
 * Play audio if checkbox checked.
 * @param {String} file Location of audio file to play.
 */
function audio(file) {
  "use strict";
  if (playAudio) {
    var audio = new Audio(file);
    audio.play();
  }
}

function _captureFrame() {
  "use strict";

  // Stop playback
  videoStop();

  if (PreviewArea.curWindow === PlaybackWindow) {
    switchMode(CaptureWindow);
  }

  // Take a picture
  if (streaming) {
    // Draw the image on the canvas
    playback.width = preview.videoWidth;
    playback.height = preview.videoHeight;
    context.drawImage(preview, 0, 0, preview.videoWidth, preview.videoHeight);

    // Convert the frame to a PNG
    var frame = new Image();
    frame.src = playback.toDataURL("image/png");

    // Store the image data and update the current frame
    capturedFrames.push(frame);
    totalFrames++;
    console.info(`Captured frame: ${frame.src.slice(100, 120)}`);
    console.info(`Total frames captured: ${totalFrames}`);

    // Save the frame to disk and update the frame reel
    saveFrame(totalFrames);
    updateFrameReel("capture", totalFrames);

    // Play a camera sound
    audio(captureAudio);
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
  if (totalFrames > 0 && PreviewArea.curWindow === PlaybackWindow) {
    _displayFrame(totalFrames);
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
  if (totalFrames > 0) {
    // Reset the player
    videoPause();

    // Preview selected frame ID
    FrameReel.selectFrame(id);
    context.drawImage(capturedFrames[id - 1], 0, 0, preview.videoWidth, preview.videoHeight);
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
    if (curPlayFrame >= totalFrames) {
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
    context.drawImage(capturedFrames[curPlayFrame], 0, 0, preview.videoWidth, preview.videoHeight);
    StatusBar.setCurrentFrame(curPlayFrame + 1);
    FrameReel.selectFrame(curPlayFrame + 1);

    curPlayFrame++;
  }, 1000 / frameRate);
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
    context.drawImage(capturedFrames[0], 0, 0, preview.videoWidth, preview.videoHeight);
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
* Convert frames from base64 to png
*
* @author Stack Overflow http://stackoverflow.com/questions/20267939
* @author Julian Lannigan http://stackoverflow.com/users/1777444
* @license cc by-sa 3.0
*/
function decodeBase64Image(dataString) {
  "use strict";
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

  if (matches.length !== 3) {
    return new Error("Invalid input string");
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], "base64");
  return response;
}

/**
 * Save the captured frame to the hard drive.
 *
 * @param {Number} id - The frame ID to save.
 */
function saveFrame(id) {
  "use strict";
  var fileName = "";

  // 1K+ frames have been captured
  if (id >= 1000) {
    fileName = `frame_${id}`;
  }

  // 100 frames have been captured
  else if (id >= 100) {
    fileName = `frame_0${id}`;
  }

  // 10 frames have been captured
  else if (id >= 10) {
    fileName = `frame_00${id}`;

    // Less then 10 frames have been captured
  } else {
    fileName = `frame_000${id}`;
  }

  // Create an absolute path to the destination location
  var outputPath = `${saveDirectory.get()}/${fileName}.png`;

  // Convert the frame from base64-encoded data to a PNG
  var imageBuffer = decodeBase64Image(capturedFrames[id - 1].src);

  // Save the frame to disk
  file.write(outputPath, imageBuffer.data);

  // Store the location of the exported frame
  exportedFramesList.push(outputPath);
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
