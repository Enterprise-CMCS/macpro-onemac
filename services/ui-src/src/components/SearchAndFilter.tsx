import React, {
  FC,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { ColumnInstance, Row, UseFiltersColumnProps } from "react-table";
import { debounce } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faTimes,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import {
  Accordion,
  AccordionItem,
  Button,
  Choice,
} from "@cmsgov/design-system";

import { useToggle } from "../libs/hooksLib";
import { PackageRowValue } from "../domain-types";

export interface ColumnPickerProps {
  columnsInternal: SearchFilterProps<any, any>["columnsInternal"];
}

const orderColumns = (a: { Header: string }, b: { Header: string }) => {
  return a.Header.localeCompare(b.Header);
};

export const ColumnPicker: FC<ColumnPickerProps> = ({ columnsInternal }) => {
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

  return (
    <>
      <div className="picker-wrapper" ref={dropdownButtonRef}>
        <Button aria-expanded="false" onClick={toggleColumnPickerDropdown}>
          Show/Hide Columns&nbsp;
          <FontAwesomeIcon icon={faChevronDown} className="fa-fw" />
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

type FilterSectionProps<D extends {}, V extends {}> = {
  allRows: Row<D>[];
} & ColumnInstance<V> &
  UseFiltersColumnProps<V>;

function FilterSection<D extends {}, V extends {}>({
  allRows,
  Header,
  filterValue,
  id,
  setFilter,
}: FilterSectionProps<D, V>) {
  const possibleValues = useMemo(
    () => Array.from(new Set(allRows.map(({ values }) => values[id]))).sort(),
    [allRows, id]
  );

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
    <AccordionItem
      buttonClassName="inversed-accordion-button"
      contentClassName="inversed-accordion-content"
      heading={Header}
      headingLevel="6"
    >
      {possibleValues.map((value) => (
        <Choice
          checked={filterValue?.includes(value) ?? true}
          inversed
          key={value}
          label={value}
          name={`${Header}-${value}`}
          onChange={onCheckboxSelect}
          size="small"
          type="checkbox"
          value={value}
        />
      ))}
    </AccordionItem>
  );
}

export type SearchFilterProps<D extends {}, V extends {}> = {
  columnsInternal: (ColumnInstance<V> & UseFiltersColumnProps<V>)[];
  onSearch: (keyword: string) => void;
  pageContentRef: RefObject<HTMLElement>;
  setAllFilters: (filters: any[]) => void;
} & Pick<FilterSectionProps<D, V>, "allRows">;

export function SearchAndFilter<D extends {} = {}, V extends {} = {}>({
  allRows,
  columnsInternal,
  onSearch,
  pageContentRef,
  setAllFilters,
}: SearchFilterProps<D, V>) {
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedSearch = useMemo(() => debounce(onSearch, 300), [onSearch]);
  const [showFilters, toggleShowFilters] = useToggle(false);

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

  const onResetFilters = useCallback(() => setAllFilters([]), [setAllFilters]);

  return (
    <div className="search-and-filter" role="search">
      <div className="search-bar">
        <label htmlFor="search-bar-input">Search</label>
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
          <Button onClick={toggleShowFilters}>Filter</Button>
        </div>
      </div>
      {showFilters &&
        pageContentRef.current &&
        createPortal(
          <div
            aria-label="Filter Results"
            className="filter-pane"
            role="search"
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
            <Accordion className="filter-accordion">
              {columnsInternal
                ?.filter(({ canFilter }) => canFilter)
                ?.map((columnProps) => (
                  <FilterSection
                    allRows={allRows}
                    key={columnProps.id}
                    {...columnProps}
                  />
                ))}
            </Accordion>
            <footer>
              <Button inversed onClick={onResetFilters} variation="transparent">
                Reset
              </Button>
            </footer>
          </div>,
          pageContentRef.current
        )}
    </div>
  );
}
