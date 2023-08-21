import React, {
  FC,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import {
  ColumnInstance,
  Row,
  UseFiltersColumnOptions,
  UseFiltersColumnProps,
} from "react-table";
import Select from "react-select";
import { debounce } from "lodash";
import { DateRangePicker } from "rsuite";
import {
  addWeeks,
  endOfDay,
  endOfMonth,
  endOfQuarter,
  startOfDay,
  startOfMonth,
  startOfQuarter,
  subDays,
} from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faTimes,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { AccordionItem, Button, Choice } from "@cmsgov/design-system";

import { SelectOption, territoryList } from "cmscommonlib";

import { useToggle } from "../libs/hooksLib";
import { PackageRowValue } from "../domain-types";

import { animated, useTransition, easings, useSpring } from "@react-spring/web";
import {
  LOCAL_STORAGE_COLUMN_VISIBILITY_SPA,
  LOCAL_STORAGE_COLUMN_VISIBILITY_WAIVER,
} from "../utils/StorageKeys";

const { afterToday } = DateRangePicker;

export interface ColumnPickerProps<V extends {}> {
  columnsInternal: ColumnInstance<V>[];
  internalName: string;
}

const orderColumns = (a: { Header: string }, b: { Header: string }) => {
  return a.Header.localeCompare(b.Header);
};

/** Takes a column ID and boolean to appropriately store the IDs of columns
 * hidden by the user in localStorage. This value is later read as saved column
 * filtering state. */
const updateVisibilitySavedState = (
  id: string,
  setHidden: boolean,
  internalName: string
) => {
  const key =
    internalName === "spa"
      ? LOCAL_STORAGE_COLUMN_VISIBILITY_SPA
      : LOCAL_STORAGE_COLUMN_VISIBILITY_WAIVER;
  // Get array of hidden columns or undefined
  const saved = sessionStorage?.getItem(key);
  if (saved === null) {
    // No initial state found
    // Ensuring our initial state is correct
    const value = setHidden ? [id] : [];
    // Set up our initial state
    sessionStorage.setItem(key, JSON.stringify(value));
    return;
  }

  const savedAsArray = JSON.parse(saved) as Array<string>;
  // Save as hidden col
  if (!setHidden) {
    const indexOfId = savedAsArray.indexOf(id);
    // Remove from saved hidden cols
    if (indexOfId > -1) {
      savedAsArray.splice(indexOfId, 1);
    }
  } else {
    savedAsArray.push(id);
  }
  /* The reason we use sessionStorage _and_ stash something in localStorage is
   * to avoid two or more tabs from mucking up the localStorage item. With this
   * logic, we store everything in the tab's sessionStorage, and the most recently
   * altered sessionStorage item (that is the tab that most recently changed their
   * hidden columns) will overwrite the localStorage item which all pages load
   * the default column show/hide state from. */
  // Update item in session
  sessionStorage.setItem(key, JSON.stringify(savedAsArray));
  // Set localStorage state to load from
  localStorage.setItem(key, JSON.stringify(savedAsArray));
};

export const ColumnPicker: FC<ColumnPickerProps<any>> = ({
  columnsInternal,
  internalName,
}) => {
  const [
    showColumnPickerDropdown,
    toggleColumnPickerDropdown,
    setShowColumnPicker,
  ] = useToggle(false);
  const dropdownButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listenToClick = (event: MouseEvent) => {
      let ignoreClickElement = dropdownButtonRef;
      if (ignoreClickElement.current) {
        showColumnPickerDropdown &&
          !ignoreClickElement.current.contains(event.target as Node) &&
          setShowColumnPicker(false);
      }
    };
    window.addEventListener("click", listenToClick);
    return () => window.removeEventListener("click", listenToClick);
  }, [setShowColumnPicker, showColumnPickerDropdown]);

  const iconRotateAnimation = useSpring({
    transform: showColumnPickerDropdown ? "rotateZ(180deg)" : "rotateZ(0deg)",
    config: { duration: 150 },
  });

  return (
    <>
      <div className="picker-wrapper" ref={dropdownButtonRef}>
        <Button
          className="picker-button"
          aria-expanded="false"
          onClick={toggleColumnPickerDropdown}
        >
          Show/Hide Columns
          <animated.div style={iconRotateAnimation}>
            <FontAwesomeIcon icon={faChevronDown} className="fa-fw" />
          </animated.div>
        </Button>
        {showColumnPickerDropdown && (
          <div
            aria-expanded="true"
            role="listbox"
            aria-label="Column Picker For Table"
            className="dropdown-column-picker-box"
          >
            {columnsInternal
              .filter(
                ({ id }: ColumnInstance<PackageRowValue>) =>
                  //@ts-ignore
                  !["componentId", "packageActions"].includes(id)
              )
              //@ts-ignore
              .sort(orderColumns)
              .map(
                ({
                  Header,
                  id,
                  //@ts-ignore
                  toggleHidden,
                  //@ts-ignore
                  isVisible,
                }: ColumnInstance<PackageRowValue>) => (
                  <Choice
                    className="dropdown-column-picker-button"
                    label={Header}
                    name={`columnPicker-${Header}`}
                    value={Header as string}
                    onChange={() => {
                      toggleHidden();
                      updateVisibilitySavedState(id, isVisible, internalName);
                    }}
                    checked={isVisible}
                    type="checkbox"
                    size="small"
                    key={id}
                  />
                )
              )}
          </div>
        )}
      </div>
    </>
  );
};

