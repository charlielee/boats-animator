// The width and height of the captured photo. We will set the
// width to the value defined here, but the height will be
// calculated based on the aspect ratio of the input stream.
var width  = 0,
    height = 0,

    // |streaming| indicates whether or not we're currently streaming
    // video from the camera. Obviously, we start at false.
    streaming = false,

    // The various HTML elements we need to configure or control.
    preview     = document.querySelector("#preview"),
    playback    = document.querySelector("#playback"),
    context     = playback.getContext("2d"),

    // NW.js
    win = nw.Window.get(),

    // Mode switching
    PreviewArea      = require("./js/previewArea"),
    btnLiveView      = document.querySelector("#btn-live-view"),
    CaptureWindow    = new PreviewArea(document.querySelector("#capture-window")),
    PlaybackWindow   = new PreviewArea(document.querySelector("#playback-window")),

    // Camera
    Camera        = require("./js/camera"),

    // Capture
    capturedFrames     = [],
    totalFrames        = 0,
    curSelectedFrame   = null,
    btnGridToggle      = document.querySelector("#btn-grid-toggle"),
    btnCaptureFrame    = document.querySelector("#btn-capture-frame"),
    btnDeleteLastFrame = document.querySelector("#btn-delete-last-frame"),

    // Playback
    frameRate        = 15,
    isPlaying        = false,
    isLooping        = false,
    curPlayFrame     = 0,
    playBackRAF      = null,
    playBackTimeout  = null,
    btnStop          = document.querySelector("#btn-stop"),
    btnLoop          = document.querySelector("#btn-loop"),
    btnPlayPause     = document.querySelector("#btn-play-pause"),
    btnFrameNext     = document.querySelector("#btn-frame-next"),
    btnFramePrevious = document.querySelector("#btn-frame-previous"),
    btnFrameFirst    = document.querySelector("#btn-frame-first"),
    btnFrameLast     = document.querySelector("#btn-frame-last"),
    inputChangeFR    = document.querySelector("#input-fr-change"),

    // Audio
    captureAudio = "audio/camera.wav",
    playAudio    = true,

    // Status bar
    statusBarCurMode   = document.querySelector("#current-mode span"),
    statusBarCurFrame  = document.querySelector("#current-frame"),
    statusBarFrameNum  = document.querySelector("#num-of-frames"),
    statusBarFrameRate = document.querySelector("#current-frame-rate span"),

    cameraSelect       = document.querySelector("#camera-select-td select"),
    resolutionSelect   = document.querySelector("#resolution-select-td select"),
    curCameraReload    = document.querySelector("#current-camera-reload"),

    // Frame export
    exportedFramesList = [],
    curDirDisplay      = document.querySelector("#currentDirectoryName"),

    // Onion skin
    onionSkinWindow = document.querySelector("#onion-skinning-frame"),
    onionSkinSlider = document.querySelector("#input-onion-skin-opacity"),

    // Frame reel
    frameReelArea   = document.querySelector("#area-frame-reel"),
    frameReelMsg    = document.querySelector("#area-frame-reel > p"),
    frameReelRow    = document.querySelector("#area-frame-reel #reel-captured-imgs"),
    frameReelTable  = document.querySelector("#area-frame-reel table"),
    liveViewframeNo = document.querySelector("#live-view-frame-no"),

    // Confirm messages
    confirmContainer = document.querySelector("#confirm-container"),
    confirmText      = document.querySelector("#confirm-text"),
    btnConfirmOK     = document.querySelector("#confirm-container #btn-OK"),
    btnConfirmCancel = document.querySelector("#confirm-container #btn-cancel"),

    // Node modules
    file          = require("./js/file"),
    shortcuts     = require("./js/shortcuts"),
    notification  = require("./js/notification"),
    saveDirectory = require("./js/savedirectory"),

    // Sidebar
    dirChooseDialog    = document.querySelector("#chooseDirectory"),
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
    focus: true,
    icon: "icons/icon.png"
  });
  win.close(true);
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
    focus: true,
    icon: "icons/icon.png",
    resizable: false,
  });
}

