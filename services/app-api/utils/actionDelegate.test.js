import { getActionsForPackage } from "./actionDelegate";

describe("getActionsForPackage", () => {
  const stateUserRole = {
    canAccessForms: true,
  };

  const cmsUserRole = {
    isCMSUser: true,
  };

  it("returns correct actions for chipspa with PENDING status for State User", () => {
    const packageType = "chipspa";
    const packageStatus = "Under Review";
    const hasRaiResponse = true;
    const formSource = "detail";

    const actions = getActionsForPackage(
      packageType,
      packageStatus,
      hasRaiResponse,
      stateUserRole,
      formSource
    );

    expect(actions).toEqual(["Withdraw Package"]);
  });

  it("returns correct actions for chipspa with PENDING status for CMS user", () => {
    const packageType = "chipspa";
    const packageStatus = "Under Review";
    const hasRaiResponse = true;
    const formSource = "detail";

    const actions = getActionsForPackage(
      packageType,
      packageStatus,
      hasRaiResponse,
      cmsUserRole,
      formSource
    );

    expect(actions).toEqual(["Enable Formal RAI Response Withdraw"]);
  });

  it("returns correct actions for waivernew with Approved status", () => {
    const packageType = "waivernew";
    const packageStatus = "Approved";
    const hasRaiResponse = true;
    const formSource = "detail";

    const actions = getActionsForPackage(
      packageType,
      packageStatus,
      hasRaiResponse,
      stateUserRole,
      formSource
    );
    console.log(actions);
    expect(actions).toEqual(["Request a Temporary Extension", "Add Amendment"]);
  });

  it("returns correct actions for waiverextension with RAI Issued status", () => {
    const packageType = "waiverextension";
    const packageStatus = "RAI Issued";
    const hasRaiResponse = true;
    const formSource = "detail";

    const actions = getActionsForPackage(
      packageType,
      packageStatus,
      hasRaiResponse,
      stateUserRole,
      formSource
    );

    expect(actions).toEqual(["Withdraw Package", "Respond to RAI"]);
  });
});
