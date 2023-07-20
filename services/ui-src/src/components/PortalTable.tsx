import React, { ReactNode, useCallback, useEffect } from "react";
import {
  HeaderGroup,
  TableInstance,
  TableOptions,
  UseFiltersInstanceProps,
  UseFiltersState,
  UseGlobalFiltersInstanceProps,
  UseSortByColumnProps,
  UseSortByInstanceProps,
  Row,
  useFilters,
  useGlobalFilter,
  useSortBy,
  useTable,
  Filters,
  IdType,
} from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faSort,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import { constant } from "lodash";
import closeIcon from "../assets/images/close.png";

import {
  SearchAndFilter,
  SearchFilterProps,
  customFilterTypes,
} from "./SearchAndFilter";

import {
  LOCAL_STORAGE_TABLE_FILTERS_SPA,
  LOCAL_STORAGE_TABLE_FILTERS_WAIVER,
} from "../utils/StorageKeys";
import { COLUMN_ID } from "../containers/PackageList";
import { useAppContext } from "../libs/contextLib";
export { CustomFilterTypes, CustomFilterUi } from "./SearchAndFilter";

export type TableProps<V extends {}> = {
  internalName: "spa" | "waiver";
  className?: string;
  searchBarTitle?: ReactNode;
  withSearchBar?: boolean;
  onVisibleDataChange: (rows: Row<V>[]) => void;
} & Pick<SearchFilterProps<V>, "pageContentRef"> &
  TableOptions<V>;

const defaultColumn = {
  Filter: constant(null),
  disableFilters: true,
  disableGlobalFilter: true,
};

