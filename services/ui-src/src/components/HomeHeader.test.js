import React from "react";
import { render, act, screen, fireEvent } from "@testing-library/react";
import HomeHeader from "./HomeHeader";

describe("HomeHeader", () => {
  it("renders without crashing", () => {
    render(<HomeHeader />);
  });

  it("image disappears with scrollTop too large", () => {
    render(<HomeHeader />);
    const polygonGroupImage = screen.getByAltText("polygon-img");
    expect(polygonGroupImage).toBeVisible();
    document.documentElement.scrollTop = 1000;
    act(() => {
      fireEvent.scroll(global, { target: { scrollY: 70 } });
    });
    expect(polygonGroupImage).not.toBeVisible();
  });

  it("image remains with scrollTop less than 500", () => {
    render(<HomeHeader />);
    const polygonGroupImage = screen.getByAltText("polygon-img");
    expect(polygonGroupImage).toBeVisible();
    document.documentElement.scrollTop = 100;
    act(() => {
      fireEvent.scroll(global, { target: { scrollY: 70 } });
    });
    expect(polygonGroupImage).toBeVisible();
  });
});
