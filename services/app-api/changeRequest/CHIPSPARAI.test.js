import CHIPSPARAI from "./CHIPSPARAI";
import spaData from "../unit-test/testSubmitData.json";

it('CHIPSPARAI Stub', async () => {

    const response = CHIPSPARAI.fieldsValid({ "transmittalNumber": "foo"})
    expect(response).toBeInstanceOf(Promise)

    const response2 = CHIPSPARAI.getCMSEmail(spaData)
    expect(response2.HTML.length).toBe(1318)

    const response3 = CHIPSPARAI.getStateEmail({ spaData, "user": { "email": "foo" } })

    expect(response3.HTML.length).toBe(743)
});
