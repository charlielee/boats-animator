var nwjsBuilder = require("nwjs-builder"),
    options = {
      platforms: "linux64,linux32,osx64,win32",
      version: "0.14.5",
      outputDir: "bin/BoatsAnimator",
      outputName: "Boats-Animator-{version}-{target}",
      outputFormat: "ZIP",
      executableName: "BoatsAnimator",
      winIco: "win-install/icon.ico"
    };

// Build returns a promise
nwjsBuilder.commands.nwbuild("app", options, function(err) {
  if (err) console.log(err);
  console.log("Done!");
});