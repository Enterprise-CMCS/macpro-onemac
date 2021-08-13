import React from "react";
import { render } from "@testing-library/react";
import FileList from "./FileList";

describe("FileList", () => {
  it("renders without crashing", () => {
    render(<FileList />);
  });
});
