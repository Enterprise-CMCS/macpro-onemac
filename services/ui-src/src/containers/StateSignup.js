import React, { useCallback, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { territoryList } from "cmscommonlib";

import { useAppContext } from "../libs/contextLib";
import { useSignupCallback } from "../libs/hooksLib";
import { userTypes } from "../libs/userLib";
import { AlertBar } from "../components/AlertBar";
import { MultiSelectDropDown } from "../components/MultiSelectDropDown";

export function StateSignup() {
  const {
    state,
    state: { role = "" },
  } = useLocation();
  const history = useHistory();
  const { userProfile: { email } = {} } = useAppContext() ?? {};

  const expandStatesToAttributes = useCallback(
    (values) => {
      return values.map(({ value }) => ({
        stateCode: value,
        history: [{ doneBy: email, status: "pending" }],
      }));
    },
    [email]
  );

  const [loading, onSubmit] = useSignupCallback(role, expandStatesToAttributes);

  useEffect(() => {
    if (!role) history.replace("/signup", state);
  }, [history, role, state]);

  return (
    <>
      <div className="page-title-bar" id="title_bar">
        <h2>Registration: State Access</h2>
      </div>
      <div className="signup-container state-signup">
        <AlertBar />
        <MultiSelectDropDown
          errorMessage="Please select at least one state."
          header={userTypes[role] ?? role}
          loading={loading}
          options={territoryList}
          required
          subheader="Select your State Access"
          submitFn={onSubmit}
          title="User Role:"
          type="selectstate"
        />
      </div>
    </>
  );
}
