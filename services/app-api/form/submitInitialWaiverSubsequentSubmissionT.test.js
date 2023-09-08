import {
  main,
  initialWaiverB4SubsequentFormConifg,
  initialWaiverBSubsequentFormConifg,
} from "./submitInitialWaiverSubsequentSubmission";
import { waiverAuthorityB4, waiverAuthorityB } from "cmscommonlib";
import { submitAny } from "./submitAny";
import handler from "../libs/handler-lib";

//jest.mock("../libs/handler-lib");
jest.mock("./submitAny");

const testResult = {
  body: "submitAny result",
  headers: {
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": "*",
  },
  statusCode: 200,
};

describe("main function", () => {
  beforeEach(() => {
    //handler.mockImplementation((func) => func);
    submitAny.mockResolvedValue(testResult);
  });

  it("should call submitAny with B4 form config when waiverAuthority is B4", async () => {
    const event = {
      body: JSON.stringify({ waiverAuthority: waiverAuthorityB4.value }),
    };
    const result = await main(event);
    expect(submitAny).toHaveBeenCalledWith(
      event,
      initialWaiverB4SubsequentFormConifg
    );
  });

  it("should call submitAny with B form config when waiverAuthority is B", async () => {
    const event = {
      body: JSON.stringify({ waiverAuthority: waiverAuthorityB.value }),
    };
    const result = await main(event);
    expect(submitAny).toHaveBeenCalledWith(
      event,
      initialWaiverBSubsequentFormConifg
    );
  });

  it("should throw an error when waiverAuthority is not found", async () => {
    const event = { body: JSON.stringify({ waiverAuthority: "not-found" }) };
    const result = await main(event);
    expect(result.statusCode).toEqual(500);
    //await expect(main(event)).rejects.toThrow("Waiver Authority not found");
  });

  // it("should throw an error when body is not a valid JSON", async () => {
  //   const event = { body: "invalid json" };
  //   await expect(main(event)).rejects.toThrow();
  // });
});
