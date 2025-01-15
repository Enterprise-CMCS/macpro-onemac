import React, { useCallback, useEffect, useState } from "react";
import { Button, FormLabel, TextField, Review } from "@cmsgov/design-system";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

export const PhoneNumber = ({
  id,
  isEditing,
  onCancel,
  onEdit,
  onSubmit,
  phoneNumber,
  readOnly,
}) => {
  const [value, setValue] = useState(phoneNumber);

  useEffect(() => {
    setValue(phoneNumber);
  }, [phoneNumber]);

  const onSubmitFn = useCallback(
    (e) => {
      e.preventDefault();
      // remove () and - on submit of number 
      const formattedValue = value.replace(/[^\d]/g, '');
      onSubmit(formattedValue);
    },
    [onSubmit, value]
  );

  const onCancelFn = useCallback(() => {
    onCancel();
    setValue(phoneNumber); // resets value displayed in TextField back to the original value
  }, [onCancel, phoneNumber]);


  const onEnterPhoneNumber = (value) => {
  
    // Remove all non-numeric characters first (only numbers allowed)
    let cleanedValue = value.replace(/[^0-9]/g, '');
  
    // Apply parentheses after the first 3 digits
    if (cleanedValue.length > 3) {
      cleanedValue = `(${cleanedValue.slice(0, 3)}) ${cleanedValue.slice(3)}`;
    }
  
    // Apply hyphen after the first 6 digits
    if (cleanedValue.length > 9) {
      cleanedValue = `${cleanedValue.slice(0, 9)}-${cleanedValue.slice(9)}`;
    }
  
    //needed for deleteinng/editing number
    if (value.length <= 9) {
      cleanedValue = cleanedValue.replace(/-/g, ''); // Remove the hyphen
    }

    //prevent extra numbers
    if (cleanedValue.length > 14) {
      cleanedValue = cleanedValue.slice(0, 14);
    }

    // Set the formatted value in the state
    setValue(cleanedValue);
  };

  const formId = id || "phoneSection";

  if (readOnly) {
    return <Review heading="Phone Number">{phoneNumber || "N/A"}</Review>;
  } else if (isEditing) {
    return (
      <form
        id={formId}
        className="phone-number-edit-form"
        onSubmit={onSubmitFn}
      >
        <TextField
          autoFocus
          className="phone-text-field"
          id="phoneNumber"
          label="Phone Number"
          name="phoneTextField"
          onChange={({ target: { value } }) => onEnterPhoneNumber(value)}
          onFocus={(e) => e.currentTarget.select()}
          value={value}
        />
        <Button
          className="phone-apply-button"
          id="applyButton"
          onClick={onSubmitFn}
          type="button"
          variation="primary"
        >
          Apply
        </Button>
        <Button
          id="cancelButton"
          onClick={onCancelFn}
          type="button"
          variation="transparent"
        >
          Cancel
        </Button>
      </form>
    );
  } else {
    if (!phoneNumber) {
      return (
        <form id={formId} className="phone-number-empty-form">
          <FormLabel fieldId="phoneNumber">Phone Number</FormLabel>
          <Button
            className="phone-add-button"
            id="addButton"
            onClick={onEdit}
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
        <form id={formId} className="phone-number-view-form">
          <FormLabel fieldId="phoneNumber">Phone Number</FormLabel>
          <span className="phone-text">{phoneNumber.trim()}</span>
          <Button
            className="phone-edit-button"
            id="editButton"
            onClick={onEdit}
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
