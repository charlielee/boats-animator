(function() {
  "use strict";
  const curDir   = require('path').dirname(require.main.filename);
  const NwPackager = require("nwjs-packager");
  const path = require("path");

  const nwBuilderOptions = {
    "platforms": ["win32"],
    "files": [
      "app/**",
      "icons/**",
      "package.json"
    ],
    "version": "0.35.4",
    "winIco": "icons/icon.ico",
    "macIcns": "icons/icon.icns"
  }
  const packageOptions = {
    "package_name": "%a%-%v%-%p%",
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
        "inno_setup": path.join(curDir, "win-install", "setup.iss"),
        "tar": false,
        "tar.gz": false,
        "zip": true,
      },
    },
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