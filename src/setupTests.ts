import "@testing-library/jest-dom";
import nodeCrypto from "crypto";
import { api } from "../electron/preload/preload";
import Dexie from "dexie";
import fakeIndexedDB from "fake-indexeddb";
import FDBKeyRange from "fake-indexeddb/lib/FDBKeyRange";
import { TextEncoder, TextDecoder } from "util";

jest.mock("./rendererPreload/preload");

// Inject rendererPreload API used for Electron context isolation
window.preload = api;

// Polyfill for Jest environment not supporting method used by uuid
(window.crypto as any) = {
  getRandomValues: function (buffer: any) {
    return nodeCrypto.randomFillSync(buffer);
  },
} as any;

// Dexie expects window.indexedDB to be defined which isn't available in the Jest environment
Dexie.dependencies.indexedDB = fakeIndexedDB;
Dexie.dependencies.IDBKeyRange = FDBKeyRange;

// MemoryRouter requires TextEncoder
Object.assign(global, { TextDecoder, TextEncoder });
