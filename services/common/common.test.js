import { USER_TYPE, latestAccessStatus } from ".";

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
