import React from "react";
import ReactDOM from "react-dom";
import WaiverExtension from "../../changeRequest/WaiverExtension";



test("renders without crashing", () => {
    const div = document.createElement('div');
    ReactDOM.render(<WaiverExtension />, div);
});