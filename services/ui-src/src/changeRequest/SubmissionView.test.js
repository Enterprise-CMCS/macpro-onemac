import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";

import { createMemoryHistory } from "history";
import { Router, Route } from "react-router-dom";
import ChangeRequestDataApi from "../utils/ChangeRequestDataApi";

import SubmissionView from "./SubmissionView";

jest.mock("../utils/ChangeRequestDataApi");

describe("SubmissionView", () => {
  let history;

  beforeEach(() => {
    history = createMemoryHistory();
  });

  it("Record displayed for use on the form", async () => {
    const objectMock = {
      waiverAuthority: "1915(b)",
      uploads: [],
      transmittalNumber: "MD-0004.R00.00",
    };
    ChangeRequestDataApi.get.mockReturnValueOnce(objectMock);
    history.push("/ChangeRequestMock/mockId/mockUserID");

    render(
      <Router history={history}>
        <Route path="/ChangeRequestMock/:id/:userId">
          <SubmissionView changeRequestType="waiver" />
        </Route>
      </Router>
    );
    await waitForElementToBeRemoved(() => screen.queryByRole("progressbar"));
    const waiverNumberLabel = screen.getByText(/waiver number/i);
    expect(waiverNumberLabel).toBeVisible();
    expect(waiverNumberLabel.parentNode).toHaveTextContent(
      objectMock.transmittalNumber
    );
  });
});
