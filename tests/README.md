## oneMAC Automated Testing with Cypress and Cucumber

oneMAC uses the Cypress (https://cypress.io) front end testing tool with Cucumber (https://cucumber.io) as the Behavior-Driven-Development (BDD) layer. This allows the team to test the intricate details of the oneMAC application in a reliable and readable way.

### Installing and using cypress locally

cd ~projectDir/tests/cypress
npm i

go to /tests/cypress
npx cypress open

## Run an individual cypress test rather than whole test suite

go to /tests/cypress
npx cypress run --spec "./cypress/e2e/Dashboard_Filter_By_State.spec.feature" --headed
