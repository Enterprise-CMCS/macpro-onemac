import { main } from "./withdrawWaiverRenewal";

it("Get Stub", async () => {
  const response = main({ source: "serverless-plugin-warmup" }, "foo");
  expect(response).toBeInstanceOf(Promise);
});
