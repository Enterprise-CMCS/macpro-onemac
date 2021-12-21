import React from "react";
import { render, act, screen, fireEvent } from "@testing-library/react";
import HomeHeader from "./HomeHeader";

describe("HomeHeader", () => {
  it("renders without crashing", () => {
    render(<HomeHeader />);
  });

  it("show/hide image when scrolling from top", () => {
    render(<HomeHeader />);
    const scrollMock = { addEventListener: jest.fn() };
    const polygonGroupImage = screen.getByAltText("polygon-img");
    expect(polygonGroupImage).toBeVisible();
    jest.spyOn(React, "useEffect").mockImplementation(() => scrollMock);
    act(() => {
      fireEvent.scroll(global, { target: { scrollY: 700 } });
    });
    expect(scrollMock.addEventListener).toBeTruthy();
  });
});