// Convenient type for casting JS objects to string-indexed accessible TS object
type StringIndexedObject = { [key: string]: string[] };
// String-accessible object with types for each "internalName" value (spa, waiver)
const commonTypes: StringIndexedObject = {
  waiver: [
    "1915(b) Initial Waiver",
    "1915(b) Waiver Amendment",
    "1915(b) Waiver Renewal",
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
const CMS_STATUSES: StringIndexedObject = {
  waiver: [...commonCMSStatuses, "Waiver Terminated"],
  spa: commonCMSStatuses,
};
const STATE_STATUSES: StringIndexedObject = {
  waiver: [...commonStateStatuses, "Waiver Terminated"],
  spa: commonStateStatuses,
};

const FilterChipTray = ({
  internalName,
  filters,
  setFilter,
}: {
  internalName: string;
  filters: Filters<any>;
  setFilter: (columnId: IdType<any>, updater: any) => void;
}) => {
  const Chip = ({ id, value }: { id: string; value: any[] }) => {
    // @ts-ignore
    // TODO: "userRole" not recognized as part of AppContext despite being defined
    const { userRole } = useAppContext();
    // Returns the proper array of statuses for each tab and for each user
    const getOriginalStatuses = useCallback(() => {
      if (userRole.includes("state")) {
        // Returns for statesubmitter, statesystemadmin
        return (STATE_STATUSES as StringIndexedObject)[internalName];
      } else {
        // Returns for defaulcmsuser, cmsreviewer, cmsroleapprover, stytemadmin,
        // and helpdesk
        return (CMS_STATUSES as StringIndexedObject)[internalName];
      }
    }, [userRole, internalName]);
    // Early return if no value present - Hooks must go above the return so that
    // they are not conditional per React's guidelines
    if (!value || !value.length) return null;
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
    // Filters that do not have an "all-on" default state. (Ex: time-based and
    // State-based filters)
    const additiveFilters = [
      columnNames[COLUMN_ID.TERRITORY],
      columnNames[COLUMN_ID.SUBMISSION_TIMESTAMP],
      columnNames[COLUMN_ID.LATEST_RAI_TIMESTAMP],
    ];
    // Re-adds a filter to subtractive filters such as status and type.
    const resetFilter = (value: any) => {
      const newValue = setFilter(id, value);
    };
    // Clears all options from additive filters such as times and states.
    const clearFilter = () => {
      setFilter(id, []);
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
        {additiveFilters.includes(columnNames[id])
          ? value.map((v, idx) => (
              <Template
                key={`${columnNames[id]}-${idx}`}
                label={columnNames[id]}
                value={v}
                onClick={() => clearFilter()}
              />
            ))
          : subtractiveFilterDefaults[id]
              ?.filter((f) => !value?.includes(f))
              .map((v, idx) => (
                <Template
                  key={`${columnNames[id]}-${idx}`}
                  label={`Hidden ${columnNames[id]}`}
                  value={v}
                  onClick={() => resetFilter(v)}
                />
              ))}
      </>
    );
  };
  return (
    <div className="filter-chip-tray">
      {filters.map((filter) => {
        return (
          filter && (
            <Chip
              key={`${filter.id}-${filter.value}`}
              id={filter.id}
              value={filter.value}
            />
          )
        );
      })}
    </div>
  );
};

export default function PortalTable<V extends {} = {}>({
  internalName,
  pageContentRef,
  searchBarTitle,
  withSearchBar,
  onVisibleDataChange,
  ...props
}: TableProps<V>) {
  const {
    columns,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    preFilteredRows,
    preGlobalFilteredRows,
    rows,
    state,
    setAllFilters,
    setFilter,
    setGlobalFilter,
    prepareRow,
  } = useTable<V>(
    {
      // don't revert to original sort state when `data` prop changes
      autoResetSortBy: false,
      // once a column has been sorted, only toggle between sort orders - do
      // not go to original state
      disableSortRemove: true,
      // @ts-ignore not passing enough default props per column for it to recognize
      defaultColumn,
      filterTypes: customFilterTypes,
      ...props,
    },
    useGlobalFilter,
    useFilters,
    useSortBy
  ) as TableInstance<V> &
    UseFiltersState<V> &
    UseFiltersInstanceProps<V> &
    UseGlobalFiltersInstanceProps<V> &
    UseSortByInstanceProps<V>;

  const filters = (state as UseFiltersState<any>).filters;

  // When filters change, update object in localStorage
  useEffect(() => {
    const key =
      internalName === "spa"
        ? LOCAL_STORAGE_TABLE_FILTERS_SPA
        : LOCAL_STORAGE_TABLE_FILTERS_WAIVER;
    /* We write to both session AND local stores so that on reload, the browser
    can see whether a single tab already has set its own filters. If so, it'll
    load them, if not, it'll load from the most recently saved filters in the
    local store! */
    sessionStorage.setItem(key, JSON.stringify(filters));
    localStorage.setItem(key, JSON.stringify(filters));
  }, [filters, internalName]);

  useEffect(() => {
    if (onVisibleDataChange) {
      onVisibleDataChange(rows);
    }
  }, [rows, onVisibleDataChange]);

  return (
    <>
      {withSearchBar && (
        <>
          <SearchAndFilter
            internalName={internalName}
            allRows={preGlobalFilteredRows}
            // @ts-ignore FIXME remove when react-table types are improved
            columnsInternal={columns}
            onSearch={setGlobalFilter}
            pageContentRef={pageContentRef}
            searchBarTitle={searchBarTitle}
            setAllFilters={setAllFilters}
          />
          <div className="filter-chip-tray-container">
            <FilterChipTray
              internalName={internalName}
              filters={filters}
              setFilter={setFilter}
            />
          </div>
        </>
      )}
      <div className="table-wrapper">
        <table className={props.className} {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {(
                  headerGroup.headers as (HeaderGroup<V> &
                    UseSortByColumnProps<V>)[]
                ).map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    id={`${column.id}ColHeader`}
                  >
                    {column.render("Header")}
                    <span className="sort-icons-table">
                      {column.isSorted ? (
                        <FontAwesomeIcon
                          icon={column.isSortedDesc ? faSortDown : faSortUp}
                        />
                      ) : (
                        column.canSort && <FontAwesomeIcon icon={faSort} />
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {rows.length > 0 && (
            <tbody {...getTableBodyProps()}>
              {(rows as Row<V>[]).map((row, rowIndex) => {
                // @ts-ignore FIXME remove when react-table types are improved
                prepareRow(row, rowIndex);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell, index) => {
                      return (
                        <td
                          id={
                            headerGroups[0].headers[index].id + "-" + rowIndex
                          }
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
        {rows.length === 0 &&
          (preFilteredRows.length > 0 || preGlobalFilteredRows.length > 0) && (
            <div className="no-results" role="status">
              <FontAwesomeIcon
                className="no-results-background"
                icon={faSearch}
              />
              <div className="no-results-message">
                <div className="no-results-header">No Results Found</div>
                <p>
                  Adjust your search and filter to find what you are looking
                  for.
                </p>
              </div>
            </div>
          )}
      </div>
    </>
  );
}
