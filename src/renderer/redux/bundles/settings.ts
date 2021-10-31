interface Settings {
  exportFrameDir: string;
}

export interface SettingsAction {
  type: SettingsActionType;
  payload?: {
    settings?: Settings;
  };
}

// Actions
export enum SettingsActionType {
  GET = "settings/GET",
  EDIT = "settings/EDIT",
}

// Initial state
const initialState: Settings = {
  exportFrameDir: "beans",
};

// Reducer
const settingsReducer = (
  state = initialState,
  action: SettingsAction
): Settings => {
  switch (action.type) {
    case SettingsActionType.GET:
      return state;
    case SettingsActionType.EDIT:
      return { ...state, ...action.payload?.settings };
    default:
      return state;
  }
};

// Action Creators
export const getSettings = (): SettingsAction => {
  return { type: SettingsActionType.GET };
};

export const editSettings = (settings: Settings): SettingsAction => {
  return { type: SettingsActionType.EDIT, payload: { settings } };
};

export default settingsReducer;
