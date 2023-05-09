export interface UserPreferences {
  playCaptureSound: boolean;
  shortPlayLength: number;
  showTimestampInSeconds: boolean;
  workingDirectory: string | undefined;
}

export const defaultUserPreferences: UserPreferences = {
  playCaptureSound: true,
  shortPlayLength: 6,
  showTimestampInSeconds: false,
  workingDirectory: undefined,
};
