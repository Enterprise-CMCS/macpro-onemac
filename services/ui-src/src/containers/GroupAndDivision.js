import React, { useCallback, useMemo, useReducer } from "react";
import { useHistory } from "react-router-dom";
import Select, { components } from "react-select";
import { Button, FormLabel } from "@cmsgov/design-system";
import cx from "classnames";
import { USER_ROLE } from "cmscommonlib";
import groupData from "cmscommonlib/groupDivision.json";

import PageTitleBar from "../components/PageTitleBar";
import { ConfirmationDialog } from "../components/ConfirmationDialog";
import { useFlag, useSignupCallback } from "../libs/hooksLib";

const createAttribute = () => undefined;
const customComponents = {
  IndicatorSeparator: () => null,
  Option: (props) => (
    <components.Option {...props}>
      <b className="group-division-option-abbr">{props.data.abbr ?? "--"}</b>{" "}
      <span>{props.data.name}</span>
    </components.Option>
  ),
  SingleValue: (props) => (
    <components.SingleValue {...props}>
      <b className="group-division-option-abbr">{props.data.abbr ?? "--"}</b>{" "}
      <span>{props.data.name}</span>
    </components.SingleValue>
  ),
};

const compareOpts = ({ abbr: abbrA }, { abbr: abbrB }) => {
  if (abbrA) {
    if (abbrB) return abbrA.localeCompare(abbrB);
    return -1;
  } else if (abbrB) return 1;
  return 0;
};
const createOpt = ({ id, abbr, name }) => ({
  label: `${abbr} ${name}`,
  name,
  abbr,
  value: id,
});
const getGroupOptions = () => groupData.sort(compareOpts).map(createOpt);
const getDivisionOptions = (groupId) =>
  groupData
    .find(({ id }) => id === groupId)
    ?.divisions.sort(compareOpts)
    .map(createOpt) ?? [];

const useSelectedOption = (list, current) =>
  useMemo(
    () =>
      current === null ? null : list?.find(({ value }) => value === current),
    [list, current]
  );

const groupDivisionReducer = (state, [field, value]) => {
  if (field === "group" && value !== state.group) {
    return { ...state, group: value, division: null };
  } else if (field === "division") {
    return { ...state, division: value };
  }

  return state;
};

export const GroupAndDivision = () => {
  const history = useHistory();
  const [, onSubmitUser] = useSignupCallback(
    USER_ROLE.CMS_REVIEWER,
    createAttribute
  );
  const [
    showCancelConfirmation,
    closeCancelConfirmation,
    openCancelConfirmation,
  ] = useFlag();

  const [{ group, division }, dispatch] = useReducer(groupDivisionReducer, {
    group: null,
    division: null,
  });
  const groupOptions = useMemo(() => getGroupOptions(), []);
  const groupValue = useSelectedOption(groupOptions, group);
  const divisionOptions = useMemo(() => getDivisionOptions(group), [group]);
  const divisionValue = useSelectedOption(divisionOptions, division);
  const onGroupChange = useCallback(
    ({ value }) => dispatch(["group", value]),
    []
  );
  const onDivisionChange = useCallback(
    ({ value } = {}) => dispatch(["division", value]),
    []
  );
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (group === null || division === null) return;
      onSubmitUser(null, { group, division });
    },
    [group, division, onSubmitUser]
  );
  return (
    <>
      <PageTitleBar heading="Registration: CMS Reviewer Access" />
      <form
        className="group-division-selection"
        name="group and division selection"
        onSubmit={onSubmit}
      >
        <h2>Select a Group and Division</h2>
        <FormLabel fieldId="group-select">Group</FormLabel>
        <Select
          components={customComponents}
          inputId="group-select"
          name="group"
          onChange={onGroupChange}
          options={groupOptions}
          value={groupValue}
        />
        {group !== null && (
          <>
            <FormLabel fieldId="division-select">Division</FormLabel>
            <Select
              components={customComponents}
              inputId="division-select"
              name="division"
              onChange={onDivisionChange}
              options={divisionOptions}
              value={divisionValue}
            />
          </>
        )}
        <div className="submit-buttons">
          <Button
            className={cx("ds-c-button--solid", {
              "ds-c-button--disabled": group === null || division === null,
            })}
            type="submit"
          >
            Submit
          </Button>
          <Button
            className="ds-c-button--ghost"
            onClick={openCancelConfirmation}
            type="button"
          >
            Cancel
          </Button>
        </div>
      </form>
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
};