const filterFromMultiCheckbox = <
  R extends { values: V },
  V extends Record<string, any>
>(
  rows: R[],
  [columnId]: [string],
  filterValue: string[] = []
): R[] =>
  rows.filter(({ values: { [columnId]: cellValue } }) =>
    filterValue.includes(cellValue)
  );

const betweenDates = (dateA: Date, dateB: Date, epoch: number) => {
  const dateFromValue = new Date(epoch);
  return dateFromValue > dateA && dateFromValue < dateB;
};

const filterFromDateRange = <
  R extends { values: V },
  V extends Record<string, any>
>(
  rows: R[],
  [columnId]: [string],
  [dateA, dateB]: [Date, Date]
) => {
  if (!dateA && !dateB) return rows;
  if (dateA && typeof dateA === "string") dateA = new Date(dateA);
  if (dateB && typeof dateB === "string") dateB = new Date(dateB);

  return rows.filter(({ values: { [columnId]: cellValue } }) =>
    betweenDates(dateA, dateB, cellValue)
  );
};

export enum CustomFilterTypes {
  MultiCheckbox = "matchingTokens",
  DateRange = "betweenDates",
}

export const customFilterTypes = {
  [CustomFilterTypes.MultiCheckbox]: filterFromMultiCheckbox,
  [CustomFilterTypes.DateRange]: filterFromDateRange,
};

type FilterProps = {
  column: ColumnInstance & UseFiltersColumnProps<any>;
  preGlobalFilteredFlatRows: Row[];
};

function TextFilter({
  column: { filterValue, setFilter, id },
  preGlobalFilteredFlatRows,
}: FilterProps) {
  const [possibleValues, hiddenValues] = useMemo(() => {
    const possibleUnique = new Set();
    const notHiddenUnique = new Set();

    for (const {
      values: { [id]: value },
      // @ts-ignore
      depth,
    } of preGlobalFilteredFlatRows) {
      if (typeof value === "string") possibleUnique.add(value);

      if (depth === 0) notHiddenUnique.add(value);
    }

    const valuesOut = Array.from(possibleUnique).sort();
    return [
      valuesOut,
      new Set(valuesOut.filter((v) => !notHiddenUnique.has(v))),
    ];
  }, [preGlobalFilteredFlatRows, id]) as [string[], Set<string>];

  const onCheckboxSelect = useCallback(
    ({ currentTarget: { checked, value } }) => {
      setFilter((oldFilterValue?: string[]) => {
        if (!oldFilterValue) oldFilterValue = [...possibleValues]; // begin with everything
        const newFilterValue: Set<string> = new Set(oldFilterValue);
        if (checked) newFilterValue.add(value);
        else newFilterValue.delete(value);
        return Array.from(newFilterValue);
      });
    },
    [possibleValues, setFilter]
  );

  return (
    <>
      {possibleValues
        .filter((value) => !hiddenValues.has(value))
        .map(
          (value) =>
            value !== "Inactivated" && (
              <Choice
                checked={filterValue?.includes(value) ?? true}
                inversed
                key={value}
                label={value}
                name={`${id}-${value}`}
                onChange={onCheckboxSelect}
                size="small"
                type="checkbox"
                value={value}
              />
            )
        )}
    </>
  );
}

