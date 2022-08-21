export interface UserPreferences {
  playCaptureSound: boolean;
  shortPlayLength: number;
  workingDirectory: string | undefined;
}

export const defaultUserPreferences: UserPreferences = {
  playCaptureSound: true,
  shortPlayLength: 6,
  workingDirectory: undefined,
};
