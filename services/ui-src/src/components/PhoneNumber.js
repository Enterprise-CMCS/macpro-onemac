import React, { useCallback, useState } from "react";
import { Button, FormLabel, TextField } from "@cmsgov/design-system";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

export const PhoneNumber = ({
  id,
  isEditing,
  onCancel,
  onEdit,
  onSubmit,
  phoneNumber,
}) => {
  const [value, setValue] = useState(phoneNumber);

  const onSubmitFn = useCallback(() => {
    onSubmit(value);
  }, [onSubmit, value]);

  const onEditFn = useCallback(() => {
    onEdit();
  }, [onEdit, value]);

  const onCancelFn = useCallback(() => {
    onCancel();
    setValue(phoneNumber); // resets value displayed in TextField back to the original value
  }, [onCancel]);

  const formId = id || "phoneSection";

  if (isEditing) {
    return (
      <form id={formId} className="phone-number-edit-form">
        <TextField
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
          onClick={() => onSubmitFn()}
          type="button"
          variation="primary"
        >
          Apply
        </Button>
        <Button
          id="cancelButton"
          onClick={() => onCancelFn()}
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
        <form id={formId} className="phone-number-empty-form">
          <FormLabel fieldId="phoneNumber">Phone Number</FormLabel>
          <Button
            className="phone-add-button"
            id="addButton"
            onClick={() => onEditFn()}
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
            onClick={() => onEditFn()}
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
