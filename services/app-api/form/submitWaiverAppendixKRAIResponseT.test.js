import { Workflow } from "cmscommonlib";
import { submitAny } from "./submitAny";
import {
  main,
  waiverAppendixKRAIResponseFormConfig,
} from "./submitWaiverAppendixKRAIResponse";

jest.mock("./submitAny");
submitAny.mockResolvedValue("yup!");

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

it("returns the Appendix K with my Id as my parent", () => {
  expect(
    waiverAppendixKRAIResponseFormConfig.getParentInfo("testId")
  ).toStrictEqual(["testId", Workflow.ONEMAC_TYPE.WAIVER_APP_K]);
});
