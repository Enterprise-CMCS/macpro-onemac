import { queryForUserRole } from "./user-table-lib";
import dynamoDb from "./dynamodb-lib";

jest.mock("./dynamodb-lib");

dynamoDb.query.mockImplementation(() => {
  return {
    Items: [
      {
        id: "pboggarapu@collabralink.com",
        firstName: "CMS",
        lastName: "Reviewer",
      },
      {
        id: "ssierra@collabralink.com",
        firstName: "Samuel",
        lastName: "Sierra",
      },
      { id: "kgrue@collabralink.com", firstName: "Kristin", lastName: "Heeth" },
      {
        id: "cmsroleapprover@nightwatch.test",
        firstName: "CMSApprover",
        lastName: "Nightwatch",
      },
      {
        id: "cmsroleapproveractive@cms.hhs.local",
        firstName: "Arnold",
        lastName: "Active",
      },
      {
        id: "nkrishnanov@gmail.com",
        firstName: "Nagaraju",
        lastName: "Krishna",
      },
      {
        id: "nwcmsapprover@gmail.com",
        firstName: "NIGHTWATCHCMS",
        lastName: "APPROVER",
      },
      {
        id: "cmsroleapproverpending@cms.hhs.local",
        firstName: "Peter",
        lastName: "Pending",
      },
      {
        id: "ohstateuser@gmail.com",
        firstName: "ONEMAC",
        lastName: "CMSAPPROVERTEST",
      },
      {
        id: "nagaraju.krishna@esimplicity.com",
        firstName: "ONEMAC",
        lastName: "CMSUSER",
      },
      {
        id: "cmsapprover@nightwatch.test",
        firstName: "CMSApprover",
        lastName: "Nightwatch",
      },
      {
        id: "onemacapprover@gmail.com",
        firstName: "NIGHTWATCHCMS",
        lastName: "APPROVER",
      },
    ],
  };
});

it("queryForUserRole Stub", async () => {
  const response = queryForUserRole("foo");
  expect(response.body).toBe(undefined);
});
