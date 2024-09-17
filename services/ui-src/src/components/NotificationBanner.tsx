import React, { useState } from "react";
import { Alert, Button } from "@cmsgov/design-system";
import closingX from "../images/AlertClosingX.svg";

const CLOSING_X_IMAGE = (
  <img alt="close-x" className="closing-x" src={closingX} />
);

interface NotificationBannerProps {
  header: string;
  body: string;
  button?: {
    text: string;
    link: string;
  };
}

const NotificationBanner: React.FC<NotificationBannerProps> = (
  props: NotificationBannerProps
) => {
  // notification state should be grabbed from context
  const [showNotification, setShowNotification] = useState<boolean>(true);

  // closing banner invokes API call
  const close = () => {
    // TODO: make an API call to
    setShowNotification(false);
  };

  if (!showNotification) return <></>;
  return (
    <Alert className="notification-alert">
      <div
        style={{ width: "100%" }}
        className="ds-u-display--flex ds-u-justify-content--between"
      >
        {/* TODO: put in flex, make button black */}
        <div>
          <h2 className="ds-c-alert__header">{props.header}</h2>
          <p className="">{props.body}</p>
        </div>
        <div>
          {props.button && (
            <Button
              className="ds-u-color--black ds-u-border--dark ds-u-fill--transparent"
              href={props.button.link}
            >
              {props.button.text}
            </Button>
          )}

          <button
            aria-label={"Dismiss alert"}
            className="ds-u-margin-left--2 ds-u-fill--transparent"
            onClick={close}
          >
            {CLOSING_X_IMAGE}
          </button>
        </div>
      </div>
    </Alert>
  );
};

export default NotificationBanner;
