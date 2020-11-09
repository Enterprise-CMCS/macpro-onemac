import React from "react";

/**
 * Generates options based on an array of objects with label and value for each option.
 * For example:
 * const options = [
 *   { "label": "New waiver", "value": "New waiver" },
 *   { "label": "Waiver amendment", "value": "Waiver amendment" },
 *   { "label": "Request for waiver renewal", "value": "Request for waiver renewal" }
 * ];
 * @param {Array} optionsList array of objects with label and value for each option
 */
export function renderOptionsList(optionsList) {
  if(!optionsList || !Array.isArray(optionsList)) {
      throw new Error("Options list must be an array of items.");
  }

  let retval = optionsList.map((item, i) => {
    return (
      <option key={i} value={item.value}>
        {item.label}
      </option>
    );
  });
  return retval;
}
