import { isActive, isPending } from "./userLib";

const pendingAccess = { status: "pending", date: 0 };
const activeAccess = { status: "active", date: 1 };
const deniedAccess = { status: "denied", date: 1 };
const revokedAccess = { status: "revoked", date: 2 };

const pendingStateAccess = {
  stateCode: "NE",
  history: [pendingAccess],
};
const activeStateAccess = {
  stateCode: "MT",
  history: [pendingAccess, activeAccess],
};
const deniedStateAccess = {
  stateCode: "MT",
  history: [pendingAccess, deniedAccess],
};
const revokedStateAccess = {
  stateCode: "HI",
  history: [pendingAccess, activeAccess, revokedAccess],
};

describe.each`
  status       | fn           | stateData             | cmsData                          | resultWhenMixed
  ${"active"}  | ${isActive}  | ${activeStateAccess}  | ${[pendingAccess, activeAccess]} | ${true}
  ${"pending"} | ${isPending} | ${pendingStateAccess} | ${[pendingAccess]}               | ${false}
`(
  "check for $status access",
  ({ fn, status, stateData, cmsData, resultWhenMixed }) => {
    describe.each(["statesubmitter", "statesystemadmin"])(
      "check %s access",
      (type) => {
        it("returns false when user has no access history", () => {
          expect(fn({ type, attributes: [] })).toBe(false);
        });

        it(`returns true when user has ${status} access in one state`, () => {
          expect(
            fn({
              type,
              attributes: [stateData],
            })
          ).toBe(true);
        });

        it(`returns true when user has ${status} access in multiple states`, () => {
          expect(
            fn({
              type,
              attributes: [stateData, { ...stateData, stateCode: "MT" }],
            })
          ).toBe(true);
        });

        it(`returns true when user has ${status} access in one state and inactive access in others`, () => {
          expect(
            fn({
              type,
              attributes: [stateData, deniedStateAccess, revokedStateAccess],
            })
          ).toBe(true);
        });

        it("returns false when user has only inactive accesses", () => {
          expect(
            fn({
              type,
              attributes: [deniedStateAccess, revokedStateAccess],
            })
          ).toBe(false);
        });

        it(`returns ${resultWhenMixed} when user has pending access in one state and active access in another`, () => {
          expect(
            fn({
              type,
              attributes: [
                pendingStateAccess,
                deniedStateAccess,
                activeStateAccess,
              ],
            })
          ).toBe(resultWhenMixed);
        });
      }
    );

    describe.each(["cmsreviewer", "cmsroleapprover", "helpdesk"])(
      "check %s access",
      (type) => {
        it("returns false when user has no access history", () => {
          expect(fn({ type, attributes: [] })).toBe(false);
        });

        it(`returns true when user has ${status} access`, () => {
          expect(fn({ type, attributes: cmsData })).toBe(true);
        });

        it("returns false when user has denied access", () => {
          expect(fn({ type, attributes: [pendingAccess, deniedAccess] })).toBe(
            false
          );
        });

        it("returns false when user has revoked access", () => {
          expect(
            fn({
              type,
              attributes: [pendingAccess, activeAccess, revokedAccess],
            })
          ).toBe(false);
        });
      }
    );
  }
);
