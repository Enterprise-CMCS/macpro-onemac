import { RESPONSE_CODE } from "cmscommonlib";
import { main, setContactInfo } from "./setContactInfo";
import getUser from "./utils/getUser";
import { newUser } from "./utils/newUser";

jest.mock("./utils/getUser");
jest.mock("./utils/newUser");

getUser.mockImplementation(() => {
  return null;
});
newUser.mockImplementation(() => {
  return null;
});

it("errors when user exists", async () => {
  getUser.mockImplementationOnce(() => {
    return { email: "testemail", fullName: "I exist" };
  });

  const testEvent = { body: '{"email":"testEmail"}' };
  const expectedReturn = RESPONSE_CODE.USER_EXISTS;
  expect(setContactInfo(testEvent)).resolves.toStrictEqual(expectedReturn);
});

it("returns User Submitted when complete", async () => {
  const testEvent = { body: '{"email":"testEmail"}' };
  const expectedReturn = {
    statusCode: 200,
    body: JSON.stringify(RESPONSE_CODE.USER_SUBMITTED),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };

  expect(main(testEvent)).resolves.toStrictEqual(expectedReturn);
});
