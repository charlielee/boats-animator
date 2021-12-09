import { UserPreferencesState } from "./state";

export enum UserPreferencesActionType {
  EDIT = "userPreferences/EDIT",
}

interface EditUserPreferencesAppAction {
  type: UserPreferencesActionType.EDIT;
  payload: { userPreferences: Partial<UserPreferencesState> };
}

export type UserPreferencesAction = EditUserPreferencesAppAction;
