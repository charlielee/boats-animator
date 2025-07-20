import { Rectangle } from "electron";

export interface WindowSize {
  isMaximized: boolean;
  winBounds: Rectangle | undefined;
}
