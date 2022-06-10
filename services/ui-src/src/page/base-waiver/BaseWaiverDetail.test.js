import React from "react";
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import { Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";
import { stateSubmitterInitialAuthState } from "../../libs/testDataAppContext";

import { AppContext } from "../../libs/contextLib";
import BaseWaiverDetail from "./BaseWaiverDetail";
import PackageApi from "../../utils/PackageApi";
import { LOADER_TEST_ID } from "../../components/LoadingScreen";

jest.mock("../../utils/PackageApi");

const waiverDetail = {
  pk: "MI.83420",
  sk: "waivernew",
  submitterId: "us-east-1:86a190fe-b195-42bf-9685-9761bf0ff14b",
  componentType: "waivernew",
  currentStatus: "In Review",
  attachments: [
    {
      s3Key: "1639507770586/15MB.pdf",
      filename: "15MB.pdf",
      title:
        "1915(b)(4) FFS Selective Contracting (Streamlined) waiver application pre-print (Initial, Renewal, Amendment)",
      contentType: "application/pdf",
      url: "https://uploads-develop-attachments-116229642442.s3.us-east-1.amazonaws.com/protected/us-east-1%3A86a190fe-b195-42bf-9685-9761bf0ff14b/1639507770586/15MB.pdf",
    },
  ],
  children: [
    {
      componentType: "waiverextension",
      componentId: "MI.83420.R00.TE01",
      currentStatus: "Withdrawn",
      submitterName: "Angie Active",
      submitterEmail: "statesubmitteractive@cms.hhs.local",
      submissionTimestamp: 1647640764590,
    },
    {
      componentType: "waiverextension",
      componentId: "MI.83420.R00.TE02",
      currentStatus: "In Review",
      submitterName: "Angie Active",
      submitterEmail: "statesubmitteractive@cms.hhs.local",
      submissionTimestamp: 1647640764590,
    },
  ],
  GSI1sk: "MI.83420",
  additionalInformation: "This is just a test",
  submissionTimestamp: 1639507775282,
  waiverAuthority: "1915(b)(4)",
  GSI1pk: "OneMAC#waiver",
  packageId: "MI.83420",
  submitterEmail: "statesubmitter@nightwatch.test",
  componentId: "MI.83420",
  submitterName: "Statesubmitter Nightwatch",
  submissionId: "94a77310-5d0e-11ec-b95c-0fbf3f3ed945",
  waiverExtensions: [
    {
      pk: "MI.83420.R00.TE01",
      sk: "waiverextension",
      submitterId: "us-east-1:461e534a-6f0f-470c-a2da-d57e848125f5",
      componentType: "waiverextension",
      currentStatus: "Withdrawn",
      parentId: "MI.83420",
      attachments: [
        {
          s3Key: "1647640763552/attach1.txt",
          filename: "attach1.txt",
          title: "Waiver Extension Request",
          contentType: "text/plain",
          url: "https://uploads-develop-attachments-116229642442.s3.us-east-1.amazonaws.com/protected/us-east-1%3A86a190fe-b195-42bf-9685-9761bf0ff14b/1639507770586/15MB.pdf",
        },
      ],
      parentType: "waivernew",
      GSI1sk: "waiverextension",
      additionalInformation: "test 2222",
      submissionTimestamp: 1647640764590,
      GSI1pk: "MI.83420",
      submitterEmail: "statesubmitteractive@cms.hhs.local",
      componentId: "MI.83420.R00.TE01",
      submitterName: "Angie Active",
      submissionId: "ac3d65b0-a706-11ec-9f30-6773b9268a62",
    },
    {
      pk: "MI.83420.R00.TE02",
      sk: "waiverextension",
      submitterId: "us-east-1:461e534a-6f0f-470c-a2da-d57e848125f5",
      componentType: "waiverextension",
      currentStatus: "In Review",
      parentId: "MI.83420",
      attachments: [
        {
          s3Key: "1647640763552/attach1.txt",
          filename: "attach1.txt",
          title: "Waiver Extension Request",
          contentType: "text/plain",
          url: "https://uploads-develop-attachments-116229642442.s3.us-east-1.amazonaws.com/protected/us-east-1%3A86a190fe-b195-42bf-9685-9761bf0ff14b/1639507770586/15MB.pdf",
        },
      ],
      parentType: "waivernew",
      GSI1sk: "waiverextension",
      additionalInformation: "test 3333",
      submissionTimestamp: 1647640774590,
      GSI1pk: "MI.83420",
      submitterEmail: "statesubmitteractive@cms.hhs.local",
      componentId: "MI.83420.R00.TE02",
      submitterName: "Angie Active",
      submissionId: "ac3d65b0-a706-11ec-9f30-6773b9268a62",
    },
  ],
};

window.HTMLElement.prototype.scrollIntoView = jest.fn();

describe("Detail View Tests", () => {
  it("shows Temporary Extension link in side nav for waivers", async () => {
    PackageApi.getDetail.mockResolvedValue(waiverDetail);

    let history;
    history = createMemoryHistory();
    history.push("/detail/waivernew/MI.83420");

    render(
      <AppContext.Provider
        value={{
          ...stateSubmitterInitialAuthState,
        }}
      >
        <Router history={history}>
          <Route path="/detail/:componentType/:componentId">
            <BaseWaiverDetail />
          </Route>
        </Router>
      </AppContext.Provider>
    );

    // wait for loading screen to disappear
    await waitForElementToBeRemoved(() => screen.getByTestId(LOADER_TEST_ID));

    await waitFor(() => {
      expect(
        screen.getByRole("link", { name: "Temporary Extension" })
      ).toBeInTheDocument();
    });
  });

  //   it("shows Temporary Extension page for waivers", async () => {
  //     PackageApi.getDetail.mockResolvedValue(waiverDetail);

  //     let history;
  //     history = createMemoryHistory();
  //     history.push("/detail/waivernew/MI.83420#temp-extenstion");

  //     render(
  //       <AppContext.Provider
  //         value={{
  //           ...stateSubmitterInitialAuthState,
  //         }}
  //       >
  //         <Router history={history}>
  //           <Route path="/detail/:componentType/:componentId">
  //             <DetailView />
  //           </Route>
  //         </Router>
  //       </AppContext.Provider>
  //     );

  //     // wait for loading screen to disappear
  //     await waitForElementToBeRemoved(() => screen.getByTestId(LOADER_TEST_ID));

  //     await waitFor(() => {
  //       expect(
  //         screen.getByRole("heading", { name: "Temporary Extensions" })
  //       ).toBeInTheDocument();
  //     });
  //   });

  //   it("allows withdraw of temp extension", async () => {
  //     PackageApi.getDetail.mockResolvedValue(waiverDetail);
  //     PackageApi.withdraw.mockResolvedValue("WP000");

  //     let history;
  //     history = createMemoryHistory();
  //     history.push("/detail/waivernew/MI.83420#temp-extenstion");

  //     render(
  //       <AppContext.Provider
  //         value={{
  //           ...stateSubmitterInitialAuthState,
  //         }}
  //       >
  //         <Router history={history}>
  //           <Route path="/detail/:componentType/:componentId">
  //             <DetailView />
  //           </Route>
  //         </Router>
  //       </AppContext.Provider>
  //     );

  //     // wait for loading screen to disappear
  //     await waitForElementToBeRemoved(() => screen.getByTestId(LOADER_TEST_ID));

  //     await act(async () => {
  //       await userEvent.click(
  //         screen.getByRole("button", {
  //           name: "Actions for MI.83420.R00.TE02",
  //         })
  //       );
  //       await userEvent.click(screen.getByRole("menuitem", { name: "Withdraw" }));
  //       await userEvent.click(
  //         screen.getByRole("button", { name: "Yes, withdraw" })
  //       );
  //     });

  //     expect(document.getElementById("alert-bar")).toHaveTextContent(
  //       "Your submission package has successfully been withdrawn."
  //     );
  //   });
});
