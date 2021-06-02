import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@cmsgov/design-system";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

export const TITLE_BAR_ID = "title_bar";

/**
 * PageTitleBar contains supplemental information for the user in the form of a title (usually describes the page).
 * If a enableBackNav prop is present/set to true, the title bar will display with a light theme instead of the default dark theme.
 * @param {Component} rightSideContent - optional content to render on the right hand side of the title bar, such as a Button
 * @param {String} heading - optional text to display in the title bar
 * @param {Boolean} enableBackNav - enables the back button on the title bar (also enables the light theme styling)
 */
const PageTitleBar = ({ heading, rightSideContent, enableBackNav }) => {
  const history = useHistory();

  const titleBarClassName = classNames({
    "page-title-bar": true,
    [enableBackNav ? "title-bar-light-theme" : "title-bar-dark-theme"]: true,
  });

  return (
    <div id={TITLE_BAR_ID} className={titleBarClassName}>
      <div className="title-bar-left-content">
        {enableBackNav && (
          <Button
            id="back-button"
            className="title-bar-back-button"
            onClick={() => history.goBack()}
            variation="transparent"
          >
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="title-bar-back-arrow"
            />
          </Button>
        )}
        <h1>{heading}</h1>
      </div>
      {rightSideContent}
    </div>
  );
};

export default PageTitleBar;
