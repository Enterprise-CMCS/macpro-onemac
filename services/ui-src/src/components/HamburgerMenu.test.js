import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import HamburgerMenu from "./HamburgerMenu";

import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom";

import { Globals } from "@react-spring/web";

Globals.assign({
  skipAnimation: true,
});

it("opens a menu on click of icon and renders link array", async () => {
  const linksToDisplay = [<a>testing</a>, <a>testing</a>];
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
