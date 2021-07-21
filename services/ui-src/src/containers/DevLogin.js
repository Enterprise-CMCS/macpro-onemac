import React, { useState } from "react";
import { Auth } from "aws-amplify";

import { RESPONSE_CODE } from "cmscommonlib";

import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import config from "../utils/config";

import PageTitleBar from "../components/PageTitleBar";
import AlertBar from "../components/AlertBar";

export default function DevLogin() {
  const { setUserInfo } = useAppContext();
  const showDevLogin = config.ALLOW_DEV_LOGIN === "true";
  const [alertCode, setAlertCode] = useState(RESPONSE_CODE.NONE);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
  });

  async function handleSubmit(event) {
    event.preventDefault();

    let newAlertCode = RESPONSE_CODE.NONE;

    try {
      await Auth.signIn(fields.email, fields.password);
      setUserInfo(true);
    } catch (error) {
      console.log("Error while logging in.", error);
      newAlertCode = RESPONSE_CODE.LOGIN_ERROR;
    }
    setAlertCode(newAlertCode);
  }

  function closedAlert() {
    setAlertCode(RESPONSE_CODE.NONE);
  }

  return (
    <div>
      <PageTitleBar heading="Developer Login" />
      <AlertBar alertCode={alertCode} closeCallback={closedAlert} />
      <div className="form-container">
        {showDevLogin && (
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <h3>Developer Login</h3>
              <div className="form-card">
                <label className="ds-c-label" htmlFor="email">
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
                <label className="ds-c-label" htmlFor="password">
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
                <input
                  id="loginDevUserBtn"
                  type="submit"
                  className="form-submit"
                  value="Login"
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
