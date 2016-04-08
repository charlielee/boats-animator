var userDir = process.env.USERPROFILE,
    NwBuilder = require(userDir + "\\AppData\\Roaming\\npm\\node_modules\\nw-builder"),
    nw = new NwBuilder({
      files: "app\\**\\**", // use the glob format
      platforms: ["linux64", "linux32", "osx64", "win32", "win64"],
      version: "0.12.3",
      appName: "Boats Animator",
      buildDir: "bin",
      cacheDir: userDir + "\\AppData\\Roaming\\npm\\node_modules\\nw-builder\\cache",
    });

nw.on("log",  console.log);

// Build returns a promise
nw.build().then(function () {
  console.log("all done!");
}).catch(function (error) {
  console.error(error);
});