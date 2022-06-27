import React from "react";
import { Link } from "@material-ui/core";
import { FieldHint } from "cmscommonlib";
import { Review } from "@cmsgov/design-system";

/**
 * Returns the ID specific form element
 */
const ComponentId: React.FC<{
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
    <>
      {!disabled && (
        <>
          <div className="label-container">
            <div>
              <label htmlFor="componentId" className="required">
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
                  key={"fieldHint" + idx}
                  className={idFieldHint.className || "field-hint"}
                >
                  {idFieldHint.text}
                </p>
              );
            })}
          </div>
          {statusMessage && (
            <div id="componentIdStatusMsg" className={statusMsgClass}>
              {statusMessage}
            </div>
          )}
          <input
            className="field"
            type="text"
            id="componentId"
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
