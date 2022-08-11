import SPARAI from "./SPARAI";
import spaData from "../unit-test/testSubmitData.json";
import packageExists from "../utils/packageExists";

jest.mock("../utils/packageExists");

it("SPARAI Stub", async () => {
  packageExists.mockImplementationOnce(() => true);
  const response = SPARAI.fieldsValid(spaData);
  expect(response).toBeInstanceOf(Promise);

  packageExists.mockImplementationOnce(() => false);
  const responsef = SPARAI.fieldsValid(spaData);
  expect(responsef).toBeInstanceOf(Promise);

  packageExists.mockImplementationOnce(() => {
    throw "Ouch!";
  });
  const responset = SPARAI.fieldsValid(spaData);
  expect(responset).toBeInstanceOf(Promise);

  const response2 = SPARAI.getCMSEmail(spaData);
  expect(response2.HTML.length).toBe(1441);

  const response3 = SPARAI.getStateEmail({
    spaData,
    ninetyDayClockEnd: 1631626754502,
    user: { email: "foo" },
  });
  expect(response3.HTML.length).toBe(1176);
});
