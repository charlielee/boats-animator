export const zeroPad = (value: number, length: number) => {
  const zeros = "0".repeat(length);

  return `${zeros.substring(0, zeros.length - value.toString().length)}${value}`;
};

export const stringToArray = (items: string) =>
  // Regexes are to handle arguments in quotes
  // https://stackoverflow.com/a/56119602
  items.match(/[^\s"']+|"([^"]*)"/gim)?.map((arg: string) => arg.replace(/"|'/g, ""));

export const PLAYBACK_SPEEDS = {
  "0.1×": 0.1,
  "0.25×": 0.25,
  "0.5×": 0.5,
  "1.0×": 1,
  "2.0×": 2,
  "4.0×": 4,
};

export const PROJECT_DIRECTORY_EXTENSION = "bafiles";
