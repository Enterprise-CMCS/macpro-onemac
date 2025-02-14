import React, { useState } from "react";
import { Alert, Button } from "@cmsgov/design-system";
import closingX from "../images/AlertClosingX.svg";
import { NotificationType } from "../domain-types";
import NotificationApi from "../utils/NotificationApi";
import { LOCAL_STORAGE_USERNOTIFICATIONS } from "../utils/StorageKeys";

type NotificationBannerProps = NotificationType & {
  userEmail: string;
};

const CLOSING_X_IMAGE = (
  <img alt="close-x" className="closing-x" src={closingX} />
);

const NotificationBanner: React.FC<NotificationBannerProps> = (
  props: NotificationBannerProps
) => {
  // notification state should be grabbed from context
  const [showNotification, setShowNotification] = useState<boolean>(true);

  // closing banner invokes API call
  const close = () => {
    (async () => {
      const dissmissed = await NotificationApi.dismissUserNotifications(
        props.userEmail,
        props.sk.split("NOTIFICATION#")[1]
      );
      console.log("dissmissed emails: ", dissmissed);
    })();
    localStorage.removeItem(LOCAL_STORAGE_USERNOTIFICATIONS);
    setShowNotification(false);
  };

  if (!showNotification) return <></>;
  return (
    <Alert className="notification-alert" data-testid="notification-alert">
      <div
        style={{ width: "100%" }}
        className="ds-u-display--flex ds-u-justify-content--between"
      >
        {/* TODO: put in flex, make button black */}
        <div>
          <h2 className="ds-c-alert__header">{props.header}</h2>
          <p className="">{props.body}</p>
        </div>
        <div className="ds-u-display--flex ds-u-align-items--start">
          {props.buttonLink && props.buttonText && (
            <Button
              className="ds-u-color--black ds-u-border--dark ds-u-fill--transparent"
              href={props.buttonLink}
            >
              {props.buttonText}
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
