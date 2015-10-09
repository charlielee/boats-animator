var gui = require('nw.gui'),
    win = gui.Window.get();
function internetCheck() {
    if (window.navigator.onLine === false) {
        document.getElementById('news').innerHTML = "This feature requires an internet connection.";
        document.getElementById('news').style.color = "#aaaaaa";
    }
}
function openAnimator() {
    var new_win = gui.Window.open('cameraChoose.html', {
        position: 'center',
        width: 400,
        height: 240,
        "toolbar": false,
        "resizable": false,
        "icon": "icon400.png",
        "title": "Choose A Camera"
    });
    
    win.resizeTo(1200, 900);
    win.setPosition('center');
}
function dev() {
    gui.Window.get().showDevTools();
}