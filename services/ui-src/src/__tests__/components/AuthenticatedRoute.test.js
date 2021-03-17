import React from "react";
import ReactDOM from "react-dom";
import AuthenticatedRoute from "../../components/AuthenticatedRoute";


test("renders without crashing", () => {
    const div = document.createElement('div');
    ReactDOM.render(<AuthenticatedRoute />, div);
});