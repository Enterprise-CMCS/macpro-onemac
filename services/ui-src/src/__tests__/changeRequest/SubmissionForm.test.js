import React from "react";
import ReactDOM from "react-dom";
import SubmissionForm from "../../changeRequest/SubmissionForm";


test("renders without crashing", () => {
    const div = document.createElement('div');
    ReactDOM.render(<SubmissionForm  changeRequestType={}/>, div);
});