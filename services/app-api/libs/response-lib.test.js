import { success, failure } from "./response-lib";

it("Success Stub", async () => {
  const response = success("foo");
  expect(response.body).toBe('"foo"');
});

it("Failure Stub", async () => {
  const response = failure("foo");
  expect(response.body).toBe('"foo"');
});
