import { secondsToTimeCode } from "./timeUtils";

describe("secondsToTimeCode", () => {
  it("should display correct time codes when show decimal is true", () => {
    expect(secondsToTimeCode(0, true)).toBe("00:00.000");
    expect(secondsToTimeCode(0.01, true)).toBe("00:00.010");
    expect(secondsToTimeCode(0.999, true)).toBe("00:00.999");
    expect(secondsToTimeCode(1, true)).toBe("00:01.000");
    expect(secondsToTimeCode(1.1, true)).toBe("00:01.100");
    expect(secondsToTimeCode(1.66667, true)).toBe("00:01.667");
    expect(secondsToTimeCode(60, true)).toBe("01:00.000");
    expect(secondsToTimeCode(61, true)).toBe("01:01.000");
    expect(secondsToTimeCode(600, true)).toBe("10:00.000");
    expect(secondsToTimeCode(601, true)).toBe("10:01.000");
    expect(secondsToTimeCode(601.789, true)).toBe("10:01.789");
    expect(secondsToTimeCode(5999, true)).toBe("99:59.000");
    expect(secondsToTimeCode(6000, true)).toBe("100:00.000");
  });

  it("should display correct time codes when show decimal is false", () => {
    expect(secondsToTimeCode(0, false)).toBe("00:00");
    expect(secondsToTimeCode(0.01, false)).toBe("00:00");
    expect(secondsToTimeCode(0.999, false)).toBe("00:00");
    expect(secondsToTimeCode(1, false)).toBe("00:01");
    expect(secondsToTimeCode(1.1, false)).toBe("00:01");
    expect(secondsToTimeCode(1.66667, false)).toBe("00:01");
    expect(secondsToTimeCode(60, false)).toBe("01:00");
    expect(secondsToTimeCode(61, false)).toBe("01:01");
    expect(secondsToTimeCode(600, false)).toBe("10:00");
    expect(secondsToTimeCode(601, false)).toBe("10:01");
    expect(secondsToTimeCode(601.789, true)).toBe("10:01.789");
    expect(secondsToTimeCode(5999, false)).toBe("99:59");
    expect(secondsToTimeCode(6000, false)).toBe("100:00");
  });

  it("should display time code with decimal by default", () => {
    expect(secondsToTimeCode(60)).toBe("01:00.000");
  });
});
