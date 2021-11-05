import { validateUserReadOnly, validateUserSubmitting } from "./validateUser";

describe("user authorization for read only actions", () => {
  it("returns proper error message when user is null", () => {
    // NB: see example here https://jestjs.io/docs/expect#rejects
    return expect(() => validateUserReadOnly(null, "ME")).toThrow("UR041");
  });

  it.each(["statesubmitter", "statesystemadmin"])(
    "rejects requests from %s if they are not active in the territory",
    async (type) => {
      const testUser = {
        type: type,
        attributes: [
          { stateCode: "HI", history: [{ date: 123456789, status: "active" }] },
          { stateCode: "OR", history: [{ date: 123456789, status: "active" }] },
        ],
      };
      expect(validateUserReadOnly(testUser, "ME")).toBe(false);
    }
  );

  it.each(["cmsroleapprover", "cmsreviewer", "systemadmin"])(
    "allows read only actions from %s",
    async (type) => {
      const testUser = {
        type: type,
        attributes: [{ date: 123456789, status: "active" }],
      };

      expect(validateUserReadOnly(testUser, "ME")).toBe(true);
    }
  );
});

describe("user authorization for submitting actions", () => {
  it.each(["cmsroleapprover", "cmsreviewer", "systemadmin"])(
    "rejects submission actions from %s",
    async (type) => {
      const testUser = {
        type: type,
        attributes: [{ date: 123456789, status: "active" }],
      };

      expect(validateUserSubmitting(testUser, "ME")).toBe(false);
    }
  );

  it.each(["statesubmitter", "statesystemadmin"])(
    "rejects submissions from %s if they are not active in the territory",
    async (type) => {
      const testUser = {
        type: type,
        attributes: [
          { stateCode: "HI", history: [{ date: 123456789, status: "active" }] },
          { stateCode: "OR", history: [{ date: 123456789, status: "active" }] },
        ],
      };
      expect(validateUserSubmitting(testUser, "ME")).toBe(false);
    }
  );

  it("rejects state users without currently approved access to the correct territory", async () => {
    const testUser = {
      type: "statesubmitter",
      attributes: [
        { stateCode: "HI", history: [{ date: 123456789, status: "active" }] },
        { stateCode: "OR", history: [{ date: 123456789, status: "active" }] },
        {
          stateCode: "ME",
          history: [
            { date: 123456789, status: "active" },
            { date: 123456889, status: "revoked" },
          ],
        },
      ],
    };
    expect(validateUserSubmitting(testUser, "ME")).toBe(false);
  });

  it.each(["statesubmitter", "statesystemadmin"])(
    "allows state users with active access to the correct territory",
    async (type) => {
      const testUser = {
        type,
        attributes: [
          { stateCode: "HI", history: [{ date: 123456789, status: "active" }] },
          { stateCode: "OR", history: [{ date: 123456789, status: "active" }] },
          { stateCode: "ME", history: [{ date: 123456789, status: "active" }] },
        ],
      };
      expect(validateUserSubmitting(testUser, "ME")).toBe(true);
    }
  );
});
