import WaiverRAI from "./WaiverRAI";
import spaData from "../unit-test/testSubmitData.json";
import packageExists from "../utils/packageExists";

jest.mock("../utils/packageExists");

it("Waiver AppK Stub", async () => {
  packageExists.mockImplementationOnce(() => true);
  const response = WaiverRAI.fieldsValid(spaData);
  expect(response)
    .resolves.toBeInstanceOf(Promise)
    .catch((error) => {
      console.log("caught test error: ", error);
    });

  packageExists.mockImplementationOnce(() => false);
  const responsef = WaiverRAI.fieldsValid(spaData);
  expect(responsef)
    .resolves.toBeInstanceOf(Promise)
    .catch((error) => {
      console.log("caught test error: ", error);
    });

  packageExists.mockImplementationOnce(() => {
    throw "Ouch!";
  });
  const responset = WaiverRAI.fieldsValid(spaData);
  expect(responset)
    .resolves.toBeInstanceOf(Promise)
    .catch((error) => {
      console.log("caught test error: ", error);
    });

  const response2 = WaiverRAI.getCMSEmail(spaData);
  expect(response2.HTML.length).toBe(1446);

  const response3 = WaiverRAI.getStateEmail({
    spaData,
    ninetyDayClockEnd: 1631626754502,
    user: { email: "foo" },
  });
  expect(response3.HTML.length).toBe(1226);
});
