import React from "react";
import { Auth } from "aws-amplify";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import AlertBar from "../components/AlertBar";
import { ALERTS_MSG } from "../libs/alert-messages";
import PageTitleBar from "../components/PageTitleBar";
import config from "../utils/config";

export default function DevLogin() {
  const { userHasAuthenticated } = useAppContext();
  const showDevLogin = config.ALLOW_DEV_LOGIN === "true";
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
  });
  PageTitleBar.setPageTitleInfo({ heading: "Developer Login", text: "" });

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await Auth.signIn(fields.email, fields.password);
      userHasAuthenticated(true);
    } catch (error) {
      console.log("Error while logging in.", error);
      AlertBar.alert(ALERTS_MSG.LOGIN_ERROR);
    }
  }

  return (
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
    </div>
  );
}
