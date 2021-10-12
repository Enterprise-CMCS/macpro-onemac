//Element is Xpath use cy.xpath instead of cy.get
const nintieththDayColumn = '//th[@id="ninetiethDayColHeader"]';
const nintiethDayColumnFirstValue = "#ninetiethDay-0";
const MD32560Value = '//a[contains(text(),"MD.32560")]';
//Element is Xpath use cy.xpath instead of cy.get
const WI232222MED1 = '//a[contains(text(),"WI-23-2222-MED1")]';

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
}
export default oneMacPackagePage;
