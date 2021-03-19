import React from "react";
import ReactDOM from "react-dom";
import AlertBar from "../../components/AlertBar";


test("renders without crashing", () => {
    const div = document.createElement('div');
    ReactDOM.render(<AlertBar />, div);
});