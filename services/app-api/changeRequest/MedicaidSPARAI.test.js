import MedicaidSPARAI from "./MedicaidSPARAI";
import spaData from "../unit-test/testSubmitData.json";
import packageExists from "../utils/packageExists";

jest.mock("../utils/packageExists");

it("MedicaidSPARAI Stub", async () => {
  packageExists.mockImplementationOnce(() => true);
  const response = MedicaidSPARAI.fieldsValid(spaData);
  expect(response).toBeInstanceOf(Promise);

  packageExists.mockImplementationOnce(() => false);
  const responsef = MedicaidSPARAI.fieldsValid(spaData);
  expect(responsef).toBeInstanceOf(Promise);

  packageExists.mockImplementationOnce(() => {
    throw "Ouch!";
  });
  const responset = MedicaidSPARAI.fieldsValid(spaData);
  expect(responset).toBeInstanceOf(Promise);

  const response2 = MedicaidSPARAI.getCMSEmail(spaData);
  expect(response2.HTML.length).toBe(1322);

  const response3 = MedicaidSPARAI.getStateEmail({
    spaData,
    ninetyDayClockEnd: 1631626754502,
    user: { email: "foo" },
  });
  expect(response3.HTML.length).toBe(1203);
});
