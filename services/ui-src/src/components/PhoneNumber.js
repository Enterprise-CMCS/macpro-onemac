import React, { useCallback, useReducer } from "react";
import { Button, FormLabel, Review } from "@cmsgov/design-system";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

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

  const onSubmitFn = useCallback(
    (event) => {
      event.preventDefault();
      onSubmit(value);
      dispatch(SUBMIT);
    },
    [onSubmit, value]
  );

  return isEditing ? (
    <form className="phone-number-edit-form" onSubmit={onSubmitFn}>
      <FormLabel fieldId="phoneNumber">Phone Number</FormLabel>
      <input
        autoFocus
        id="phoneNumber"
        onChange={({ target: { value } }) => dispatch(value)}
        onFocus={e => e.currentTarget.select()}
        value={value}
      />
      <Button type="submit" variation="primary">
        Submit
      </Button>
      <Button
        onClick={() => dispatch(CANCEL)}
        type="button"
        variation="transparent"
      >
        Cancel
      </Button>
    </form>
  ) : (
    <Review
      className="phone-number-field"
      editContent={
        <Button className="phone-edit-button" onClick={() => dispatch(EDIT)}>
          Edit&nbsp;&nbsp;
          <FontAwesomeIcon icon={faPen} />
        </Button>
      }
      heading="Phone Number"
    >
      {value?.trim() || <br />}
    </Review>
  );
};
