import { main } from "./getStateSystemAdminList";

import { queryForUserRole } from "./libs/user-table-lib";

jest.mock("./libs/user-table-lib");

queryForUserRole.mockImplementation(() => {
  return [
    {
      email: "sabrina.mccrae@cms.hhs.gov",
      firstName: "Sabrina",
      lastName: "McCrae",
    },
    {
      email: "systemadmintest@cms.hhs.local",
      firstName: "Teresa",
      lastName: "Test",
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
    body: '[{"MI":[{"email":"sabrina.mccrae@cms.hhs.gov","firstName":"Sabrina","lastName":"McCrae"},{"email":"systemadmintest@cms.hhs.local","firstName":"Teresa","lastName":"Test"}],"VA":[{"email":"sabrina.mccrae@cms.hhs.gov","firstName":"Sabrina","lastName":"McCrae"},{"email":"systemadmintest@cms.hhs.local","firstName":"Teresa","lastName":"Test"}]},{"MI":[{"email":"sabrina.mccrae@cms.hhs.gov","firstName":"Sabrina","lastName":"McCrae"},{"email":"systemadmintest@cms.hhs.local","firstName":"Teresa","lastName":"Test"}],"VA":[{"email":"sabrina.mccrae@cms.hhs.gov","firstName":"Sabrina","lastName":"McCrae"},{"email":"systemadmintest@cms.hhs.local","firstName":"Teresa","lastName":"Test"}]}]',
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
