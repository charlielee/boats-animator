import { PreloadApi } from "../rendererPreload/PreloadApi";

// Enables access to preload.ts methods via window.preload
declare global {
  interface Window {
    preload: PreloadApi;
  }
}
