import React from "react";
import { Dropdown, Review } from "@cmsgov/design-system";
import { SelectOption } from "cmscommonlib";

const TemporaryExtensionTypeInput: React.FC<{
  temporaryExtensionTypes: SelectOption[];
  handleOnChange: any;
  waiverAuthority?: string;
  disabled?: boolean;
}> = ({
  temporaryExtensionTypes,
  handleOnChange,
  waiverAuthority,
  disabled,
}) => {
  const defaultType: SelectOption = {
    label: "-- select a temporary extension type --",
    value: "",
  };

  return disabled ? (
    <Review heading="Temporary Extension Type">{waiverAuthority}</Review>
  ) : (
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
