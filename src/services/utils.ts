export const zeroPad = (value: number, length: number) => {
  const zeros = "0".repeat(length);

  return `${zeros.substring(0, zeros.length - value.toString().length)}${value}`;
};

export const stringToArray = (items: string) =>
  // Regexes are to handle arguments in quotes
  // https://stackoverflow.com/a/56119602
  items.match(/[^\s"']+|"([^"]*)"/gim)?.map((arg: string) => arg.replace(/"|'/g, ""));

export const PROJECT_DIRECTORY_EXTENSION = "boatsfiles";
export const PROJECT_INFO_FILE_NAME = "project.boatsinfo";
export const DEFAULT_PROJECT_NAME = "Untitled Movie";
export const DEFAULT_PROJECT_NAME_FORMATTED = "Untitled-Movie";
export const DEFAULT_PROJECT_DIRECTORY_NAME = `Untitled-Movie.${PROJECT_DIRECTORY_EXTENSION}`;
export const DEFAULT_PROJECT_FRAME_RATE = 15;
export const DEFAULT_ONION_SKIN_OPACITY = 0.5;
export const DEFAULT_ONION_SKIN_FRAMES_VISIBLE = 1;
export const CURRENT_PROJECT_INFO_FILE_SCHEMA_VERSION = 2;
