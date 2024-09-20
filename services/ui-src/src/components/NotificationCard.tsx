import React, { PropsWithChildren, ReactChildren } from "react";
import { MACCard } from "./MACCard";
import { ExternalLinkIcon } from "@cmsgov/design-system";

export type NotificationCardProps = PropsWithChildren<{
  header: string;
  body: ReactChildren;
  date: string;
  link?: {
    text: string;
    href: string;
  };
}>;

export const NotificationCard = ({
  header,
  body,
  date,
  link,
}: NotificationCardProps) => {
  return (
    <MACCard withBorder childContainerClassName="home-content-full-width">
      <b className="ds-u-color--primary">{header}: </b>
      {body}{" "}
      {link && (
        <a className="ds-u-color--primary" href={link.href}>
          {link.text}
        </a>
      )}{" "}
      {link && <ExternalLinkIcon />} {date}
    </MACCard>
  );
};
