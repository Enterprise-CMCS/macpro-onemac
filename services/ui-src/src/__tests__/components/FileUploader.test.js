import React from "react";
import ReactDOM from "react-dom";
import FileUploader from "../../components/FileUploader";


test("renders without crashing", () => {
    const div = document.createElement('div');
    ReactDOM.render(<FileUploader />, div);
});
