import React, { useCallback, useMemo, useReducer } from "react";
import { useHistory } from "react-router-dom";
import Select, { components } from "react-select";
import { Button, FormLabel } from "@cmsgov/design-system";
import cx from "classnames";
import { USER_ROLE } from "cmscommonlib";
//import groupData from "cmscommonlib/groupDivision.json";

import PageTitleBar from "../components/PageTitleBar";
import { ConfirmationDialog } from "../components/ConfirmationDialog";
import { useFlag, useSignupCallback } from "../libs/hooksLib";

export const groupData = [
  {
    id: 0,
    abbr: "DEHPG",
    name: "Disabled & Elderly Health Programs Group",
    divisions: [
      { id: 9, abbr: "DMCP", name: "Div of Managed Care Policy" },
      { id: 10, abbr: "DHPC", name: "Div of Health Homes, Pace & Cob/Tpl" },
      { id: 11, abbr: "DBC", name: "Div of Benefits & Coverage" },
      { id: 12, abbr: "DLTSS", name: "Div of Long Term Services & Supports" },
      { id: 13, abbr: "DCST", name: "Div of Community Systems Transformation" },
      { id: 14, abbr: "DP", name: "Div of Pharmacy" },
      { id: 15, name: "DEHPG - Office of Group Director" },
    ],
  },
  {
    id: 1,
    abbr: "CAHPG",
    name: "Children & Adults Health Programs Group",
    divisions: [
      { id: 16, abbr: "DSCP", name: "Div of State Coverage Programs" },
      { id: 17, abbr: "DQHO", name: "Div of Quality & Health Outcomes" },
      { id: 18, abbr: "DMEP", name: "Div of Medicaid Eligibility Policy" },
      { id: 19, abbr: "DEPO", name: "Div of Enrollment Policy & Operations" },
      { id: 20, abbr: "DTA", name: "Div of Tribal Affairs" },
      { id: 21, name: "CAHPG - Office of Group Director" },
    ],
  },
  {
    id: 3,
    abbr: "FMG",
    name: "Financial Management Group",
    divisions: [
      { id: 23, abbr: "DRR", name: "Div of Reimbursement Review" },
      { id: 24, abbr: "DRP", name: "Div of Reimbursement Policy" },
      { id: 25, abbr: "DFOE", name: "Div of Financial Operations East" },
      { id: 26, abbr: "DFOW", name: "Div of Financial Operations West" },
      { id: 27, abbr: "DFP", name: "Div of Financial Policy" },
      { id: 28, name: "FMG - Office of Group Director" },
    ],
  },
  {
    id: 4,
    abbr: "DSG",
    name: "Data & Systems Group",
    divisions: [
      { id: 29, abbr: "DSS", name: "Div of State Systems" },
      { id: 30, abbr: "DIS", name: "Div of Information Systems" },
      { id: 31, abbr: "DBES", name: "Div of Business Essential Systems" },
      { id: 32, abbr: "DBDA", name: "Div of Business & Data Analysis" },
      { id: 33, abbr: "DHM", name: "Div of Hitech & Mmis" },
      { id: 34, name: "DSG - Office of Group Director" },
    ],
  },
  {
    id: 5,
    abbr: "OSG",
    name: "Operations Services Group",
    divisions: [
      { id: 35, abbr: "DBA", name: "Div of Budget & Acquisitions" },
      { id: 36, abbr: "DOES", name: "Div of Operations & Executive Support" },
      { id: 37, abbr: "DHC", name: "Div of Human Capital" },
      { id: 38, abbr: "DCO", name: "Div of Communications & Outreach" },
      { id: 39, name: "OSG - Office of Group Director" },
    ],
  },
  {
    id: 6,
    abbr: "SDG",
    name: "State Demonstrations Group",
    divisions: [
      {
        id: 40,
        abbr: "DECD",
        name: "Div of Eligibility & Coverage Demonstrations",
      },
      { id: 41, abbr: "DSRD", name: "Div of System Reform Demonstrations" },
      {
        id: 42,
        abbr: "DDME",
        name: "Div of Demonstration Monitoring & Evaluation",
      },
      { id: 43, name: "SDG - Office of Group Director" },
    ],
  },
  {
    id: 7,
    abbr: "MCOG",
    name: "Medicaid & CHIP Operations Group",
    divisions: [
      { id: 44, abbr: "DPO", name: "Div of Program Operations" },
      { id: 45, abbr: "DMCO", name: "Div of Managed Care Operations" },
      { id: 46, abbr: "DHCBSO", name: "Div of Hcbs Operations & Oversight" },
      { id: 47, name: "MCOG - Office of Group Director" },
    ],
  },
  {
    id: 8,
    abbr: "OCD",
    name: "Office of Center Director",
    divisions: [{ id: 48, name: "OCD - Office of Group Director" }],
  },
];

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
            className={cx("ds-c-button--primary", {
              "ds-c-button--disabled": group === null || division === null,
            })}
            type="submit"
          >
            Submit
          </Button>
          <Button
            className="ds-c-button--transparent"
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
