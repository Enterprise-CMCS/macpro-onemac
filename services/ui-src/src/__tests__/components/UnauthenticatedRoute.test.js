import React from "react";
import ReactDOM from 'react-dom';
import UnauthenticatedRoute from "../../components/UnauthenticatedRoute";


test("renders without crashing", () => {
    const div = document.createElement('div');
    ReactDOM.render(<UnauthenticatedRoute />, div);
});
