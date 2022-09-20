import { main } from "./package-exists";

it("Get Stub", async () => {
  const response = main({ source: "serverless-plugin-warmup" }, "foo");
  expect(response)
    .resolves.toBeInstanceOf(Promise)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});