function DateFilter({
  column: { filterValue, id, setFilter },
  inThePast,
}: FilterProps & { inThePast?: boolean }) {
  const onChangeSelection = useCallback(
    (value) => {
      value !== null && value?.length
        ? /* Filters come in an array with 2 dates, the earlier always at
           * index 0, the later date at index 1. */
          setFilter([startOfDay(value[0]), endOfDay(value[1])])
        : setFilter([]);
    },
    [setFilter]
  );
  const ranges: { label: string; value: [Date, Date] }[] = useMemo(
    () =>
      inThePast
        ? [
            {
              label: "Today",
              value: [startOfDay(new Date()), endOfDay(new Date())],
            },
            {
              label: "Last 7 Days",
              value: [startOfDay(subDays(new Date(), 6)), endOfDay(new Date())],
            },
            {
              label: "Month To Date",
              value: [startOfMonth(new Date()), endOfDay(new Date())],
            },
            {
              label: "Quarter To Date",
              value: [startOfQuarter(new Date()), endOfDay(new Date())],
            },
          ]
        : [
            {
              label: "Next 7 Days",
              value: [startOfDay(new Date()), addWeeks(new Date(), 1)],
            },
            {
              label: "This Month",
              value: [startOfDay(new Date()), endOfMonth(new Date())],
            },
            {
              label: "This Quarter",
              value: [startOfDay(new Date()), endOfQuarter(new Date())],
            },
          ],
    [inThePast]
  );

  const theValues: [Date, Date] = useMemo(() => {
    if (filterValue && typeof filterValue[0] === "string") {
      filterValue[0] = new Date(filterValue[0]);
      filterValue[1] = new Date(filterValue[1]);
    }
    return filterValue?.slice(0, 2);
  }, [filterValue]);

  return (
    <DateRangePicker
      block
      shouldDisableDate={inThePast ? afterToday!() : undefined}
      id={`${id}-date-filter`}
      onChange={onChangeSelection}
      placeholder="Select Date Range"
      ranges={ranges}
      showOneCalendar
      value={theValues}
    />
  );
}

const customComponents = {
  IndicatorSeparator: () => null,
};

const MultiSelectList = ({
  column: { filterValue, id, setFilter },
  options,
}: FilterProps & {
  options: SelectOption[];
}) => {
  const onSelect = useCallback(
    (selected) => {
      setFilter(selected.map(({ value }: SelectOption) => value));
    },
    [setFilter]
  );
  const selectedOptions = useMemo(
    () =>
      options && filterValue
        ? options.filter(({ value }) => filterValue.includes(value))
        : null,
    [options, filterValue]
  );

  return (
    <Select
      className="custom-multi-select"
      components={customComponents}
      inputId={`${id}-filter-select`}
      isMulti
      name={id}
      onChange={onSelect}
      options={options}
      value={selectedOptions}
    />
  );
};

export const CustomFilterUi = {
  MultiCheckbox: TextFilter,
  TerritorySelect: (props: FilterProps) => (
    <MultiSelectList options={territoryList} {...props} />
  ),
  DateRange: DateFilter,
  DateRangeInPast: (props: FilterProps) => <DateFilter inThePast {...props} />,
};

type FilterPaneProps<V extends {}> = {
  columnsInternal: (ColumnInstance<V> &
    UseFiltersColumnOptions<V> &
    UseFiltersColumnProps<V>)[];
  pageContentRef: RefObject<HTMLElement>;
  setAllFilters: (filters: any[]) => void;
};

