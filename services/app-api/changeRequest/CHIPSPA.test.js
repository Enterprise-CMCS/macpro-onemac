import CHIPSPA from "./CHIPSPA";
import spaData from "../unit-test/testSubmitData.json";
import packageExists from "../utils/packageExists";

jest.mock("../utils/packageExists");

it("CHIPSPA Stub", async () => {
  packageExists.mockImplementationOnce(() => true);
  const response = CHIPSPA.fieldsValid(spaData);
  expect(response).toBeInstanceOf(Promise);

  packageExists.mockImplementationOnce(() => false);
  const responsef = CHIPSPA.fieldsValid(spaData);
  expect(responsef).toBeInstanceOf(Promise);

  packageExists.mockImplementationOnce(() => {
    throw "Ouch!";
  });
  const responset = CHIPSPA.fieldsValid(spaData);
  expect(responset).toBeInstanceOf(Promise);

  const response2 = CHIPSPA.getCMSEmail(spaData);
  expect(response2.HTML.length).toBe(1440);

  const response3 = CHIPSPA.getStateEmail({ spaData, user: { email: "foo" } });
  expect(response3.HTML.length).toBe(861);
});
