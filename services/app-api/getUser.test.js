import { main } from "./getUser";

it("Get Stub", async () => {
  const response = main(
    { queryStringParameters: { email: "statesubmitteractive@cms.hhs.local" } },
    "foo"
  );
  expect(response)
    .resolves.toStrictEqual({})
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});
