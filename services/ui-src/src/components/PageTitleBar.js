import React from "react";

export const TITLE_BAR_ID = "title_bar";

/**
 * PageTitleBar contains supplemental information for the user in the form of a
 * title (usually describes the page) and an optional description (see About page)
*/  
const PageTitleBar = ({ heading, text }) => {

    return (
          <div id={TITLE_BAR_ID} className="page-title-bar">
            <h1>{heading}</h1>
              {text && (
                <p className="ds-c-alert__text">{text}</p>
              )}
          </div>
    );
};

export default PageTitleBar;