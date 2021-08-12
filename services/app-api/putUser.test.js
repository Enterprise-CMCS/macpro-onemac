import { constructRoleAdminEmails, validateInput } from "./putUser";

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

describe("Construction of approver emails", () => {
  it("Should show the full name in the email message for CMSApprover", async () => {
    const result = constructRoleAdminEmails([], cmsApprover).email.HTML;
    expect(result).toContain("John Doe");
    expect(result).toContain("CMS Role Approver");
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
});

describe("Validating input from the UI", () => {
  it("fails when you attempt to modify a system admin user", () => {
    expect(
      validateInput({
        userEmail: "person@example.local",
        type: "systemadmin",
        doneBy: "otherperson@example.local",
      })
    ).toMatchObject({
      name: "ValidationError",
      details: [{ message: expect.stringMatching("type"), type: "any.only" }],
    });
  });

  it.each`
    field          | label
    ${"userEmail"} | ${"email address"}
    ${"type"}      | ${"user type"}
    ${"doneBy"}    | ${"done by user"}
  `("fails if $label is not provided", ({ field }) => {
    const data = {
      userEmail: "person@example.local",
      type: "statesubmitter",
      doneBy: "otherperson@example.local",
    };
    delete data[field];

    expect(validateInput(data)).toMatchObject({
      name: "ValidationError",
      details: [
        { message: expect.stringMatching(field), type: "any.required" },
      ],
    });
  });

  it.each`
    field          | label
    ${"firstName"} | ${"first name"}
    ${"lastName"}  | ${"last name"}
  `("fails if $label is not provided when `isPutUser` is true", ({ field }) => {
    const data = {
      userEmail: "person@example.local",
      type: "statesubmitter",
      doneBy: "otherperson@example.local",
      isPutUser: true,
      firstName: "Iama",
      lastName: "Person",
    };
    delete data[field];

    expect(validateInput(data)).toMatchObject({
      name: "ValidationError",
      details: [
        { message: expect.stringMatching(field), type: "any.required" },
      ],
    });
  });

  it.todo("validation for attributes per user type");

  describe("Group and division logic", () => {
    it.each(["group", "division"])(
      "requires a %s for CMS Reviewer users at user creation time",
      (field) => {
        const data = {
          userEmail: "person@example.local",
          type: "cmsreviewer",
          doneBy: "otherperson@example.local",
          isPutUser: true,
          firstName: "Iama",
          lastName: "Person",
          group: 0,
          division: 21,
        };
        delete data[field];

        expect(validateInput(data)).toMatchObject({
          name: "ValidationError",
          details: [
            { message: expect.stringMatching(field), type: "any.required" },
          ],
        });
      }
    );

    it("allows, but does not require, updates to group and/or division when the user already exists", () => {
      const data = {
        userEmail: "person@example.local",
        type: "cmsreviewer",
        doneBy: "otherperson@example.local",
        isPutUser: false,
      };

      expect(validateInput(data)).toBeFalsy();
      expect(validateInput({ ...data, group: 1 })).toBeFalsy();
      expect(validateInput({ ...data, division: 21 })).toBeFalsy();
      expect(validateInput({ ...data, group: 0, division: 21 })).toBeFalsy();
    });

    it("requires group to be a valid group ID", () => {
      expect(
        validateInput({
          userEmail: "person@example.local",
          type: "cmsreviewer",
          doneBy: "otherperson@example.local",
          isPutUser: false,
          group: -1,
        })
      ).toMatchObject({
        name: "ValidationError",
        details: [
          { message: expect.stringMatching("group"), type: "any.only" },
        ],
      });
    });

    it("requires division to be a valid division ID", () => {
      expect(
        validateInput({
          userEmail: "person@example.local",
          type: "cmsreviewer",
          doneBy: "otherperson@example.local",
          isPutUser: false,
          division: -1,
        })
      ).toMatchObject({
        name: "ValidationError",
        details: [
          { message: expect.stringMatching("division"), type: "any.only" },
        ],
      });
    });

    it.each(["statesubmitter", "stateadmin", "cmsapprover", "helpdesk"])(
      "fails if group or division is provided for user type %s at user creation time",
      (type) => {
        const data = {
          userEmail: "person@example.local",
          type,
          doneBy: "otherperson@example.local",
          isPutUser: true,
          firstName: "Iama",
          lastName: "Person",
          group: 0,
        };

        expect(validateInput(data)).toMatchObject({
          name: "ValidationError",
          details: [
            { message: expect.stringMatching("group"), type: "any.unknown" },
          ],
        });

        delete data.group;
        data.division = 21;

        expect(validateInput(data)).toMatchObject({
          name: "ValidationError",
          details: [
            { message: expect.stringMatching("division"), type: "any.unknown" },
          ],
        });
      }
    );
  });
});
