import { useState, useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";

import UserDataApi from "../utils/UserDataApi";
import { ALERTS_MSG } from "./alert-messages";
import { useAppContext } from "./contextLib";

export function useFormFields(initialState) {
  const [fields, setValues] = useState(initialState);

  return [
    fields,
    function (event) {
      setValues({
        ...fields,
        [event.target.id]: event.target.value,
      });
    },
  ];
}

export function useSignupCallback(userType, processAttributes) {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const { userProfile: { email } = {}, setUserInfo } = useAppContext() ?? {};

  const signupUser = useCallback(
    async (payload) => {
      let destination, messageState;

      try {
        setLoading(true);

        if (processAttributes) {
          payload = processAttributes(payload);
        }

        let answer = await UserDataApi.updateUser({
          id: email,
          type: userType,
          attributes: payload,
        });
        // TODO use RESPONSE_CODE.USER_SUBMITTED when it is exported from common package
        if (answer && answer !== "UR000") throw answer;

        await setUserInfo();

        destination = "/dashboard";
        messageState = { showAlert: ALERTS_MSG.SUBMISSION_SUCCESS };
      } catch (error) {
        console.error("Could not create new user:", error);

        destination = { ...location, state: undefined };
        messageState = {
          ...location.state,
          showAlert: ALERTS_MSG.SUBMISSION_ERROR,
        };
      } finally {
        setLoading(false);
        history.replace(destination, messageState);
      }
    },
    [
      email,
      history,
      location,
      processAttributes,
      setUserInfo,
      userType,
    ]
  );

  return [loading, signupUser];
}
