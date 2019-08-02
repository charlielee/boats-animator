var fs = require("fs-extra");

fs.exists("app/lib", function(exists) {
  if (!exists) {
    fs.mkdir("app/lib", function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Made dir at 'app/lib'");
      }
    });
  }
  // mkdirp
  fs.copy("node_modules/mkdirp/index.js", "app/lib/mkdirp.js", { replace: true }, function(err) {
    console.log(err ? err : "Copied mkdirp to 'app/lib/mkdirp.js'");
  });
  // Mousetrap
  fs.copy("node_modules/mousetrap/mousetrap.min.js", "app/lib/mousetrap.js", { replace: true }, function(err) {
    console.log(err ? err : "Copied mousetrap.min.js to 'app/lib/mousetrap.js'");
  });
  fs.copy("node_modules/mousetrap/plugins/pause/mousetrap-pause.min.js", "app/lib/mousetrap-pause.js", { replace: true }, function(err) {
    console.log(err ? err : "Copied mousetrap-pause.min.js to 'app/lib/mousetrap-pause.js'");
  });
  // SweetAlert
  fs.copy("node_modules/sweetalert/dist/sweetalert.min.js", "app/lib/sweetalert.js", { replace: true }, function(err) {
    console.log(err ? err : "Copied sweetalert.min.js to 'app/lib/sweetalert.js'");
  });
});
