import {
  checkTypeMismatch,
  constructRoleAdminEmails,
  ensureDonebyHasPrivilege,
  ensureLegalStatusChange,
  populateUserAttributes,
  validateInput,
} from "./putUser";

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
  id: "statesystemadminactiveVA2@cms.hhs.local",
  type: "statesystemadmin",
};

const cmsRoleApprover = {
  firstName: "John",
  lastName: "Doe",
  doneBy: "systemadmintest@cms.hhs.local",
  attributes: [
    {
      status: "active",
    },
  ],
  id: "hasanfar@gmail.com",
  type: "cmsroleapprover",
};

console.log = jest.fn();

describe("Construction of role approver emails", () => {
  it("Should show the full name in the email message for CMSRoleApprover", async () => {
    const result = constructRoleAdminEmails([], cmsRoleApprover).email.HTML;
    expect(result).toContain("John Doe");
    expect(result).toContain("CMS Role Approver");
  });

  it("Should show the full name in the email message for State Submitter", async () => {
    const result = constructRoleAdminEmails([], stateSubmitter).email.HTML;
    expect(result).toContain("State Submitter");
  });

  it("Should show the full name in the email message for State System Admin", async () => {
    const result = constructRoleAdminEmails([], stateAdmin).email.HTML;
    expect(result).toContain("John Doe");
    expect(result).toContain("State System Admin");
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

    it.each([
      "statesubmitter",
      "statesystemadmin",
      "cmsroleapprover",
      "helpdesk",
    ])(
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

describe("doneBy user authorization check", () => {
  const cmsUserProps = { attributes: [{ status: "active" }] },
    stateUserProps = {
      attributes: [{ stateCode: "OK", history: [{ status: "active" }] }],
    };

  describe.each`
    doneByType            | doneByProps       | userTypes
    ${"systemadmin"}      | ${undefined}      | ${["statesubmitter", "statesystemadmin", "cmsroleapprover", "cmsreviewer", "helpdesk"]}
    ${"cmsroleapprover"}  | ${cmsUserProps}   | ${["statesystemadmin", "cmsreviewer"]}
    ${"statesystemadmin"} | ${stateUserProps} | ${["statesubmitter"]}
  `(
    "allows active $doneByType to modify user access",
    ({ doneByType, doneByProps, userTypes }) => {
      it.each(userTypes)("can modify %s accesses", (type) => {
        expect(() =>
          ensureDonebyHasPrivilege(
            { type: doneByType, ...doneByProps },
            type,
            "OK"
          )
        ).not.toThrow();
      });
    }
  );

  describe.each`
    doneByType            | doneByProps                                                               | userTypes
    ${"cmsroleapprover"}  | ${{ attributes: [{ status: "denied" }] }}                                 | ${["statesystemadmin", "cmsreviewer"]}
    ${"statesystemadmin"} | ${{ attributes: [{ stateCode: "OK", history: [{ status: "denied" }] }] }} | ${["statesubmitter"]}
  `(
    "forbids inactive $doneByType from modifying user access",
    ({ doneByType, doneByProps, userTypes }) => {
      it.each(userTypes)("can modify %s accesses", (type) => {
        expect(() =>
          ensureDonebyHasPrivilege(
            { type: doneByType, ...doneByProps },
            type,
            "OK"
          )
        ).toThrow("VA000");
      });
    }
  );

  describe.each`
    doneByType            | doneByProps       | userTypes
    ${"cmsroleapprover"}  | ${cmsUserProps}   | ${["statesubmitter", "helpdesk"]}
    ${"statesystemadmin"} | ${stateUserProps} | ${["cmsroleapprover", "cmsreviewer", "helpdesk"]}
  `(
    "restricts $doneByType ability to modify user access to specific user types",
    ({ doneByType, doneByProps, userTypes }) => {
      it.each(userTypes)("cannot modify %s accesses", (type) => {
        expect(() =>
          ensureDonebyHasPrivilege(
            { type: doneByType, ...doneByProps },
            type,
            "OK"
          )
        ).toThrow("VA000");
      });
    }
  );

  describe.each`
    doneByType          | doneByProps       | userTypes
    ${"cmsreviewer"}    | ${cmsUserProps}   | ${["statesubmitter", "statesystemadmin", "cmsroleapprover", "helpdesk"]}
    ${"helpdesk"}       | ${cmsUserProps}   | ${["statesubmitter", "statesystemadmin", "cmsroleapprover", "cmsreviewer"]}
    ${"statesubmitter"} | ${stateUserProps} | ${["statesystemadmin", "cmsroleapprover", "cmsreviewer", "helpdesk"]}
  `(
    "does not allow $doneByType ability to modify any user access besides their own",
    ({ doneByType, doneByProps, userTypes }) => {
      it.each(userTypes)("cannot modify %s accesses", (type) => {
        expect(() =>
          ensureDonebyHasPrivilege(
            { type: doneByType, ...doneByProps },
            type,
            "OK"
          )
        ).toThrow("VA000");
      });
    }
  );
});

describe("user type cannot be changed", () => {
  it("allows the same type to be passed in", () => {
    expect(() =>
      checkTypeMismatch("statesubmitter", "statesubmitter")
    ).not.toThrow();
  });

  it("blocks a different type from being populated from what is already there", () => {
    expect(() => checkTypeMismatch("statesubmitter", "helpdesk")).toThrow(
      "VA000"
    );
  });
});

describe("ensure status changes are performed in the appropriate order", () => {
  it("allows new user to be created with pending status", () => {
    expect(() =>
      ensureLegalStatusChange(undefined, { status: "pending" }, true)
    ).not.toThrow();
  });

  it.each(["active", "denied", "revoked"])(
    "forbids new user from being created with %s status",
    (status) => {
      expect(() =>
        ensureLegalStatusChange(undefined, { status }, true)
      ).toThrow("VA000");
    }
  );

  it("forbids status changes without relevant attributes provided", () => {
    expect(() =>
      ensureLegalStatusChange(undefined, { status: "active" }, false)
    ).toThrow("VA000");
  });

  it.each`
    initialStatus | nextStatus
    ${"pending"}  | ${"active"}
    ${"pending"}  | ${"denied"}
    ${"active"}   | ${"revoked"}
    ${"denied"}   | ${"pending"}
    ${"denied"}   | ${"active"}
    ${"revoked"}  | ${"pending"}
    ${"revoked"}  | ${"active"}
  `(
    "allows user in $initialStatus status to transition into $nextStatus",
    ({ initialStatus, nextStatus }) => {
      expect(() =>
        ensureLegalStatusChange(
          [{ status: initialStatus }],
          { status: nextStatus },
          true
        )
      ).not.toThrow();
    }
  );

  it.each`
    initialStatus | nextStatus
    ${"active"}   | ${"pending"}
    ${"active"}   | ${"denied"}
    ${"denied"}   | ${"revoked"}
    ${"revoked"}  | ${"denied"}
  `(
    "forbids user in $initialStatus status from transitioning into $nextStatus",
    ({ initialStatus, nextStatus }) => {
      expect(() =>
        ensureLegalStatusChange(
          [{ status: initialStatus }],
          { status: nextStatus },
          true
        )
      ).toThrow("VA000");
    }
  );
});

describe("updates to user data", () => {
  it("adds a new state entry to a user without that state in their attributes", () => {
    const doneBy = "me@test.example";
    const prevAttr = { stateCode: "AK", history: [{ status: "active" }] };
    expect(
      populateUserAttributes(
        {
          doneBy,
          type: "statesubmitter",
          attributes: [{ stateCode: "MN", status: "pending" }],
          isPutUser: true,
        },
        { attributes: [prevAttr] }
      )
    ).toEqual({
      attributes: [
        prevAttr,
        {
          history: [{ date: expect.any(Number), doneBy, status: "pending" }],
          stateCode: "MN",
        },
      ],
    });
  });

  it("appends new status onto existing state entry", () => {
    const doneBy = "me@test.example";
    expect(
      populateUserAttributes(
        {
          doneBy,
          type: "statesubmitter",
          attributes: [{ stateCode: "MN", status: "active" }],
        },
        { attributes: [{ stateCode: "MN", history: [{ status: "pending" }] }] }
      )
    ).toEqual({
      attributes: [
        {
          history: [
            { status: "pending" },
            { date: expect.any(Number), doneBy, status: "active" },
          ],
          stateCode: "MN",
        },
      ],
    });
  });

  it("always appends entries to CMS users", () => {
    const doneBy = "me@test.example";
    expect(
      populateUserAttributes(
        {
          doneBy,
          type: "cmsroleapprover",
          attributes: [{ status: "active" }],
        },
        { attributes: [{ status: "pending" }] }
      )
    ).toEqual({
      attributes: [
        { status: "pending" },
        { date: expect.any(Number), doneBy, status: "active" },
      ],
    });
  });

  it.each(["firstName", "lastName", "group", "division"])(
    "transfers new values of key %s directly from input into database",
    (attrName) => {
      expect(
        populateUserAttributes(
          { attributes: [], [attrName]: "new value" },
          { type: "cmsreviewer" }
        )
      ).toEqual({ type: "cmsreviewer", [attrName]: "new value" });
    }
  );
});
