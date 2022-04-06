import React, { useCallback } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { roleLabels, territoryList, USER_ROLE } from "cmscommonlib";

import { useFlag, useSignupCallback } from "../libs/hooksLib";
import { ConfirmationDialog } from "../components/ConfirmationDialog";
import { MultiSelectDropDown } from "../components/MultiSelectDropDown";
import PageTitleBar from "../components/PageTitleBar";

export function StateSignup() {
  const history = useHistory();
  const {
    state: { role = "" },
  } = useLocation();

  const expandStatesToAttributes = useCallback(
    (values) =>
      (Array.isArray(values) ? values : [values]).map(({ value }) => value),
    []
  );

  const [loading, onSubmit] = useSignupCallback(role, expandStatesToAttributes);
  const [
    showCancelConfirmation,
    closeCancelConfirmation,
    openCancelConfirmation,
  ] = useFlag();

  return (
    <>
      <PageTitleBar heading="Registration: State Access" enableBackNav />
      <div className="state-signup-page">
        <div className="state-signup-container">
          <div className="signup-headings">
            <p className="role-header">User Role:</p>
            <p className="user-role">{roleLabels[role] ?? role}</p>
          </div>
          <MultiSelectDropDown
            ariaLabel={`Select ${
              role === USER_ROLE.STATE_SUBMITTER
                ? "one or more states"
                : "a state"
            } to request access. Use down key to enter the menu. You can also begin typing a territory name to search.`}
            cancelFn={openCancelConfirmation}
            errorMessage={
              role === USER_ROLE.STATE_SUBMITTER
                ? "Please select at least one state."
                : "Please select a state."
            }
            loading={loading}
            onlyOne={role === USER_ROLE.STATE_SYSTEM_ADMIN}
            options={territoryList}
            placeholder="Select state here"
            required
            submitFn={onSubmit}
            title="Select your State Access"
            type="selectstate"
          />
        </div>
      </div>
      {showCancelConfirmation && (
        <ConfirmationDialog
          acceptText="Confirm"
          cancelText="Stay on Page"
          heading="Cancel role request?"
          onAccept={() => history.goBack()}
          onCancel={closeCancelConfirmation}
        >
          Changes you made will not be saved.
        </ConfirmationDialog>
      )}
    </>
  );
}
