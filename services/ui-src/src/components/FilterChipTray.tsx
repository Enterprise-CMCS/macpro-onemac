import { Filters, IdType } from "react-table";
import { useAppContext } from "../libs/contextLib";
import React, { useCallback } from "react";
import { COLUMN_ID } from "../containers/PackageList";
import closeIcon from "../assets/images/close.png";

// Convenient type for casting JS objects to string-indexed accessible TS object
type StringIndexedObject = { [key: string]: string[] };
// String-accessible object with types for each "internalName" value (spa, waiver)
const commonTypes: StringIndexedObject = {
  waiver: [
    "1915(b) Initial Waiver",
    "1915(b) Temporary Extension",
    "1915(b) Waiver Amendment",
    "1915(b) Waiver Renewal",
    "1915(c) Temporary Extension",
    "1915(c) Appendix K Amendment",
    "Temporary Extension",
  ],
  spa: ["Medicaid SPA", "CHIP SPA"],
};
/* TODO: This could be better handled by moving app-api/libs/status-lib.js to
 *   the cmscommonlib, however that touches code outside the purview of the task
 *   at hand. It could be handled as a tech debt item. */
// Statuses shared by CMS and States
const commonStatuses = ["Approved", "Disapproved", "Package Withdrawn"];
// Statuses exclusive to CMS
const commonCMSStatuses = [
  ...commonStatuses,
  "Pending",
  "Pending - RAI",
  "Pending - Approval",
  "Pending - Concurrence",
  "Submitted - Intake Needed",
];
// Statuses exclusive to States
const commonStateStatuses = [
  ...commonStatuses,
  "RAI Issued",
  "Submitted",
  "Under Review",
  "Withdrawal Requested",
];
/* These are used as the "default filter state" for the two main user types,
 * CMS and State. These are used as a comparison array for the applied filters
 * to determine which filters have been unchecked since react-table only tells
 * us which filters remain checked.
 *
 * You will have to add new statuses here for the filter chips to show as a
 * chip when a status is deselected. */
const CMS_DEFAULTS: StringIndexedObject = {
  waiver: [...commonCMSStatuses, "Waiver Terminated"],
  spa: commonCMSStatuses,
};
const STATE_DEFAULTS: StringIndexedObject = {
  waiver: [...commonStateStatuses, "Waiver Terminated"],
  spa: commonStateStatuses,
};

export const FilterChipTray = ({
  recordCount,
  internalName,
  filters,
  setFilter,
}: {
  recordCount: number;
  internalName: string;
  filters: Filters<any>;
  setFilter: (columnId: IdType<any>, updater: any) => void;
}) => {
  // @ts-ignore
  // TODO: "userRole" not recognized as part of AppContext despite being defined
  const { userRole } = useAppContext();
  // Returns the proper array of statuses for each tab and for each user
  const getOriginalStatuses = useCallback(() => {
    if (userRole.includes("state")) {
      // Returns for statesubmitter, statesystemadmin
      return (STATE_DEFAULTS as StringIndexedObject)[internalName];
    } else {
      // Returns for defaulcmsuser, cmsreviewer, cmsroleapprover, stytemadmin,
      // and helpdesk
      return (CMS_DEFAULTS as StringIndexedObject)[internalName];
    }
  }, [userRole, internalName]);
  // Filters that do not have an "all-on" default state. (Ex: time-based and
  // State-based filters)
  const additiveFilters = [
    COLUMN_ID.TERRITORY,
    COLUMN_ID.SUBMISSION_TIMESTAMP,
    COLUMN_ID.LATEST_RAI_TIMESTAMP,
  ];
  // Easy map for column ids to display names
  const columnNames: { [index: string]: string } = {
    [COLUMN_ID.TERRITORY]: "State",
    [COLUMN_ID.TYPE]: "Type",
    [COLUMN_ID.STATUS]: "Status",
    [COLUMN_ID.SUBMISSION_TIMESTAMP]: "Initial Submission",
    [COLUMN_ID.LATEST_RAI_TIMESTAMP]: "Formal RAI Response",
  };
  // String-accessible object containing the original state for subtractive
  // filters. (Subtractive referring to how those are all-on at the start, and
  // only removed one-by-one)
  const subtractiveFilterDefaults: { [index: string]: any[] } = {
    [COLUMN_ID.TYPE]: commonTypes[internalName],
    [COLUMN_ID.STATUS]: getOriginalStatuses(),
  };
  const Chip = ({ id, value }: { id: string; value: any[] }) => {
    // Early return if no value present - Hooks must go above the return so that
    // they are not conditional per React's guidelines
    if (!value?.length && additiveFilters.includes(columnNames[id]))
      return null;
    // Re-adds a filter to subtractive filters such as status and type.
    const resetFilterValueState = (value: any) => {
      const newValue = filters?.find((f) => f.id === id)?.value as string[];
      newValue.push(value);
      setFilter(id, newValue);
    };
    const prepareDates = (dateArray: string[]) => {
      const adjustedValues = dateArray.map((date) =>
        new Date(date).toDateString()
      );
      return `${adjustedValues[0]} to ${adjustedValues[1]}`;
    };
    // Consolidated JSX for the <Chip/> visual component
    const Template = ({
      label,
      value,
      onClick,
    }: {
      label: string;
      value: any;
      onClick: (v: any) => void;
    }) => (
      <div className="filter-chip-container">
        <span className="filter-chip-text ds-u-font-size--sm">
          {`${label}: ${value}`}
        </span>
        <button className="filter-chip-close" onClick={onClick}>
          <img alt="close button" src={closeIcon} />
        </button>
      </div>
    );
    return (
      <>
        {additiveFilters.includes(id) ? (
          id === COLUMN_ID.TERRITORY ? (
            value.map((v, idx) => (
              <Template
                key={`${columnNames[id]}-${idx}`}
                label={columnNames[id]}
                value={v}
                onClick={() =>
                  setFilter(
                    id,
                    value.filter((val) => val !== v)
                  )
                }
              />
            ))
          ) : (
            <Template
              key={`${columnNames[id]}`}
              label={columnNames[id]}
              value={prepareDates(value)}
              onClick={() => setFilter(id, [])}
            />
          )
        ) : (
          subtractiveFilterDefaults[id]
            ?.filter((f) => !value?.includes(f))
            .map((v, idx) => (
              <Template
                key={`${columnNames[id]}-${idx}`}
                label={`Hidden ${columnNames[id]}`}
                value={v}
                onClick={() => resetFilterValueState(v)}
              />
            ))
        )}
      </>
    );
  };
  return (
    <div className="filter-chip-tray-container">
      <span>{recordCount} records</span>
      <div className="filter-chip-tray">
        {filters.map((filter) => {
          return filter.value.length ? (
            <Chip
              key={`${filter.id}-${filter.value}`}
              id={filter.id}
              value={filter.value}
            />
          ) : null;
        })}
      </div>
    </div>
  );
};
