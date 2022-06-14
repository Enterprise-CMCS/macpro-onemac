import MedicaidSPA from "./MedicaidSPA";
import spaData from "../unit-test/testSubmitData.json";
import packageExists from "../utils/packageExists";

jest.mock("../utils/packageExists");

it("SPA Stub", async () => {
  packageExists.mockImplementationOnce(() => true);
  const response = MedicaidSPA.fieldsValid(spaData);
  expect(response).toBeInstanceOf(Promise);

  packageExists.mockImplementationOnce(() => false);
  const responsef = MedicaidSPA.fieldsValid(spaData);
  expect(responsef).toBeInstanceOf(Promise);

  packageExists.mockImplementationOnce(() => {
    throw "Ouch!";
  });
  const responset = MedicaidSPA.fieldsValid(spaData);
  expect(responset).toBeInstanceOf(Promise);

  const response2 = MedicaidSPA.getCMSEmail(spaData);
  expect(response2.HTML.length).toBe(1316);

  const response3 = MedicaidSPA.getStateEmail({
    spaData,
    ninetyDayClockEnd: 1631626754502,
    user: { email: "foo" },
  });
  expect(response3.HTML.length).toBe(1197);
});
