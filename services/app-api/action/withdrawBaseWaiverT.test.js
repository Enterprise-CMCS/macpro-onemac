import { main } from "./withdrawBaseWaiver";

it("calls main", async () => {
  const response = main({ source: "serverless-plugin-warmup" }, "foo");
  expect(response).toBeInstanceOf(Promise);
});
