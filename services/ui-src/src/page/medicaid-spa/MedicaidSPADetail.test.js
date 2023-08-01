import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
import { stateSubmitterInitialAuthState } from "../../libs/testDataAppContext";

import { AppContext } from "../../libs/contextLib";
import MedicaidSPADetail from "./MedicaidSPADetail";
import PackageApi from "../../utils/PackageApi";
import { LOADER_TEST_ID } from "../../components/LoadingScreen";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
  useParams: () => {
    return {
      componentType: "medicaidspa",
      componentTimestamp: 16746532223,
      packageId: "MI-13-1122",
    };
  },
}));

jest.mock("../../utils/PackageApi");

const testDetail = {
  clockEndTimestamp: 1647286706000,
  componentType: "medicaidspa",
  currentStatus: "RAI Issued",
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
  GSI1sk: "MI-13-1122",
  additionalInformation: "This is just a test",
  submissionTimestamp: 1639696185888,
  GSI1pk: "OneMAC#spa",
  packageId: "MI-13-1122",
  submitterEmail: "statesubmitter@nightwatch.test",
  devComment: "Package added via seed data for application testing",
  sk: "medicaidspa",
  componentId: "MI-13-1122",
  pk: "MI-13-1122",
  raiResponses: [
    {
      componentType: "medicaidsparai",
      additionalInformation: "test",
      componentId: "MI-93-2234",
      attachments: [
        {
          s3Key: "1646322298590/attach1.txt",
          filename: "attach1.txt",
          title: "RAI Response",
          contentType: "text/plain",
          url: "https://uploads-dev-attachmentsbucket-746ihmluia7u.s3.amazonaws.com/protected/us-east-1%3A3211a6ff-043f-436b-8313-1b314582b2a5/1646322298590/attach1.txt?AWSAccessKeyId=ASIARWD6TTDFB6PKMKH4&Expires=1646329696&Signature=vd0rbPamuq4YYeUeFju3zE6uvzg%3D&x-amz-security-token=FwoGZXIvYXdzEPH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDJRR7%2F%2BuYhvoOvrtuyKoAUL%2BZq%2BaDKiYH5sULPpoAgwsbbC9DUvby9D4Hc24ffOUqcH1ukTBJN7fNrFumT1pUBxUj4z%2BUqqKFytQgWarrpY5KdupGb4CrUlV53axdq4gGvDBv8UbwIG7FxQPpfBz8ruDtiQshquOGDO0ws8nvy1mS8wdThw22KekKOmj1YjXx7sZrFYKw0WstEj6zMOzPUp3OUVE4VDU4pNep5DpKOf42uu8jRruWiiDwoORBjItgZ6G7VJEFxiZLlRJWv81oD0iNmEraFxIbvc7aG%2B6Z9%2BaSLAdxBvFs58RKUOq",
        },
      ],
      currentStatus: "Submitted",
      parentId: "MI-93-2234",
      parentType: "medicaidspa",
      submissionTimestamp: 1646322299324,
      submissionId: "e1cf36e0-9b08-11ec-aa60-d14854d75057",
      submitterId: "offlineContext_cognitoIdentityId",
      sk: "sparai#1646322299324",
      pk: "MI-93-2234",
      submitterName: "Angie Active",
      submitterEmail: "statesubmitteractive@cms.hhs.local",
    },
  ],
  submitterName: "StateSubmitter Nightwatch",
  approvedEffectiveDate: "2022-01-02",
  finalDispositionDate: "2022-01-03",
  actions: ["Withdraw Package", "Respond to RAI"],
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
    history.push("/detail/medicaid-spa/MI-12-1133");

    PackageApi.getDetail.mockResolvedValue(testDetail);

    render(<MedicaidSPADetail />, { wrapper: ContextWrapper });

    // wait for loading screen to disappear so package table displays
    await waitForElementToBeRemoved(() => screen.getByTestId(LOADER_TEST_ID));

    screen.getByText("MI-13-1122", { selector: "h1" });
  });

  it("shows withdraw modal", async () => {
    let history;
    history = createMemoryHistory();
    history.push("/detail/medicaid-spa/MI-12-1133");

    PackageApi.getDetail.mockResolvedValue(testDetail);

    render(<MedicaidSPADetail />, { wrapper: ContextWrapper });

    // wait for loading screen to disappear so package table displays
    await waitForElementToBeRemoved(() => screen.getByTestId(LOADER_TEST_ID));

    fireEvent.click(screen.getByText("Withdraw Package"));
  });

  it("allows respond to RAI action", async () => {
    let history;
    history = createMemoryHistory();
    history.push("/detail/medicaid-spa/MI-12-1133");

    PackageApi.getDetail.mockResolvedValue(testDetail);

    render(<MedicaidSPADetail />, { wrapper: ContextWrapper });

    // wait for loading screen to disappear so package table displays
    await waitForElementToBeRemoved(() => screen.getByTestId(LOADER_TEST_ID));

    fireEvent.click(screen.getByText("Respond to RAI"));
  });

  it("allows withdraw RAI action", async () => {
    let history;
    history = createMemoryHistory();
    history.push("/detail/medicaid-spa/MI-12-1133");

    PackageApi.getDetail.mockResolvedValue({
      ...testDetail,
      currentStatus: "RAI Response Withdraw Enabled",
      actions: ["Withdraw Formal RAI Response"],
    });

    render(<MedicaidSPADetail />, { wrapper: ContextWrapper });

    // wait for loading screen to disappear so package table displays
    await waitForElementToBeRemoved(() => screen.getByTestId(LOADER_TEST_ID));

    fireEvent.click(screen.getByText("Withdraw Formal RAI Response"));
  });
});
