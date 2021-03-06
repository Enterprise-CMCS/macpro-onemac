import React from "react";
import AlertBar from "../../components/AlertBar";
import { render, screen } from '@testing-library/react';


test("renders without crashing", () => {
    render(<AlertBar />);
    expect(screen.getByText('Alert')).toBeInTheDocument();
});