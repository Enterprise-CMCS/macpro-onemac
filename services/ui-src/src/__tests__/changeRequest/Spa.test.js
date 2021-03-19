import React from "react";
import ReactDOM from "react-dom";
import SPA from "../../changeRequest/Spa";


test("renders without crashing", () => {
    const div = document.createElement('div');
    ReactDOM.render(<SPA />, div);
});