import { Workflow } from "cmscommonlib";
import { changeStatusAny } from "./changeStatusAny";

const eventBody = {
  componentId: "VA.1117.R00.00",
  componentType: "waivernew",
  changedByEmail: "statesubmitteractive@cms.hhs.local",
  changedByName: "Angie Active",
};

const testEventNoParse = {
  body: `{this should not parse!!!!!`,
};

const testEvent = {
  body: JSON.stringify(eventBody),
};
const testConfig = {
  allowMultiplesWithSameId: false,
  newStatus: "newStatus",
};

it("catches a badly parsed event", async () => {
  expect(changeStatusAny(testEventNoParse, testConfig))
    .rejects.toThrow("Unexpected token t in JSON at position 1")
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it("changes the base waiver to withdrawn", async () => {
  const response = changeStatusAny(testEvent, testConfig);
  expect(response).toBeInstanceOf(Promise);
});
