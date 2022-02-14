import { pendingMessage, deniedOrRevokedMessage } from "./userLib";
import { USER_ROLE } from "cmscommonlib";

it("shows the right pending message", () => {
  expect(pendingMessage[USER_ROLE.STATE_SUBMITTER]).toBe(
    "Your system access is pending approval. Contact your State System Admin with any questions."
  );
});

it("shows the right deniedOrRevokedMessage message", () => {
  expect(deniedOrRevokedMessage[USER_ROLE.STATE_SUBMITTER]).toBe(
    "Sorry, you don't have access. Please contact the State System Admin with any questions"
  );
});
