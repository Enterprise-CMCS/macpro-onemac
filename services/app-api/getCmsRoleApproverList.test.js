import { main } from "./getCmsRoleApproverList";

import { queryForUserRole } from "./libs/user-table-lib";
import { USER_STATUS, latestAccessStatus } from "cmscommonlib";

jest.mock("./libs/user-table-lib");
jest.mock("cmscommonlib");

latestAccessStatus.mockImplementation(() => {
  return USER_STATUS.ACTIVE;
});

queryForUserRole.mockImplementation(() => {
  return [
    {
      email: "pboggarapu@collabralink.com",
      firstName: "CMS",
      lastName: "Reviewer",
    },
    {
      email: "ssierra@collabralink.com",
      firstName: "Samuel",
      lastName: "Sierra",
    },
    {
      email: "kgrue@collabralink.com",
      firstName: "Kristin",
      lastName: "Heeth",
    },
    {
      email: "cmsroleapprover@nightwatch.test",
      firstName: "CMSApprover",
      lastName: "Nightwatch",
    },
    {
      email: "cmsroleapproveractive@cms.hhs.local",
      firstName: "Arnold",
      lastName: "Active",
    },
    {
      email: "nkrishnanov@gmail.com",
      firstName: "Nagaraju",
      lastName: "Krishna",
    },
    {
      email: "nwcmsapprover@gmail.com",
      firstName: "NIGHTWATCHCMS",
      lastName: "APPROVER",
    },
    {
      email: "cmsroleapproverpending@cms.hhs.local",
      firstName: "Peter",
      lastName: "Pending",
    },
    {
      email: "ohstateuser@gmail.com",
      firstName: "ONEMAC",
      lastName: "CMSAPPROVERTEST",
    },
    {
      email: "nagaraju.krishna@esimplicity.com",
      firstName: "ONEMAC",
      lastName: "CMSUSER",
    },
    {
      email: "cmsapprover@nightwatch.test",
      firstName: "CMSApprover",
      lastName: "Nightwatch",
    },
    {
      email: "onemacapprover@gmail.com",
      firstName: "NIGHTWATCHCMS",
      lastName: "APPROVER",
    },
  ];
});

afterAll(() => {
  jest.clearAllMocks();
});

it("gets list of CMS Role Approvers", async () => {
  const emptyObject = {};
  const expectedResponse = {
    statusCode: 200,
    body: JSON.stringify([
      {
        email: "pboggarapu@collabralink.com",
        firstName: "CMS",
        lastName: "Reviewer",
      },
      {
        email: "ssierra@collabralink.com",
        firstName: "Samuel",
        lastName: "Sierra",
      },
      {
        email: "kgrue@collabralink.com",
        firstName: "Kristin",
        lastName: "Heeth",
      },
      {
        email: "cmsroleapprover@nightwatch.test",
        firstName: "CMSApprover",
        lastName: "Nightwatch",
      },
      {
        email: "cmsroleapproveractive@cms.hhs.local",
        firstName: "Arnold",
        lastName: "Active",
      },
      {
        email: "nkrishnanov@gmail.com",
        firstName: "Nagaraju",
        lastName: "Krishna",
      },
      {
        email: "nwcmsapprover@gmail.com",
        firstName: "NIGHTWATCHCMS",
        lastName: "APPROVER",
      },
      {
        email: "cmsroleapproverpending@cms.hhs.local",
        firstName: "Peter",
        lastName: "Pending",
      },
      {
        email: "ohstateuser@gmail.com",
        firstName: "ONEMAC",
        lastName: "CMSAPPROVERTEST",
      },
      {
        email: "nagaraju.krishna@esimplicity.com",
        firstName: "ONEMAC",
        lastName: "CMSUSER",
      },
      {
        email: "cmsapprover@nightwatch.test",
        firstName: "CMSApprover",
        lastName: "Nightwatch",
      },
      {
        email: "onemacapprover@gmail.com",
        firstName: "NIGHTWATCHCMS",
        lastName: "APPROVER",
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
