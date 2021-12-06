import SPARAI from "./SPARAI";
import spaData from "../unit-test/testSubmitData.json"

it('SPARAI Stub', async () => {

    const response = SPARAI.fieldsValid(spaData)
    expect(response).toBeInstanceOf(Promise)

    const response2 = SPARAI.getCMSEmail(spaData)
    expect(response2.HTML.length).toBe(1313)

    const response3 = SPARAI.getStateEmail({ spaData, "ninetyDayClockEnd": 1631626754502,"user": { "email": "foo" } })
    expect(response3.HTML.length).toBe(1176)
});
