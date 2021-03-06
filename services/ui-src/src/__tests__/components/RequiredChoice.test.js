import React from "react";
import ReactDOM from "react-dom";
import RequiredChoice from "../../components/RequiredChoice";


test("renders without crashing", () => {
    const div = document.createElement('div');
    ReactDOM.render(<RequiredChoice  fieldInfo={} label={}/>, div);
});
