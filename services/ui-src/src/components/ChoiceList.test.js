import React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ChoiceList from "./ChoiceList";

  // oy2-3734 Part One - maintaining Action Type, Waiver Authority, and Transmittal Number
  // values after a failed Submit
  it("shows the full list of choices", async () => {
    const testChoices = [{
        title: "Choice 1",
        description: "This is the description for Choice 1",
        linkTo: "/",
      },{
        title: "Choice 2",
        description: "This is the description for Choice 2",
        linkTo: "/",
      },{
        title: "Choice 3",
        description: "This is the description for Choice 3",
        linkTo: "/",
      },
      ];

    render(
      <ChoiceList choices={testChoices} />
    );

      });
