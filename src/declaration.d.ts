import { PreloadApi } from "./common/PreloadApi";

// Required to allow importing images with webpack in typescript
declare module "*.png";
declare module "*.jpg";
declare module "*.svg";

// Enables access to preload.ts methods via window.preload
declare global {
  interface Window {
    preload: PreloadApi;
  }
}
