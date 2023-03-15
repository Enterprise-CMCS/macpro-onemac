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
} from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faSort,
  faSortDown,
  faSortUp,
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
export { CustomFilterTypes, CustomFilterUi } from "./SearchAndFilter";

export type TableProps<V extends {}> = {
  internalName: "spa" | "waiver";
  className?: string;
  searchBarTitle?: ReactNode;
  withSearchBar?: boolean;
} & Pick<SearchFilterProps<V>, "pageContentRef"> &
  TableOptions<V>;

const defaultColumn = {
  Filter: constant(null),
  disableFilters: true,
  disableGlobalFilter: true,
};

export default function PortalTable<V extends {} = {}>({
  internalName,
  pageContentRef,
  searchBarTitle,
  withSearchBar,
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
    /* Unlike our hidden column logic, this can write directly to localStorage
     * since no tab/session needs to alter the state; only overwrite it. Tabs
     * can still apply filters independently, but the most recent filter configuration
     * (i.e. the tab that most recently applied filters) will be the one saved to
     * localStorage to load from. */
    localStorage.setItem(key, JSON.stringify(filters));
  }, [filters, internalName]);

  return (
    <>
      {withSearchBar && (
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
