import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
import { systemAdminInitialAuthState } from "../../libs/testDataAppContext";

import { AppContext } from "../../libs/contextLib";
import PackageApi from "../../utils/PackageApi";
import { LOADER_TEST_ID } from "../../components/LoadingScreen";
import { testEventItem } from "../../libs/testDataEvent";
import EventDetail from "./EventDetail";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
  useParams: () => {
    return {
      id: "AK-00-0885",
      changedDate: 165782488879,
    };
  },
}));

jest.mock("../../utils/PackageApi");

const ContextWrapper = ({ children }) => {
  return (
    <MemoryRouter>
      <AppContext.Provider
        value={{
          ...systemAdminInitialAuthState,
        }}
      >
        {children}
      </AppContext.Provider>
    </MemoryRouter>
  );
};

window.HTMLElement.prototype.scrollIntoView = jest.fn();

describe("Detail View Tests", () => {
  it("renders", async () => {
    let history;
    history = createMemoryHistory();
    history.push(
      `/detail/${testEventItem.STATE_PLAN.ID_NUMBER}/${testEventItem.STATE_PLAN.CHANGED_DATE}`
    );

    PackageApi.getTopicDetail.mockResolvedValue(testEventItem);

    render(<EventDetail />, { wrapper: ContextWrapper });

    // wait for loading screen to disappear so package table displays
    await waitForElementToBeRemoved(() => screen.getByTestId(LOADER_TEST_ID));
  });
});
