import CHIPSPARAI from "./CHIPSPARAI";
import spaData from "../unit-test/testSubmitData.json";
import packageExists from "../utils/packageExists";

jest.mock("../utils/packageExists");

it("CHIPSPARAI Stub", async () => {
  packageExists.mockImplementationOnce(() => true);
  const response = CHIPSPARAI.fieldsValid(spaData);
  expect(response).toBeInstanceOf(Promise);

  packageExists.mockImplementationOnce(() => false);
  const responsef = CHIPSPARAI.fieldsValid(spaData);
  expect(responsef).toBeInstanceOf(Promise);

  packageExists.mockImplementationOnce(() => {
    throw "Ouch!";
  });
  const responset = CHIPSPARAI.fieldsValid(spaData);
  expect(responset).toBeInstanceOf(Promise);

  const response2 = CHIPSPARAI.getCMSEmail(spaData);
  expect(response2.HTML.length).toBe(1446);

  const response3 = CHIPSPARAI.getStateEmail({
    spaData,
    user: { email: "foo" },
  });

  expect(response3.HTML.length).toBe(743);
});
