var fs = require("fs.extra");

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
  fs.copy("node_modules/mkdirp/index.js", "app/lib/mkdirp.js", { replace: true }, function (err) {
    console.log(err ? err : "Copied mkdirp to 'app/lib/mkdirp.js'");
  });
});

