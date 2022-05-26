import { Workflow } from "cmscommonlib";
import { submitAny } from "./submitAny";
import { main, waiverAmendmentFormConfig } from "./submitWaiverAmendment";

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

it("returns the a Base Waiver if the Amendment ID contains .R00 and the right Base Waiver Number", () => {
  expect(
    waiverAmendmentFormConfig.getParentInfo("MI.1234.R00.M01")
  ).toStrictEqual(["MI.1234.R00.00", Workflow.ONEMAC_TYPE.WAIVER_BASE]);
});

it("returns the Waiver Renewal if the Amendment ID contains .R## (other than R00) and the right Waiver Renewal Number", () => {
  expect(
    waiverAmendmentFormConfig.getParentInfo("MI.1234.R01.M01")
  ).toStrictEqual(["MI.1234.R01.00", Workflow.ONEMAC_TYPE.WAIVER_RENEWAL]);
});
