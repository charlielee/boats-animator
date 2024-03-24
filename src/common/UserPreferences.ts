export interface UserPreferences {
  playCaptureSound: boolean;
  shortPlayLength: number;
  showTimestampInSeconds: boolean;
}

export const defaultUserPreferences: UserPreferences = {
  playCaptureSound: true,
  shortPlayLength: 6,
  showTimestampInSeconds: false,
};
