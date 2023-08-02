import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Router, MemoryRouter } from "react-router-dom";
import { systemAdminInitialAuthState } from "../../libs/testDataAppContext";

import { ONEMAC_ROUTES } from "cmscommonlib";
import ChipSpaWithdraw from "../chip-spa/ChipSpaWithdraw";
import { AppContext } from "../../libs/contextLib";
import EnableRaiWithdrawForm, {
  enableRaiWithdrawFormInfo,
} from "./EnableRaiWithdrawForm";

window.HTMLElement.prototype.scrollIntoView = jest.fn();
window.scrollTo = jest.fn();

describe("Enable Rai Withdraw Form", () => {
  let history;

  const componentId = "123";

  beforeEach(() => {
    history = createMemoryHistory();
    history.push(ONEMAC_ROUTES.ENABLE_RAI_WITHDRAW, {
      componentId: componentId,
      parentType: "chipspa",
    });
  });

  it("updates landingPage in enableRaiWithdrawFormInfo based on the location state", () => {
    render(
      <AppContext.Provider
        value={{
          ...systemAdminInitialAuthState,
        }}
      >
        <Router history={history}>
          <EnableRaiWithdrawForm />
        </Router>
      </AppContext.Provider>
    );

    const expectedLandingPage = `${ONEMAC_ROUTES.CHIP_SPA_DETAIL}/${componentId}`;
    expect(enableRaiWithdrawFormInfo.landingPage).toEqual(expectedLandingPage);
  });
});
