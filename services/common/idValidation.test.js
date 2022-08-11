import {
  getWaiverFamily,
  getParentWaiver,
  getWaiverTypeFromNumber,
  decodeWaiverNumber,
} from "./idValidation";

describe("Waiver Number Useful Functions", () => {
  it("gets the Waiver Family Number", () => {
    expect(getWaiverFamily("MI.77777.R01.M01")).toStrictEqual("MI.77777");
    expect(getWaiverFamily("MI.77777.R00.00")).toStrictEqual("MI.77777");
    expect(getWaiverFamily("MI.77777.R01.M00")).toStrictEqual("MI.77777");
    expect(getWaiverFamily("MI.77777.R00.M00")).toStrictEqual("MI.77777");
    expect(getWaiverFamily("MI.77777.R00.M01")).toStrictEqual("MI.77777");
    expect(getWaiverFamily("MI.77777.R01.00")).toStrictEqual("MI.77777");
    expect(getWaiverFamily("MI.77777.R01.01")).toStrictEqual("MI.77777");
    expect(getWaiverFamily()).toStrictEqual("MI.77777");
  });

  it("gets the Parent Waiver Number and Type", () => {
    expect(getParentWaiver("MI.77777.R01.M01")).toStrictEqual([
      "MI.77777.R01.00",
      "waiverrenewal",
    ]);
    expect(getParentWaiver("MI.77777.R00.M01")).toStrictEqual([
      "MI.77777.R00.00",
      "waivernew",
    ]);
    expect(getParentWaiver("MI.77777.R01.00")).toStrictEqual([
      "MI.77777.R01.00",
      "waiverrenewal",
    ]);
  });

  it("gets the Waiver Type based on Number", () => {
    expect(getWaiverTypeFromNumber("MI.77777.R00.M00")).toStrictEqual(
      "waivernew"
    );
    expect(getWaiverTypeFromNumber("MI.77777.R01.00")).toStrictEqual(
      "waiverrenewal"
    );
    expect(getWaiverTypeFromNumber("MI.77777.R01.M01")).toStrictEqual(
      "waiveramendment"
    );
    expect(getWaiverTypeFromNumber("MI.77777.R00.M01")).toStrictEqual(
      "waiveramendment"
    );
    expect(getWaiverTypeFromNumber("MI.77777.R01.01")).toStrictEqual(
      "waiverappk"
    );
    expect(getWaiverTypeFromNumber("MI.77777.R00.01")).toStrictEqual(
      "waiverappk"
    );
  });

  it("decodes the Waiver Number", () => {
    expect(decodeWaiverNumber("MI.77777.R01.M01")).toStrictEqual({
      family: "MI.77777",
      renewal: "01",
      amendment: "01",
      isAppK: false,
    });
    expect(decodeWaiverNumber("MI.77777.R00.00")).toStrictEqual({
      amendment: "00",
      family: "MI.77777",
      isAppK: true,
      renewal: "00",
    });
    expect(decodeWaiverNumber("MI.77777.R01.M00")).toStrictEqual({
      amendment: "00",
      family: "MI.77777",
      isAppK: false,
      renewal: "01",
    });
    expect(decodeWaiverNumber("MI.77777.R00.M00")).toStrictEqual({
      amendment: "00",
      family: "MI.77777",
      isAppK: false,
      renewal: "00",
    });
    expect(decodeWaiverNumber("MI.77777.R00.M01")).toStrictEqual({
      amendment: "01",
      family: "MI.77777",
      isAppK: false,
      renewal: "00",
    });
    expect(decodeWaiverNumber("MI.77777.R01.00")).toStrictEqual({
      amendment: "00",
      family: "MI.77777",
      isAppK: true,
      renewal: "01",
    });
    expect(decodeWaiverNumber("MI.77777.R01.01")).toStrictEqual({
      amendment: "01",
      family: "MI.77777",
      isAppK: true,
      renewal: "01",
    });
    expect(decodeWaiverNumber()).toBeNull();
  });
});
