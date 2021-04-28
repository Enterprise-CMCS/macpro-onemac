import React, { useCallback } from "react";
import { useLocation } from "react-router-dom";
import { territoryList } from "cmscommonlib";

import { useSignupCallback } from "../libs/hooksLib";
import { userTypes } from "../libs/userLib";
import { AlertBar } from "../components/AlertBar";
import { MultiSelectDropDown } from "../components/MultiSelectDropDown";

export function StateSignup() {
  const {
    state: { role = "" },
  } = useLocation();

  const expandStatesToAttributes = useCallback((values) => {
    return values.map(({ value }) => ({
      stateCode: value,
      status: "pending",
    }));
  }, []);

  const [loading, onSubmit] = useSignupCallback(role, expandStatesToAttributes);

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
