declare global {
  interface Window {
    preload: any;
  }
}

if (window.preload === undefined) {
  throw Error("This app must be run inside of Electron and not a web browser!");
}

export {};
