import WaiverAppK from "./WaiverAppK";
import spaData from "../unit-test/testSubmitData.json";

it("Waiver AppK Stub", async () => {
  const response = WaiverAppK.fieldsValid(spaData);
  expect(response).toBeInstanceOf(Promise);

  const response2 = WaiverAppK.getCMSEmail(spaData);
  expect(response2.HTML.length).toBe(1397);

  const response3 = WaiverAppK.getStateEmail({
    spaData,
    ninetyDayClockEnd: 1631626754502,
    user: { email: "foo" },
  });
  expect(response3.HTML.length).toBe(1207);
});
