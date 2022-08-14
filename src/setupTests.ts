import nodeCrypto from "crypto";
import { api } from "./rendererPreload/preload";

jest.mock("./rendererPreload/preload");

// Inject rendererPreload API used for Electron context isolation
window.preload = api;

// Polyfill for Jest environment not supporting method used by uuid
(window.crypto as any) = {
  getRandomValues: function (buffer: any) {
    return nodeCrypto.randomFillSync(buffer);
  },
} as any;
