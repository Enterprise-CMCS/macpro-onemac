import { formatList } from ".";

describe("formatList function", () => {
  it("returns empty string for empty list", () => {
    expect(formatList([])).toBe("");
  });

  it("returns contents verbatim for length one", () => {
    expect(formatList(["foobar"])).toBe("foobar");
  });

  it("interposes `and` when there are two elements", () => {
    expect(formatList(["hello", "world"])).toBe("hello and world");
  });

  it("adds commas for additional preceding elements", () => {
    expect(formatList(["yes", "maybe", "no"])).toBe("yes, maybe, and no");
  });

  // this is objectively wrong but you are free to choose the dark path
  it("allows you to switch off oxford comma", () => {
    expect(formatList(["yes", "maybe", "no"], false)).toBe("yes, maybe and no");
  });

  it("handles spaces gracefully", () => {
    expect(formatList(["my favorite", "the most reliable", "the worst"])).toBe(
      "my favorite, the most reliable, and the worst"
    );
  });
});
