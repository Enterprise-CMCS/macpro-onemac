import React from "react";
import { render } from "@testing-library/react";

import FileList from "./FileList";

describe("FileList", () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it("renders without crashing", () => {
    render(<FileList />);
  });
});
