var help = `===== BUILD BOATS ANIMATOR EXECUTABLES =====

Usage: node build <OPTIONS>

<OPTIONS>
--platforms, -p "win32"
* String
* Which platforms to output for. Possible values: "linux64,linux32,osx64,win32,win64"
* Default: "linux64,linux32,osx64,win32"

--extras, -e "exe"
* String
* Which packages to build in addition to binaries. Possible values:
  > "exe" - Create win32 setup file.
          - Requires installing Inno Setup 5 and to be running Windows to build.
* Default: ""

--noCompress, -n
* Boolean
* Enable to stop output directories from being added to ZIP/TAR archives. Useful for debugging.
* Default: false

--help, -h true
* Boolean
* Displays this help message.`;

var manifest = require('./package.json'),
    process  = require("process"),
    exec     = require('child_process').exec,
    fs       = require("fs.extra"),
    curDir   = require('path').dirname(require.main.filename),
    archiver = require('archiver'),

    // Command line arguments.
    cmdArgs  = require('command-line-args'),
    optionDefinitions = [
      { name: "platforms", alias: "p", type: String, defaultValue: "linux64,linux32,osx64,win32" },
      { name: "extras", alias: "e", type: String, defaultValue: ""},
      { name: "noCompress", alias: "n", type: Boolean, defaultValue: false},
      { name: "help", alias: "h", type: Boolean, defaultValue: false}
    ],
    cmdOptions = cmdArgs(optionDefinitions),
    extras = cmdOptions.extras,
    compress = (cmdOptions.noCompress ? false : true),

    // nwjs-builder
    nwjsBuilder = require("nwjs-builder"),
    options = {
      platforms: cmdOptions.platforms,
      version: "0.19.3",
      outputDir: "bin/Boats-Animator",
      outputName: "Boats-Animator-{version}-{target}",
      outputFormat: "DIR",
      executableName: "BoatsAnimator",
      winIco: "icons/icon.ico",
      macIcns: "icons/icon.icns"
    };

if (cmdOptions.help) {
  console.log(help);
} else {
  createTemp();
}

// Move the files to be packaged to a temp directory.
function createTemp() {
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
}

// Use nwjs-builder to create the output .
function build() {
  nwjsBuilder.commands.nwbuild("temp", options, function(err) {
    console.log(err ? err : "Finished exporting packages");
    fs.rmrf("temp", function(err) {
      console.log(err ? err : "Delete temp directory");

      console.log("Running platform specific additions...");
      linux();
      mac();
      windows();
    });
  });
}

// Linux specific changes.
function linux() {
  // Check whether output platforms contains linux32, linux64, both or neither.
  var linuxDirs = [];
  if (options.platforms.includes("linux32")) {
    linuxDirs.push(`${options.outputDir}/Boats-Animator-${manifest.version}-linux-ia32`);
  }
  if (options.platforms.includes("linux64")) {
    linuxDirs.push(`${options.outputDir}/Boats-Animator-${manifest.version}-linux-x64`);
  }

  linuxDirs.forEach(function(dir) {
    // Set Linux executable permissions
    fs.chmod(`${dir}/${options.executableName}`, 0777, function(err) {
      console.log(err ? err : `  linux${dir.slice(-2)}: Set BoatsAnimator executable file permissions`);

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

          // Compress Linux dirs
          compressDir(dir, "tar.gz");
        });
      });
    });
  });
}

// Mac OS specific changes.
function mac() {
  if (options.platforms.includes("osx64")) {
    var macDir = `Boats-Animator-${manifest.version}-osx-x64`;
    // Compress Mac dirs
    compressDir(`${options.outputDir}/${macDir}`, "zip");
  }
}

// Win32 specific changes.
function windows() {
  if (options.platforms.includes("win32")) {
    var win32Dir = `Boats-Animator-${manifest.version}-win-ia32`;

    if (process.platform === "win32" && extras.includes("exe")) {
      // Create installer file using Inno Setup
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
            // Compress the Win32 dir after setup exe is made.
            compressDir(`${options.outputDir}/${win32Dir}`, "zip");
          });
        }
      });
    } else {
      // Compress the Win32 dir.
      compressDir(`${options.outputDir}/${win32Dir}`, "zip");
    }
  }
}

/**
 * Create a compressed archive from a directory.
 * @param {String} dir    Location of directory to compress.
 * @param {String} format Format to compress to (eg ZIP or TAR)
 */
function compressDir(dir, format) {
  if (compress) {
    var output = fs.createWriteStream(`${dir}.${format}`),
        archive;

    // Work with tar.gz
    if (format === "tar.gz") {
      archive = archiver("tar", { gzip: true });
    } else {
      archive = archiver(format);
    }

    output.on("close", function() {
      console.log(`  archiver: Compress ${dir} to ${format}`);
      fs.rmrf(dir, function(err) {
        console.log(err ? err : `  archiver: Deleted ${dir}`);
      })
    });

    archive.on("error", function(err) {
      throw err;
    });

    archive.pipe(output);

    archive.directory(dir, "/")
      .finalize();
  }
}
