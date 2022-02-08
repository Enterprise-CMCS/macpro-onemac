import { RESPONSE_CODE } from "cmscommonlib";
import { main, setContactInfo } from "./setContactInfo";
import { getUser } from "./getUser";
import { newUser } from "./utils/newUser";

jest.mock("./getUser");
jest.mock("./utils/newUser");

getUser.mockImplementation(() => {
  return null;
});
newUser.mockImplementation(() => {
  return null;
});

const testEvent = { body: '{"email":"testEmail"}' };

it("errors when user exists", async () => {
  getUser.mockImplementationOnce(() => {
    return { email: "testemail", fullName: "I exist" };
  });

  const expectedReturn = RESPONSE_CODE.USER_EXISTS;
  expect(setContactInfo(testEvent)).resolves.toStrictEqual(expectedReturn);
});

it("returns User Submitted when complete", async () => {
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

it("handles JSON.parse exceptions", async () => {
  const badParse = "bleh";
  const expectedReturn = RESPONSE_CODE.USER_SUBMISSION_FAILED;
  expect(setContactInfo(badParse))
    .resolves.toStrictEqual(expectedReturn)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it("handles getUser exceptions", async () => {
  getUser.mockImplementationOnce(() => {
    throw "an Exception!";
  });

  const expectedReturn = RESPONSE_CODE.USER_SUBMISSION_FAILED;
  expect(setContactInfo(testEvent))
    .resolves.toStrictEqual(expectedReturn)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it("handles newUser exceptions", async () => {
  newUser.mockImplementationOnce(() => {
    throw "an Exception!";
  });

  const expectedReturn = RESPONSE_CODE.USER_SUBMISSION_FAILED;
  expect(setContactInfo(testEvent))
    .resolves.toStrictEqual(expectedReturn)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});
