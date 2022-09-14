import React, { useState } from "react";
import { Button } from "@cmsgov/design-system";
import Select, { components } from "react-select";

const customComponents = {
  MenuList: (props) => (
    <div role="list">
      <components.MenuList {...props} />
    </div>
  ),
  Option: (props) => (
    <div aria-selected={false} role="option">
      <components.Option {...props} />
    </div>
  ),
};

const customStyles = {
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#0071BC",
    color: "#fff",
    fontWeight: "bold",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "#fff",
  }),
};

export const MultiSelectDropDown = ({
  ariaLabel,
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

  return (
    <div className="multi-select-dropdown-container">
      <label className="ds-text-heading--xl">{title}</label>
      <Select
        aria-label={ariaLabel}
        components={customComponents}
        isDisabled={loading}
        isMulti={!onlyOne}
        onChange={setValue}
        options={options}
        placeholder={placeholder}
        styles={customStyles}
      />
      <div className="multi-select-bottom-section">
        {errorMessage && invalid && (
          <div className="multi-select-error-message">{errorMessage}</div>
        )}
        <div className="multi-select-button-container">
          <Button
            disabled={loading || invalid}
            onClick={() => submitFn(value)}
            type="button"
            variation="solid"
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
          </Button>
          {cancelFn && (
            <Button onClick={cancelFn} type="button" variation="ghost">
              Cancel
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
