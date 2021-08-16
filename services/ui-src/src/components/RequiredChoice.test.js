import React from "react";
import { render } from "@testing-library/react";
import RequiredChoice from "./RequiredChoice";

const actionType = {
  fieldName: "actionType",
  errorMessage: "Please select the Action Type.",
  optionsList: [
    { label: "New waiver", value: "new" },
    { label: "Waiver amendment", value: "amendment" },
    {
      label: "Request for waiver renewal",
      value: "renewal",
    },
  ],
  defaultItem: "an action type",
};

describe("RequiredChoice", () => {
  it("renders without crashing", () => {
    render(<RequiredChoice fieldInfo={actionType} label="Action Type" />);
  });
});
