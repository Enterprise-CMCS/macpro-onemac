const EmailInput = "#email";
const PasswordInput = "#password";
const LoginBtn = "#loginDevUserBtn";

const DEFAULT_DEV_WORD = "Passw0rd!";
const LOGIN_FIXTURE = `user-logins.json`;

export class oneMacDevLoginPage {
  loginAs(userRole, userStatus) {
    cy.fixture(LOGIN_FIXTURE).then(function (loginCredentials) {
      cy.get(EmailInput).type(loginCredentials[userRole][userStatus]);
      cy.get(PasswordInput).type(DEFAULT_DEV_WORD);
      cy.get(LoginBtn).click();
    });
  }
}
export default oneMacDevLoginPage;
