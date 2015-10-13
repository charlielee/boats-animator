var gui = require('nw.gui'),
    win = gui.Window.get(),
    popUp;
function internetCheck() {
    if (window.navigator.onLine === false) {
        document.getElementById('news').innerHTML = "This feature requires an internet connection.";
        document.getElementById('news').style.color = "#aaaaaa";
    }
}
function splashLoad() {
var openmenu = setTimeout(openMenu, 3000);
}

function openMenu() {
    console.log("open menu");
    win.close();
     var new_win = gui.Window.open('menu.html', {
        position: 'center',
        width: 800,
        height: 445,
        "toolbar": false,
        "resizable": true,
        "frame": true,
        "icon": "icons/icon.png"
    });   
}
function openAnimator() {
    popUp = gui.Window.open('cameraChoose.html', {
        position: 'center',
        width: 400,
        height: 240,
        "toolbar": false,
        "resizable": false,
        "icon": "icons/icon.png",
        "title": "Choose A Camera"
    });
    popUp.setAlwaysOnTop(true);
    
    win.resizeTo(1050, 700);
    win.setPosition('center');
}
function dev() {
    win.showDevTools();
}
function reload() {
    win.reloadDev();
}