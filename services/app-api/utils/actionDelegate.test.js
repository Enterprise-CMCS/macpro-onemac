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
      null,
      stateUserRole,
      formSource
    );

    expect(actions).toEqual([
      "Withdraw Package",
      "Upload Subsequent Documents",
    ]);
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
      null,
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
      null,
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
      null,
      stateUserRole,
      formSource
    );

    expect(actions).toEqual(["Withdraw Package", "Respond to RAI"]);
  });
  it("returns correct actions for medicaid spa with WITHDRAW_RAI_ENABLED status", () => {
    const packageType = "medicaidspa";
    const packageStatus = "Under Review";
    const packageSubStatus = "Withdraw Formal RAI Response Enabled";
    const hasRaiResponse = true;
    const formSource = "detail";

    const actions = getActionsForPackage(
      packageType,
      packageStatus,
      hasRaiResponse,
      packageSubStatus,
      stateUserRole,
      formSource
    );

    expect(actions).toEqual([
      "Withdraw Package",
      "Withdraw Formal RAI Response",
    ]);
  });

  it("returns correct actions for medicaid spa with Pending - Approval status", () => {
    const packageType = "medicaidspa";
    const packageStatus = "Pending - Approval";
    const hasRaiResponse = false;
    const formSource = "detail";

    const actions = getActionsForPackage(
      packageType,
      packageStatus,
      hasRaiResponse,
      null,
      stateUserRole,
      formSource
    );

    expect(actions).toEqual([
      "Withdraw Package",
      "Upload Subsequent Documents",
    ]);
  });
});
