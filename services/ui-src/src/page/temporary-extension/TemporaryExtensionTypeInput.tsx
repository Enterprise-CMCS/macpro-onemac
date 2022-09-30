import React, { FC } from "react";
import { Dropdown } from "@cmsgov/design-system";
import { SelectOption } from "cmscommonlib";

const TemporaryExtensionTypeInput: React.FC<{
  temporaryExtensionTypes: SelectOption[];
  handleOnChange: any;
}> = ({ temporaryExtensionTypes, handleOnChange }) => {
  const defaultType: SelectOption = {
    label: "-- select a temporary extension type --",
    value: "",
  };

  return (
    <Dropdown
      options={[defaultType, ...(temporaryExtensionTypes ?? [])]}
      defaultValue={defaultType.value}
      label="Temporary Extension Type"
      labelClassName="ds-u-margin-top--0 required"
      fieldClassName="field"
      name="temporaryExtensionType"
      id="temp-ext-type"
      onChange={handleOnChange}
    />
  );
};

export default TemporaryExtensionTypeInput;
