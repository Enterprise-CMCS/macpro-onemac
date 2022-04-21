import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@cmsgov/design-system";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

import { ConfirmationDialog } from "../components/ConfirmationDialog";
import { useFlag } from "../libs/hooksLib";

export const TITLE_BAR_ID = "title_bar";

/**
 * PageTitleBar contains supplemental information for the user in the form of a title (usually describes the page).
 * If a enableBackNav prop is present/set to true, the title bar will display with a light theme instead of the default dark theme.
 * @param {Component} [rightSideContent] - (optional) content to render on the right hand side of the title bar, such as a Button
 * @param {String} [heading] - (optional) text to display in the title bar
 * @param {Boolean} [enableBackNav] - (optional) enables the back button on the title bar (also enables the light theme styling)
 * @param {String} [backNavConfirmationMessage] - (optional) message to display in browser confirmation window when back nav button is clicked
 */
const PageTitleBar = ({
  heading,
  rightSideContent,
  enableBackNav,
  backTo,
  backNavConfirmationMessage,
}) => {
  const history = useHistory();
  const [
    showCancelConfirmation,
    closeCancelConfirmation,
    openCancelConfirmation,
  ] = useFlag();

  const handleBackWithConfirm = useCallback(
    async (event) => {
      event.preventDefault();
      if (backNavConfirmationMessage) openCancelConfirmation();
      else if (backTo) history.push(backTo);
      else history.goBack();
    },
    [backNavConfirmationMessage, backTo, history, openCancelConfirmation]
  );

  return (
    <div
      id={TITLE_BAR_ID}
      className={classNames("page-title-bar", {
        "title-bar-light-theme": enableBackNav,
        "title-bar-dark-theme": !enableBackNav,
      })}
    >
      <div className="header-wrapper">
        <div className="title-bar-left-content">
          {enableBackNav && (
            <Button
              aria-label="Back to previous page"
              id="back-button"
              data-testid="back-button"
              className="title-bar-back-button"
              onClick={handleBackWithConfirm}
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
      {showCancelConfirmation && (
        <ConfirmationDialog
          acceptText="Leave Anyway"
          cancelText="Stay on Page"
          heading="Leave this page?"
          onAccept={() => (backTo ? history.push(backTo) : history.goBack())}
          onCancel={closeCancelConfirmation}
        >
          {backNavConfirmationMessage}
        </ConfirmationDialog>
      )}
    </div>
  );
};

export default PageTitleBar;
