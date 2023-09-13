import {
  main,
  initialWaiverB4FormConifg,
  intialWaiverBFormConifg,
} from "./submitInitialWaiver";

import { submitAny } from "./submitAny";

jest.mock("./submitAny");
submitAny.mockResolvedValue("yup!");

describe("main", () => {
  it("should submit initial waiver B4 form", async () => {
    const data = {
      waiverAuthority: "1915(b)(4)",
    };
    const event = { body: JSON.stringify(data) };

    await main(event);

    expect(submitAny).toHaveBeenCalledWith(event, initialWaiverB4FormConifg);
  });

  it("should submit initial waiver B form", async () => {
    const data = {
      waiverAuthority: "1915(b)",
    };
    const event = { body: JSON.stringify(data) };

    await main(event);

    expect(submitAny).toHaveBeenCalledWith(event, intialWaiverBFormConifg);
  });

  it("should throw an error when waiver authority is not found", async () => {
    const data = { waiverAuthority: "notFound" };
    const event = { body: JSON.stringify(data) };
    const expectedResponse = {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        error: "Waiver Authority not found",
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
      body: JSON.stringify({
        error: "Unexpected token 'i', \"invalidJson\" is not valid JSON",
      }),
    };

    const result = await main(event);

    expect(result).toEqual(expectedResponse);
  });
});
