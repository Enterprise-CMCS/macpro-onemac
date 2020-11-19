import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import AlertBar from "../components/AlertBar";
import { ALERTS_MSG } from "../libs/alert-messages";
import PageTitleBar from "../components/PageTitleBar";
import config from "../utils/config";

export default function DevLogin() {
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
  });
  const showDevLogin = config.ALLOW_DEV_LOGIN === "true";

  PageTitleBar.setPageTitleInfo({ heading: "Developer Login", text: "" });

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      await Auth.signIn(fields.email, fields.password);
      userHasAuthenticated(true);
    } catch (error) {
      console.log("Error while logging in.", error);
      AlertBar.alert(ALERTS_MSG.LOGIN_ERROR);
      setIsLoading(false);
    }
  }

  return (
    <div className="form-container">
      {showDevLogin && (
        <form onSubmit={handleSubmit}>
          <h3>Developer Login</h3>
          <div className="form-card">
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={fields.email}
              onChange={handleFieldChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              type="password"
              value={fields.password}
              onChange={handleFieldChange}
            />
          </FormGroup>
          <LoaderButton id={"devLoginBtn"}
            block
            type="submit"
            bsSize="large"
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Login
          </LoaderButton>
          </div>
        </form>
      )}
    </div>
  );
}
