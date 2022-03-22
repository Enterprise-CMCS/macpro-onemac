import { ONEMAC_STATUS, get90thDayText, NINETY_DAY_STATUS } from "./workflow";

describe("get90thDayText", () => {
  it("returns 'Pending' string when status is 'In Review'", () => {
    const ninetyDay = get90thDayText(ONEMAC_STATUS.IN_REVIEW, null);
    expect(ninetyDay).toBe(NINETY_DAY_STATUS.PENDING);
  });

  it("returns 'Clock Stopped' string when status is 'RAI Issued'", () => {
    const ninetyDay = get90thDayText(ONEMAC_STATUS.RAI_ISSUED, null);
    expect(ninetyDay).toBe(NINETY_DAY_STATUS.CLOCK_STOPPED);
  });

  it("returns 'N/A' string when status is 'Approved'", () => {
    const ninetyDay = get90thDayText(ONEMAC_STATUS.APPROVED, new Date());
    expect(ninetyDay).toBe(NINETY_DAY_STATUS.NA);
  });
  it("returns date string when status is other", () => {
    const today = new Date();
    const ninetyDay = get90thDayText("OTHER_NOT_REAL_STATUS", today);
    expect(ninetyDay).toBe(today);
  });
});
