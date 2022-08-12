import { Workflow } from "cmscommonlib";
import { submitAny } from "./submitAny";
import { main, waiverRAIResponseFormConfig } from "./submitWaiverRAIResponse";

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

it.each`
  id                   | parentType
  ${"MI.1234.R00.00"}  | ${Workflow.ONEMAC_TYPE.WAIVER_INITIAL}
  ${"MI.1234.R01.00"}  | ${Workflow.ONEMAC_TYPE.WAIVER_RENEWAL}
  ${"MI.1234.R00.M01"} | ${Workflow.ONEMAC_TYPE.WAIVER_AMENDMENT}
  ${"MI.1234.R00.01"}  | ${Workflow.ONEMAC_TYPE.WAIVER_APP_K}
`(
  "returns parent type of $parentType when given id of $id",
  ({ id, parentType }) => {
    expect(waiverRAIResponseFormConfig.getParentInfo(id)).toStrictEqual([
      id,
      parentType,
    ]);
  }
);
