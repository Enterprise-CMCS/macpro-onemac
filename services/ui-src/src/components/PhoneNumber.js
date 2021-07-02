import React, { useCallback, useReducer } from "react";
import { Button, FormLabel, TextField } from "@cmsgov/design-system";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const EDIT = Symbol("edit"),
  CANCEL = Symbol("cancel"),
  SUBMIT = Symbol("submit");

const editReducer = (state, action) => {
  switch (action) {
    case EDIT:
      return { ...state, isEditing: true, cachedValue: state.value };
    case CANCEL:
      return { ...state, isEditing: false, value: state.cachedValue };
    case SUBMIT:
      return { ...state, isEditing: false, cachedValue: state.value };
    default:
      return { ...state, value: action };
  }
};

export const PhoneNumber = ({ initialValue, onSubmit }) => {
  const [{ isEditing, value }, dispatch] = useReducer(editReducer, {
    isEditing: false,
    value: initialValue ?? "",
  });

  const onSubmitFn = useCallback(() => {
    onSubmit(value);
    dispatch(SUBMIT);
  }, [onSubmit, value]);

  if (isEditing) {
    return (
      <form className="phone-number-edit-form">
        <TextField
          className="phone-text-field"
          id="phoneNumber"
          label="Phone Number"
          name="phoneTextField"
          onChange={({ target: { value } }) => dispatch(value)}
          onFocus={(e) => e.currentTarget.select()}
          value={value}
        />
        <Button
          className="phone-apply-button"
          id="applyButton"
          onClick={() => onSubmitFn()}
          type="button"
          variation="primary"
        >
          Apply
        </Button>
        <Button
          id="cancelButton"
          onClick={() => dispatch(CANCEL)}
          type="button"
          variation="transparent"
        >
          Cancel
        </Button>
      </form>
    );
  } else {
    if (!value) {
      return (
        <form className="phone-number-empty-form">
          <FormLabel fieldId="phoneNumber">Phone Number</FormLabel>
          <Button
            className="phone-add-button"
            id="addButton"
            onClick={() => dispatch(EDIT)}
            variation="primary"
            type="button"
          >
            Add&nbsp;&nbsp;
            <FontAwesomeIcon icon={faPlusCircle} />
          </Button>
        </form>
      );
    } else {
      return (
        <form className="phone-number-view-form">
          <FormLabel fieldId="phoneNumber">Phone Number</FormLabel>
          <span className="phone-text">{value.trim()}</span>
          <Button
            className="phone-edit-button"
            id="editButton"
            onClick={() => dispatch(EDIT)}
            type="button"
          >
            Edit&nbsp;&nbsp;
            <FontAwesomeIcon icon={faPen} />
          </Button>
        </form>
      );
    }
  }
};
