const profileInformation = "#profileInfoHeader";
//Element is Xpath use cy.xpath instead of cy.get
const fullNameHeader = '//h3[contains(text(),"Full Name")]';
const fullName =
  "div.header-and-content:nth-child(1) div.profile-container div.profile-content div.left-column div.ds-c-review:nth-child(2) div.ds-u-margin-right--2 > div.ds-c-review__body";
//Element is Xpath use cy.xpath instead of cy.get
const roleHeader = '//h3[contains(text(),"Role")]';
const role =
  "div.header-and-content:nth-child(1) div.profile-container div.profile-content div.left-column div.ds-c-review:nth-child(3) div.ds-u-margin-right--2 > div.ds-c-review__body";
//Element is Xpath use cy.xpath instead of cy.get
const emailHeader = '//h3[contains(text(),"Email")]';
const email =
  "div.header-and-content:nth-child(1) div.profile-container div.profile-content div.left-column div.ds-c-review:nth-child(4) div.ds-u-margin-right--2 > div.ds-c-review__body";
//Element is Xpath use cy.xpath instead of cy.get
const phoneNumberHeader = '//span[contains(text(),"Phone Number")]';
const phoneNumberAddBTN = "#addButton";
const statusHeader = "#accessHeader";
const accessStatus = '//em[contains(text(),"Access Granted")]';
const accessStatusDenied = '//em[contains(text(),"Access Denied")]';
const accessStatusRevoked = '//em[contains(text(),"Access Revoked")]';

export class oneMacMyProfilePage {
  verifyProfileInformationIsDisplayed() {
    cy.get(profileInformation).should("be.visible");
  }

  verifyWeAreOnMyProfilePage() {
    cy.url().should("include", "/profile");
  }

  verifyFullNameHeader() {
    cy.xpath(fullNameHeader).should("be.visible");
  }
  verifyFullName() {
    cy.get(fullName).should("be.visible");
  }
  verifyRoleHeader() {
    cy.xpath(roleHeader).should("be.visible");
  }
  verifyRole() {
    cy.get(role).should("be.visible");
  }
  verifyEmailHeader() {
    cy.xpath(emailHeader).should("be.visible");
  }
  verifyEmail() {
    cy.get(email).should("be.visible");
  }
  verifyPhoneNumberHeader() {
    cy.xpath(phoneNumberHeader).should("be.visible");
  }
  verifyPhoneNumberAddBTN() {
    cy.get(phoneNumberAddBTN).should("be.visible");
  }
  verifyStatusHeader() {
    cy.get(statusHeader).should("be.visible");
  }
  verifyStatusHeaderDoesNotExist() {
    cy.get(statusHeader).should("not.exist");
  }
  verifyAccessStatus() {
    cy.xpath(accessStatus).should("be.visible");
  }

  verifyAccessStatusDenied() {
    cy.xpath(accessStatusDenied).should("be.visible");
  }

  verifyAccessStatusRevoked() {
    cy.xpath(accessStatusRevoked).should("be.visible");
  }
}
export default oneMacMyProfilePage;
