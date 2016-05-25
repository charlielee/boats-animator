var userDir = process.env.USERPROFILE,
    NwBuilder = require(`${userDir}\\AppData\\Roaming\\npm\\node_modules\\nw-builder`),
    nw = new NwBuilder({
      files: "app\\**\\**", // use the glob format
      platforms: ["linux64", "linux32", "osx64", "win32"],
      version: "0.14.3",
      appName: "BoatsAnimator",
      buildDir: "bin",
      cacheDir: `${userDir}\\AppData\\Roaming\\npm\\node_modules\\nw-builder\\cache`,
      winIco: "win-install\\icon.ico"
    });

nw.on("log", console.log);

// Build returns a promise
nw.build().then(function () {
  console.log("all done!");
}).catch(function (error) {
  console.error(error);
});