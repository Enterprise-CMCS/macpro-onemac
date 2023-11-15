const EmailInput = "#email";
const PasswordInput = "#password";
const LoginBtn = "#loginDevUserBtn";

const DEFAULT_DEV_WORD = "Passw0rd!";

export class oneMacDevLoginPage {
  loginAs(userRole, userStatus) {
    const fixtureFile = `user-logins.json`;

    cy.fixture(fixtureFile).then(function (loginCredentials) {
      cy.get(EmailInput).type(loginCredentials[userRole][userStatus]);
      cy.get(PasswordInput).type(DEFAULT_DEV_WORD);
      cy.get(LoginBtn).click();
    });
  }

  loginAsStateSubmiiter() {
    cy.get(EmailInput).type("statesubmitter@nightwatch.test");
    cy.get(PasswordInput).type("Passw0rd!");
    cy.get(LoginBtn).click();
  }

  loginAsCMSRoleApprover() {
    cy.get(EmailInput).type("cmsroleapprover@nightwatch.test");
    cy.get(PasswordInput).type("Passw0rd!");
    cy.get(LoginBtn).click();
  }

  loginAsCMSSystemAdmin() {
    cy.get(EmailInput).type("systemadmin@nightwatch.test");
    cy.get(PasswordInput).type("Passw0rd!");
    cy.get(LoginBtn).click();
  }

  loginAsHelpDeskUser() {
    cy.get(EmailInput).type("helpdesk@nightwatch.test");
    cy.get(PasswordInput).type("Passw0rd!");
    cy.get(LoginBtn).click();
  }
  loginAsCMSReviewer() {
    cy.get(EmailInput).type("cmsreviewer@nightwatch.test");
    cy.get(PasswordInput).type("Passw0rd!");
    cy.get(LoginBtn).click();
  }

  loginAsCMSUserRevoked() {
    cy.get(EmailInput).type("cmsroleapproverrevoked@cms.hhs.local");
    cy.get(PasswordInput).type("Passw0rd!");
    cy.get(LoginBtn).click();
  }

  loginAsCMSUserDenied() {
    cy.get(EmailInput).type("cmsroleapproverdenied@cms.hhs.local");
    cy.get(PasswordInput).type("Passw0rd!");
    cy.get(LoginBtn).click();
  }

  loginAsStateSystemAdmin() {
    cy.get(EmailInput).type("statesystemadmin@nightwatch.test");
    cy.get(PasswordInput).type("Passw0rd!");
    cy.get(LoginBtn).click();
  }

  loginAsEUACMSReadOnlyUser() {
    cy.get(EmailInput).type("vmcmurray@collabralink.com");
    cy.get(PasswordInput).type("Passw0rd!");
    cy.get(LoginBtn).click();
  }
}
export default oneMacDevLoginPage;
