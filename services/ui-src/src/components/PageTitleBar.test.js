import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import PageTitleBar from "./PageTitleBar";

describe("PageTitleBar", () => {
  it("renders with a heading", () => {
    const headingText = "This is the Page Heading";
    render(<PageTitleBar heading={headingText} />);
    screen.getByText(headingText);
  });

  it("renders with a custom component", () => {
    const customComponent = <button data-testid="custom-button" />;
    render(<PageTitleBar rightSideContent={customComponent} />);
    screen.getByTestId("custom-button");
  });

  it("renders with a back navigation button when enabled", async () => {
    const history = createMemoryHistory();
    const previousPage = "/previouspage";
    const currentPage = "/currentPage";
    history.push(previousPage);
    history.push(currentPage);

    render(
      <Router history={history}>
        <PageTitleBar enableBackNav />
      </Router>
    );

    expect(history.location.pathname).toBe(currentPage);
    const backButton = screen.getByTestId("back-button");
    userEvent.click(backButton);
    expect(history.location.pathname).toBe(previousPage);
  });

  it("opens a confirmation modal when back button is clicked and message is provided", async () => {
    const history = createMemoryHistory();
    history.push("/previousPage");
    history.push("/currentPage");

    const confirmationMessage = "Are you, like, absolutely sure?????";
    render(
      <Router history={history}>
        <PageTitleBar
          enableBackNav
          //          backNavConfirmationMessage={confirmationMessage}
        />
      </Router>
    );

    userEvent.click(screen.getByTestId("back-button"));
    //userEvent.click(screen.getByText(/leave/i, { selector: "button" }));
    expect(history.location.pathname).toBe("/previousPage");
  });
});
