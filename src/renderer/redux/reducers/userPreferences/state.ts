import { UserPreferences } from "../../../../common/UserPreferences";

export type UserPreferencesState = UserPreferences;

export const initialUserPreferencesState: UserPreferencesState = {
  workingDirectory: undefined,
};
