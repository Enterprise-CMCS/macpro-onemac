import React from "react";
import { FieldHint } from "cmscommonlib";

/**
 * Returns the ID specific form element
 */
const ParentNumber: React.FC<{
  idLabel: string;
  idFieldHint: FieldHint[];
  statusMessage: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ idLabel, idFieldHint, statusMessage, value, onChange }) => {
  return (
    <div>
      <div className="label-container">
        <div>
          <label htmlFor="parentNumber" className="required">
            {idLabel}
          </label>
        </div>
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
        <div id="parentNumberStatusMsg" className="ds-u-color--error">
          {statusMessage.split("\n").map((m, i) => (
            <div key={i}>{m}</div>
          ))}
        </div>
      )}
      <input
        className="field"
        type="text"
        id="parentNumber"
        name="parentNumber"
        aria-describedby={idFieldHint
          ?.map(function (idFieldHint, idx) {
            return "fieldHint" + idx;
          })
          .join(" ")}
        value={value}
        onChange={onChange}
        required
      ></input>
    </div>
  );
};

export default ParentNumber;
