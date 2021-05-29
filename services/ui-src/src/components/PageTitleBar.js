import React from "react";

export const TITLE_BAR_ID = "title_bar";

/**
 * PageTitleBar contains supplemental information for the user in the form of a
 * title (usually describes the page)
 * @param {Component} rightSideContent - optional content to render on the right hand side of the title bar, such as a Button
 * @param {String} heading - optional text to display in the title bar
 */
const PageTitleBar = ({ heading, rightSideContent }) => {
  return (
    <div id={TITLE_BAR_ID} className="page-title-bar">
      <h1>{heading}</h1>
      {rightSideContent}
    </div>
  );
};

export default PageTitleBar;
