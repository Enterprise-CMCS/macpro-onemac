import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import { ALERTS_MSG } from "../libs/alert-messages";
import config from "../utils/config";
import PageTitleBar, { TITLE_BAR_ID } from "../components/PageTitleBar";
import { Alert } from "@cmsgov/design-system";

export default function DevLogin() {
  const { userHasAuthenticated } = useAppContext();
  const showDevLogin = config.ALLOW_DEV_LOGIN === "true";
  const [alert, setAlert] = useState();
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
  });

  const jumpToPageTitle = () => {
    var elmnt = document.getElementById(TITLE_BAR_ID);
    if (elmnt) elmnt.scrollIntoView();
  };

  useEffect(() => {
    if (alert && alert.heading && alert.heading !== "") {
      jumpToPageTitle();
    }
  }, [alert]);

  const renderAlert = (alert) => {
    if (!alert) return;
    if (alert.heading && alert.heading !== "") {
      return (
        <div className="alert-bar">
          <Alert variation={alert.type} heading={alert.heading}>
            <p className="ds-c-alert__text">{alert.text}</p>
          </Alert>
        </div>
      );
    }
  };

  async function handleSubmit(event) {
    let newAlert = ALERTS_MSG.NONE;
    event.preventDefault();

    try {
      await Auth.signIn(fields.email, fields.password);
      userHasAuthenticated(true);
    } catch (error) {
      console.log("Error while logging in.", error);
      newAlert = ALERTS_MSG.LOGIN_ERROR;
    }
    setAlert(newAlert);
  }

  return (
    <div>
    <PageTitleBar heading="Developer Login" text="" />
    {renderAlert(alert)}
    <div className="form-container">
      {showDevLogin && (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h3>Developer Login</h3>
            <div className="form-card">
              <label
                className="ds-c-label"
                htmlFor="email"
              >
                Email<span className="required-mark">*</span>
              </label>
              <input
                className="field"
                type="email"
                id="email"
                name="email"
                value={fields.email}
                onChange={handleFieldChange}
                required
              ></input>
              <label
                className="ds-c-label"
                htmlFor="password"
              >
                Password<span className="required-mark">*</span>
              </label>
              <input
                className="field"
                type="password"
                id="password"
                name="password"
                value={fields.password}
                onChange={handleFieldChange}
                required
              ></input>
              <input id="loginDevUserBtn"
                type="submit" className="form-submit" value="Login" />
            </div>
          </form>
        </div>
      )}
    </div></div>
  );
}
