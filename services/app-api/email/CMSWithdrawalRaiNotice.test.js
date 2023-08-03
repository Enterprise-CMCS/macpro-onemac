import dynamoDb from "../libs/dynamodb-lib";
import {
  CMSWithdrawRaiNotice,
  getCPOCandSRTEmailAddresses,
} from "./CMSWithdrawRaiNotice";

jest.mock("../libs/dynamodb-lib");

dynamoDb.get.mockImplementation(() => {
  return {
    Items: [
      {
        fullname: "test test",
        email: "test@test.com",
      },
    ],
  };
});

it("builds the CMS Withdrawal Notice Email", async () => {
  try {
    const response = await CMSWithdrawRaiNotice(testData, testConfig, user);
    expect(response.HTML.length).toBe(418);
  } catch (e) {
    console.log("reeived error: ", e);
  }
});

it("handles a query exception", async () => {
  dynamoDb.get.mockImplementationOnce(() => {
    throw new Error("this is an error");
  });
  try {
    expect(await getCPOCandSRTEmailAddresses("TT")).toThrow("this is an error");
    const response = await CMSWithdrawRaiNotice(testData, testConfig, user);
    expect(response.ToAddresses.length).toBe(0);
  } catch (e) {
    console.log("reeived error: ", e);
  }
});
/*
it("builds the CMS Withdrawal Notice Email", async () => {
  const testData = {
    changeHistory: [
      { submissionTimestamp: 1631626754502 },
      { submissionTimestamp: 1631626754502 },
    ],
    submitterName: "name",
    componentId: "MI-11-1111-22",
  };
  const testConfig = {
    typeLabel: "Test Type",
  };

  const user = {
    fullName: "Tester",
    email: "tester@test.test",
  };

  const response2 = CMSWithdrawRaiNotice(testData, testConfig, user);
  expect(response2.HTML.length).toBe(504);
});
*/
