import React, { FC, useCallback, useMemo, useRef, useState } from "react";
import { debounce } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

export interface SearchFilterProps {
  onSearch: (keyword: string) => void;
}

export const SearchAndFilter: FC<SearchFilterProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedSearch = useMemo(() => debounce(onSearch), [onSearch]);

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
    <div className="search-and-filter">
      <div className="search-bar">
        <label htmlFor="search-bar-input">Search by Keyword</label>
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
    </div>
  );
};
