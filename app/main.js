/*jslint browser: true, node: true, debug: true*/
/* global Buffer */

// The width and height of the captured photo. We will set the
// width to the value defined here, but the height will be
// calculated based on the aspect ratio of the input stream.
var width  = 480,
    height = 0,

    // |streaming| indicates whether or not we're currently streaming
    // video from the camera. Obviously, we start at false.
    streaming = false,

    // The various HTML elements we need to configure or control.
    preview     = document.querySelector("#preview"),
    video       = document.querySelector("#video"),
    canvas      = document.querySelector("#canvas"),
    photo       = document.querySelector("#photo"),
    ratio       = null,
    aspectRatio = null,

    // GUI window
    gui = require('nw.gui'),
    win = gui.Window.get(),

    // Mode switching
    btnModeToggle  = document.querySelector("#btn-mode-toggle"),
    captureWindow  = document.querySelector("#captureWindow"),
    playbackWindow = document.querySelector("#playbackWindow"),
    winMode        = "capture",

    // Capture
    capturedFramesRaw  = [],
    capturedFramesList = [],
    captureFrame       = document.querySelector("#captureFrame"),
    deleteLastFrame    = document.querySelector("#deleteLastFrame"),
    curFrame           = 0,

    // Playback
    frameRate     = 15,
    isPlaying     = false,
    btnStop       = document.querySelector("#btn-stop"),
    playback      = document.querySelector("#playback"),
    loopCheck     = document.querySelector("#loopCheckbox"),
    btnPlayPause  = document.querySelector("#btn-play-pause"),
    inputChangeFR = document.querySelector("#input-fr-change"),

    // Sidebar
    sidebar          = document.querySelector("#sidebar"),
    btnSidebarToggle = document.querySelector("#btn-sidebar-toggle"),
    collapsedSidebar = document.querySelector("#collapsedSidebar"),

    // Status bar
    statusBarFrameNum  = document.querySelector("#noOfFrames"),
    statusBarFrameRate = document.querySelector("#currentFrameRate span"),

    // Export frames
    fs                    = require('fs'),
    frameExportDirectory  = null,
    exportedFramesList    = [],
    curDirDisplay         = document.querySelector("#currentDirectoryName"),
    changeDirectoryButton = document.querySelector("#changeDirectoryButton"),

    // Onion skin
    onionSkinFrame     = null,
    isOnionSkinEnabled = false,
    onionSkinPanel     = document.querySelector("#options-onion-skin"),
    onionSkinToggle    = document.querySelector("#btn-onion-skin-toggle"),
    onionSkinWindow    = document.querySelector("#onion-skinning-frame"),
    onionSkinOpacity   = document.querySelector("#input-onion-skin-opacity"),
    onionSkinPercent   = document.querySelector("#onion-skin-percentage"),

    // Frame reel
    frameReelArea  = document.querySelector("#area-frame-reel"),
    frameReelMsg   = document.querySelector("#area-frame-reel > p"),
    frameReelRow   = document.querySelector("#area-frame-reel tr"),
    frameReelTable = document.querySelector("#area-frame-reel table"),

    // Notification bar
    notifyBar    = document.querySelector(".notification"),
    notifyBarMsg = document.querySelector(".notification #msg");

/**
 * Occurs when "New Project" is pressed
 */
function openAnimator() {
    var frameExportDirectory = _getDefaultDirectory();
    win.focus();
    window.location.href = "animator.html";
    win.resizeTo(1050, 715);
    win.setPosition('center');
}

/**
 * Occurs when "Main Menu" is pressed
 */
function openIndex() {
    "use strict";
    var confirmOpen = confirm("Returning to the menu will cause any unsaved work to be lost!");
    if (confirmOpen) {
        win.focus();
        window.location.href = "index.html";
        win.resizeTo(1050, 700);
        win.setPosition('center');
    }
}

/**
 * Check if we can display the latest news feed
 * and if we cannot, say so.
 */
