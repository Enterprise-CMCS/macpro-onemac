import { isParentOfAny } from "./isParentOfAny";
import { main } from "./isParentOfAppKRaiResponse";

jest.mock("./isParentOfAny");
isParentOfAny.mockResolvedValue(true);

const testEvent = {
  this: "is an event object",
};

const expectedResponse = {
  body: "true",
  headers: {
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": "*",
  },
  statusCode: 200,
};

it("calls isParentOfAny", async () => {
  expect(main(testEvent)).resolves.toStrictEqual(expectedResponse);
});

it("handles exceptions", async () => {
  isParentOfAny.mockImplementationOnce(() => {
    throw new Error("an exception");
  });

  expect(main(testEvent))
    .rejects.toThrow("an exception")
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});
