import React from "react";
import { Link } from "@material-ui/core";
import { FieldHint } from "cmscommonlib";
import { Review } from "@cmsgov/design-system";
import { Message } from "../libs/formLib";

/**
 * Returns the ID specific form element
 */
const ComponentId: React.FC<{
  idLabel: string;
  idFieldHint: FieldHint[];
  idFAQLink?: string;
  statusMessages: Message[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}> = ({
  idLabel,
  idFieldHint,
  idFAQLink,
  statusMessages,
  value,
  onChange,
  disabled,
}) => {
  const componentIdValue: string =
    "componentId_" + idLabel?.replace(/\s/g, "_");
  return (
    <>
      {!disabled && (
        <>
          <div className="label-container">
            <div>
              <label htmlFor={componentIdValue} className="required">
                {idLabel}
              </label>
            </div>
            {idFAQLink && (
              <div className="label-rcol">
                <Link target="new" href={idFAQLink}>
                  What is my {idLabel}?
                </Link>
              </div>
            )}
            {idFieldHint?.map(function (idFieldHint, idx) {
              return (
                <p
                  id={"fieldHint" + idx}
                  key={"fieldHint" + idx}
                  className={idFieldHint.className || "field-hint"}
                >
                  {idFieldHint.text}
                </p>
              );
            })}
          </div>
          {statusMessages &&
            statusMessages.length > 0 &&
            statusMessages.map((message, i) => (
              <div
                key={i}
                id={"componentIdStatusMsg" + i}
                className={"ds-u-color--" + message.statusLevel}
              >
                {message.statusMessage}
              </div>
            ))}
          <input
            className="field"
            type="text"
            id={componentIdValue}
            name="componentId"
            aria-describedby={idFieldHint
              ?.map(function (idFieldHint, idx) {
                return "fieldHint" + idx;
              })
              .join(" ")}
            value={value}
            onChange={onChange}
            required
            disabled={disabled}
          ></input>
        </>
      )}
      {disabled && <Review heading={idLabel}>{value}</Review>}
    </>
  );
};

export default ComponentId;
