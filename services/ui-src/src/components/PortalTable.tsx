import React, { ReactNode, useEffect } from "react";
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
  FilterValue,
} from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faSort,
  faSortDown,
  faSortUp,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";
import { constant } from "lodash";

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

const FilterChipTray = ({ filters }: { filters: Filters<any> }) => {
  const Chip = ({ id, value }: { id: string; value: any[] }) => {
    // This is used by FilterChipTray to map a columns ID, provided by the Filter
    // to a user-friendly name to render.
    const MAPPED_COLUMN_ID_NAME: { [index: string]: string } = {
      [COLUMN_ID.ID]: "ID",
      [COLUMN_ID.TERRITORY]: "State",
      [COLUMN_ID.TYPE]: "Type",
      [COLUMN_ID.STATUS]: "Status",
      [COLUMN_ID.SUBMISSION_TIMESTAMP]: "Initial Submission",
      [COLUMN_ID.LATEST_RAI_TIMESTAMP]: "Formal RAI Response",
      [COLUMN_ID.CPOC_NAME]: "CPOC Name",
      [COLUMN_ID.SUBMITTER]: "Submitted By",
      [COLUMN_ID.ACTIONS]: "packageActions",
    };
    if (!value || !value.length) return null;
    return (
      <>
        {value.map((v) => (
          <div className="filter-chip-container">
            {/* (COLUMN_ID as {[index: string]: string})[id] is a type cast. We export
         the object from a JS file, and have to cast it here so we can use [id] as
         an index accessor and map the */}
            <span className="filter-chip-text ds-u-font-size--sm">{`${MAPPED_COLUMN_ID_NAME[id]}: ${v}`}</span>
            <button className="filter-chip-close">
              <FontAwesomeIcon icon={faWindowClose} size={"sm"} />
            </button>
          </div>
        ))}
      </>
    );
  };
  return (
    <div className="filter-chip-tray">
      {filters.map((filter) => (
        <Chip id={filter.id} value={filter.value} />
      ))}
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
            <FilterChipTray filters={filters} />
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
