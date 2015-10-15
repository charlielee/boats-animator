

if(window.location.pathname == '/projectPreferences.html'){
    console.log("project");
}


/**
 * Set directory to export frames to
 */
function changeDirectory() {
    console.log(changeDirectoryButton);
    console.log("function changedirectory started");
    frameExportDirectory = document.getElementById("chooseDirectory").value;
    document.getElementById("currentDirectoryName").innerHTML = frameExportDirectory;
}