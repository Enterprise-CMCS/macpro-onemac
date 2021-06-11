import React, { useCallback, useMemo, useReducer } from "react";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import { Button, FormLabel } from "@cmsgov/design-system";
import cx from "classnames";
import { ROLES, USER_STATUS } from "cmscommonlib";
import groupData from "cmscommonlib/groupDivision.json";

import PageTitleBar from "../components/PageTitleBar";
import { useSignupCallback } from "../libs/hooksLib";

const createAttribute = () => [{ status: USER_STATUS.PENDING }];
const customComponents = { IndicatorSeparator: () => null };

const getGroupOptions = () =>
  groupData.map(({ id, name }) => ({ label: name, value: id }));
const getDivisionOptions = (groupId) =>
  groupData
    .find(({ id }) => id === groupId)
    ?.divisions.map(({ id, name }) => ({ label: name, value: id })) ?? [];

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

  return null;
};

export const GroupAndDivision = () => {
  const history = useHistory();
  const [, onSubmitUser] = useSignupCallback(
    ROLES.CMS_REVIEWER,
    createAttribute
  );

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
  const onCancel = useCallback(() => {
    if (
      window.confirm(
        "If you leave this page, you will lose your progress. Are you sure you want to proceed?"
      )
    )
      history.goBack();
  }, [history]);
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
        onSubmit={onSubmit}
        role="form"
      >
        <h2>Select your Group</h2>
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
            className={cx("ds-c-button--primary", {
              "ds-c-button--disabled": group === null || division === null,
            })}
            type="submit"
          >
            Submit
          </Button>
          <Button
            className="ds-c-button--transparent"
            onClick={onCancel}
            type="button"
          >
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
};
