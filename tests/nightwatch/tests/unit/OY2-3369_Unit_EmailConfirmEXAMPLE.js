const chai = require('chai');
//const sinon = require('sinon');

/**
 * Tutorial: Using fakes to create a unit test (without dependencies)
 * User Story: As a developer, I want to unit test "OY2-3369: Update email confirmation language" feature, without
 * dependence on an email service functionality.
 *
 */

//let myApp = {}
//const sandbox = sinon.createSandbox();

module.exports = {
    '@unitTest': true,
    "@tags": ["integration"],

    before: function (done) {
        chai.config.includeStack = true; // So I can inspect the stack trace for errors
        chai.config.showDiff = true; // Show me what I got vs what I was supposed to get
        chai.config.truncateThreshold = 0; // Don't truncate the error output

        done();
    },

    after: function (done) {

        done();
    },

    // Does my function meet Acceptance Criteria (works as intended)?
    'Verify Email Confirmation Format' : function (done) {
        let inputData = { firstName: "Mr. Joe", lastName: "GovernmentUser", SPA_ID: "SPA_123456",
            summaryText: "Requesting a SPA for SPA things", fileNames: ["myFakeRequest.pdf", "myManagerApproval.pdf"],
            email_addr: "joe.t.governmentuser@cms.gov", phoneNumber: "867-5309" };
        myCodeToEmailFunc(inputData);
        done()
    }

};



// The source code would not be in the test directly. Default values are the expected values

function myCodeToEmailFunc(expObj = {}) {
    let emailOut = `From spa-reply@cms.hhs.gov \nTo\n\nspa@cms.hhs.gov\n\nSubject\n\n
    New SPA RAI ${expObj.SPA_ID} submitted\n\n
    Body\n\nThe Submission Portal received a SPA RAI Submission:\n\n
    Name: ${expObj.firstName} ${expObj.lastName}\n\n
    Email Address: ${expObj.email_addr}\n\n
    SPA ID: ${expObj.SPA_ID}\n\n
    Summary: ${expObj.summaryText}\n\n
    Files: ${expObj.fileNames}\n\n\n\n
    If the contents of this email seem seem suspicious, do not open them, and instead forward this email to 
    SPAM@CMS.HHS.gov\n\n
    Thank you!`;

    if(expObj.phoneNumber) {        // This should not be included in this email
        emailOut.concat("P.S. Is this your correct number: ", expObj.phoneNumber);
    }
    return emailOut;
}