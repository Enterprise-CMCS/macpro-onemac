import React from "react";
import ReactDOM from "react-dom";
import StepCard from "../../components/StepCard";


test("renders without crashing", () => {
    const div = document.createElement('div');
    ReactDOM.render(<StepCard />, div);
});