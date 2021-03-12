import React, { useCallback } from "react";
import { useLocation } from "react-router-dom";

import { useAppContext } from "../libs/contextLib";
import { useSignupCallback } from "../libs/hooksLib";
import { userTypes } from "../libs/userTypes";
import { AlertBar } from "../components/AlertBar";
import { MultiSelectDropDown } from "../components/MultiSelectDropDown";
import { territoryList } from "../libs/territoryLib";

export function StateSignup() {
  const {
    state: { role = "" },
  } = useLocation();
  const { userProfile: { email } = {} } = useAppContext() ?? {};

  const expandStatesToAttributes = useCallback((values) => {
    return values.map(({ value }) => ({
      stateCode: value,
      history: [{ doneBy: email, status: "pending" }],
    }));
  }, [email]);

  const [loading, onSubmit] = useSignupCallback(role, expandStatesToAttributes);

  return (
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
  );
}
