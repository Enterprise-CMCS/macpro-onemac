import React from "react";
import { MACCard } from "./MACCard";
import { ExternalLinkIcon } from "@cmsgov/design-system";
import { formatDateOnly } from "../utils/date-utils";
import { NotificationType } from "../domain-types";

export const NotificationCard = (props: NotificationType) => {
  const date = formatDateOnly(props.publicationDate);
  return (
    <MACCard withBorder childContainerClassName="home-content-full-width" data-testid="notification-card">
      <b className="ds-u-color--primary">{props.header}: </b>
      {props.body}{" "}
      {props.buttonLink && props.buttonText && (
        <a className="ds-u-color--primary" href={props.buttonLink}>
          {props.buttonText}
        </a>
      )}{" "}
      {props.buttonLink && <ExternalLinkIcon />} {date}
    </MACCard>
  );
};
