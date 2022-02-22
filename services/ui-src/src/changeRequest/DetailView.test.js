import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
import { stateSubmitterInitialAuthState } from "../libs/testDataAppContext";

import { AppContext } from "../libs/contextLib";
import DetailView from "./DetailView";
import PackageApi from "../utils/PackageApi";
import { LOADER_TEST_ID } from "../components/LoadingScreen";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
  useParams: () => {
    return {
      componentType: "spa",
      componentTimestamp: 16746532223,
      packageId: "MI-13-1122",
    };
  },
}));

jest.mock("../utils/PackageApi");

const testDetail = {
  submitterId: "us-east-1:afa582ca-4e4c-4d3b-be9b-d2dbc24c3d1a",
  changeHistory: [
    {
      componentType: "sparai",
      componentTimestamp: 1643218567141,
      submitterName: "Kristin Grue",
      componentId: "MI-13-1122",
    },
    {
      componentType: "spa",
      additionalInformation: "This is just a test",
      componentId: "MI-13-1122",
      attachments: [
        {
          s3Key: "1639696180278/15MB.pdf",
          filename: "15MB.pdf",
          title: "CMS Form 179",
          contentType: "application/pdf",
          url: "https://uploads-states-of-withdrawal-attachments-116229642442.s3.us-east-1.amazonaws.com/protected/us-east-1%3Aafa582ca-4e4c-4d3b-be9b-d2dbc24c3d1a/1639696180278/15MB.pdf",
        },
        {
          s3Key: "1639696180278/adobe.pdf",
          filename: "adobe.pdf",
          title: "SPA Pages",
          contentType: "application/pdf",
          url: "https://uploads-states-of-withdrawal-attachments-116229642442.s3.us-east-1.amazonaws.com/protected/us-east-1%3Aafa582ca-4e4c-4d3b-be9b-d2dbc24c3d1a/1639696180278/adobe.pdf",
        },
      ],
      submissionId: "4240e440-5ec5-11ec-b2ea-eb35c89f340d",
      currentStatus: "Submitted",
      submitterId: "us-east-1:afa582ca-4e4c-4d3b-be9b-d2dbc24c3d1a",
      submitterName: "StateSubmitter Nightwatch",
      submissionTimestamp: 1639696185888,
      submitterEmail: "statesubmitter@nightwatch.test",
    },
  ],
  clockEndTimestamp: 1647286706000,
  componentType: "spa",
  currentStatus: "Package In Review",
  attachments: [
    {
      s3Key: "1639696180278/15MB.pdf",
      filename: "15MB.pdf",
      title: "CMS Form 179",
      contentType: "application/pdf",
      url: "https://uploads-states-of-withdrawal-attachments-116229642442.s3.us-east-1.amazonaws.com/protected/us-east-1%3Aafa582ca-4e4c-4d3b-be9b-d2dbc24c3d1a/1639696180278/15MB.pdf",
    },
    {
      s3Key: "1639696180278/adobe.pdf",
      filename: "adobe.pdf",
      title: "SPA Pages",
      contentType: "application/pdf",
      url: "https://uploads-states-of-withdrawal-attachments-116229642442.s3.us-east-1.amazonaws.com/protected/us-east-1%3Aafa582ca-4e4c-4d3b-be9b-d2dbc24c3d1a/1639696180278/adobe.pdf",
    },
    {
      s3Key: "1639696188378/adobe.pdf",
      filename: "adobe.pdf",
      title: "RAI Response",
      contentType: "application/pdf",
      url: "https://uploads-states-of-withdrawal-attachments-116229642442.s3.us-east-1.amazonaws.com/protected/us-east-1%3Aafa582ca-4e4c-4d3b-be9b-d2dbc24c3d1a/1639696188378/adobe.pdf",
    },
  ],
  sparai: [
    {
      componentType: "sparai",
      componentTimestamp: 1643218567141,
      submitterName: "Kristin Grue",
      componentId: "MI-13-1122",
    },
  ],
  GSI1sk: "MI-13-1122",
  additionalInformation: "This is just a test",
  submissionTimestamp: 1639696185888,
  GSI1pk: "OneMAC#spa",
  packageId: "MI-13-1122",
  submitterEmail: "statesubmitter@nightwatch.test",
  devComment: "Package added via seed data for application testing",
  sk: "spa",
  componentId: "MI-13-1122",
  pk: "MI-13-1122",
  submitterName: "StateSubmitter Nightwatch",
  submissionId: "4240e440-5ec5-11ec-b2ea-eb35c89f340d",
};

const ContextWrapper = ({ children }) => {
  return (
    <MemoryRouter>
      <AppContext.Provider
        value={{
          ...stateSubmitterInitialAuthState,
        }}
      >
        {children}
      </AppContext.Provider>
    </MemoryRouter>
  );
};

window.HTMLElement.prototype.scrollIntoView = jest.fn();

describe("Detail View Tests", () => {
  // let history;
  // beforeEach(() => {
  //   history = createMemoryHistory();
  //   history.push("/detail/spa/MI-12-1133");
  // });

  it("renders", async () => {
    let history;
    history = createMemoryHistory();
    history.push("/detail/spa/MI-12-1133");

    PackageApi.getDetail.mockResolvedValue(testDetail);

    render(<DetailView />, { wrapper: ContextWrapper });

    // wait for loading screen to disappear so package table displays
    await waitForElementToBeRemoved(() => screen.getByTestId(LOADER_TEST_ID));

    screen.getByText("MI-13-1122", { selector: "h1" });
  });
});
