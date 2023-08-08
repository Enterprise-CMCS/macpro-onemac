import React, { PropsWithChildren } from "react";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

interface MACCardProps extends PropsWithChildren<any> {
  title: string;
  description?: string;
  linkTo: string;
  className?: string;
  strongText?: string;
}
export type MACTriageCardProps = Omit<MACCardProps, "children">;

/** Styled wrapper for use in MACCards */
export const MACCardWrapper = ({
  children,
  className,
}: PropsWithChildren<Pick<MACCardProps, "className">>) => {
  return (
    <div className="mac-card">
      {children && <div className={className}>{children}</div>}
    </div>
  );
};
/** Styled title for use in MACCards */
export const MACCardTitle = ({ title }: Pick<MACCardProps, "title">) => {
  return <div className="choice-title">{title}</div>;
};
/** A MACCard for use in options lists that lead to a destination, such as
 * the triage options found in {@link Triage} */
export const MACTriageCard = ({
  title,
  description,
  linkTo,
  strongText,
}: MACTriageCardProps) => {
  return (
    <label>
      <Link to={linkTo} className="mac-triage-link">
        <MACCardWrapper className={"mac-triage-card-display"}>
          <div>
            <MACCardTitle title={title} />
            {description && (
              <p className="mac-triage-card-description">{description}</p>
            )}
            {strongText && (
              <p className="mac-triage-card-strong-text">{strongText}</p>
            )}
          </div>
          <FontAwesomeIcon
            icon={faChevronRight}
            className="choice-item-arrow"
          />
        </MACCardWrapper>
      </Link>
    </label>
  );
};
export const MACRemovableCard = () => {};