function canDisplayNews() {
    "use strict";
    var NewsFeed = require("./js/feed"),
    feed = new NewsFeed({
      url: "http://charlielee.uk/category/boats-animator/feed/",
      selectors: {
        container: document.querySelector(".container-news")
      }
    });
    feed.get();
}

function startup() {
    statusBarFrameRate.innerHTML = frameRate;
    onionSkinFrame = capturedFramesList[capturedFramesList.length];

    //Check if a default directory has been set
    checkdefaultdirectory();

    //Load the top menu
    loadMenu();

    // Set default frame rate
    inputChangeFR.value = frameRate;

    // Get the appropriate WebRTC implementation
    navigator.getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;

    navigator.getMedia(
        {
            video: true,
            audio: false
        },
        function (stream) {
            //start streaming add play preview stream
            preview.src = window.URL.createObjectURL(stream);
            preview.play();
            // start steaming and play hidden video of correct resolution
            video.src = window.URL.createObjectURL(stream);
            video.play();
        },
        function (err) {
            console.error("Could not find a camera to use!");
            notifyError("Could not find a camera to use!");
        }
    );

    video.addEventListener('canplay', function () {
        if (!streaming) {
            height = video.videoHeight / (video.videoWidth / width);

            video.setAttribute('width', width);
            video.setAttribute('height', height);
            canvas.setAttribute('width', width);
            canvas.setAttribute('height', height);
            streaming = true;
            ratio = width / height;
            aspectRatio = ratio.toFixed(2);
            console.log("height: " + height);
            console.log("width: " + width);
            console.log("Aspect ratio: " + aspectRatio);

            notifySuccess("Camera successfully connected.");
        }
    }, false);


/*==========================================================
=============== LISTENERS ==================================
===============================================================*/


    //Listen if capture frame button pressed
    captureFrame.addEventListener("click", function (ev) {
        ev.preventDefault();

        // Prevent taking frames without a set output path
        if (!frameExportDirectory) {
          notifyError("An output destination must be first set!");
          return;
        }

        takePicture();
    });

    // Listen if undo last frame button pressed
    deleteLastFrame.addEventListener("click", function (ev) {
        ev.preventDefault();
        undoFrame();
    });

    // Toggle onion skin
    onionSkinToggle.addEventListener("click", _toggleOnionSkin);

    // Change onion skin opacity
    onionSkinOpacity.addEventListener("input", _onionSkinChangeAmount);

    // Play/pause the preview
    btnPlayPause.addEventListener("click", function (ev) {
        ev.preventDefault();
        // Make sure we have frames to play back
        if (curFrame > 0) {
            (isPlaying) ? pauseit() : playbackframes();
        }
    });

    //listen if stop playback button is pressed
    btnStop.addEventListener("click", function (ev) {
        ev.preventDefault();
        //check pics have been taken
        if (curFrame > 0) {
            if (loopCheck.checked) {
                stopitwhenlooping();
            } else {
                stopit();
            }
        } else {
            console.warn("Pressing stop did nothing as no pictures have been taken!");
        }
    });

    // Listen for frame rate changes
    inputChangeFR.addEventListener("change", function () {
        frameRate = parseInt(this.value, 10);
        statusBarFrameRate.innerHTML = frameRate;
        stopitwhenlooping();
    });

    // Toggle the sidebar visibility
    btnSidebarToggle.addEventListener("click", function(ev) {
        ev.preventDefault();
        sidebar.classList.toggle("hidden");
        collapsedSidebar.classList.toggle("shrink");
    });

    // Toggle capture and playback windows
    btnModeToggle.addEventListener("click", function(ev) {
        ev.preventDefault();
        if (winMode == "capture") {
            winMode = "playback";
        } else if (winMode == "playback") {
            winMode = "capture";
        }
        switchMode(winMode);
    });

    clearPhoto();
}

/**
 * Toggle between playback and capture windows.
 */
