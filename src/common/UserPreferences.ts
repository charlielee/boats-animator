export interface UserPreferences {
  playCaptureSound: boolean;
  shortPlayLength: number;
  showTimestampInSeconds: boolean;
  showTestCamera: boolean;
}

export const defaultUserPreferences: UserPreferences = {
  playCaptureSound: true,
  shortPlayLength: 6,
  showTimestampInSeconds: false,
  showTestCamera: false,
};
