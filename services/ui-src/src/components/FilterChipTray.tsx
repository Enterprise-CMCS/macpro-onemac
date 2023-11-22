import { Filters, IdType } from "react-table";
import React from "react";
import { COLUMN_ID } from "../containers/PackageList";
import closeIcon from "../assets/images/close.png";
import {
  FilterChipActionType,
  FilterChipValue,
  FilterType,
  TerritoryFilter,
  useFilterChipContext,
} from "../containers/FilterChipContext";

export const FilterChipTray = ({
  recordCount,
  filters,
  setFilter,
}: {
  recordCount: number;
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
    [COLUMN_ID.FINAL_DISPOSITION_TIMESTAMP]: "Final Disposition",
    [COLUMN_ID.LATEST_RAI_TIMESTAMP]: "Formal RAI Response",
  };
  const Chip = ({ label: value, column, type }: FilterChipValue) => {
    // Early return if no value present - Hooks must go above the return so that
    // they are not conditional per React's guidelines
    if (!value?.length && additiveFilters.includes(columnNames[column!!]))
      return null;
    // Re-adds a filter to subtractive filters such as status and type.
    const resetFilterValueState = (value: any, type: FilterType) => {
      // Grab current filter's value attribute
      let filterValue = filters?.find((f) => f.id === column)?.value;
      switch (type) {
        case FilterType.DATE:
          // Clear the date strings array by just giving it an empty one
          filterValue = [];
          break;
        case FilterType.CHECKBOX:
          // Push new value to the filter's value attribute
          filterValue.push(value);
          break;
        case FilterType.MULTISELECT:
          // Remove the deselected state value from the filter value array
          filterValue = (filterValue as string[]).filter((f) => f !== value);
          break;
      }
      // Set the filter with this new value
      setFilter(column!!, filterValue);
      // Remove chip
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
    const prepareValue = (
      value: string | string[] | TerritoryFilter[],
      type: FilterType
    ) => {
      if (type === FilterType.DATE) return prepareDates(value as string[]);
      return value;
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
    return value && value.length ? (
      <Template
        key={`${columnNames[column!!]}-${value}`}
        label={
          additiveFilters.includes(column!!)
            ? columnNames[column!!]
            : `Hidden ${columnNames[column!!]}`
        }
        value={prepareValue(value, type!!)}
        onClick={() => resetFilterValueState(value, type!!)}
      />
    ) : null;
  };
  return (
    <div className="filter-chip-tray-container">
      <span>{recordCount} records</span>
      <div className="filter-chip-tray">
        {state &&
          state.map((chipValue, idx) => <Chip key={idx} {...chipValue} />)}
      </div>
    </div>
  );
};
