export interface UserPreferences {
  playCaptureSound: boolean;
  shortPlayLength: number;
  showTimestampInSeconds: boolean;
  defaultWorkingDirectory: string | undefined;
}

export const defaultUserPreferences: UserPreferences = {
  playCaptureSound: true,
  shortPlayLength: 6,
  showTimestampInSeconds: false,
  defaultWorkingDirectory: undefined,
};
