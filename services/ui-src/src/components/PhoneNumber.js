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
      onSubmit(value);
    },
    [onSubmit, value]
  );

  const onCancelFn = useCallback(() => {
    onCancel();
    setValue(phoneNumber); // resets value displayed in TextField back to the original value
  }, [onCancel, phoneNumber]);

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
          onChange={({ target: { value } }) => setValue(value)}
          onFocus={(e) => e.currentTarget.select()}
          value={value}
        />
        <Button
          className="phone-apply-button"
          id="applyButton"
          onClick={onSubmitFn}
          type="button"
          variation="solid"
        >
          Apply
        </Button>
        <Button
          id="cancelButton"
          onClick={onCancelFn}
          type="button"
          variation="ghost"
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
            variation="solid"
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
