import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import HamburgerMenu from "./HamburgerMenu";

import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom";

import { Globals } from "@react-spring/web";

Globals.assign({
  skipAnimation: true,
});

it("opens a menu on click of icon and renders link array, closes hamburger menu when link is clicked", async () => {
  const linksToDisplay = [<a>testing1</a>, <a>testing2</a>];
  render(<HamburgerMenu linksToDisplay={linksToDisplay} />);
  const hamburgerButton = screen.getByRole("button", {
    name: /hamburger menu/i,
  });
  fireEvent.click(hamburgerButton);
  const menuOpen = screen.getByRole("listbox", {
    name: /opened hamburger menu/i,
  });
  await waitFor(() => expect(menuOpen).toBeVisible());
  const links = screen.getByRole("navigation").childNodes;
  expect(links).toHaveLength(linksToDisplay.length);
  const linkToClick = screen.getByText(/testing1/i);
  fireEvent.click(linkToClick);
  expect(menuOpen).not.toBeVisible();
});

it("resize of window and opening/closing of menu", async () => {
  render(<HamburgerMenu />);
  const hamburgerButton = screen.getByRole("button", {
    name: /hamburger menu/i,
  });
  fireEvent.click(hamburgerButton);
  const menuOpen = screen.getByRole("listbox", {
    name: /opened hamburger menu/i,
  });
  await waitFor(() => expect(menuOpen).toBeVisible());
  act(() => {
    global.innerWidth = 940;
    global.dispatchEvent(new Event("resize"));
  });
  expect(menuOpen).not.toBeVisible();
});

it("resize of window hamburger open", async () => {
  render(<HamburgerMenu />);
  act(() => {
    global.innerWidth = 920;
    global.dispatchEvent(new Event("resize"));
  });
  const hamburgerButton = screen.getByRole("button", {
    name: /hamburger menu/i,
  });
  fireEvent.click(hamburgerButton);
  const menuOpen = screen.getByRole("listbox", {
    name: /opened hamburger menu/i,
  });
  await waitFor(() => expect(menuOpen).toBeVisible());
  const buttonCloseClick = screen.getByRole("button");
  fireEvent.click(buttonCloseClick);
  expect(menuOpen).not.toBeVisible();
});

it("clicks outside of hamburger menu to close it", async () => {
  render(
    <div data-testid="testclick">
      <HamburgerMenu />
    </div>
  );
  act(() => {
    global.innerWidth = 920;
    global.dispatchEvent(new Event("resize"));
  });
  const hamburgerButton = screen.getByRole("button", {
    name: /hamburger menu/i,
  });
  fireEvent.click(hamburgerButton);
  const menuOpen = screen.getByRole("listbox", {
    name: /opened hamburger menu/i,
  });
  await waitFor(() => expect(menuOpen).toBeVisible());
  const testDiv = screen.getByTestId("testclick");
  fireEvent.click(testDiv);
  await waitFor(() => expect(menuOpen).not.toBeVisible());
});
