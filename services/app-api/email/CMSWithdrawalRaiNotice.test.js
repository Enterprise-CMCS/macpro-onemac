import dynamoDb from "../libs/dynamodb-lib";
import {
  CMSWithdrawRaiNotice,
  getCPOCandSRTEmailAddresses,
} from "./CMSWithdrawRaiNotice";

jest.mock("../libs/dynamodb-lib");

const testData = {
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

it("builds the CMS Withdraw RAI Response Notice Email", async () => {
  dynamoDb.get.mockImplementationOnce(() => {
    return {
      Item: [
        {
          reviewTeamEmailList: [
            '"SRT test1" <test1@email.com>',
            '"SRT test2" <test2@email.com>',
          ],
          cpocEmail: '"TEST CPOC" <cpoctest@test.com>',
        },
      ],
    };
  });
  try {
    const response = await CMSWithdrawRaiNotice(testData, testConfig, user);
    expect(response.HTML.length).toBe(513);
  } catch (e) {
    console.log("reeived error: ", e);
  }
});

it("handles a query exception", async () => {
  dynamoDb.get.mockImplementationOnce(() => {
    throw new Error("this is an error");
  });
  try {
    expect(await getCPOCandSRTEmailAddresses("TT")).toStrictEqual({});
  } catch (e) {
    console.log("reeived error: ", e);
  }
});
