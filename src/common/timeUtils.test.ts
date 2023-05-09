import { buildStartTimeCode, secondsToTimeCode } from "./timeUtils";

describe("secondsToTimeCode", () => {
  it("should convert to correct time codes when show decimal is true", () => {
    expect(secondsToTimeCode(0, true)).toBe("00:00.000");
    expect(secondsToTimeCode(0.01, true)).toBe("00:00.010");
    expect(secondsToTimeCode(0.999, true)).toBe("00:00.999");
    expect(secondsToTimeCode(1, true)).toBe("00:01.000");
    expect(secondsToTimeCode(1.1, true)).toBe("00:01.100");
    expect(secondsToTimeCode(1.6664, true)).toBe("00:01.666");
    expect(secondsToTimeCode(1.6665, true)).toBe("00:01.667");
    expect(secondsToTimeCode(60, true)).toBe("01:00.000");
    expect(secondsToTimeCode(61, true)).toBe("01:01.000");
    expect(secondsToTimeCode(600, true)).toBe("10:00.000");
    expect(secondsToTimeCode(601, true)).toBe("10:01.000");
    expect(secondsToTimeCode(601.789, true)).toBe("10:01.789");
    expect(secondsToTimeCode(5999, true)).toBe("99:59.000");
    expect(secondsToTimeCode(6000, true)).toBe("100:00.000");
  });

  it("should convert to correct time codes when show decimal is false", () => {
    expect(secondsToTimeCode(0, false)).toBe("00:00");
    expect(secondsToTimeCode(0.01, false)).toBe("00:00");
    expect(secondsToTimeCode(0.999, false)).toBe("00:00");
    expect(secondsToTimeCode(1, false)).toBe("00:01");
    expect(secondsToTimeCode(1.1, false)).toBe("00:01");
    expect(secondsToTimeCode(1.6664, false)).toBe("00:01");
    expect(secondsToTimeCode(1.6665, false)).toBe("00:01");
    expect(secondsToTimeCode(60, false)).toBe("01:00");
    expect(secondsToTimeCode(61, false)).toBe("01:01");
    expect(secondsToTimeCode(600, false)).toBe("10:00");
    expect(secondsToTimeCode(601, false)).toBe("10:01");
    expect(secondsToTimeCode(601.789, false)).toBe("10:01");
    expect(secondsToTimeCode(5999, false)).toBe("99:59");
    expect(secondsToTimeCode(6000, false)).toBe("100:00");
  });

  it("should convert to time code with decimal by default", () => {
    expect(secondsToTimeCode(60)).toBe("01:00.000");
  });
});

describe("buildStartTimeCode", () => {
  it("should build correct time codes for frame positions", () => {
    // 15 FPS
    expect(buildStartTimeCode(0, 15, true)).toBe("00:00.000");
    expect(buildStartTimeCode(1, 15, true)).toBe("00:00.067");
    expect(buildStartTimeCode(14, 15, true)).toBe("00:00.933");
    expect(buildStartTimeCode(15, 15, true)).toBe("00:01.000");
    expect(buildStartTimeCode(16, 15, true)).toBe("00:01.067");
    expect(buildStartTimeCode(999, 15, true)).toBe("01:06.600");
    expect(buildStartTimeCode(9999, 15, true)).toBe("11:06.600");
    // 12 FPS
    expect(buildStartTimeCode(0, 12, true)).toBe("00:00.000");
    expect(buildStartTimeCode(1, 12, true)).toBe("00:00.083");
    expect(buildStartTimeCode(11, 12, true)).toBe("00:00.917");
    expect(buildStartTimeCode(12, 12, true)).toBe("00:01.000");
    expect(buildStartTimeCode(13, 12, true)).toBe("00:01.083");
    expect(buildStartTimeCode(999, 12, true)).toBe("01:23.250");
    expect(buildStartTimeCode(9999, 12, true)).toBe("13:53.250");
  });

  it("should build time code for frame position when showDecimal is false", () => {
    expect(buildStartTimeCode(16, 15, false)).toBe("00:01");
  });

  it("should build time code for frame position with decimal by default", () => {
    expect(buildStartTimeCode(16, 15)).toBe("00:01.067");
  });
});
