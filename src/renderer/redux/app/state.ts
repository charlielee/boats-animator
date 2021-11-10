import { AppMode } from "../../../common/AppMode";

export interface AppState {
  appMode: AppMode;
  loadingMessage?: string;
}

export const initialAppState: AppState = {
  appMode: AppMode.CAPTURE,
  loadingMessage: undefined,
};
