import React from "react";
import ReactDOM from "react-dom";
import SubmissionView from "../../changeRequest/SubmissionView";


test("renders without crashing", () => {
    const div = document.createElement('div');
    ReactDOM.render(<SubmissionView  formInfo={}/>, div);
});