function FilterPane<V extends {}>({
  columnsInternal,
  pageContentRef,
  setAllFilters,
}: FilterPaneProps<V>) {
  const [showFilters, toggleShowFilters] = useToggle(false);
  const onResetFilters = useCallback(() => {
    setAllFilters(
      /* The DateFilter requires the value passed to reset be an empty array
      rather than undefined. Before this, there was a bug where the filter UI 
      would not reset the DateFilter */
      columnsInternal.flatMap(({ canFilter, filter, id }) => {
        if (!canFilter) return [];
        switch (filter) {
          case CustomFilterTypes.DateRange:
            return { id, value: [] };
          default:
            return { id, value: undefined };
        }
      })
    );
  }, [columnsInternal, setAllFilters]);

  //Mount transition animation

  const transitionFilterPane = useTransition(showFilters, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      duration: 95,
      easing: easings.easeInOutQuad,
    },
  });

  return (
    <>
      <Button onClick={toggleShowFilters}>Filter</Button>

      {transitionFilterPane((style, showFilters) =>
        showFilters
          ? pageContentRef.current &&
            createPortal(
              <animated.div
                aria-label="Filter Results"
                className="filter-pane"
                role="search"
                style={style}
              >
                <header>
                  <h4>Filter By</h4>
                  <Button
                    autoFocus
                    className="close-filter-pane"
                    inversed
                    onClick={toggleShowFilters}
                    size="small"
                    variation="transparent"
                  >
                    Close <FontAwesomeIcon icon={faTimes} />
                  </Button>
                </header>
                <Button
                  className="reset-button-filter"
                  onClick={onResetFilters}
                  inversed
                >
                  Reset
                </Button>
                {/* Did not use CMS Accordion component because it steals KeyDown events */}
                <div className="ds-c-accordion filter-accordion">
                  {columnsInternal
                    ?.filter(({ canFilter }) => canFilter)
                    ?.map((column) => (
                      <AccordionItem
                        buttonClassName="inversed-accordion-button"
                        contentClassName="inversed-accordion-content"
                        heading={column.render("Header")}
                        headingLevel="6"
                        id={column.id}
                        key={column.id}
                      >
                        {column.render("Filter")}
                      </AccordionItem>
                    ))}
                </div>
              </animated.div>,
              pageContentRef.current
            )
          : ""
      )}
    </>
  );
}

export type SearchFilterProps<V extends {}> = {
  internalName: string;
  onSearch: (keyword: string) => void;
  searchBarTitle: ReactNode;
} & FilterPaneProps<V>;

export function SearchAndFilter<V extends {} = {}>({
  internalName,
  columnsInternal,
  onSearch,
  pageContentRef,
  searchBarTitle,
  setAllFilters,
}: SearchFilterProps<V>) {
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedSearch = useMemo(() => debounce(onSearch, 300), [onSearch]);

  // cancel any dangling searches when component is destroyed
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const clickInsideBar = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const onKeywordChange = useCallback(
    ({ currentTarget: { value } }) => {
      setSearchTerm(value);
      debouncedSearch(value);
    },
    [debouncedSearch]
  );

  return (
    <div className="search-and-filter" role="search">
      <div className="search-bar">
        <label htmlFor="search-bar-input">{searchBarTitle || "Search"}</label>
        <div className="field" onClick={clickInsideBar}>
          <FontAwesomeIcon icon={faSearch} />
          <input
            autoComplete="off"
            id="search-bar-input"
            onChange={onKeywordChange}
            ref={inputRef}
            value={searchTerm}
          />
          {!!searchTerm && (
            <button
              aria-label="Clear Search"
              className="clear-button"
              onClick={onKeywordChange}
              type="button"
              value=""
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
        </div>
      </div>
      <div className="picker-filter-wrapper">
        <ColumnPicker
          columnsInternal={columnsInternal}
          internalName={internalName}
        />
        <div className="filter-buttons">
          <FilterPane
            columnsInternal={columnsInternal}
            pageContentRef={pageContentRef}
            setAllFilters={setAllFilters}
          />
        </div>
      </div>
    </div>
  );
}
