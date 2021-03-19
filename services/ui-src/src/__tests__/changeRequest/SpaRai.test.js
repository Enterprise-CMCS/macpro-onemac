import React from "react";
import ReactDOM from "react-dom";
import SPARai from "../../changeRequest/SpaRai";


test("renders without crashing", () => {
    const div = document.createElement('div');
    ReactDOM.render(<SPARai />, div);
});