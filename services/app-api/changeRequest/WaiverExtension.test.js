import WaiverExtension from "./WaiverExtension";
import spaData from "../unit-test/testSubmitData.json";
import packageExists from "../utils/packageExists";

jest.mock("../utils/packageExists");

it("Waiver Extension Stub", async () => {
  packageExists.mockImplementationOnce(() => true);
  const response = WaiverExtension.fieldsValid(spaData);
  expect(response).toBeInstanceOf(Promise);

  packageExists.mockImplementationOnce(() => false);
  const responsef = WaiverExtension.fieldsValid(spaData);
  expect(responsef).toBeInstanceOf(Promise);

  packageExists.mockImplementationOnce(() => {
    throw "Ouch!";
  });
  const responset = WaiverExtension.fieldsValid(spaData);
  expect(responset).toBeInstanceOf(Promise);

  const response2 = WaiverExtension.getCMSEmail(spaData);
  expect(response2.HTML.length).toBe(1700);

  const response3 = WaiverExtension.getStateEmail({
    spaData,
    ninetyDayClockEnd: 1631626754502,
    user: { email: "foo" },
  });
  expect(response3.HTML.length).toBe(918);
});
