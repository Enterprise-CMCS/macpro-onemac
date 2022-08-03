import Waiver from "./Waiver";
import spaData from "../unit-test/testSubmitData.json";
import packageExists from "../utils/packageExists";

jest.mock("../utils/packageExists");

it("Waiver Stub", async () => {
  spaData.actionType = "new";

  packageExists.mockImplementationOnce(() => true);
  const response = Waiver.fieldsValid(spaData);
  expect(response).toBeInstanceOf(Promise);

  packageExists.mockImplementationOnce(() => false);
  const responsef = Waiver.fieldsValid(spaData);
  expect(responsef).toBeInstanceOf(Promise);

  packageExists.mockImplementationOnce(() => {
    throw "Ouch!";
  });
  const responset = Waiver.fieldsValid(spaData);
  expect(responset).toBeInstanceOf(Promise);

  const response2 = Waiver.getCMSEmail(spaData);
  expect(response2.HTML.length).toBe(1571);

  spaData.transmittalNumberWarningMessage = "0000";
  const responsew = Waiver.getCMSEmail(spaData);
  expect(responsew.HTML.length).toBe(1452);

  const response3 = Waiver.getStateEmail({
    spaData,
    ninetyDayClockEnd: 1631626754502,
    user: { email: "foo" },
  });
  expect(response3.HTML.length).toBe(1279);
});