function switchMode(winMode) {
    if (winMode == "capture") {
        btnModeToggle.innerHTML = "Switch to playback mode";
        console.log("switched to capture mode");
        playbackWindow.classList.add("hidden");
        captureWindow.classList.remove("hidden");

    } else if (winMode == "playback") {
        btnModeToggle.innerHTML = "Switch to capture mode";
        console.log("switched to playback mode");
        captureWindow.classList.add("hidden");
        playbackWindow.classList.remove("hidden");
    }
}

/**
 * Fill the canvas with an indication that
 * no frames have been captured.
 */
function clearPhoto() {
    "use strict";
    var context = canvas.getContext("2d");
    context.fillStyle = "#aaa";
    context.fillRect(0, 0, canvas.width, canvas.height);
    console.log("Canvas cleared");
}

/**
 * Update the frame reel display as needeed.
 *
 * @param {String} action Update the frame reel depending on the
 *                        action performed. Possible values are
 *                        "capture" and "delete".
 * @param {Nunber} id The image ID to use in the update.
 */
function updateFrameReel(action, id) {
    "use strict";
    // Display number of captured frames in status bar
    statusBarFrameNum.innerHTML = `${curFrame} ${curFrame === 1 ? "frame" : "frames"} captured`;

    // Get the last captured frame
    var curFrameData = capturedFramesRaw[id - 1];

    // Update onion skin frame
    onionSkinWindow.setAttribute("src", curFrameData);

    // Add the newly captured frame
    if (action === "capture") {
        frameReelRow.insertAdjacentHTML("beforeend", `<td><div class="frame-reel-preview">
<img class="frame-reel-img" id="img-${id}" title="Expand image" width="160" height="120" src="${curFrameData}">
<img class="btn-frame-delete" title="Delete image" width="20" height="20" src="icons/delete.png">
</div></td>`);

        // Individual frame deletion
        var insertedImage = document.querySelector(`.frame-reel-img#img-${id}`);
        insertedImage.nextElementSibling.addEventListener("click", function() {
            deleteFrame(id);
        });

        // Deference the selector to reduce memory usage
        insertedImage = null;

        // Remove the chosen frame
    } else if (action === "delete") {
        frameReelRow.removeChild(frameReelRow.children[id - 1]);
    }

    // We have frames, display them
    if (curFrame > 0) {
        frameReelMsg.classList.add("hidden");
        frameReelTable.classList.remove("hidden");

        // All the frames were deleted, display "No frames" message
    } else {
        frameReelMsg.classList.remove("hidden");
        frameReelTable.classList.add("hidden");
        frameReelRow.innerHTML = "";
    }
}

/**
 * Delete an individual frame.
 *
 * @param {Number} id The frame ID to delete.
 */
function deleteFrame(id) {
    "use strict";
    var confirmDel = confirm("Are you sure you want to delete this frame?");

    // The user wants to delete the frame
    if (confirmDel) {
      _deleteFile(exportedFramesList[id - 1]);
      exportedFramesList.splice(id - 1, 1);
      capturedFramesRaw.splice(id - 1, 1);
      curFrame--;

      updateFrameReel("delete", id);
      console.info(`There are now: ${curFrame} frames`);
      win.focus();
    }
}

/**
 * Delete the previously taken frame.
 */
function undoFrame() {
    "use strict";
    // Make sure there is a frame to delete
    if (curFrame > 0) {
      deleteFrame(curFrame);
    } else {
      notifyError("There is no previous frame to undo!");
    }
}

/**
 * Toggle onion skinning on or off.
 */
