import React from "react";
import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { systemAdminInitialAuthState } from "../../libs/testDataAppContext";

import { ONEMAC_ROUTES } from "cmscommonlib";
import { AppContext } from "../../libs/contextLib";
import DisableRaiWithdrawForm, {
  disableRaiWithdrawFormInfo,
} from "./DisableRaiWithdrawForm";

window.HTMLElement.prototype.scrollIntoView = jest.fn();
window.scrollTo = jest.fn();

describe("Disable Rai Withdraw Form", () => {
  let history;

  const componentId = "123";

  beforeEach(() => {
    history = createMemoryHistory();
    history.push(ONEMAC_ROUTES.ENABLE_RAI_WITHDRAW, {
      componentId: componentId,
      parentType: "chipspa",
    });
  });

  it("updates landingPage in disableRaiWithdrawFormInfo based on the location state", () => {
    render(
      <AppContext.Provider
        value={{
          ...systemAdminInitialAuthState,
        }}
      >
        <Router history={history}>
          <DisableRaiWithdrawForm />
        </Router>
      </AppContext.Provider>
    );

    const expectedLandingPage = `${ONEMAC_ROUTES.CHIP_SPA_DETAIL}/${componentId}`;
    expect(disableRaiWithdrawFormInfo.landingPage).toEqual(expectedLandingPage);
  });
});
