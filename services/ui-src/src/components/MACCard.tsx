import React, { PropsWithChildren } from "react";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import closingX from "../images/ClosingX.svg";

export type MACCardProps = PropsWithChildren<{
  title?: string;
  description?: string;
  childContainerClassName?: string;
  withGradientBar?: boolean;
  withBorder?: boolean;
}>;
export type MACTriageCardProps = Omit<MACCardProps, "children"> & {
  linkTo: string;
  state?: any;
  strongText?: string;
};
export type MACRemovableCardProps = MACCardProps & {
  onClick: () => any;
  isReadOnly: boolean;
  hasRoleAccess: boolean;
  renderIf?: boolean;
};
export type MACCardListProps = PropsWithChildren<{
  legend: string;
  additionalContainerClassName?: string;
}>;

/** Styled wrapper for use in MACCards, consolidates the use of 'mac-card'
 * css class. */
const MACCardWrapper = ({
  children,
  childContainerClassName,
  withGradientBar,
  withBorder,
}: PropsWithChildren<Omit<MACCardProps, "title" | "description">>) => {
  return (
    <div className={`mac-card-wrapper`}>
      {withGradientBar && <div className="mac-card-gradient-top" />}
      {children && (
        <div
          className={`${
            withBorder ? "mac-card-border" : ""
          } ${childContainerClassName}`}
        >
          {children}
        </div>
      )}
    </div>
  );
};
/** Styled title for use in MACCards. Consolidates the use of 'mac-card-title'
 * css class. */
const MACCardTitle = ({ title }: Pick<MACCardProps, "title">) => {
  return <div className="mac-card-title">{title}</div>;
};
/** The most basic MACCard to wrap children in a card style element.
 * Use `withBorder` if you want to include the gradient top border. */
export const MACCard = ({
  title,
  children,
  withGradientBar = true,
  withBorder = true,
  childContainerClassName,
}: MACCardProps) => {
  return (
    <MACCardWrapper
      withGradientBar={withGradientBar}
      withBorder={withBorder}
      childContainerClassName={`mac-default-card-children ${childContainerClassName}`}
    >
      {title && <MACCardTitle title={title} />}
      {children}
    </MACCardWrapper>
  );
};
/** A styled MACCard for nesting {@link MACFieldsetCardOption} with a fieldset and
 * legend */
export const MACFieldsetCard = ({
  children,
  legend,
  additionalContainerClassName,
}: MACCardListProps) => {
  return (
    <section className={`mac-fieldset-wrapper ${additionalContainerClassName}`}>
      <fieldset>
        <legend className="mac-fieldset-legend">{legend}</legend>
        <MACCard childContainerClassName="mac-fieldset-options-list">
          {children}
        </MACCard>
      </fieldset>
    </section>
  );
};
/** An element for use in options lists that lead to a destination, such as
 * the triage options found in {@link Triage} */
export const MACFieldsetCardOption = ({
  title,
  description,
  linkTo,
  state,
  strongText,
}: MACTriageCardProps) => {
  const Option = () => (
    <MACCardWrapper childContainerClassName={"mac-triage-card-display"}>
      <div>
        {title && <MACCardTitle title={title} />}
        {description && <p id="description">{description}</p>}
        {strongText && <p id="strong">{strongText}</p>}
      </div>
      <FontAwesomeIcon icon={faChevronRight} className="choice-item-arrow" />
    </MACCardWrapper>
  );
  return (
    <label className="mac-triage-link">
      <Link to={{ pathname: linkTo, state: state }} className="mac-triage-link">
        <Option />
      </Link>
    </label>
  );
};
/** Feed in options, get a vertical list of MACFieldsetCardOptions back.
 * TODO: Better types for props; this was refactored from a javascript
 *  portion of the codebase. */
export const MACFieldsetOptionsList = ({ choices }: { choices: any[] }) => {
  return (
    <>
      {choices.map((choice, key) => (
        <MACFieldsetCardOption {...choice} key={key} />
      ))}
    </>
  );
};
/** A MACCard for use in lists with removable items. Pass in an `onClick`
 * function to perform when the X button is clicked. This component uses
 * the `isReadOnly`, `hasRoleAccess`, and `renderIf` conditions to gate
 * access to the X button. It will not render if any of those conditions
 * are false. */
export const MACRemovableCard = ({
  title,
  description,
  onClick,
  isReadOnly,
  hasRoleAccess,
  renderIf = true,
  children,
}: MACRemovableCardProps) => {
  return (
    <MACCardWrapper
      withGradientBar={true}
      childContainerClassName="mac-card-removable-wrapper"
    >
      <div>
        {title && <MACCardTitle title={title} />}
        {!isReadOnly && hasRoleAccess && renderIf && (
          <button
            aria-label={`Self-revoke access to ${title}`}
            disabled={isReadOnly}
            onClick={onClick}
          >
            <img alt="" className="closing-x" src={closingX} />
          </button>
        )}
      </div>
      {description && <span>{description}</span>}
      {children}
    </MACCardWrapper>
  );
};
