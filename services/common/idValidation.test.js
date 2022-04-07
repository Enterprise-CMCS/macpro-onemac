import { getWaiverFamily } from "./idValidation";

describe("Waiver Family Numbers", () => {
  it("gets the Waiver Family Number", () => {
    const familyNumber = getWaiverFamily("MI.77777.R01.M01");
    expect(familyNumber).toBe("MI.77777");
  });
});
