/* Build Boats Animator Executables

Usage: node build <PLATFORMS> <PACKAGES>

<PLATFORMS>
* String
* Which platforms to output for. Possible values: "linux64,linux32,osx64,win32,win64"
* Default: "linux64,linux32,osx64,win32"

<PACKAGES>
* String
* Which packages to build in addition to binaries. Possible values:
  * "exe" - creates setup file using Inno Setup. Requires `process.platform = "win32"`
* Default: ""
*/
var fs = require("fs.extra"),
    process = require("process"),
    exec = require('child_process').exec,
    curDir = require('path').dirname(require.main.filename),

    manifest = require('./package.json'),
    packages = (process.argv[3] ? process.argv[3] : ""),
    nwjsBuilder = require("nwjs-builder"),
    options = {
      platforms: (process.argv[2] ? process.argv[2] : "linux64,linux32,osx64,win32"),
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

    fs.mkdir("temp/icons", function(err) {
      fs.copy("icons/icon.png", "temp/icons/icon.png", function (err) {
        console.log(err ? err : "Copy icon.png");
      });

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
    fs.rmrf("temp", function(err) {
      console.log(err ? err : "Delete temp directory");

      console.log("Running platform specific additions...");
      linux();
      windows();
    });
  });
}

// Linux specific changes.
function linux() {
  // Check whether output platforms contains linux32, linux64, both or neither.
  var linuxOutputs = [];
  if (options.platforms.includes("linux32")) {
    linuxOutputs.push(`${options.outputDir}/Boats-Animator-${manifest.version}-linux-ia32`);
  }
  if (options.platforms.includes("linux64")) {
    linuxOutputs.push(`${options.outputDir}/Boats-Animator-${manifest.version}-linux-x64`);
  }

  linuxOutputs.forEach(function(dir) {
    // Set Linux executable permissions
    fs.chmod(`${dir}/${options.executableName}`, 0777, function(err) {
      console.log(err ? err : `  linux${dir.slice(-2)}: Set BoatsAnimator executable file permissions`);
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
      console.log(err ? err : `  linux${dir.slice(-2)}: Create .desktop file`);

      // Set .desktop file permissions
      fs.chmod(`${dir}/boats-animator.desktop`, 0777, function(err) {
        console.log(err ? err : `  linux${dir.slice(-2)}: Set .desktop file permissions`);
      });
    });
  });
}

// Win32 specific changes.
function windows() {
  // Create installer file using Inno Setup
  if (process.platform === "win32"
      && options.platforms.includes("win32")
      && packages.includes("exe")
     ) {
    fs.open("C:/Program Files (x86)/Inno Setup 5", "r", function(err, fd) {
      if (err) {
        console.error("  win32: Please install Inno Setup 5 to create a win32 installer");
      } else {
        exec(`cd C:/Program Files (x86)/Inno Setup 5/ && ISCC.exe ${curDir}/win-install/setup.iss`, function(error, stdout, stderr) {
          if (error) {
            console.error(`Exec error: ${error}`);
          }
          if (stderr) {
            console.error(`Stderr: ${stderr}`);
          }
          console.log("  win32: Create setup executable");
        });
      }
    });
  }
}