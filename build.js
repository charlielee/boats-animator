(function() {
  "use strict";
  const curDir = require('path').dirname(require.main.filename);
  const NwPackager = require("nwjs-packager");
  const path = require("path");

  const nwBuilderOptions = {
    "platforms": ["win32", "win64", "linux32", "linux64", "osx64"],
    "files": [
      "app/**",
      "icons/**",
      "package.json"
    ],
    "version": "0.35.4",
    "winIco": "icons/icon.ico",
    "macIcns": "icons/icon.icns",
    "flavor": "normal"
  }
  const packageOptions = {
    "package_name": "%a%-%v%-%p%",
    "build_current_os_only": true,
    "linux": {
      "pre": {
        "desktop_file": true,
      },
      "packages": {
        "deb": true,
        "rpm": false,
        "tar": false,
        "tar.gz": true,
        "zip": false,
      },
    },
    "osx": {
      "packages": {
        "pkg": true,
        "tar": false,
        "tar.gz": false,
        "zip": true,
      },
    },
    "win": {
      "packages": {
        "tar": false,
        "tar.gz": false,
        "zip": true,
      },
    },
    "win32": {
      "packages": {
        "inno_setup": path.join(curDir, "win-install", "setup.iss"),
      }
    }
  };

  let nwp = new NwPackager(nwBuilderOptions, packageOptions);

  nwp.build().then(() => {
    return nwp.package();
  }).then(() => {
    console.log("Finished!");
  }).catch((error) => {
    console.error(error);
  });
})();