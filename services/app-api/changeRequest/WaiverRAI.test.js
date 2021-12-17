import WaiverRAI from "./WaiverRAI";
import spaData from "../unit-test/testSubmitData.json"

it('Waiver AppK Stub', async () => {

    const response = WaiverRAI.fieldsValid(spaData)
    expect(response).toBeInstanceOf(Promise)

    const response2 = WaiverRAI.getCMSEmail(spaData)
    expect(response2.HTML.length).toBe(1318)

    const response3 = WaiverRAI.getStateEmail({ spaData, "ninetyDayClockEnd": 1631626754502,"user": { "email": "foo" } })
    expect(response3.HTML.length).toBe(1226)
});
