import React from "react";
import { Link } from "@material-ui/core";

/**
 * Returns the ID specific form element
 */
const TransmittalNumber: React.FC<{
  idLabel: string;
  hintText: string[];
  idFAQLink: string;
  statusLevel: string;
  statusMessage: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}> = ({
  idLabel,
  hintText,
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
        {hintText.map(function (text) {
          return <p className="field-hint">{text}</p>;
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
        value={value}
        onChange={onChange}
        required
        disabled={disabled}
      ></input>
    </div>
  );
};

export default TransmittalNumber;
