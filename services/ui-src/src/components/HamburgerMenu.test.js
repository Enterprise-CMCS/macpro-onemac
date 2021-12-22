import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import HamburgerMenu from "./HamburgerMenu";

import { act } from "react-dom/test-utils";

describe("HamburgerMenu", () => {
  it("opens a menu on click of icon and renders link array", () => {
    const linksToDisplay = [<a>testing</a>, <a>testing</a>];
    render(<HamburgerMenu linksToDisplay={linksToDisplay} />);
    const hamburgerButton = screen.getByRole("button", {
      name: /hamburger menu/i,
    });
    fireEvent.click(hamburgerButton);
    const menuOpen = screen.getByRole("listbox", {
      name: /opened hamburger menu/i,
    });
    expect(menuOpen).toBeVisible();
    const links = screen.getByRole("navigation").childNodes;
    expect(links).toHaveLength(linksToDisplay.length);
  });

  it("resize of window and opening/closing of menu", () => {
    render(<HamburgerMenu />);
    const hamburgerButton = screen.getByRole("button", {
      name: /hamburger menu/i,
    });
    fireEvent.click(hamburgerButton);
    const menuOpen = screen.getByRole("listbox", {
      name: /opened hamburger menu/i,
    });
    expect(menuOpen).toBeVisible();
    act(() => {
      global.innerWidth = 940;
      global.dispatchEvent(new Event("resize"));
    });
    expect(menuOpen).not.toBeVisible();
  });
});
