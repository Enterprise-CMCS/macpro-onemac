import React, { useState } from "react";
import Select from "react-dropdown-select";
import classNames from "classnames";

/*
   Simple Multi Select Component

   Reference: https://www.npmjs.com/package/react-dropdown-select

*/

export const MultiSelectDropDown = ({
  cancelFn,
  errorMessage,
  loading = false,
  onlyOne = false,
  options,
  placeholder,
  required = false,
  submitFn,
  title,
}) => {
  const [value, setValue] = useState([]);

  const invalid =
    (required && value.length === 0) || (onlyOne && value.length > 1);

  const selectClassName = classNames({
    "state-dropdown-select": true,
    "state-dropdown-select-no-selection": value.length === 0 && true,
  });

  return (
    <div className="multi-select-dropdown-container">
      <div className="multi-select-title">{title}</div>
      <svg
        className="multi-search-icon"
        width="15"
        height="14"
        viewBox="0 0 15 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.22447 0.285156C6.61008 0.285156 7.93894 0.785533 8.91872 1.67621C9.8985 2.56689 10.4489 3.7749 10.4489 5.03451C10.4489 6.21089 9.97471 7.29228 9.19506 8.12525L9.41208 8.32253H10.047L14.0659 11.9759L12.8602 13.0719L8.8414 9.41853V8.8413L8.62439 8.64402C7.7081 9.35277 6.51853 9.78387 5.22447 9.78387C3.83885 9.78387 2.50999 9.28349 1.53021 8.39281C0.550433 7.50214 0 6.29412 0 5.03451C0 3.7749 0.550433 2.56689 1.53021 1.67621C2.50999 0.785533 3.83885 0.285156 5.22447 0.285156ZM5.22447 1.7465C3.21506 1.7465 1.60753 3.20784 1.60753 5.03451C1.60753 6.86119 3.21506 8.32253 5.22447 8.32253C7.23387 8.32253 8.8414 6.86119 8.8414 5.03451C8.8414 3.20784 7.23387 1.7465 5.22447 1.7465Z"
          fill="#212121"
        />
      </svg>
      <div className="multi-select-bottom-section profile-multi-select">
        {errorMessage && invalid ? (
          <div className="multi-select-error-message">{errorMessage}</div>
        ) : (
          <div className="no-error-offset" aria-hidden="true" />
        )}
        <div className="multi-select-button-container">
          <button
            disabled={loading || invalid}
            onClick={() => submitFn(value)}
            className="ds-c-button ds-c-button--primary"
            type="button"
          >
            {loading && (
              <>
                <span
                  className="ds-c-spinner ds-c-spinner-small ds-c-spinner--inverse"
                  aria-valuetext="Loading"
                  role="progressbar"
                />
                &nbsp;
              </>
            )}
            Submit
          </button>
          {cancelFn && (
            <button
              disabled={loading}
              onClick={cancelFn}
              className="ds-c-button ds-c-button--transparent"
              type="button"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
      <Select
        className={selectClassName}
        placeholder={placeholder}
        disabled={loading}
        dropdownHeight="185px"
        searchable={true}
        searchBy="label"
        multi={true}
        keepOpen="true"
        onChange={setValue}
        options={options}
        dropdownHandle={false}
      />
    </div>
  );
};
