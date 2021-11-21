export const numberPaddedWithZeros = (value: number, length: number) => {
  const zeros = "0".repeat(length);

  return `${zeros.substring(
    0,
    zeros.length - value.toString().length
  )}${value}`;
};

export const secondsToTimeCode = (seconds: number) => {
  const minuteComponent = (seconds - (seconds % 60)) / 60;
  const secondComponent = seconds % 60;

  return [
    numberPaddedWithZeros(minuteComponent, 2),
    numberPaddedWithZeros(secondComponent, 2),
  ].join(":");
};
