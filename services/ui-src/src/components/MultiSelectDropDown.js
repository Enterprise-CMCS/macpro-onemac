import React, { useRef, useState } from "react";
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
  menu: (provided) => ({
    ...provided,
    position: "static",
  }),
  menuPortal: (provided) => ({
    ...provided,
    position: "static",
  }),
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
  const menuTargetRef = useRef(null);

  const invalid =
    (required && value.length === 0) || (onlyOne && value.length > 1);

  return (
    <div className="multi-select-dropdown-container">
      <label className="ds-text-heading--xl">{title}</label>
      <Select
        aria-invalid={invalid}
        components={customComponents}
        isDisabled={loading}
        isMulti={!onlyOne}
        menuIsOpen
        menuPortalTarget={menuTargetRef.current}
        onChange={setValue}
        options={options}
        placeholder={placeholder}
        styles={customStyles}
      />
      <div className="multi-select-menu-container" ref={menuTargetRef} />
      <div className="multi-select-bottom-section">
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
    </div>
  );
};
