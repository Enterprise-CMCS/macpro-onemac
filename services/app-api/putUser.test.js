import { constructRoleAdminEmails } from "./putUser";

const stateSubmitter = {
  firstName: "John",
  lastName: "Doe",
  doneBy: "systemadmintest@cms.hhs.local",
  attributes: [
    {
      stateCode: "MI",
      status: "active",
    },
  ],
  id: "statesubmitterdenied@cms.hhs.local",
  type: "statesubmitter",
};

const stateAdmin = {
  firstName: "John",
  lastName: "Doe",
  doneBy: "systemadmintest@cms.hhs.local",
  attributes: [
    {
      stateCode: "VA",
      status: "active",
    },
  ],
  id: "stateadminactiveVA2@cms.hhs.local",
  type: "stateadmin",
};

const cmsApprover = {
  firstName: "John",
  lastName: "Doe",
  doneBy: "systemadmintest@cms.hhs.local",
  attributes: [
    {
      status: "active",
    },
  ],
  id: "hasanfar@gmail.com",
  type: "cmsapprover",
};

it("Should show the full name in the email message for CMSApprover", async () => {
  const result = constructRoleAdminEmails([], cmsApprover).email.HTML;
  expect(result).toContain("John Doe");
  expect(result).toContain("CMS Approver");
});

it("Should show the full name in the email message for State Submitter", async () => {
  const result = constructRoleAdminEmails([], stateSubmitter).email.HTML;
  expect(result).toContain("State Submitter");
});

it("Should show the full name in the email message for State Admin", async () => {
  const result = constructRoleAdminEmails([], stateAdmin).email.HTML;
  expect(result).toContain("John Doe");
  expect(result).toContain("State Admin");
});
