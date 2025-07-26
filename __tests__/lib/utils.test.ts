import { formatTimeAgo } from "@/lib/utils";

describe("formatTimeAgo", () => {
  beforeAll(() => {
    // Mock Date.now to control current time for testing
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2024-01-01T12:00:00Z"));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should return "Just now" for times less than 60 seconds ago', () => {
    const thirtySecondsAgo = new Date("2024-01-01T11:59:30Z");

    expect(formatTimeAgo(thirtySecondsAgo)).toBe("Just now");
  });

  it("should return minutes for times less than 60 minutes ago", () => {
    const fiveMinutesAgo = new Date("2024-01-01T11:55:00Z");
    const thirtyMinutesAgo = new Date("2024-01-01T11:30:00Z");

    expect(formatTimeAgo(fiveMinutesAgo)).toBe("5m ago");
    expect(formatTimeAgo(thirtyMinutesAgo)).toBe("30m ago");
  });

  it("should return hours for times less than 24 hours ago", () => {
    const twoHoursAgo = new Date("2024-01-01T10:00:00Z");
    const tenHoursAgo = new Date("2024-01-01T02:00:00Z");

    expect(formatTimeAgo(twoHoursAgo)).toBe("2h ago");
    expect(formatTimeAgo(tenHoursAgo)).toBe("10h ago");
  });

  it("should return days for times 24 hours or more ago", () => {
    const oneDayAgo = new Date("2023-12-31T12:00:00Z");
    const threeDaysAgo = new Date("2023-12-29T12:00:00Z");

    expect(formatTimeAgo(oneDayAgo)).toBe("1d ago");
    expect(formatTimeAgo(threeDaysAgo)).toBe("3d ago");
  });

  it("should handle edge cases correctly", () => {
    const exactlyOneMinuteAgo = new Date("2024-01-01T11:59:00Z");
    const exactlyOneHourAgo = new Date("2024-01-01T11:00:00Z");

    expect(formatTimeAgo(exactlyOneMinuteAgo)).toBe("1m ago");
    expect(formatTimeAgo(exactlyOneHourAgo)).toBe("1h ago");
  });
});
