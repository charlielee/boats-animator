interface Settings {
  exportFrameDir: string | undefined;
}

interface SettingsAction {
  type: SettingsActionType;
  payload?: {
    settings?: Settings;
  };
}

export enum SettingsActionType {
  GET = "settings/GET",
  EDIT = "settings/EDIT",
}

const initialState: Settings = {
  exportFrameDir: undefined,
};

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

export const getSettings = (): SettingsAction => {
  return { type: SettingsActionType.GET };
};

export const editSettings = (settings: Settings): SettingsAction => {
  return { type: SettingsActionType.EDIT, payload: { settings } };
};

export default settingsReducer;
