var fs = require("fs.extra"),
    nwjsBuilder = require("nwjs-builder"),
    manifest = require('./package.json'),
    options = {
      platforms: "linux64,linux32,osx64,win32",
      version: "0.14.5",
      outputDir: "bin/Boats-Animator",
      outputName: "Boats-Animator-{version}-{target}",
      outputFormat: "DIR",
      executableName: "BoatsAnimator",
      winIco: "icons/icon.ico",
      macIcns: "icons/icon.icns"
    };

// Move the files to be packaged to a temp directory.
fs.mkdir("temp", function(err) {
  console.log(err ? err : "Create temp directory");

  fs.copy("package.json", "temp/package.json", function(err) {
    console.log(err ? err : "Copy package.json");

    fs.copyRecursive("icons", "temp/icons", function(err) {
      fs.delete("temp/icons/icon.icns", function(err) {
        if (err) console.log(err);
      });
      fs.delete("temp/icons/icon.ico", function(err) {
        if (err) console.log(err);
      });
      console.log(err ? err : "Copy icon.png");

      fs.copyRecursive("app", "temp/app", function(err) {
        console.log(err ? err : "Copy app directory");
        build();
      });
    });
  });
});

// Use nwjs-builder to create the output packages.
function build() {
  nwjsBuilder.commands.nwbuild("temp", options, function(err) {
    console.log(err ? err : "Finished exporting packages");
    linux();

    fs.rmrf("temp", function(err) {
      console.log(err ? err : "Delete temp directory");
      console.log("Done!");
    });
  });
}

// Linux specific changes.
function linux() {
  var linuxOutputs = [
    `${options.outputDir}/Boats-Animator-${manifest.version}-linux-x64`,
    `${options.outputDir}/Boats-Animator-${manifest.version}-linux-ia32`
  ];
  
  linuxOutputs.forEach(function(dir) {
    // Set Linux executable permissions
    fs.chmod(`${dir}/${options.executableName}`, 0777, function(err) {
      console.log(err ? err : "Set BoatsAnimator executable file permissions");
    });

    // Create .desktop file
    fs.writeFile(`${dir}/boats-animator.desktop`,
`[Desktop Entry]
Name=Boats Animator
Version=${manifest.version}
Comment=Create stop motion animations
Exec=bash -c "cd $(dirname %k) && ./${options.executableName}"
Type=Application
Terminal=false`, function(err) {
      console.log(err ? err : "Create .desktop file");
      // Set .desktop file permissions
      fs.chmod(`${dir}/boats-animator.desktop`, 0777, function(err) {
        console.log(err ? err : "Set .desktop file permissions");
      });
    });
  });
}