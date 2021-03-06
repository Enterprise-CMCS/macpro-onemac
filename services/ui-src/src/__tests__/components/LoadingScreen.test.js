import React from "react";
import ReactDOM from "react-dom";
import LoadingScreen from "../../components/LoadingScreen";


test("renders without crashing", () => {
    const div = document.createElement('div');
    ReactDOM.render(<LoadingScreen />, div);
});
