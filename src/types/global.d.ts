import { PreloadApi } from "../../electron/preload/preload";

// Enables access to preload.ts methods via window.preload
declare global {
  interface Window {
    preload: PreloadApi;
  }
}
