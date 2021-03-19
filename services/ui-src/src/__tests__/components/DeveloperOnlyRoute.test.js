import React from "react";
import ReactDOM from "react-dom";
import DeveloperOnlyRoute from "../../components/DeveloperOnlyRoute";


test("renders without crashing", () => {
    const div = document.createElement('div');
    ReactDOM.render(<DeveloperOnlyRoute />, div);
});