import { submitAny } from "./submitAny";
import { main } from "./submitWaiverRAIResponse";

jest.mock("./submitAny");
submitAny.mockResolvedValue("yup!");

const testEvent = {
  body: JSON.stringify({
    parentType: "waivernew",
    waiverAuthority: "1915(b)",
  }),
};

const badTestEvent = {
  body: "badEvent",
};

const expectedResponse = {
  body: '"yup!"',
  headers: {
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": "*",
  },
  statusCode: 200,
};

it("calls submitAny", async () => {
  expect(main(testEvent)).resolves.toStrictEqual(expectedResponse);
});

it("throws error on bad parse", async () => {
  expect(main(badTestEvent)).rejects.toThrow(SyntaxError);
});
