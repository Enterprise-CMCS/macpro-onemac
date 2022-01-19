import React from "react";
import { render } from "@testing-library/react";

import { AttachmentLanding } from "./AttachmentLanding";

jest.mock("aws-amplify", () => ({
  Auth: {
    configure() {
      return { oauth: {} };
    },
  },
}));

it("renders without crashing", () => {
  render(<AttachmentLanding />);
});
