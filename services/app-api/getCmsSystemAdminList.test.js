import { main } from "./getCmsSystemAdminList";
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