function _toggleOnionSkin() {
    "use strict";
    // Onion skin is currently enabled, turn it off
    if (isOnionSkinEnabled) {
      isOnionSkinEnabled = false;
      onionSkinToggle.innerHTML = "<span>Off</span>";
      onionSkinToggle.classList.remove("active");
      onionSkinPanel.classList.remove("visible");
      onionSkinWindow.classList.remove("visible");

      // Onion skin is currently disabled, turn it on
    } else {
      isOnionSkinEnabled = true;
      onionSkinToggle.innerHTML = "<span>On</span>";
      onionSkinToggle.classList.add("active");
      onionSkinPanel.classList.add("visible");

      // Display last captured frame
      onionSkinWindow.classList.add("visible");
      onionSkinWindow.setAttribute("src", capturedFramesRaw[curFrame - 1]);
    }
}

function takePicture() {
    if (winMode === "playback") {
        winMode = "capture";
        switchMode("capture");
    }
    "use strict";
    // We are not able to take a picture
    if (!(width && height)) {
      clearPhoto();

     // We can take a picture
    } else {
        // Draw the image
        var context   = canvas.getContext('2d');
        canvas.width  = width;
        canvas.height = height;
        context.drawImage(video, 0, 0, width, height);

        // Convert the frame to a PNG
        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);

        // Store the image data and update the current frame
        capturedFramesRaw.push(data);
        curFrame++;
        console.info(`Captured frame: ${data.slice(100, 120)} There are now: ${curFrame} frames`);

        // Save the frame to disk and update the frame reel
        saveFrame(curFrame);
        updateFrameReel("capture", curFrame);

        // Scroll the frame reel to the end
        frameReelArea.scrollLeft = frameReelArea.scrollWidth;
    }
}


//PLAYBACK
    var playbackFrameNo = -1,
        yoplayit;

function playbackframes() {
    winMode = "playback";
    switchMode("playback");
    btnPlayPause.children[0].setAttribute("src", "icons/pause.png");

    yoplayit = setInterval(playit, (1000 / frameRate));
    console.info("Playback started");
}
function playit() {
    isPlaying = true;
    playbackFrameNo++;
    document.getElementById('playback').setAttribute("src",capturedFramesRaw[playbackFrameNo]);
    document.getElementById('currentFrame').innerHTML = "Playing frame " + (playbackFrameNo + 1);
    if((curFrame - 1) == playbackFrameNo){
            stopit();
    }
}
function stopit() {
    var loopCheck = document.getElementById("loopCheckbox");

    //reset playback to the first frame
    playbackFrameNo = -1;
    if(loopCheck.checked === true){
        //if loop check is true playback continues from frame 1
        console.info("Playback looped");
    }else{
        isPlaying = false;
        //stop increasing playback frame number
        clearInterval(yoplayit);
        //display final frame in playback window
        document.getElementById('playback').setAttribute("src", capturedFramesRaw[curFrame - 1]);
        document.getElementById('currentFrame').innerHTML = "Playing frame " + curFrame;
        btnPlayPause.children[0].setAttribute("src", "icons/play.png");
        console.info("Playback stopped");
    }
}
function stopitwhenlooping() {
    isPlaying = false;
    //stop increasing playback frame number
    clearInterval(yoplayit);
    document.getElementById('playback').setAttribute("src", capturedFramesRaw[curFrame - 1]);
    document.getElementById('currentFrame').innerHTML = "Playing frame " + curFrame;
    btnPlayPause.children[0].setAttribute("src", "icons/play.png");
    //reset playback frame
    playbackFrameNo = -1;
    console.info("Playback stopped with loop on");
}

function pauseit() {
    isPlaying = false;
    clearInterval(yoplayit);
    btnPlayPause.children[0].setAttribute("src", "icons/play.png");
    console.info("Playback paused");
}

/**
 * Change onion skinning opacity.
 *
 * @param {Object} ev Event object from addEventHandler.
 */
function _onionSkinChangeAmount(ev) {
    "use strict";
    // Calculate the percentage opacity value
    var amount = ev.target.value * 5;

    onionSkinPercent.innerHTML = amount + "%";
    onionSkinWindow.style.opacity = amount / 100;
}

/**
 * Set directory to export frames to
 */
