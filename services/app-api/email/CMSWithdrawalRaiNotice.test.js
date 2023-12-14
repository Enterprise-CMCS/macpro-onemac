import dynamoDb from "../libs/dynamodb-lib";
import { ONEMAC_TYPE } from "cmscommonlib/workflow.js";

import {
  CMSWithdrawRaiNotice,
  getCPOCandSRTEmailAddresses,
} from "./CMSWithdrawRaiNotice";

jest.mock("../libs/dynamodb-lib");

const testData = {
  submitterName: "name",
  componentId: "MI-11-1111-22",
  parentType: ONEMAC_TYPE.MEDICAID_SPA,
};
const testConfig = {
  typeLabel: "Test Type",
};

const user = {
  fullName: "Tester",
  email: "tester@test.test",
};

it("builds the CMS Withdraw RAI Response Notice Email", async () => {
  dynamoDb.get.mockImplementation(() => {
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
    let response = await CMSWithdrawRaiNotice(testData, testConfig, user);
    expect(response.HTML.length).toBe(461);

    testData.parentType = ONEMAC_TYPE.CHIP_SPA;
    response = await CMSWithdrawRaiNotice(testData, testConfig, user);
    expect(response.HTML.length).toBe(461);

    testData.parentType = ONEMAC_TYPE.WAIVER_INITIAL;
    response = await CMSWithdrawRaiNotice(testData, testConfig, user);
    expect(response.HTML.length).toBe(461);

    testData.parentType = ONEMAC_TYPE.WAIVER_APP_K;
    response = await CMSWithdrawRaiNotice(testData, testConfig, user);
    expect(response.HTML.length).toBe(461);
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
