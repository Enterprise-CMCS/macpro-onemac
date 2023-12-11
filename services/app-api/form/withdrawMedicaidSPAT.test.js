import { submitAny } from "./submitAny";
import { disableRaiResponseWithdraw } from "./disableRaiWithdraw";
import { main } from "./withdrawMedicaidSPA";

jest.mock("./submitAny");
submitAny.mockResolvedValue("yup!");

jest.mock("./disableRaiWithdraw");
disableRaiResponseWithdraw.mockResolvedValue("yup!");

const testEvent = {
  this: "is an event object",
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
