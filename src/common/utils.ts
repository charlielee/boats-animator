export const zeroPad = (value: number, length: number) => {
  const zeros = "0".repeat(length);

  return `${zeros.substring(
    0,
    zeros.length - value.toString().length
  )}${value}`;
};

export const secondsToTimeCode = (seconds: number) => {
  const minuteComponent = (seconds - (seconds % 60)) / 60;
  const secondComponent = seconds % 60;

  return [zeroPad(minuteComponent, 2), zeroPad(secondComponent, 2)].join(":");
};

export const stringToArray = (items: string) =>
  // Regexes are to handle arguments in quotes
  // https://stackoverflow.com/a/56119602
  items
    .match(/[^\s"']+|"([^"]*)"/gim)
    ?.map((arg: string) => arg.replace(/"|'/g, ""));
