import React from "react";
import ReactDOM from "react-dom";
import WaiverRAI from "../../changeRequest/WaiverRai";


test("renders without crashing", () => {
    const div = document.createElement('div');
    ReactDOM.render(<WaiverRAI />, div);
});