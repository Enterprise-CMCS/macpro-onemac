import React from "react";
import { Link } from "@material-ui/core";
import { FieldHint } from "cmscommonlib";

/**
 * Returns the ID specific form element
 */
const TransmittalNumber: React.FC<{
  idLabel: string;
  idFieldHint: FieldHint[];
  idFAQLink: string;
  statusLevel: string;
  statusMessage: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}> = ({
  idLabel,
  idFieldHint,
  idFAQLink,
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
          <label htmlFor="transmittalNumber" className="required">
            {idLabel}
          </label>
        </div>
        <div className="label-rcol">
          <Link target="new" href={idFAQLink}>
            What is my {idLabel}?
          </Link>
        </div>
        {idFieldHint?.map(function (idFieldHint, idx) {
          return (
            <p
              id={"fieldHint" + idx}
              className={idFieldHint.className || "field-hint"}
            >
              {idFieldHint.text}
            </p>
          );
        })}
      </div>
      {statusMessage && (
        <div id="transmittalNumberStatusMsg" className={statusMsgClass}>
          {statusMessage}
        </div>
      )}
      <input
        className="field"
        type="text"
        id="transmittalNumber"
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
