//Element is Xpath use cy.xpath instead of cy.get
const nintieththDayColumn = '//th[@id="ninetiethDayColHeader"]';
const nintiethDayColumnFirstValue = "#ninetiethDay-0";
//Element is Xpath use cy.xpath instead of cy.get
const MD32560Value = '//a[contains(text(),"MD.32560")]';
//Element is Xpath use cy.xpath instead of cy.get
const WI232222MED1 = '//a[contains(text(),"WI-23-2222-MED1")]';
//Element is Xpath use cy.xpath instead of cy.get
const expirationDateColumnHeader = '//th[@id="expirationTimestampColHeader"]';
//Element is Xpath use cy.xpath instead of cy.get
const firstExperationDate = '//td[@id="SexpirationTimestamp-0"]';
//Element is Xpath use cy.xpath instead of cy.get
const MD32560hrefValue =
  '//a[contains(@href,"/detail/waivernew/1633642209858/MD.32560")]';

export class oneMacPackagePage {
  verify90thDayColumn() {
    cy.xpath(nintieththDayColumn).should("be.visible");
  }

  verifyValue() {
    cy.get(nintiethDayColumnFirstValue).contains("Pending");
  }

  findIdNumberMD32560() {
    cy.xpath(MD32560Value).contains("MD.32560");
  }

  findIdNumberWI232222MED1() {
    cy.xpath(WI232222MED1).contains("WI-23-2222-MED1");
  }

  verifyexpirationDateColumnHeaderExists() {
    cy.xpath(expirationDateColumnHeader).should("be.visible");
  }

  verifyMD32560ExpirationDateIsSetTooct142026() {
    cy.xpath(MD32560hrefValue);
  }
  verifyExpirationDateFirstValue(s) {
    cy.xpath(firstExperationDate).contains(s);
  }
}
export default oneMacPackagePage;
