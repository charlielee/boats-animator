export interface SettingsState {
  exportFrameDir: string | undefined;
}

export interface SettingsAction {
  type: SettingsActionType;
  payload?: {
    settings?: SettingsState;
  };
}

export enum SettingsActionType {
  GET = "settings/GET",
  EDIT = "settings/EDIT",
}

const initialState: SettingsState = {
  exportFrameDir: undefined,
};

const settingsReducer = (
  state = initialState,
  action: SettingsAction
): SettingsState => {
  switch (action.type) {
    case SettingsActionType.GET:
      return state;
    case SettingsActionType.EDIT:
      return { ...state, ...action.payload?.settings };
    default:
      return state;
  }
};

export const getSettings = (): SettingsAction => {
  return { type: SettingsActionType.GET };
};

export const editSettings = (settings: SettingsState): SettingsAction => {
  return { type: SettingsActionType.EDIT, payload: { settings } };
};

export default settingsReducer;
