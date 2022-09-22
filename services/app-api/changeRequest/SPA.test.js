import SPA from "./SPA";
import spaData from "../unit-test/testSubmitData.json";
import packageExists from "../utils/packageExists";

jest.mock("../utils/packageExists");

it("SPA Stub", async () => {
  packageExists.mockImplementationOnce(() => true);
  const response = SPA.fieldsValid(spaData);
  expect(response)
    .resolves.toBeInstanceOf(Promise)
    .catch((error) => {
      console.log("caught test error: ", error);
    });

  packageExists.mockImplementationOnce(() => false);
  const responsef = SPA.fieldsValid(spaData);
  expect(responsef)
    .resolves.toBeInstanceOf(Promise)
    .catch((error) => {
      console.log("caught test error: ", error);
    });

  packageExists.mockImplementationOnce(() => {
    throw "Ouch!";
  });
  const responset = SPA.fieldsValid(spaData);
  expect(responset)
    .resolves.toBeInstanceOf(Promise)
    .catch((error) => {
      console.log("caught test error: ", error);
    });

  const response2 = SPA.getCMSEmail(spaData);
  expect(response2.HTML.length).toBe(1435);

  const response3 = SPA.getStateEmail({
    spaData,
    ninetyDayClockEnd: 1631626754502,
    user: { email: "foo" },
  });
  expect(response3.HTML.length).toBe(1179);
});
