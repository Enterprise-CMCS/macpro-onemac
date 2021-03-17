import React from "react";
import ReactDOM from "react-dom";
import TransmittalNumber from "../../components/TransmittalNumber";


test("renders without crashing", () => {
    const div = document.createElement('div');
    ReactDOM.render(<TransmittalNumber />, div);
});
