import {StateWithdrawalEmail, CMSWithdrawalEmail} from "./formatWithdrawalEmails";

it('Change Request Types', async () => {

    // TODO:  Get Test Data 
    // const response = StateWithdrawalEmail( {"changeHistory": "xx", "submitterName": "name","data": {"packageID": "MI-11-1111-22"}})
    expect(StateWithdrawalEmail).toBeInstanceOf(Function)

    //const response2 = CMSWithdrawalEmail([{ "changeHistory": "foox", "submitterName": "name","packageID": "MI-11-1111-22"}])
    //expect(response2).toBe("Tuesday, September 14, 2021 @ 9:39 AM EDT")

});