function checkdefaultdirectory() {
    frameExportDirectory = _getDefaultDirectory();
    if (frameExportDirectory === null) {
        console.log("no default set");
    } else {
        _displayDirectory(frameExportDirectory);
    }
}

/**
 * Open the system native choose directory dialog.
 *
 * @param {String} The DOM selector to the dialog trigger.
 */
function chooseFile(name) {
    "use strict";
    var chooser = document.querySelector(name);

    chooser.addEventListener("change", function() {
        frameExportDirectory = this.value;
        _displayDirectory(frameExportDirectory);
    });

  chooser.click();
}

/**
 * Display the frame destination directory in the UI.
 *
 * @param {String} dir The directory to display.
 */
function _displayDirectory(dir) {
    "use strict";
    console.log(`Current destination directory is ${dir}`);
    curDirDisplay.innerHTML = dir;
    document.title = `Boats Animator (${dir})`;
}

/**
 * Change default save directory.
 */
function changeDirectory() {
    "use strict";
    chooseFile('#chooseDirectory');
}

/**
 * Set the default save directory.
 */
function setDefaultDirectory() {
    "use strict";
    localStorage.setItem("default_directory", frameExportDirectory);
    notifySuccess(`Default export directory set as ${frameExportDirectory}.`);
}

/**
 * Get the default save directory.
 *
 * @return {!String} The stored directory if available, null otherwise.
 */
function _getDefaultDirectory() {
    "use strict";
    return localStorage.getItem("default_directory");
}

/**
* COnverting frames to png
*/
function decodeBase64Image(dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');

  return response;
}

/**
 * Save the captured frame to the hard drive.
 *
 * @param {Number} id The frame ID to save.
*/
function saveFrame(id) {
    "use strict";
    var fileName = "";

    // 1K+ frames have been captured
    if (id >= 1000) {
      fileName = id.toString();
    }

    // 100 frames have been captured
    else if (id >= 100) {
      fileName = `0${id}`;
    }

    // 10 frames have been captured
    else if (id >= 10) {
      fileName = `00${id}`;

      // Less then 10 frames have been captured
    } else {
      fileName = fileName = `000${id}`;
    }

    // Create an absolute path to the destination location
    var outputPath = `${frameExportDirectory}/${fileName}.png`;

    // Convert the frame from base64-encoded date to a PNG
    var imageBuffer = decodeBase64Image(capturedFramesRaw[id - 1]);

    // Save the frame to disk
    _writeFile(outputPath, imageBuffer.data);

    // Store the location of the exported frame
    exportedFramesList.push(outputPath);
}

/**
 * Write a file from the hard drive.
 *
 * @param {String} file Absolute path to the file to be saved.
 * @param {Binary} data The image data to write.
 */
function _writeFile(file, data) {
    "use strict";
     fs.writeFile(file, data, function(err) {
        if (err) {
            throw err;
        }
        console.log(`Successfully saved ${file}`);
    });
}

/**
 * Delete a file from the hard drive.
 *
 * @param {String} file Absolute path to the file to be deleted.
 */
function _deleteFile(file) {
    "use strict";
    fs.unlink(file, function (err) {
        if (err) {
            throw err;
        }
        console.log(`Successfully deleted ${file}`);
        notifySuccess("File successfully deleted.");
    });
}

/**
 * Hide the current notification.
 *
 * @param {String} msgType Class name of the message type
 *                         (e.g., info) displayed.
 */
function _notifyClose(msgType) {
    "use strict";
    // Time in seconds before the notification should go away
    var timeout = 2.5;

    // Hide the notification bar
    window.setTimeout(function() {
        notifyBar.classList.add("hidden");
    }, 1000 * timeout);

    // Clear the styling a bit later.
    // Without this, the styling is removed before
    // the bar is hidden.
    window.setTimeout(function() {
        notifyBar.classList.remove(msgType);
        notifyBarMsg.innerHTML = "";
    }, 1200 * timeout);
}

