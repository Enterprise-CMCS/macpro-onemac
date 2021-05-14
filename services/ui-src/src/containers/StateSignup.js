import React, { useCallback } from "react";
import { useLocation } from "react-router-dom";
import { territoryList, USER_TYPE } from "cmscommonlib";

import { useSignupCallback } from "../libs/hooksLib";
import { userTypes } from "../libs/userLib";
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
        <MultiSelectDropDown
          errorMessage={
            role === USER_TYPE.STATE_USER
              ? "Please select at least one state."
              : "Please select one state."
          }
          header={userTypes[role] ?? role}
          loading={loading}
          onlyOne={role === USER_TYPE.STATE_ADMIN}
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
