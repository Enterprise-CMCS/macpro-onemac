import React, { PropsWithChildren } from "react";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import closingX from "../images/ClosingX.svg";

export type MACCardProps = PropsWithChildren<{
  title?: string;
  description?: string;
  childContainerClassName?: string;
  withBorder?: boolean;
}>;
export type MACFieldsetOption = Pick<MACCardProps, "title" | "description"> & {
  linkTo: string;
  state?: any;
  strongText?: string;
  /** For use ONLY when actions are necessary before navigation.
   *
   * We should consider deprecating this pattern as it's only used once,
   * and these FieldsetOption interfaces are used primarily for triaged
   * navigation to an end page.
   *
   * Current use can be found in {@link CMSSignup} in the CMS_OPTIONS variable
   * */
  onClick?: () => any;
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
export const MACCardWrapper = ({
  children,
  childContainerClassName,
  withBorder,
}: PropsWithChildren<Omit<MACCardProps, "title" | "description">>) => {
  return (
    <div className={`mac-card-wrapper`}>
      <div data-testid="gradient-top" className="mac-card-gradient-top" />
      {children && (
        <div
          data-testid="MACCard-children"
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
export const MACCardTitle = ({ title }: Pick<MACCardProps, "title">) => {
  return (
    <div data-testid="mac-card-header" className="mac-card-title">
      {title}
    </div>
  );
};
/** The most basic MACCard to wrap children in a card style element.
 * Use `withBorder` if you want to include the gradient top border. */
export const MACCard = ({
  title,
  children,
  withBorder = true,
  childContainerClassName,
}: MACCardProps) => {
  return (
    <MACCardWrapper
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
  onClick,
}: MACFieldsetOption) => {
  const Option = () => (
    <div className={"mac-triage-card-display"}>
      <div>
        {title && <MACCardTitle title={title} />}
        {description && <p className="card-description">{description}</p>}
        {strongText && <p className="card-strong-text">{strongText}</p>}
      </div>
      <FontAwesomeIcon
        data-testid="chevron-right"
        icon={faChevronRight}
        className="choice-item-arrow"
      />
    </div>
  );
  return (
    <label className="mac-triage-link" onClick={onClick}>
      <Link
        data-testid="link-wrapper"
        to={{ pathname: linkTo, state: state }}
        className="mac-triage-link"
      >
        <Option />
      </Link>
    </label>
  );
};
/** Feed in options, get a vertical list of MACFieldsetCardOptions back. */
export const MACFieldsetOptionsList = ({
  choices,
}: {
  choices: MACFieldsetOption[];
}) => {
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
    <MACCardWrapper childContainerClassName="mac-card-removable-wrapper">
      <MACCardTitle title={title} />
      {!isReadOnly && hasRoleAccess && renderIf && (
        <button
          aria-label={`Self-revoke access to ${title}`}
          disabled={isReadOnly}
          onClick={onClick}
        >
          <img alt="" className="closing-x" src={closingX} />
        </button>
      )}
      {description && <span>{description}</span>}
      {children}
    </MACCardWrapper>
  );
};
