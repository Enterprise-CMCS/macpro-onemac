// const login = require('./OY2_9999_Login');

// module.exports = {
//     "@tags": ["profileOne", "smoke", "regression-soon"],

//     before: function (browser) {
//         login.beforeEach(browser);
//         login['Login with state submitter user'](browser);
//     },

//     after: function (browser) {
//         login.afterEach(browser);

//     },

//     'State Submitter User can view Submission List Dashboard, FAQ, About, Account Management, SubmissionSelection': function (browser) {
//         //check on Submission List on the homepage
//         let submission_list = "//h1";
//         let spa_waiver_number = "(//table[@class='submissions-table']/thead/tr/th)[1]";
//         let type_title = "(//table[@class='submissions-table']/thead/tr/th)[2]";
//         let state_title = "(//table[@class='submissions-table']/thead/tr/th)[3]";
//         let date_submitted = "(//table[@class='submissions-table']/thead/tr/th)[4]";
//         let state_submitter = "(//table[@class='submissions-table']/thead/tr/th)[5]";
//         let dashboard_link = "//a[@id='dashboardLink']";
//         let faq_link = "(//a[@class='ds-u-text-decoration--none'])[2]";
//         let home_link = "(//a[@class='ds-u-text-decoration--none'])[1]";
//         let my_account_button = "//button[@id='myAccountLink']";
//         let management_profile_link = "//a[@id='manageAccountLink']";
//         let new_submission_button = "//a[@id='new-submission-button']";
//         browser.useXpath().expect.element(submission_list).to.be.visible;
//         browser.useXpath().expect.element(spa_waiver_number).to.be.visible;
//         browser.useXpath().expect.element(type_title).to.be.visible;
//         browser.useXpath().expect.element(state_title).to.be.visible;
//         browser.useXpath().expect.element(date_submitted).to.be.visible;
//         browser.useXpath().expect.element(state_submitter).to.be.visible;
//         browser.useXpath().expect.element(faq_link).to.be.visible;
//         browser.useXpath().expect.element(home_link).to.be.visible;
//         browser.useXpath().expect.element(my_account_button).to.be.visible;
//         browser.click(my_account_button);
//         browser.pause(500);
//         browser.useXpath().expect.element(management_profile_link).to.be.visible;
//         browser.click(management_profile_link);
//         browser.pause(500);
//         browser.click(dashboard_link);
//         browser.useXpath().expect.element(new_submission_button).to.be.visible;

//         //check on SPAs and Waivers links
//         browser.click(new_submission_button);
//         browser.pause(500);
//         let select_submission_type = "//div[@class='choice-intro']";
//         let state_plan_amendment_link = "(//h4)[1]";
//         let waiver_action_link = "(//h4)[2]";
//         browser.useXpath().expect.element(select_submission_type).to.be.visible;
//         browser.useXpath().expect.element(state_plan_amendment_link).to.be.visible;
//         browser.useXpath().expect.element(waiver_action_link).to.be.visible;
//         browser.click(state_plan_amendment_link);
//         browser.pause(500);
//         let medicaid_spa_link = "(//h4)[1]";
//         let respond_to_medicaid_spa_rai_link = "(//h4)[2]";
//         let chip_spa_link = "(//h4)[3]";
//         let respond_to_chip_spa_rai_link = "(//h4)[4]";
//         browser.useXpath().expect.element(medicaid_spa_link).to.be.visible;
//         browser.useXpath().expect.element(respond_to_medicaid_spa_rai_link).to.be.visible;
//         browser.useXpath().expect.element(chip_spa_link).to.be.visible;
//         browser.useXpath().expect.element(respond_to_chip_spa_rai_link).to.be.visible;
//         browser.click(dashboard_link);
//         browser.pause(500);
//         browser.click(new_submission_button);
//         browser.pause(500);
//         browser.click(waiver_action_link);
//         browser.pause(500);
//         let waiver_action_link_second = "(//h4)[1]";
//         let respond_to_waiver_rai_link = "(//h4)[2]";
//         let request_temporary_extension_link = "(//h4)[3]";
//         let appendix_k_amendment_link = "(//h4)[4]";
//         browser.useXpath().expect.element(waiver_action_link_second).to.be.visible;
//         browser.useXpath().expect.element(respond_to_waiver_rai_link).to.be.visible;
//         browser.useXpath().expect.element(request_temporary_extension_link).to.be.visible;
//         browser.useXpath().expect.element(appendix_k_amendment_link).to.be.visible;
//         browser.useCss();
//     },
// }