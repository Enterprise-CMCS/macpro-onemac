import { validateUser } from "./withdrawPackage";

import getUser from "./utils/getUser";

jest.mock("./utils/getUser");

describe("user authorization for package withdrawal", () => {
  it("rejects package withdrawals when it cannot find a user", () => {
    getUser.mockResolvedValue(null);
    // NB: see example here https://jestjs.io/docs/expect#rejects
    return expect(() =>
      validateUser("mycmsuser@cms.gov", "ME")
    ).rejects.toThrow("UR041");
  });

  it.each(["cmsroleapprover", "cmsreviewer", "systemadmin"])(
    "rejects package withdrawals from %s",
    async (type) => {
      getUser.mockResolvedValue({ type });
      expect(await validateUser("mycmsuser@cms.gov", "ME")).toBe(false);
    }
  );

  it("rejects package withdrawals from state users without access to the correct territory", async () => {
    getUser.mockResolvedValue({
      type: "statesubmitter",
      attributes: [
        { stateCode: "HI", history: [{ date: 123456789, status: "active" }] },
        { stateCode: "OR", history: [{ date: 123456789, status: "active" }] },
      ],
    });
    expect(await validateUser("mystateuser@cms.gov", "ME")).toBe(false);
  });

  it("rejects package withdrawals from state users without currently approved access to the correct territory", async () => {
    getUser.mockResolvedValue({
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
    });
    expect(await validateUser("mystateuser@cms.gov", "ME")).toBe(false);
  });

  it.each(["statesubmitter", "stateadmin"])(
    "allows %s with active access to the correct territory to withdraw a package",
    async (type) => {
      getUser.mockResolvedValue({
        type,
        attributes: [
          { stateCode: "HI", history: [{ date: 123456789, status: "active" }] },
          { stateCode: "OR", history: [{ date: 123456789, status: "active" }] },
          { stateCode: "ME", history: [{ date: 123456789, status: "active" }] },
        ],
      });
      expect(await validateUser("mystateuser@cms.gov", "ME")).toBe(true);
    }
  );
});
