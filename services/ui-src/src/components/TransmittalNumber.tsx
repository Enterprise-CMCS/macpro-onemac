import React from "react";
import { Link } from "@material-ui/core";
import { FieldHint } from "cmscommonlib";

/**
 * Returns the ID specific form element
 */
const TransmittalNumber: React.FC<{
  inputId: string;
  idLabel: string;
  idFieldHint: FieldHint[];
  idFAQLink: string;
  faqIdLabel?: string;
  statusLevel: string;
  statusMessage: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}> = ({
  inputId,
  idLabel,
  idFieldHint,
  idFAQLink,
  faqIdLabel,
  statusLevel,
  statusMessage,
  value,
  onChange,
  disabled,
}) => {
  let statusMsgClass = "ds-u-color--error";

  if (statusLevel === "warn") {
    statusMsgClass = "ds-u-color--primary";
  }

  return (
    <div>
      <div className="label-container">
        <div>
          <label htmlFor={inputId} className="required">
            {idLabel}
          </label>
        </div>
        {idFAQLink && (
          <div className="label-rcol">
            <Link target="new" href={idFAQLink}>
              {faqIdLabel ? faqIdLabel : `What is my ${idLabel}?`}
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
      {statusMessage && (
        <div id={`${inputId}-status-msg`} className={statusMsgClass}>
          {statusMessage.split("\n").map((m) => (
            <div>{m}</div>
          ))}
        </div>
      )}
      <input
        className="field"
        type="text"
        id={inputId}
        name="transmittalNumber"
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
    </div>
  );
};

export default TransmittalNumber;
