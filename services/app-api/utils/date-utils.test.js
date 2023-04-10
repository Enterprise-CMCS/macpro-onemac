import { getCMSDateFormat } from "./date-utils";

describe("getCMSDateFormat", () => {
  it("returns the expected date format", () => {
    const timestamp = 1648952400000; // UTC: Sunday, April 3, 2022 2:20:00 AM
    const expected = "Saturday, April 2, 2022 @ 10:20 PM EDT";

    // Call the method being tested
    const result = getCMSDateFormat(timestamp);

    // Check that the expected value was returned
    expect(result).toBe(expected);
  });
});
