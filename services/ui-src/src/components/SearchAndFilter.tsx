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

const { afterToday } = DateRangePicker;

export interface ColumnPickerProps<V extends {}> {
  columnsInternal: ColumnInstance<V>[];
}

const orderColumns = (a: { Header: string }, b: { Header: string }) => {
  return a.Header.localeCompare(b.Header);
};

export const ColumnPicker: FC<ColumnPickerProps<any>> = ({
  columnsInternal,
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
                    onChange={() => toggleHidden()}
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

  return rows.filter(({ values: { [columnId]: cellValue } }) =>
    betweenDates(dateA, dateB, cellValue)
  );
};

const filterFromDateRangeAndText = <
  R extends { values: V },
  V extends Record<string, any>
>(
  rows: R[],
  [columnId]: [string],
  filterValue: [Date, Date, ...string[]]
) => {
  if (filterValue.length === 0) return rows;

  const [dateA, dateB, ...textFilters] = filterValue;
  const noDatesSpecified = !dateA && !dateB;

  return rows.filter(({ values: { [columnId]: cellValue } }) => {
    const matchesText = textFilters.includes(cellValue);
    return noDatesSpecified
      ? // if date range is blank, only filter by text - include all dates
        matchesText || typeof cellValue !== "string"
      : // if date range is specified, filter by that, but also include text matching checkboxes
        betweenDates(dateA, dateB, cellValue) || matchesText;
  });
};

export enum CustomFilterTypes {
  MultiCheckbox = "matchingTokens",
  DateRange = "betweenDates",
  DateRangeAndMultiCheckbox = "betweenDatesOrMatchingTokens",
}

export const customFilterTypes = {
  [CustomFilterTypes.MultiCheckbox]: filterFromMultiCheckbox,
  [CustomFilterTypes.DateRange]: filterFromDateRange,
  [CustomFilterTypes.DateRangeAndMultiCheckbox]: filterFromDateRangeAndText,
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
    (value) => setFilter(value ?? []),
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

  return (
    <DateRangePicker
      block
      disabledDate={inThePast ? afterToday!() : undefined}
      id={`${id}-date-filter`}
      onChange={onChangeSelection}
      placeholder="Select Date Range"
      ranges={ranges}
      showOneCalendar
      value={filterValue?.slice(0, 2)}
    />
  );
}

function DateAndTextFilter({
  column,
  column: { filterValue, setFilter },
  ...props
}: FilterProps) {
  const onChangeTextFilter = useCallback(
    (transformer) => {
      setFilter(
        typeof transformer === "function"
          ? (oldFilterValue: [Date, Date, ...string[]]) => {
              const [dateA, dateB, ...oldTextFilters] = oldFilterValue ?? [
                undefined,
                undefined,
              ];
              return [
                dateA,
                dateB,
                ...transformer(
                  // pass in undefined so TextFilter knows no filters are active
                  (oldFilterValue?.length ?? 0) < 2 ? undefined : oldTextFilters
                ),
              ];
            }
          : transformer
      );
    },
    [setFilter]
  );

  const onChangeDateFilter = useCallback(
    (newDates) => {
      if (newDates.length === 0) {
        newDates = [undefined, undefined];
      }

      setFilter(
        (
          [, , ...rest]: [Date, Date, ...string[]] = [undefined!, undefined!]
        ) => [...newDates, ...rest]
      );
    },
    [setFilter]
  );

  const isEmptyFilter = !filterValue || filterValue?.length === 0;
  const dateFiltersEmpty =
    filterValue?.length >= 2 &&
    filterValue[0] === undefined &&
    filterValue[1] === undefined;

  return (
    <>
      <TextFilter
        column={{
          ...column,
          filterValue: isEmptyFilter ? undefined : filterValue,
          setFilter: onChangeTextFilter,
        }}
        {...props}
      />
      <DateFilter
        column={{
          ...column,
          filterValue: isEmptyFilter || dateFiltersEmpty ? [] : filterValue,
          setFilter: onChangeDateFilter,
        }}
        {...props}
      />
    </>
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
  DateRangeAndMultiCheckbox: DateAndTextFilter,
};

type FilterPaneProps<V extends {}> = {
  columnsInternal: (ColumnInstance<V> &
    UseFiltersColumnOptions<V> &
    UseFiltersColumnProps<V>)[];
  pageContentRef: RefObject<HTMLElement>;
  setAllFilters: (filters: any[]) => void;
  TEMP_onReset: () => void;
};

function FilterPane<V extends {}>({
  columnsInternal,
  pageContentRef,
  setAllFilters,
  TEMP_onReset,
}: FilterPaneProps<V>) {
  const [showFilters, toggleShowFilters] = useToggle(false);
  const onResetFilters = useCallback(() => {
    setAllFilters(
      // this awful complicated dance is because the DateRangePicker gets
      // confused on reset if you don't explicitly pass an empty array
      columnsInternal.flatMap(({ canFilter, filter, id }) => {
        if (!canFilter) return [];
        switch (filter) {
          case CustomFilterTypes.DateRange:
          case CustomFilterTypes.DateRangeAndMultiCheckbox:
            return { id, value: [] };
          default:
            return { id, value: undefined };
        }
      })
    );
    TEMP_onReset();
  }, [columnsInternal, setAllFilters, TEMP_onReset]);

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
  onSearch: (keyword: string) => void;
  searchBarTitle: ReactNode;
  TEMP_onReset: () => void;
} & FilterPaneProps<V>;

export function SearchAndFilter<V extends {} = {}>({
  columnsInternal,
  onSearch,
  pageContentRef,
  searchBarTitle,
  setAllFilters,
  TEMP_onReset,
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
        <ColumnPicker columnsInternal={columnsInternal} />
        <div className="filter-buttons">
          <FilterPane
            columnsInternal={columnsInternal}
            pageContentRef={pageContentRef}
            setAllFilters={setAllFilters}
            TEMP_onReset={TEMP_onReset}
          />
        </div>
      </div>
    </div>
  );
}
