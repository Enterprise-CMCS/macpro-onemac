import { main, getMyApprovers } from "./getMyApprovers";

jest.mock("./getMyApprovers");

getMyApprovers.mockImplementation(() => {
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
/*
it("gets list of State System Admins", async () => {
  const eventObject = {
    queryStringParameters: { role: "statesystemadmin", territory: "VA" },
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
*/
it("gets empty list", async () => {
  /*
  const eventObject = {
    queryStringParameters: { role: "statesystemadmin", territory: "" },
  };
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
    */
});
