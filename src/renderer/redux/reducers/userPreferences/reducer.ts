import { UserPreferencesAction, UserPreferencesActionType } from "./actions";
import { initialUserPreferencesState, UserPreferencesState } from "./state";

const userPreferencesReducer = (
  state = initialUserPreferencesState,
  action: UserPreferencesAction
): UserPreferencesState => {
  switch (action.type) {
    case UserPreferencesActionType.EDIT:
      return { ...state, ...action.payload?.userPreferences };
    default:
      return state;
  }
};

export const editUserPreferences = (
  userPreferences: Partial<UserPreferencesState>
): UserPreferencesAction => {
  return { type: UserPreferencesActionType.EDIT, payload: { userPreferences } };
};

export default userPreferencesReducer;
