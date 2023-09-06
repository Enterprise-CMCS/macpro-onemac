import { Filters, IdType } from "react-table";
import React from "react";
import { COLUMN_ID } from "../containers/PackageList";
import closeIcon from "../assets/images/close.png";
import {
  FilterChipActionType,
  FilterChipValue,
  FilterType,
  useFilterChipContext,
} from "../containers/FilterChipContext";

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
  const { state, dispatch } = useFilterChipContext();
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
  const Chip = ({ label: value, column, type }: FilterChipValue) => {
    // Early return if no value present - Hooks must go above the return so that
    // they are not conditional per React's guidelines
    if (!value?.length && additiveFilters.includes(columnNames[column!!]))
      return null;
    // Re-adds a filter to subtractive filters such as status and type.
    const resetFilterValueState = () => {
      // TODO: Redo setFilter logic
      // const newValue = filters?.find((f) => f.id === column)?.value as string[];
      // newValue.push(value);
      // setFilter(column, newValue);
      dispatch({
        type: FilterChipActionType.REMOVE,
        payload: {
          label: value,
          column,
          type,
        },
      });
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
    return !value || !value.length ? (
      <></>
    ) : (
      <Template
        key={`${columnNames[column!!]}-${value}`}
        label={
          additiveFilters.includes(column!!)
            ? columnNames[column!!]
            : `Hidden ${columnNames[column!!]}`
        }
        value={
          type === FilterType.DATE ? prepareDates(value as string[]) : value
        }
        onClick={() => resetFilterValueState()}
      />
    );
  };
  return (
    <div className="filter-chip-tray-container">
      <span>{recordCount} records</span>
      <div className="filter-chip-tray">
        {state && state.map((chipValue) => <Chip {...chipValue} />)}
      </div>
    </div>
  );
};
