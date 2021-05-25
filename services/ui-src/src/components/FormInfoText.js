import React from "react";

export const FORM_INFO_TEXT_ID = "form-info-text";

/**
 * PageTitleBar contains supplemental information for the user in the form of a
 * title (usually describes the page) and an optional description (see About page)
*/
const FormInfoText = ({ text }) => {

    return (<div id={FORM_INFO_TEXT_ID}>
            <br/>
            <p className="ds-c-alert__text">{text}</p>
          </div>
    );
};

export default FormInfoText;
