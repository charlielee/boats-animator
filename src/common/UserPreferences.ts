export interface UserPreferences {
  playCaptureSound: boolean;
  workingDirectory: string | undefined;
}

export const defaultUserPreferences: UserPreferences = {
  playCaptureSound: true,
  workingDirectory: undefined,
};
