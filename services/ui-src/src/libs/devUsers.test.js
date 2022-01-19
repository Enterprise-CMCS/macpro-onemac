import { devUsers } from "./devUsers";

it("has a hardcoded value", () => {
  expect(devUsers).toBeInstanceOf(Array);
  expect(devUsers.length).toBeGreaterThan(0);
  for (const element of devUsers) {
    expect(element).toMatch(/@/);
  }
});
