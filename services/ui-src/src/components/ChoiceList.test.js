import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import { render, screen } from "@testing-library/react";

import ChoiceList from "./ChoiceList";
import userEvent from "@testing-library/user-event";

const history = createMemoryHistory();
const route = "/spa";
history.push(route);

it("shows the full list of choices", async () => {
  const testChoices = [
    {
      title: "Choice 1",
      description: "This is the description for 1",
      linkTo: "/1",
    },
    {
      title: "Choice 2",
      description: "This is the description for 2",
      linkTo: "/2",
    },
    {
      title: "Choice 3",
      description: "This is the description for 3",
      linkTo: "/3",
    },
  ];

  render(
    <Router history={history}>
      <ChoiceList choices={testChoices} />
    </Router>
  );

  expect(history.location.pathname).toBe(route);

  testChoices.map((choice) => {
    let choiceElement = screen.getByText(choice.title, { exact: false });
    expect(choiceElement).toBeInTheDocument();

    userEvent.click(choiceElement);

    expect(history.location.pathname).toBe(choice.linkTo);
  });
});
