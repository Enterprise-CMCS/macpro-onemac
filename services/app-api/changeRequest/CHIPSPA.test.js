import CHIPSPA from "./CHIPSPA";
import spaData from "../unit-test/testSubmitData.json";

it("CHIPSPA Stub", async () => {
  const response = CHIPSPA.fieldsValid(spaData);
  expect(response).toBeInstanceOf(Promise);

  const response2 = CHIPSPA.getCMSEmail(spaData);
  expect(response2.HTML.length).toBe(1312);

  const response3 = CHIPSPA.getStateEmail({ spaData, user: { email: "foo" } });
  expect(response3.HTML.length).toBe(861);
});
