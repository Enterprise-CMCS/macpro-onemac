import React, { useState } from "react";
import { Alert, Button } from "@cmsgov/design-system";
import closingX from "../images/AlertClosingX.svg";

const CLOSING_X_IMAGE = <img alt="" className="closing-x" src={closingX} />;

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
    <div className="alert-bar" id="alert-bar">
      {/* should use cms Alert - informational */}
      <Alert>
        {/* TODO: put in flex, make button black */}
        <h2 className="s-c-alert__heading">{props.header}</h2>
        <p className="ds-c-alert__text">{props.body}</p>
        {props.button && (
          <Button href={props.button.link}>{props.button.text}</Button>
        )}
        <button
          aria-label={"Dismiss alert"}
          className="close-button"
          onClick={close}
        >
          {CLOSING_X_IMAGE}
        </button>
      </Alert>
    </div>
  );
};

export default NotificationBanner;
