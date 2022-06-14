import { validateSubmission } from "./changeRequest-util";

const mockSubmission = () => ({
  territory: "MI",
  transmittalNumber: "MI-01-1234",
  type: "medicaidspa",
  uploads: [
    {
      contentType: "text/plain",
      filename: "foo.txt",
      s3Key: "this is a key",
      title: "CMS Form 179",
      url: "http://example.com",
    },
    {
      contentType: "text/plain",
      filename: "foo.txt",
      s3Key: "this is a key",
      title: "SPA Pages",
      url: "http://example.com",
    },
  ],
});

describe("submission validation", () => {
  it("denies an empty submission", () => {
    const result = validateSubmission(null);
    expect(result).toBeInstanceOf(Error);
    expect(result).toMatchObject({
      name: "ValidationError",
      details: [{ type: "object.base" }],
    });
  });

  it("allows a minimally populated submission", () => {
    expect(validateSubmission(mockSubmission())).not.toBeDefined();
  });

  it.each(["territory", "transmittalNumber", "type", "uploads"])(
    "denies a submission without %s defined",
    (key) => {
      const input = mockSubmission();
      delete input[key];
      const result = validateSubmission(input);
      expect(result).toBeInstanceOf(Error);
      expect(result).toMatchObject({
        name: "ValidationError",
        details: [
          { message: expect.stringMatching(key), type: "any.required" },
        ],
      });
    }
  );

  it("denies a submission with 0 uploads", () => {
    const input = mockSubmission();
    input.uploads = [];
    const result = validateSubmission(input);
    expect(result).toBeInstanceOf(Error);
    expect(result).toMatchObject({
      name: "ValidationError",
      details: [
        { message: expect.stringMatching("uploads"), type: "array.min" },
      ],
    });
  });

  it.each(["contentType", "filename", "s3Key", "title", "url"])(
    "denies a submission where an upload is missing %s",
    (key) => {
      const input = mockSubmission();
      delete input.uploads[0][key];
      const result = validateSubmission(input);
      expect(result).toBeInstanceOf(Error);
      expect(result).toMatchObject({
        name: "ValidationError",
        details: [
          {
            message: expect.stringMatching(`"uploads\\[0\\].${key}"`),
            type: "any.required",
          },
        ],
      });
    }
  );

  it.each(["contentType", "filename", "s3Key", "title", "url"])(
    "denies a submission where an upload has a blank %s",
    (key) => {
      const input = mockSubmission();
      input.uploads[0][key] = "";
      const result = validateSubmission(input);
      expect(result).toBeInstanceOf(Error);
      expect(result).toMatchObject({
        name: "ValidationError",
        details: [
          {
            message: expect.stringMatching(`"uploads\\[0\\].${key}"`),
            type: "string.empty",
          },
        ],
      });
    }
  );

  it("denies a submission with an upload title outside of its configured list", () => {
    const input = mockSubmission();
    input.uploads.unshift({
      ...input.uploads[0],
      title: "not a configured upload type",
    });
    const result = validateSubmission(input);
    expect(result).toBeInstanceOf(Error);
    expect(result).toMatchObject({
      name: "ValidationError",
      details: [
        {
          message: expect.stringMatching('"uploads\\[0\\].title"'),
          type: "any.only",
        },
      ],
    });
  });

  it("denies a submission missing an upload from its required list", () => {
    const input = mockSubmission();
    input.uploads.length = 1;
    const result = validateSubmission(input);
    expect(result).toBeInstanceOf(Error);
    expect(result).toMatchObject({
      name: "ValidationError",
      details: [
        {
          message: expect.stringMatching('"uploads"'),
          type: "array.hasUnknown",
        },
      ],
    });
  });

  it("denies a submission with more than one upload in a type where multiples are not accepted", () => {
    const input = mockSubmission();
    input.uploads.unshift({
      ...input.uploads[0],
    });
    const result = validateSubmission(input);
    expect(result).toBeInstanceOf(Error);
    expect(result).toMatchObject({
      name: "ValidationError",
      details: [
        {
          message: expect.stringMatching('"uploads\\[1\\]"'),
          type: "array.unique",
        },
      ],
    });
  });
});
