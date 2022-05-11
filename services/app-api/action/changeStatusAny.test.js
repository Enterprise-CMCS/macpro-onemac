import { RESPONSE_CODE } from "cmscommonlib";
import { changeStatusAny } from "./changeStatusAny";
import { getUser } from "../getUser";
import updateComponent from "../utils/updateComponent";
import updateParent from "../utils/updateParent";
import sendEmail from "../libs/email-lib";

jest.mock("../getUser");
jest.mock("../utils/updateComponent");
jest.mock("../libs/email-lib");

const testDoneBy = {
  roleList: [
    { role: "statesubmitter", status: "active", territory: "VA" },
    { role: "statesubmitter", status: "active", territory: "MD" },
  ],
  email: "myemail@email.com",
  firstName: "firsty",
  lastName: "lasty",
  fullName: "firsty lastly",
};

const testUpdatedPackageData = {
  submissionTimestamp: Date.now(),
  componentId: "1111",
  //parentId: '',
};

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
  successResponseCode: RESPONSE_CODE.PACKAGE_WITHDRAW_SUCCESS,
};

beforeAll(() => {
  jest.clearAllMocks();

  getUser.mockResolvedValue(testDoneBy);

  updateComponent.mockResolvedValue(testUpdatedPackageData);

  sendEmail.mockResolvedValue(null);
});

it("catches a badly parsed event", async () => {
  expect(changeStatusAny(testEventNoParse, testConfig))
    .rejects.toThrow("Unexpected token t in JSON at position 1")
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it("updates status on a parent package", async () => {
  const response = await changeStatusAny(testEvent, testConfig);
  expect(response).toEqual(RESPONSE_CODE.PACKAGE_WITHDRAW_SUCCESS);
});
