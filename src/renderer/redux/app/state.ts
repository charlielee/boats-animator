import { AppMode } from "../../../common/AppMode";
import ModalName from "../../components/common/Modal/ModalName";

export interface AppState {
  appMode: AppMode;
  loadingMessage?: string;
  currentModal?: ModalName;
}

export const initialAppState: AppState = {
  appMode: AppMode.CAPTURE,
  loadingMessage: undefined,
  currentModal: ModalName.STARTUP,
};
