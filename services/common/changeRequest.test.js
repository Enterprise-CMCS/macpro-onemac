import { TYPE, decodeId } from "./changeRequest";

describe("decodeId SPA ID", () => {
  const myId = decodeId("MI-11-1119", TYPE.SPA);
  it("SPA", () => {
    expect(myId.componentId).toBe("MI-11-1119");
    expect(myId.componentType).toBe("spa");
    expect(myId.isNewPackage).toBe(true);
    expect(myId.packageId).toBe("MI-11-1119");
    expect(myId.parentType).toBe("spa");
    const myIdnull = decodeId("MI-11-1119");
    expect(myIdnull.componentType).toBe(undefined);
  });
});

describe("decodeId SPA_RAI ID", () => {
  const myId = decodeId("MI-11-1119", TYPE.SPA_RAI);
  it("SPA", () => {
    expect(myId.componentId).toBe("MI-11-1119");
    expect(myId.componentType).toBe("sparai");
    expect(myId.isNewPackage).toBe(false);
    expect(myId.packageId).toBe("MI-11-1119");
    expect(myId.parentType).toBe("spa");
    const myIdnull = decodeId("MI-11-1119");
    expect(myIdnull.componentType).toBe(undefined);
  });
});
/*
describe("decodeId Wavier ID", () => {
  const myId = decodeId("MI.77777", TYPE.WAIVER_BASE);
  it("WAIVER", () => {
    expect(myId.componentId).toBe("MI.77777");
    expect(myId.componentType).toBe("waivernew");
    expect(myId.isNewPackage).toBe(true);
    expect(myId.packageId).toBe("MI.77777");
    expect(myId.parentType).toBe("waivernew");
    const myIdnull = decodeId("MI.77777");
    expect(myIdnull.componentType).toBe(undefined);
  });
});

describe("decodeId Wavier RAI ID", () => {
  const myId = decodeId("MI.77777", TYPE.WAIVER_RAI);
  it("WAIVER", () => {
    expect(myId.componentId).toBe("MI.77777");
    expect(myId.componentType).toBe("waiverrai");
    expect(myId.isNewPackage).toBe(false);
    expect(myId.packageId).toBe("MI.77777");
    expect(myId.parentType).toBe("waivernew");
    const myIdnull = decodeId("MI.77777");
    expect(myIdnull.componentType).toBe(undefined);
  });
});

describe("decodeId Wavier RAI ID", () => {
  const myId = decodeId("MI.77777", TYPE.WAIVER_RAI);
  it("WAIVER", () => {
    expect(myId.componentId).toBe("MI.77777");
    expect(myId.componentType).toBe("waiverrai");
    expect(myId.isNewPackage).toBe(false);
    expect(myId.packageId).toBe("MI.77777");
    expect(myId.parentType).toBe("waivernew");
    const myIdnull = decodeId("MI.77777");
    expect(myIdnull.componentType).toBe(undefined);
  });
});

describe("decodeId WAIVER_AMENDMENT", () => {
  const myId = decodeId("MI.77777", TYPE.WAIVER_AMENDMENT);
  it("WAIVER", () => {
    expect(myId.componentId).toBe("MI.77777");
    expect(myId.componentType).toBe("waiveramendment");
    expect(myId.isNewPackage).toBe(false);
    expect(myId.packageId).toBe("MI.77777");
    expect(myId.parentType).toBe("waivernew");
    const myIdnull = decodeId("MI.77777");
    expect(myIdnull.componentType).toBe(undefined);
  });
});

describe("decodeId WAIVER_APP_K", () => {
  const myId = decodeId("MI.1111.R11.22", TYPE.WAIVER_APP_K);
  it("WAIVER", () => {
    expect(myId.componentId).toBe("MI.1111.R11.22");
    expect(myId.componentType).toBe("waiverappk");
    expect(myId.isNewPackage).toBe(false);
    expect(myId.packageId).toBe("MI.1111");
    expect(myId.parentType).toBe("waivernew");
    const myIdnull = decodeId("MI.1111");
    expect(myIdnull.componentType).toBe(undefined);
  });
});

describe("decodeId WAIVER_APP_K", () => {
  const myId = decodeId("MI.1111.R11-22", TYPE.WAIVER_APP_K);
  it("WAIVER", () => {
    expect(myId.componentId).toBe("MI.1111.R11-22");
    expect(myId.componentType).toBe("waiverappk");
    expect(myId.isNewPackage).toBe(false);
    expect(myId.packageId).toBe("MI.1111");
    expect(myId.parentType).toBe("waivernew");
    const myIdnull = decodeId("MI.1111");
    expect(myIdnull.componentType).toBe(undefined);
  });
});

describe("decodeId WAIVER_APP_K Seatool dash", () => {
  const myId = decodeId("MI.1111-R11,22", TYPE.WAIVER_APP_K);
  it("WAIVER", () => {
    expect(myId.componentId).toBe("MI.1111-R11,22");
    expect(myId.componentType).toBe("waiverappk");
    expect(myId.isNewPackage).toBe(false);
    expect(myId.packageId).toBe("MI.1111");
    expect(myId.parentType).toBe("waivernew");
    const myIdnull = decodeId("MI.1111");
    expect(myIdnull.componentType).toBe(undefined);
  });
});

describe("decodeId WAIVER_EXTENSION", () => {
  const myId = decodeId("MI.77777", TYPE.WAIVER_EXTENSION);
  it("WAIVER", () => {
    expect(myId.componentId).toBe("MI.77777");
    expect(myId.componentType).toBe("waiverextension");
    expect(myId.isNewPackage).toBe(false);
    expect(myId.packageId).toBe("MI.77777");
    expect(myId.parentType).toBe("waivernew");
    const myIdnull = decodeId("MI.77777");
    expect(myIdnull.componentType).toBe(undefined);
  });
});

describe("decodeId WAIVER_RENEWAL", () => {
  const myId = decodeId("MI.77777", TYPE.WAIVER_RENEWAL);
  it("WAIVER", () => {
    expect(myId.componentId).toBe("MI.77777");
    expect(myId.componentType).toBe("waiverrenewal");
    expect(myId.isNewPackage).toBe(false);
    expect(myId.packageId).toBe("MI.77777");
    expect(myId.parentType).toBe("waivernew");
    const myIdnull = decodeId("MI.77777");
    expect(myIdnull.componentType).toBe(undefined);
  });
});

describe("decodeId SPA CHIP RAI ID", () => {
  const myId = decodeId("MI-00-1234-CHIP", TYPE.CHIP_SPA_RAI);
  it("WAIVER", () => {
    expect(myId.componentId).toBe("MI-00-1234-CHIP");
    expect(myId.componentType).toBe("chipsparai");
    expect(myId.isNewPackage).toBe(false);
    expect(myId.packageId).toBe("MI-00-1234-CHIP");
    expect(myId.parentType).toBe("chipspa");
    const myIdnull = decodeId("MI-00-1234-CHIP");
    expect(myIdnull.componentType).toBe(undefined);
  });
});

describe("decodeId SPA CHIP ID", () => {
  const myId = decodeId("MI-00-1234-CHIP", TYPE.CHIP_SPA);
  it("WAIVER", () => {
    expect(myId.packageId).toBe("MI-00-1234-CHIP");
  });
});
*/
