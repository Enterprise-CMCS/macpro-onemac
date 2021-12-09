import WaiverExtension from "./WaiverExtension";
import spaData from "../unit-test/testSubmitData.json";

it("Waiver Extension Stub", async () => {
  const response = WaiverExtension.fieldsValid(spaData);
  expect(response).toBeInstanceOf(Promise);

  const response2 = WaiverExtension.getCMSEmail(spaData);
  expect(response2.HTML.length).toBe(1336);

  const response3 = WaiverExtension.getStateEmail({
    spaData,
    ninetyDayClockEnd: 1631626754502,
    user: { email: "foo" },
  });
  expect(response3.HTML.length).toBe(819);
});
