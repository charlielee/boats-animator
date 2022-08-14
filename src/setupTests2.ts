import { api } from "./rendererPreload/preload";

jest.mock("./rendererPreload/preload");

(window.preload as any) = api;

// window.preload = api;
