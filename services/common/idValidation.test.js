import { TYPE } from "./changeRequest";
import { decodeId } from "./idValidation";

describe("decodeId for SPA IDs", () => {
  it("handles a null component type", () => {
    const myIdnull = decodeId("Anything");
    expect(myIdnull.componentType).toBe(undefined);
  });

  it("decodes SPA ID", () => {
    const myId = decodeId("MI-11-1119", TYPE.SPA);
    expect(myId.componentId).toBe("MI-11-1119");
    expect(myId.componentType).toBe("spa");
    expect(myId.isNewPackage).toBe(true);
    expect(myId.packageId).toBe("MI-11-1119");
    expect(myId.parentType).toBe("spa");
  });

  it("decodes SPA RAI ID", () => {
    const myId = decodeId("MI-11-1119", TYPE.SPA_RAI);
    expect(myId.componentId).toBe("MI-11-1119");
    expect(myId.componentType).toBe("sparai");
    expect(myId.isNewPackage).toBe(false);
    expect(myId.packageId).toBe("MI-11-1119");
    expect(myId.parentType).toBe("spa");
  });

  it("decodes CHIP SPA ID", () => {
    const myId = decodeId("MI-00-1234-CHIP", TYPE.CHIP_SPA);
    expect(myId.packageId).toBe("MI-00-1234-CHIP");
  });

  it("decodes CHIP SPA RAI ID", () => {
    const myId = decodeId("MI-00-1234-CHIP", TYPE.CHIP_SPA_RAI);
    expect(myId.componentId).toBe("MI-00-1234-CHIP");
    expect(myId.componentType).toBe("chipsparai");
    expect(myId.isNewPackage).toBe(false);
    expect(myId.packageId).toBe("MI-00-1234-CHIP");
    expect(myId.parentType).toBe("chipspa");
  });
});

describe("decodeId for Waiver Numbers", () => {
  it("decodes base WAIVER NUMBER", () => {
    const myId = decodeId("MI.77777", TYPE.WAIVER_BASE);
    expect(myId.componentId).toBe("MI.77777");
    expect(myId.componentType).toBe("waivernew");
    expect(myId.isNewPackage).toBe(true);
    expect(myId.packageId).toBe("MI.77777");
    expect(myId.parentType).toBe("waivernew");
  });

  it("decodes BASE WAIVER RAI NUMBER", () => {
    const myId = decodeId("MI.77777", TYPE.WAIVER_RAI);
    expect(myId.componentId).toBe("MI.77777");
    expect(myId.componentType).toBe("waiverrai");
    expect(myId.isNewPackage).toBe(false);
    expect(myId.packageId).toBe("MI.77777");
    expect(myId.parentType).toBe("waivernew");
  });

  it("decodes BASE WAIVER EXTENSION NUMBER", () => {
    const myId = decodeId("MI.77777.R00.TE01", TYPE.WAIVER_EXTENSION);
    expect(myId.componentId).toBe("MI.77777.R00.TE01");
    expect(myId.componentType).toBe("waiverextension");
    expect(myId.isNewPackage).toBe(false);
    expect(myId.packageId).toBe("MI.77777.R00.00");
    expect(myId.parentType).toBe("waivernew");
  });

  it("decodes BASE WAIVER AMENDMENT NUMBER", () => {
    const myId = decodeId("MI.77777.R00.M01", TYPE.WAIVER_AMENDMENT);
    expect(myId.componentId).toBe("MI.77777.R00.M01");
    expect(myId.componentType).toBe("waiveramendment");
    expect(myId.isNewPackage).toBe(false);
    expect(myId.packageId).toBe("MI.77777.R00.00");
    expect(myId.parentType).toBe("waivernew");
  });

  it("decodes BASE WAIVER AMENDMENT RAI NUMBER", () => {
    const myId = decodeId("MI.77777.R00.M01", TYPE.WAIVER_RAI);
    expect(myId.componentId).toBe("MI.77777.R00.M01");
    expect(myId.componentType).toBe("waiverrai");
    expect(myId.isNewPackage).toBe(false);
    expect(myId.packageId).toBe("MI.77777.R00.M01");
    expect(myId.parentType).toBe("waiveramendment");
  });

  it("decodes RENEWAL WAIVER NUMBER", () => {
    const myId = decodeId("MI.77777.R01", TYPE.WAIVER_RENEWAL);
    expect(myId.componentId).toBe("MI.77777.R01");
    expect(myId.componentType).toBe("waiverrenewal");
    expect(myId.isNewPackage).toBe(true);
    expect(myId.packageId).toBe("MI.77777.R01");
    expect(myId.parentType).toBe("waiverrenewal");
  });

  it("decodes RENEWAL WAIVER NUMBER RAI", () => {
    const myId = decodeId("MI.77777.R01", TYPE.WAIVER_RAI);
    expect(myId.componentId).toBe("MI.77777.R01");
    expect(myId.componentType).toBe("waiverrai");
    expect(myId.isNewPackage).toBe(false);
    expect(myId.packageId).toBe("MI.77777.R01");
    expect(myId.parentType).toBe("waiverrenewal");
  });

  it("decodes RENEWAL WAIVER EXTENSION NUMBER", () => {
    const myId = decodeId("MI.77777.R01", TYPE.WAIVER_EXTENSION);
    expect(myId.componentId).toBe("MI.77777.R01");
    expect(myId.componentType).toBe("waiverextension");
    expect(myId.isNewPackage).toBe(false);
    expect(myId.packageId).toBe("MI.77777.R01");
    expect(myId.parentType).toBe("waiverrenewal");
  });

  it("decodes RENEWAL WAIVER AMENDMENT NUMBER", () => {
    const myId = decodeId("MI.77777.R01.M01", TYPE.WAIVER_AMENDMENT);
    expect(myId.componentId).toBe("MI.77777.R01.M01");
    expect(myId.componentType).toBe("waiveramendment");
    expect(myId.isNewPackage).toBe(false);
    expect(myId.packageId).toBe("MI.77777.R01");
    expect(myId.parentType).toBe("waiverrenewal");
  });

  it("decodes RENEWAL WAIVER AMENDMENT NUMBER RAI", () => {
    const myId = decodeId("MI.77777.R01.M01", TYPE.WAIVER_RAI);
    expect(myId.componentId).toBe("MI.77777.R01.M01");
    expect(myId.componentType).toBe("waiverrai");
    expect(myId.isNewPackage).toBe(false);
    expect(myId.packageId).toBe("MI.77777.R01.M01");
    expect(myId.parentType).toBe("waiveramendment");
  });
});
