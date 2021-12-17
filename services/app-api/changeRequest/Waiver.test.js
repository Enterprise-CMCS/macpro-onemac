import Waiver from "./Waiver";
import spaData from "../unit-test/testSubmitData.json"

it('Waiver Stub', async () => {

    const response = Waiver.fieldsValid(spaData)
    expect(response).toBeInstanceOf(Promise)

    const response2 = Waiver.getCMSEmail(spaData)
    expect(response2.HTML.length).toBe(1440)

    const response3 = Waiver.getStateEmail({ spaData, "ninetyDayClockEnd": 1631626754502,"user": { "email": "foo" } })
    expect(response3.HTML.length).toBe(1279)
});
