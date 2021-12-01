import SPA from "./SPA";
import spaData from "../unit-test/testSubmitData.json"

it('SPA Stub', async () => {

    const response = SPA.fieldsValid(spaData)
    expect(response).toBeInstanceOf(Promise)

    const response2 = SPA.getCMSEmail(spaData)
    expect(response2.HTML.length).toBe(1307)

    const response3 = SPA.getStateEmail({ spaData, "ninetyDayClockEnd": 1631626754502,"user": { "email": "foo" } })
    expect(response3.HTML.length).toBe(1179)
});
