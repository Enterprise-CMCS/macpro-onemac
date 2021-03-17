import React from "react";
import ReactDOM from "react-dom";
import Waiver from "../../changeRequest/Waiver";


test("renders without crashing", () => {
    const div = document.createElement('div');
    ReactDOM.render(<Waiver />, div);
});