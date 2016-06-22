var nwjsBuilder = require("nwjs-builder"),
    options = {
      platforms: "linux64,linux32,osx64,win32",
      version: "0.14.5",
      outputDir: "bin/Boats-Animator",
      outputName: "Boats-Animator-{version}-{target}",
      outputFormat: "DIR",
      executableName: "BoatsAnimator",
      winIco: "win-install/icon.ico",
      macIcns: "app/icons/icon.icns"
    };

// Build returns a promise
nwjsBuilder.commands.nwbuild("app", options, function(err) {
  if (err) console.log(err);
  console.log("Done!");
});