/**
 * Confirm prompt when animator is closed.
 */
win.on("close", function() {
  "use strict";
  confirmSet(closeAnimator, "", "Are you sure you want to exit Boats Animator?");
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
  statusBarFrameRate.innerHTML = frameRate;
  inputChangeFR.value = frameRate;

  // Set default view
  switchMode(CaptureWindow);

  // Load top menu
  loadMenu();

  // Maximise window
  win.maximize();

  // Windows specific code
  if (process.platform === "win32") {
    document.querySelector("body").classList.add("platform-win");
  }

  // Load the keyboard shortcuts
  shortcuts.get("default");

  // Initialises the preview window
  preview.addEventListener("canplay", function() {
    if (!streaming) {
      let curHeight = resolutionSelect.value;
      curHeight = curHeight.substr(0, curHeight.length - 1);
      height = parseInt(curHeight)

      width = preview.videoWidth / (preview.videoHeight / height);

      playback.setAttribute("width", preview.videoWidth.toString());
      playback.setAttribute("height", preview.videoHeight.toString());
      streaming = true;
    }
  });

  /* ======= Listeners ======= */

  // Get the resolutions for a camera upon changing it.
  cameraSelect.addEventListener("change", function() {
    // Get selected camera
    var curCam = Camera.getSelectedCamera();
    // Show the possible resolutions for the camera and update preview area
    curCam.showResolutions();
  });

  // Reload the camera on changing resolution
  resolutionSelect.addEventListener("change", function() {
    // Get selected camera
    var curCam = Camera.getSelectedCamera();
    // Get video feed with updated resolution
    var feed = curCam.updateResolution(Camera.getSelectedResolution());
    // Display this feed in the preview area
    Camera.display(feed, preview);
  });

  // Listen to button to reload currently selected camera
  curCameraReload.addEventListener("click", function () {
    try {
      // Get selected camera
      var curCam = Camera.getSelectedCamera();
      // Show the possible resolutions for the camera and update preview area
      curCam.showResolutions();
    } catch (err) {
      console.info("No camera was selected to reload.");
    }
  });

  // Capture a frame
  btnCaptureFrame.addEventListener("click", takeFrame);

  // Undo last captured frame
  btnDeleteLastFrame.addEventListener("click", undoFrame);

  // Toggle preview looping
  btnLoop.addEventListener("click", _toggleVideoLoop);

  // Change onion skin opacity
  onionSkinSlider.addEventListener("input", _onionSkinChangeAmount);

  // Change the default save directory
  btnDirectoryChange.addEventListener("click", _changeSaveDirectory);

  // Choose save directory dialog
  dirChooseDialog.addEventListener("change", function() {
    if (this.value) {
      saveDirectory.set(this.value);
      saveDirectory.make(this.value);
      _displaySaveDirectory(this.value);
    }
  });

  // Play/pause the preview
  btnPlayPause.addEventListener("click", function() {
    // Make sure we have frames to play back
    if (totalFrames > 0) {
      (isPlaying ? videoPause : previewCapturedFrames)();
    }
  });

  // Stop the preview
  btnStop.addEventListener("click", function() {
    if (PreviewArea.curWindow === PlaybackWindow) {
      videoStop();
    }
  });

  // Preview one frame to the right on framereel
  btnFrameNext.addEventListener("click", function() {
    if (curSelectedFrame) {
      if (curSelectedFrame !== totalFrames) {
        _displayFrame(curSelectedFrame + 1);
      } else {
        btnLiveView.click();
      }
    }
  });

  // Preview one frame to the left on framereel
  btnFramePrevious.addEventListener("click", function() {
    if (curSelectedFrame > 1) {
        _displayFrame(curSelectedFrame - 1);
    } else if (PreviewArea.curWindow === CaptureWindow && totalFrames) {
      switchMode(PlaybackWindow);
      _displayFrame(totalFrames);
    }
  });

  // Preview first frame on framereel
  btnFrameFirst.addEventListener("click", function() {
    if (PreviewArea.curWindow === CaptureWindow && totalFrames) {
      switchMode(PlaybackWindow);
    }
    _displayFrame(1);
  });

  // Preview last frame on framereel
  btnFrameLast.addEventListener("click", function() {
    if (curSelectedFrame) {
      if (curSelectedFrame !== totalFrames) {
        videoStop();
      } else {
        btnLiveView.click();
      }
    }
  });

  // Listen for frame rate changes
  inputChangeFR.addEventListener("focus", shortcuts.pause);
  inputChangeFR.addEventListener("input", function() {
    if (inputChangeFR.value >= 1 && inputChangeFR.value <= 60) {
      frameRate = parseInt(this.value, 10);
    } else {
      frameRate = 15;
    }
    statusBarFrameRate.innerHTML = frameRate;
    if (PreviewArea.curWindow == PlaybackWindow) {
      videoStop();
    }
  });

  // Listen for leaving frame rate input
  inputChangeFR.addEventListener("blur", function() {
    shortcuts.resume();
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

  // Grid overlay toggle
  btnGridToggle.addEventListener("click", function() {
    notification.info("This feature is not yet available!");
  });

  // Switch from frame preview back to live view
  btnLiveView.addEventListener("click", function() {
    if (totalFrames > 0) {
      videoStop();
      _removeFrameReelSelection();
      switchMode(CaptureWindow);
    }
  });

  // Preview a captured frame
  frameReelRow.addEventListener("click", function(e) {
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
    _updateStatusBarCurFrame(totalFrames + 1);
    btnLiveView.classList.add("selected");
    statusBarCurMode.innerText = "Capture";

  } else if (PreviewArea.curWindow === PlaybackWindow) {
    btnLiveView.classList.remove("selected");
    statusBarCurMode.innerText = "Playback";
  }

  console.log(`Switched to: ${NewWindow.el.id}`);
}

/**
 * Remove selected frame highlight from the timeline.
 *
 * @returns {Boolean} True if there was a highlight to remove, false otherwise.
 */
function _removeFrameReelSelection() {
    "use strict";
    var selectedFrame = document.querySelector(".frame-reel-img.selected");
    if (selectedFrame) {
        selectedFrame.classList.remove("selected");
        curSelectedFrame = null;
        return true;
    }
    return false;
}

/**
 * Add selected frame highlight to frame.
 * @param {Number} id The image ID to highlight.
 */
function _addFrameReelSelection(id) {
  "use strict";
  document.querySelector(`.frame-reel-img#img-${id}`).classList.add("selected");
  curSelectedFrame = id;
}

/**
 * Change the current frame number on the status bar.
 * @param {Integer} id The value to change the frame number to.
 */
function _updateStatusBarCurFrame(id) {
    "use strict";
    statusBarCurFrame.innerHTML = id;
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
    statusBarFrameNum.innerHTML = totalFrames;

    // Add the newly captured frame
    if (action === "capture") {
        // Remove any frame selection
        _removeFrameReelSelection();

        // Insert the new frame into the reel
        frameReelRow.insertAdjacentHTML("beforeend", `<td><div class="frame-reel-preview">
<div class="frame-reel-no" id="no-${id}" title="Frame ${id}">${id}</div>
<img class="frame-reel-img" id="img-${id}" title="Frame ${id}" width="67" height="50" src="${capturedFrames[id - 1].src}">
</div></td>`);

        // Remove the chosen frame
    } else if (action === "delete") {
        if (id !== totalFrames) {
            onionSkinFrame = id - 2;
        }
        frameReelRow.removeChild(frameReelRow.children[id - 1]);
    }

  // Update the last frame number above the live view button
  liveViewframeNo.innerHTML = totalFrames + 1;

    // We have frames, display them
    if (totalFrames > 0) {
        frameReelMsg.classList.add("hidden");
        frameReelTable.classList.remove("hidden");

        // Update onion skin frame
        onionSkinWindow.setAttribute("src", capturedFrames[onionSkinFrame].src);
        context.drawImage(capturedFrames[onionSkinFrame], 0, 0, preview.videoWidth, preview.videoHeight);

        // Update frame preview selection
        if (curSelectedFrame) {
            _removeFrameReelSelection();
            _addFrameReelSelection(id - 1);
            _updateStatusBarCurFrame(id - 1);
        } else if (PreviewArea.curWindow === CaptureWindow) {
            _updateStatusBarCurFrame(totalFrames + 1);
        }

        // All the frames were deleted, display "No frames" message
    } else {
        frameReelMsg.classList.remove("hidden");
        frameReelTable.classList.add("hidden");
        switchMode(CaptureWindow);

      // Clear the onion skin window
      onionSkinWindow.removeAttribute("src");
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
        success: function() {
            notification.success("File successfully deleted.");
        }
    });

    exportedFramesList.splice(id - 1, 1);
    capturedFrames.splice(id - 1, 1);
    totalFrames--;
    updateFrameReel("delete", id);
    console.info(`There are now ${totalFrames} captured frames`);
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
    notification.error("A save directory must be first set!");
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
      confirmSet(deleteFrame, totalFrames, "Are you sure you want to delete the last frame captured?");
    } else {
      notification.error("There is no previous frame to undo!");
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
    if (PreviewArea.curWindow === PlaybackWindow) {
        switchMode(CaptureWindow);
    }

    // Take a picture
    if (streaming) {
        // Draw the image on the canvas
        playback.width  = preview.videoWidth;
        playback.height = preview.videoHeight;
        context.drawImage(preview, 0, 0, preview.videoWidth, preview.videoHeight);

        // Convert the frame to a PNG
        var frame = new Image();
        frame.src = playback.toDataURL("image/png");

        // Store the image data and update the current frame
        capturedFrames.push(frame);
        totalFrames++;
        console.info(`Captured frame: ${frame.src.slice(100, 120)} There are now: ${totalFrames} frames`);

        // Save the frame to disk and update the frame reel
        saveFrame(totalFrames);
        updateFrameReel("capture", totalFrames);

        // Scroll the frame reel to the end
        frameReelArea.scrollLeft = frameReelArea.scrollWidth;

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
  _displayFrame(totalFrames);
  curPlayFrame = 0;
  console.info("Playback stopped");
}

/**
 * Pause playback and view a specific frame in the preview area.
 *
 * @param {Integer} id The frame ID to preview.
 */
function _displayFrame(id) {
  "use strict";
  if (totalFrames > 0) {
    // Reset the player
    videoPause();
    _removeFrameReelSelection();

    // Preview selected frame ID
    _addFrameReelSelection(id);
    curPlayFrame = id - 1;
    context.drawImage(capturedFrames[id - 1], 0, 0, preview.videoWidth, preview.videoHeight);
    _updateStatusBarCurFrame(id);
    _frameReelScroll();
  }
}

/**
 * Play captured frames preview video.
 */
function _videoPlay() {
  "use strict";
  playBackTimeout = setTimeout(function() {
    playBackRAF = requestAnimationFrame(_videoPlay);
    // Display each frame
    _removeFrameReelSelection();
    context.drawImage(capturedFrames[curPlayFrame], 0, 0, preview.videoWidth, preview.videoHeight);
    _updateStatusBarCurFrame(curPlayFrame + 1);

    // Display selection outline as each frame is played
    _addFrameReelSelection(curPlayFrame + 1);

    // Scroll the framereel with playback
    _frameReelScroll();
    curPlayFrame++;

    // There are no more frames to preview
    if (curPlayFrame >= totalFrames) {
      // We are not looping, stop the playback
      if (!isLooping) {
        videoStop();
      } else {
        console.info("Playback looped");
      }

      // Reset playback
      curPlayFrame = 0;
    }
  }, 1000 / frameRate);
}

/**
 * Preview the captured frames.
 */
function previewCapturedFrames() {
    "use strict";
    // Display playback window
    switchMode(PlaybackWindow);

    // Update the play/pause button
    btnPlayPause.children[0].classList.remove("fa-play");
    btnPlayPause.children[0].classList.add("fa-pause");

    // Begin playing the frames
    isPlaying = true;
    _videoPlay();
    console.info("Playback started");
}

/**
 * Scroll the framereel during playback
 */
function _frameReelScroll() {
    "use strict";
    if (curPlayFrame === 0) {
        // Scroll to start when playback begins
        frameReelArea.scrollLeft = 0;
    } else if (curPlayFrame + 1 !== totalFrames) {
        // Scroll so currently played frame is in view
        document.querySelector(`.frame-reel-img#img-${curPlayFrame + 1}`).parentNode.scrollIntoView();
    } else {
        // Scroll to end when playback has stopped
        frameReelArea.scrollLeft = frameReelArea.scrollWidth;
    }
}

/**
 * Change onion skinning opacity.
 *
 * @param {Object} ev Event object from addEventListener.
 */
function _onionSkinChangeAmount(ev) {
  "use strict";
  // Calculate the percentage opacity value
  var amount = ev.target.value;

  ev.target.setAttribute("title", `${amount}%`);
  onionSkinWindow.style.opacity = Math.abs(amount / 100);

  // Make it easier to switch off onion skinning
  if (amount >= -6 && amount <= 6) {
    onionSkinWindow.style.opacity = 0;
    onionSkinSlider.value = 0;
    onionSkinSlider.setAttribute("title", "0%");
  }
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
  notification.success(`Current save directory is ${dir}`);
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
  var matches  = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
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
 * @param {Number} - id The frame ID to save.
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
 * Confirm the action to be performed.
 *
 * @param {Function} callback The function to run on "OK" being pressed.
 * @param {*} args Arguments of function to run.
 * @param {String} msg Message to display in confirm dialogue.
 */
function confirmSet(callback, args, msg) {
    "use strict";
    confirmText.innerHTML = msg;
    confirmContainer.classList.remove("hidden");
    btnConfirmOK.focus();

    shortcuts.remove("main");
    shortcuts.add("confirm");

    // Disable menubar items
    editMenu.items[0].enabled = false;
    captureMenu.items[0].enabled = false;
    captureMenu.items[2].enabled = false;
    playbackMenu.items[0].enabled = false;
    playbackMenu.items[2].enabled = false;
    playbackMenu.items[3].enabled = false;

    function _ok() {
        callback(args);
        _confirmSelect();
    }

    function _cancel() {
        _confirmSelect();
    }

    function _confirmSelect() {
        confirmContainer.classList.add("hidden");

        btnConfirmOK.removeEventListener("click", _ok);
        btnConfirmCancel.removeEventListener("click", _cancel);

        btnConfirmOK.removeEventListener("blur", _focusCancel);
        btnConfirmCancel.removeEventListener("blur", _focusOK);

        shortcuts.remove("confirm");
        shortcuts.add("main");
        editMenu.items[0].enabled = true;
        captureMenu.items[0].enabled = true;
        captureMenu.items[2].enabled = true;
        playbackMenu.items[0].enabled = true;
        playbackMenu.items[2].enabled = true;
        playbackMenu.items[3].enabled = true;
    }

    // Respond to button clicks
    btnConfirmOK.addEventListener("click", _ok);
    btnConfirmCancel.addEventListener("click", _cancel);

    function _focusOK() {
        btnConfirmOK.focus();
    }

    function _focusCancel() {
        btnConfirmCancel.focus();
    }

    btnConfirmOK.addEventListener("blur", _focusCancel);
    btnConfirmCancel.addEventListener("blur", _focusOK);
}

/**
 * Display top menu
 */
// Create top menu and sub-menus
var menuBar      = new nw.Menu({ type: "menubar" }),
    fileMenu     = new nw.Menu(),
    editMenu     = new nw.Menu(),
    captureMenu  = new nw.Menu(),
    playbackMenu = new nw.Menu(),
    helpMenu     = new nw.Menu();

function loadMenu() {
    "use strict";
    var controlKey = (process.platform === "darwin" ? "command" : "ctrl");

    // File menu items
    fileMenu.append(new nw.MenuItem({
      label: "New project...",
      click: function() {
        notification.info("This feature is not yet available!")
      },
        key: "n",
        modifiers: controlKey,
    }));
    fileMenu.append(new nw.MenuItem({
      label: "Open project...",
      click: function() {
        notification.info("This feature is not yet available!")
      },
        key: "o",
        modifiers: controlKey,
    }));
    fileMenu.append(new nw.MenuItem({
      label: "Main Menu",
      click: function() {
        confirmSet(openIndex,"","Returning to the menu will cause any unsaved work to be lost!");
      },
        key: "w",
        modifiers: controlKey,
    }));
    fileMenu.append(new nw.MenuItem({ type: "separator" }));
    fileMenu.append(new nw.MenuItem({
      label: "Exit",
      click: function() {
        confirmSet(closeAnimator, "", "Are you sure you to exit Boats Animator?");
      },
      key: "q",
      modifiers: controlKey,
    }));


    // Edit menu items
    editMenu.append(new nw.MenuItem({
      label: "Delete last frame",
      click: undoFrame,
      key: "z",
      modifiers: controlKey,
    }));

    // Capture menu items
    captureMenu.append(new nw.MenuItem({
      label: "Capture frame",
      click: takeFrame,
      key: "1",
      modifiers: controlKey,
    }));

  captureMenu.append(new nw.MenuItem({ type: "separator" }));

  captureMenu.append(new nw.MenuItem({
    label: "Play capture sounds",
    click: function() {
      playAudio = !playAudio;
      notification.info(`Capture sounds ${playAudio ? "enabled" : "disabled"}.`);
    },
    type: "checkbox",
    checked: true,
    key: "m",
    modifiers: controlKey,
  }));

  captureMenu.append(new nw.MenuItem({
    label: "Change capture destination",
    click: _changeSaveDirectory
  }));

  // Playback menu items
  playbackMenu.append(new nw.MenuItem({
    label: "Loop playback",
    click: function() {
      btnLoop.click()
    },
    type: "checkbox",
    checked: false,
    key: "8",
    modifiers: controlKey,
  }));

  playbackMenu.append(new nw.MenuItem({ type: "separator" }));

  playbackMenu.append(new nw.MenuItem({
    label: "Display first frame",
    click: function() {
      btnFrameFirst.click();
    },
    key: "left",
    modifiers: controlKey,
  }));

  playbackMenu.append(new nw.MenuItem({
    label: "Display last frame",
    click: function() {
      btnFrameLast.click();
    },
    key: "right",
    modifiers: controlKey,
  }));

    // Help menu items
    helpMenu.append(new nw.MenuItem({
      label: "Documentation",
      click: function() {
          utils.openURL("http://boatsanimator.readthedocs.io/");
      },
      key: "F1",
      modifiers: "",
    }));
    helpMenu.append(new nw.MenuItem({
      label: "Give feedback",
      click: function() {
          utils.openURL("https://github.com/BoatsAreRockable/animator/issues");
      },
    }));

    helpMenu.append(new nw.MenuItem({ type: "separator" }));

    helpMenu.append(new nw.MenuItem({
      label: "About Boats Animator",
      click: openAbout
    }));

    // Append sub-menus to main menu
    menuBar.append(
        new nw.MenuItem({
            label: "File",
            submenu: fileMenu
        })
    );

    menuBar.append(
        new nw.MenuItem({
            label: "Edit",
            submenu: editMenu
        })
    );

    menuBar.append(
        new nw.MenuItem({
            label: "Capture",
            submenu: captureMenu
        })
    );

  menuBar.append(
    new nw.MenuItem({
      label: "Playback",
      submenu: playbackMenu
    })
  );

    menuBar.append(
        new nw.MenuItem({
            label: "Help",
            submenu: helpMenu
        })
    );

    // Append main menu to Window
    nw.Window.get().menu = menuBar;

    // Create Mac menu
    if (process.platform === "darwin") {
        menuBar.createMacBuiltin("Boats Animator", {
          hideEdit: true
        });
    }
}

// Stops global shortcuts operating in other applications
win.on("focus", shortcuts.resume);
win.on("restore", shortcuts.resume);
win.on("blur", shortcuts.pause);
