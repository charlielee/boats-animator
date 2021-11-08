import { WindowSize } from "../../../common/WindowSize";

export interface UserPreferencesState {
  projectDefaults: {
    exportFrameDir: string | undefined;
  };
  windows: {
    animator: WindowSize;
  };
}

export interface UserPreferencesAction {
  type: UserPreferencesActionType;
  payload?: {
    userPreferences?: Partial<UserPreferencesState>;
  };
}

export enum UserPreferencesActionType {
  GET = "userPreferences/GET",
  EDIT = "userPreferences/EDIT",
}

const initialState: UserPreferencesState = {
  projectDefaults: {
    exportFrameDir: undefined,
  },
  windows: {
    animator: {
      isMaximized: false,
      winBounds: undefined,
    },
  },
};

const userPreferencesReducer = (
  state = initialState,
  action: UserPreferencesAction
): UserPreferencesState => {
  switch (action.type) {
    case UserPreferencesActionType.GET:
      return state;
    case UserPreferencesActionType.EDIT:
      return { ...state, ...action.payload?.userPreferences };
    default:
      return state;
  }
};

export const getUserPreferences = (): UserPreferencesAction => {
  return { type: UserPreferencesActionType.GET };
};

export const editUserPreferences = (
  userPreferences: Partial<UserPreferencesState>
): UserPreferencesAction => {
  return { type: UserPreferencesActionType.EDIT, payload: { userPreferences } };
};

export default userPreferencesReducer;
