import React from "react";
import ReactDOM from "react-dom";
import PageTitleBar from "../../components/PageTitleBar";


test("renders without crashing", () => {
    const div = document.createElement('div');
    ReactDOM.render(<PageTitleBar />, div);
});
