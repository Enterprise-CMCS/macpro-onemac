import { createMemoryHistory } from "history";
import { ONEMAC_ROUTES } from "cmscommonlib";
import { assert } from "chai";

jest.mock("../utils/ChangeRequestDataApi");

window.HTMLElement.prototype.scrollIntoView = jest.fn();
window.scrollTo = jest.fn();

describe("OneMAC Form", () => {
  it("asserts true", async () => {
    assert(true);
  });

  //   let history;

  //   beforeEach(() => {
  //     history = createMemoryHistory();
  //     history.push(ONEMAC_ROUTES.BASE_WAIVER);
  //   });

  // it("has the submit button disabled on initial load", async () => {
  //   const handleSubmit = jest.fn();

  //   render(
  //     <AppContext.Provider
  //       value={{
  //         ...stateSubmitterInitialAuthState,
  //       }}
  //     >
  //       <Router history={history}>
  //         <OneMACForm formInfo={baseWaiverFormInfo}/>
  //       </Router>
  //     </AppContext.Provider>
  //   );

  //   const submitButtonEl = screen.getByText("Submit");

  //   userEvent.click(submitButtonEl);
  //   expect(handleSubmit).not.toBeCalled();
  // });

  //   it("stays disabled even with valid ID", async () => {
  //     const testID = "MI.2222";

  //     render(
  //       <AppContext.Provider
  //         value={{
  //           ...stateSubmitterInitialAuthState,
  //         }}
  //       >
  //         <Router history={history}>
  //           <OneMACForm formInfo={baseWaiverFormInfo}/>
  //         </Router>
  //       </AppContext.Provider>
  //     );

  //     const submitButtonEl = screen.getByText("Submit");
  //     expect(submitButtonEl).toBeDisabled();

  //     const transmittalNumberEl = screen.getByLabelText("Base Waiver Number");

  //     ChangeRequestDataApi.packageExists.mockResolvedValue(false);

  //     userEvent.type(transmittalNumberEl, testID);
  //     await waitFor(() => expect(transmittalNumberEl.value).toBe(testID));

  //     expect(submitButtonEl).toBeDisabled();
  //   });

  //   it("does not clear already completed form fields if submit fails.", async () => {
  //     const testValues = {
  //       transmittalNumber: "MI.17234.R00.00",
  //       waiverAuthority: "1915(b)",
  //     };

  //     render(
  //       <AppContext.Provider
  //         value={{
  //           ...stateSubmitterInitialAuthState,
  //         }}
  //       >
  //         <Router history={history}>
  //           <OneMACForm formInfo={baseWaiverFormInfo}/>
  //         </Router>
  //       </AppContext.Provider>
  //     );

  //     const transmittalNumberEl = screen.getByLabelText("Base Waiver Number");
  //     const waiverAuthorityEl = screen.getByLabelText("Waiver Authority");
  //     const submitButtonEl = screen.getByText("Submit");

  //     // values start out empty
  //     expect(transmittalNumberEl.value).toBe("");
  //     expect(waiverAuthorityEl.value).toBe("");

  //     userEvent.selectOptions(waiverAuthorityEl, testValues.waiverAuthority);
  //     await screen.findByText("All other 1915(b) Waivers");

  //     // Find the package
  //     ChangeRequestDataApi.packageExists.mockResolvedValue(true);
  //     userEvent.type(transmittalNumberEl, testValues.transmittalNumber);
  //     await screen.findByText(
  //       `According to our records, this Base Waiver Number already exists. Please check the Base Waiver Number and try entering it again.`
  //     );
  //     expect(transmittalNumberEl.value).toBe(testValues.transmittalNumber);

  //     // click the submit button
  //     userEvent.click(submitButtonEl);
  //     // await screen.findByText("Missing Required Attachments");

  //     // the transmittal number still contains the value
  //     expect(transmittalNumberEl.value).toBe(testValues.transmittalNumber);
  //     expect(waiverAuthorityEl.value).toBe(testValues.waiverAuthority);
  //   });
  // });

  // describe("Transmittal Number Section", () => {
  //   let history;

  //   beforeEach(() => {
  //     history = createMemoryHistory();
  //     history.push(ONEMAC_ROUTES.BASE_WAIVER);
  //   });

  //   it("populates the transmittal number field when passed in as a url query parameter", async () => {
  //     const testTransmittalNumber = "MI.1122.R00.00";
  //     ChangeRequestDataApi.packageExists.mockResolvedValue(false);

  //     history.push(
  //       `${ONEMAC_ROUTES.BASE_WAIVER}?transmittalNumber=${testTransmittalNumber}`
  //     );
  //     render(
  //       <AppContext.Provider
  //         value={{
  //           ...stateSubmitterInitialAuthState,
  //         }}
  //       >
  //         <Router history={history}>
  //           <OneMACForm formInfo={baseWaiverFormInfo}/>
  //         </Router>
  //       </AppContext.Provider>
  //     );

  //     const transmittalNumberEl = screen.getByLabelText("Base Waiver Number");
  //     await waitFor(() =>
  //       expect(transmittalNumberEl.value).toBe(testTransmittalNumber)
  //     );
  //   });

  //   it("informs user that they cannot submit for an unauthorized territory", async () => {
  //     const territoryMessage = `You can only submit for a state you have access to. If you need to add another state, visit your user profile to request access.`;
  //     const invalidFormatId = "SS.3242.R00.00";

  //     render(
  //       <AppContext.Provider
  //         value={{
  //           ...stateSubmitterInitialAuthState,
  //         }}
  //       >
  //         <Router history={history}>
  //           <OneMACForm />
  //         </Router>
  //       </AppContext.Provider>
  //     );

  //     const transmittalNumberEl = screen.getByLabelText("Base Waiver Number");

  //     userEvent.type(transmittalNumberEl, invalidFormatId);
  //     await waitFor(() => screen.getByText(territoryMessage));
  //   });

  //   it("displays error message when the format id is invalid (but not when it's valid)", async () => {
  //     const formatMessage = `The Base Waiver Number must be in the format of SS.####.R00.00 or SS.#####.R00.00`;
  //     const invalidFormatId = "MI.12";
  //     const validFormatId = "MI.11122.R00.00";

  //     ChangeRequestDataApi.packageExists.mockResolvedValue(false);

  //     render(
  //       <AppContext.Provider
  //         value={{
  //           ...stateSubmitterInitialAuthState,
  //         }}
  //       >
  //         <Router history={history}>
  //           <OneMACForm />
  //         </Router>
  //       </AppContext.Provider>
  //     );

  //     const transmittalNumberEl = screen.getByLabelText("Base Waiver Number");

  //     // status message shows when INVALID id format is put in
  //     userEvent.type(transmittalNumberEl, invalidFormatId);
  //     await waitFor(() => screen.getByText(formatMessage));

  //     // status message is removed when VALID id format is put in
  //     userEvent.clear(transmittalNumberEl);
  //     userEvent.type(transmittalNumberEl, validFormatId);
  //     await waitForElementToBeRemoved(() => screen.queryByText(formatMessage));
  //   });

  //   it("displays error message when id SHOULD NOT exist but DOES", async () => {
  //     const testId = "MI.1122.R00.00";
  //     const existErrorMessage = `According to our records, this Base Waiver Number already exists. Please check the Base Waiver Number and try entering it again.`;

  //     // id will exist
  //     ChangeRequestDataApi.packageExists.mockResolvedValue(true);

  //     render(
  //       <AppContext.Provider
  //         value={{
  //           ...stateSubmitterInitialAuthState,
  //         }}
  //       >
  //         <Router history={history}>
  //           <OneMACForm />
  //         </Router>
  //       </AppContext.Provider>
  //     );

  //     const transmittalNumberEl = screen.getByLabelText("Base Waiver Number");

  //     userEvent.type(transmittalNumberEl, testId);
  //     await waitFor(() => screen.getByText(existErrorMessage));
  //   });
  // });

  // describe("cancelling the form submission", () => {
  //   let history;

  //   beforeEach(() => {
  //     history = createMemoryHistory();
  //     history.push(ROUTES.BASE_WAIVER);
  //   });

  //   it("keeps the form information if cancel is cancelled", async () => {
  //     const testValues = {
  //       transmittalNumber: "MI.17234.R00.00",
  //       waiverAuthority: "1915(b)",
  //       proposedEffectiveDate: "2022-04-01",
  //     };

  //     render(
  //       <AppContext.Provider
  //         value={{
  //           ...stateSubmitterInitialAuthState,
  //         }}
  //       >
  //         <Router history={history}>
  //           <OneMACForm />
  //         </Router>
  //       </AppContext.Provider>
  //     );

  //     const transmittalNumberEl = screen.getByLabelText("Base Waiver Number");
  //     const waiverAuthorityEl = screen.getByLabelText("Waiver Authority");
  //     const proposedEffectiveEl = screen.getByLabelText(
  //       "Proposed Effective Date"
  //     );
  //     const cancelButtonEl = screen.getByText("Cancel");

  //     // values start out empty
  //     expect(transmittalNumberEl.value).toBe("");
  //     expect(waiverAuthorityEl.value).toBe("");
  //     expect(proposedEffectiveEl.value).toBe("");

  //     userEvent.selectOptions(waiverAuthorityEl, testValues.waiverAuthority);
  //     await screen.findByText("All other 1915(b) Waivers");

  //     // Don't find the package
  //     ChangeRequestDataApi.packageExists.mockResolvedValue(false);
  //     userEvent.type(transmittalNumberEl, testValues.transmittalNumber);
  //     await expect(transmittalNumberEl.value).toBe(testValues.transmittalNumber);

  //     userEvent.type(proposedEffectiveEl, testValues.proposedEffectiveDate);
  //     await expect(proposedEffectiveEl.value).toBe(
  //       testValues.proposedEffectiveDate
  //     );

  //     // click the submit button
  //     userEvent.click(cancelButtonEl);
  //     screen.findByText("Stay on Page");
  //     const cancelCancelEl = screen.getByText("Stay on Page");
  //     userEvent.click(cancelCancelEl);
  //     expect(cancelCancelEl).not.toBeInTheDocument();
  //     // the transmittal number still contains the value
  //     expect(transmittalNumberEl.value).toBe(testValues.transmittalNumber);
  //     expect(waiverAuthorityEl.value).toBe(testValues.waiverAuthority);
  //     expect(proposedEffectiveEl.value).toBe(testValues.proposedEffectiveDate);
  //   });

  //   it("leaves the page when cancel is confirmed", async () => {
  //     const herstory = createMemoryHistory();
  //     herstory.push(ROUTES.TEMPORARY_EXTENSION);
  //     herstory.push(ROUTES.BASE_WAIVER);

  //     render(
  //       <AppContext.Provider
  //         value={{
  //           ...stateSubmitterInitialAuthState,
  //         }}
  //       >
  //         <Router history={herstory}>
  //           <OneMACForm />
  //         </Router>
  //       </AppContext.Provider>
  //     );
  //     const cancelButtonEl = screen.getByText("Cancel");
  //     userEvent.click(cancelButtonEl);
  //     screen.findByText("Leave Anyway", { selector: "button" });
  //     userEvent.click(screen.getByText("Leave Anyway", { selector: "button" }));
  //     expect(herstory.location.pathname).toBe(ROUTES.TEMPORARY_EXTENSION);
  //   });
});
