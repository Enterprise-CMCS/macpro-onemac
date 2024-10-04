import { submitAny } from "./submitAny";
import {
  main,
  waiverTemporaryExtension1915bFormConfig,
  waiverTemporaryExtension1915cFormConfig,
} from "./submitWaiverExtension";

jest.mock("./submitAny");
submitAny.mockResolvedValue("yup!");

const testEvent = {
  this: "is an event object",
  body: "needs to have somebody to love?",
};

const expectedResponse = {
  body: '"yup!"',
  headers: {
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": "*",
  },
  statusCode: 200,
};

it("should submit temporary extension 1915b form", async () => {
  const data = {
    temporaryExtensionType: "1915(b)",
  };
  const event = { body: JSON.stringify(data) };

  await main(event);

  expect(submitAny).toHaveBeenCalledWith(
    event,
    waiverTemporaryExtension1915bFormConfig
  );
});

it("should submit temporary extension 1915c form", async () => {
  const data = {
    temporaryExtensionType: "1915(c)",
  };
  const event = { body: JSON.stringify(data) };

  await main(event);

  expect(submitAny).toHaveBeenCalledWith(
    event,
    waiverTemporaryExtension1915cFormConfig
  );
});

it("should return an error when temporaryExtensionType is invalid", async () => {
  const data = {
    temporaryExtensionType: "notFound",
  };
  const event = { body: JSON.stringify(data) };

  const expectedResponse = {
    statusCode: 500,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({
      error:
      
        "Temporary Extension Type not found - " + data.temporaryExtensionType,
    }),
  };

  const result = await main(event);

  expect(result).toEqual(expectedResponse);
});

it("should return an HTTP 500 error when event body cannot be parsed", async () => {
  const event = { body: "invalidJson" };
  const expectedResponse = {
    statusCode: 500,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: "{\"error\":\"Unexpected token 'i', \\\"invalidJson\\\" is not valid JSON\"}",
  };

  const result = await main(event);

  expect(result).toEqual(expectedResponse);
});