/**
 * Display a success notification.
 *
 * @param {String|Nunber} [msg=""] The message to display.
 */
function notifySuccess(msg) {
    "use strict";
    msg = msg || "";

    notifyBarMsg.innerHTML = msg;
    notifyBar.classList.add("success");
    notifyBar.classList.remove("hidden");

    _notifyClose("success");
}

/**
 * Display an information notification.
 *
 * @param {String|Nunber} [msg=""] The message to display.
 */
function notifyInfo(msg) {
    "use strict";
    msg = msg || "";

    notifyBarMsg.innerHTML = msg;
    notifyBar.classList.add("info");
    notifyBar.classList.remove("hidden");

    _notifyClose("info");
}

/**
 * Display an error notification.
 *
 * @param {String|Nunber} [msg=""] The message to display.
 */
function notifyError(msg) {
    "use strict";
    msg = msg || "";

    notifyBarMsg.innerHTML = msg;
    notifyBar.classList.add("error");
    notifyBar.classList.remove("hidden");

    _notifyClose("error");
}

/**
 * Display top menu
 */
function loadMenu() {
    // Create menu
    var menu = new gui.Menu({ type: 'menubar' });

    // Create sub-menus
    var fileMenuItems = new gui.Menu(),
        editMenuItems = new gui.Menu(),
        captureMenuItems = new gui.Menu(),
        helpMenuItems = new gui.Menu();


    //File menu items
    fileMenuItems.append(new gui.MenuItem({
      label: "New project...",
        icon: "icons/file.png",
      click: function() {
      },
        key: "n",
        modifiers: "ctrl",
    }));
    fileMenuItems.append(new gui.MenuItem({
      label: "Open project...",
        icon: "icons/import.png",
      click: function() {
      },
        key: "o",
        modifiers: "ctrl",
    }));
    fileMenuItems.append(new gui.MenuItem({
      label: "Main Menu",
        icon: "icons/menu.png",
      click: function() {
        openIndex();
      },
        key: "m",
        modifiers: "ctrl",
    }));

    //Edit menu items
    editMenuItems.append(new gui.MenuItem({
      label: "Delete last frame",
        icon: "icons/delete.png",
      click: function() {
        undoFrame();
      },
      key: "z",
      modifiers: "ctrl",
    }));
    editMenuItems.append(new gui.MenuItem({ type: 'separator' }));
    editMenuItems.append(new gui.MenuItem({
      label: "Preferences",
        icon: "icons/settings.png",
      click: function() {
          btnSidebarToggle.click();
      },
      key: "p",
      modifiers: "ctrl",
    }));

    //Capture menu items
    captureMenuItems.append(new gui.MenuItem({
      label: "Capture frame",
        icon: "icons/capture.png",
      click: function() {
        takePicture();
      },
      key: "c",
      modifiers: "ctrl",
    }));

    //Help menu items
    helpMenuItems.append(new gui.MenuItem({
      label: "Give feedback",
        icon: "icons/feedback.png",
      click: function() {
          console.log("feedback");
      },
      key: "/",
      modifiers: "ctrl",
    }));

    // Append sub-menus to main menu
    menu.append(
        new gui.MenuItem({
            label: 'File',
            submenu: fileMenuItems // menu elements from menuItems object
        })
    );
    menu.append(
        new gui.MenuItem({
            label: 'Edit',
            submenu: editMenuItems // menu elements from menuItems object
        })
    );
    menu.append(
        new gui.MenuItem({
            label: 'Capture',
            submenu: captureMenuItems // menu elements from menuItems object
        })
    );
    menu.append(
        new gui.MenuItem({
            label: 'Help',
            submenu: helpMenuItems // menu elements from menuItems object
        })
    );

    // Append Menu to Window
    gui.Window.get().menu = menu;
}
/**
 * Development Functions
 */
function dev() {
    win.showDevTools();
}

function reload() {
    win.reloadDev();
}
