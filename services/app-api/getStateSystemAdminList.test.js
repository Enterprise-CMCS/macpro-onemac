import { main } from "./getStateSystemAdminList";

import { queryForUserType } from "./libs/user-table-lib";
import { USER_STATUS, latestAccessStatus } from "cmscommonlib";

jest.mock("./libs/user-table-lib");
jest.mock("cmscommonlib");

latestAccessStatus.mockImplementation(() => {
  return USER_STATUS.ACTIVE;
});

queryForUserType.mockImplementation(() => {
  return [
    {
      id: "statesystemadmindenied@cms.hhs.local",
      attributes: [
        {
          stateCode: "MI",
          history: [
            {
              date: 1617149287,
              doneBy: "systemadmintest@cms.hhs.local",
              status: "denied",
            },
            {
              date: 1625671916,
              doneBy: "cmsapproveractive@cms.hhs.local",
              status: "active",
            },
            {
              date: 1625671930,
              doneBy: "cmsapproveractive@cms.hhs.local",
              status: "revoked",
            },
          ],
        },
        {
          stateCode: "VA",
          history: [
            {
              date: 1617149287,
              doneBy: "systemadmintest@cms.hhs.local",
              status: "denied",
            },
            {
              date: 1625672025,
              doneBy: "cmsapproveractive@cms.hhs.local",
              status: "active",
            },
            {
              date: 1625672054,
              doneBy: "cmsapproveractive@cms.hhs.local",
              status: "revoked",
            },
          ],
        },
      ],
      lastName: "Denied",
      firstName: "Daniel",
      type: "statesystemadmin",
    },
  ];
});

afterAll(() => {
  jest.clearAllMocks();
});

it("gets list of State System Admins", async () => {
  const eventObject = {
    multiValueQueryStringParameters: { state: ["MI", "VA"] },
  };
  const expectedResponse = {
    statusCode: 200,
    body: '{"MI":[{"email":"statesystemadmindenied@cms.hhs.local","firstName":"Daniel","lastName":"Denied"}],"VA":[{"email":"statesystemadmindenied@cms.hhs.local","firstName":"Daniel","lastName":"Denied"}]}',
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };

  expect(main(eventObject))
    .resolves.toStrictEqual(expectedResponse)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it("gets empty list of State System Admins", async () => {
  const eventObject = { multiValueQueryStringParameters: { state: [] } };
  const expectedResponse = {
    statusCode: 200,
    body: "{}",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };

  expect(main(eventObject))
    .resolves.toStrictEqual(expectedResponse)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});
