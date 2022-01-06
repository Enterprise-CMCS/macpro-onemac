import { main } from "./getCmsSystemAdminList";
import { queryForUserType } from "./libs/user-table-lib";

jest.mock("./libs/user-table-lib");

queryForUserType.mockImplementation(() => {
  return [
    {
      id: "sabrina.mccrae@cms.hhs.gov",
      firstName: "Sabrina",
      lastName: "McCrae",
    },
    {
      id: "systemadmintest@cms.hhs.local",
      firstName: "Teresa",
      lastName: "Test",
    },
    {
      id: "systemadmin@nightwatch.test",
      firstName: "Systemadmin",
      lastName: "Nightwatch",
    },
    {
      id: "ONEMACUSERCMS@gmail.com",
      firstName: "NWCMSADMIN",
      lastName: "ADMINUSER",
    },
  ];
});

afterAll(() => {
  jest.clearAllMocks();
});

it("gets list of system admins", async () => {
  const emptyObject = {};
  const expectedResponse = {
    statusCode: 200,
    body: JSON.stringify([
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
      {
        email: "systemadmin@nightwatch.test",
        firstName: "Systemadmin",
        lastName: "Nightwatch",
      },
      {
        email: "ONEMACUSERCMS@gmail.com",
        firstName: "NWCMSADMIN",
        lastName: "ADMINUSER",
      },
    ]),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };

  expect(main(emptyObject))
    .resolves.toStrictEqual(expectedResponse)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});
