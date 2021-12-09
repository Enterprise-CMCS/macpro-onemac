import { Role, USER_TYPE, latestAccessStatus, getUserRoleObj } from ".";

describe("getUserRoleObj Null Role Test", () => {
  const myRole = new Role();
  expect(myRole.getAccesses()[0]).toBe("/");
  expect(myRole.getAccesses()[1]).toBe("/profile");
  expect(myRole.getAccesses()[2]).toBe("/devlogin");
  expect(myRole.getAccesses()[3]).toBe("/FAQ");
});

describe("getUserRoleObj Null Role Test", () => {
  const result = getUserRoleObj(undefined, false, []);
  expect(result.canAccessDashboard).toBe(false);
  expect(result.canAccessForms).toBe(false);
  expect(result.canAccessMetrics).toBe(false);
  expect(result.canAccessUserManagement).toBe(false);
  expect(result.canDownloadCsv).toBe(false);
});

describe("getUserRoleObj STATE_SUBMITTER Test", () => {
  const result = getUserRoleObj(USER_TYPE.STATE_SUBMITTER, false, []);
  expect(result.canAccessDashboard).toBe(true);
  expect(result.canAccessForms).toBe(true);
  expect(result.canAccessMetrics).toBe(false);
  expect(result.canAccessUserManagement).toBe(false);
  expect(result.canDownloadCsv).toBe(false);
});

describe("getUserRoleObj StateSystemAdmin Test", () => {
  const result = getUserRoleObj(USER_TYPE.STATE_SYSTEM_ADMIN, true, []);
  expect(result.canAccessDashboard).toBe(true);
  expect(result.canAccessForms).toBe(true);
  expect(result.canAccessMetrics).toBe(false);
  expect(result.canAccessUserManagement).toBe(true);
  expect(result.canDownloadCsv).toBe(false);
});

describe("getUserRoleObj CMS_REVIEWER Test", () => {
  const result = getUserRoleObj(USER_TYPE.CMS_REVIEWER, true, []);
  expect(result.canAccessDashboard).toBe(true);
  expect(result.canAccessForms).toBe(false);
  expect(result.canAccessMetrics).toBe(false);
  expect(result.canAccessUserManagement).toBe(false);
  expect(result.canDownloadCsv).toBe(false);
});

describe("getUserRoleObj CMS_ROLE_APPROVER", () => {
  const result = getUserRoleObj(USER_TYPE.CMS_ROLE_APPROVER, true, []);
  expect(result.canAccessDashboard).toBe(true);
  expect(result.canAccessForms).toBe(false);
  expect(result.canAccessMetrics).toBe(false);
  expect(result.canAccessUserManagement).toBe(false);
  expect(result.canDownloadCsv).toBe(true);
});

describe("getUserRoleObj HELPDESK", () => {
  const result = getUserRoleObj(USER_TYPE.HELPDESK, true, []);
  expect(result.canAccessDashboard).toBe(true);
  expect(result.canAccessForms).toBe(false);
  expect(result.canAccessMetrics).toBe(true);
  expect(result.canAccessUserManagement).toBe(true);
  expect(result.canDownloadCsv).toBe(false);
});

describe("find current user status", () => {
  it.each([USER_TYPE.STATE_SUBMITTER, USER_TYPE.STATE_SYSTEM_ADMIN])(
    "searches by state for %s users",
    (type) => {
      expect(
        latestAccessStatus(
          {
            type,
            attributes: [
              { stateCode: "OK", history: [{ status: "pending" }] },
              { stateCode: "ME", history: [{ status: "active" }] },
              { stateCode: "CA", history: [{ status: "denied" }] },
            ],
          },
          "ME"
        )
      ).toBe("active");
    }
  );

  it.each([USER_TYPE.STATE_SUBMITTER, USER_TYPE.STATE_SYSTEM_ADMIN])(
    "sorts by date for %s users",
    (type) => {
      expect(
        latestAccessStatus(
          {
            type,
            attributes: [
              {
                stateCode: "ME",
                history: [
                  { status: "denied", date: 122 },
                  { status: "active", date: 123 },
                  { status: "pending", date: 121 },
                ],
              },
            ],
          },
          "ME"
        )
      ).toBe("active");
    }
  );

  it.each([
    USER_TYPE.CMS_REVIEWER,
    USER_TYPE.CMS_ROLE_APPROVER,
    USER_TYPE.HELPDESK,
  ])("sorts by date for %s users", (type) => {
    expect(
      latestAccessStatus({
        type,
        attributes: [
          { status: "denied", date: 122 },
          { status: "active", date: 123 },
          { status: "pending", date: 121 },
        ],
      })
    ).toBe("active");
  });
});
