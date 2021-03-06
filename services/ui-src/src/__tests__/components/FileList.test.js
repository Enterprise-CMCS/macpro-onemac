import React from "react";
import ReactDOM from "react-dom";
import FileList from "../../components/FileList";


test("renders without crashing", () => {
    const div = document.createElement('div');
    ReactDOM.render(<FileList />, div);
});
