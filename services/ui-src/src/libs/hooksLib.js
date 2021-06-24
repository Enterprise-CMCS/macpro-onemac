import { useState, useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { RESPONSE_CODE, ROLES, ROUTES } from "cmscommonlib";

import UserDataApi from "../utils/UserDataApi";
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
  const { userProfile: { email, firstName, lastName } = {}, setUserInfo } =
    useAppContext() ?? {};

  const signupUser = useCallback(
    async (payload) => {
      let destination, messageState;
      if (loading) return;
      try {
        setLoading(true);

        if (processAttributes) {
          payload = processAttributes(payload);
        }

        let answer = await UserDataApi.updateUser({
          userEmail: email,
          doneBy: email,
          firstName,
          lastName,
          type: userType,
          attributes: payload,
        });
        // TODO use RESPONSE_CODE.USER_SUBMITTED when it is exported from common package
        if (answer && answer !== RESPONSE_CODE.USER_SUBMITTED) throw answer;

        await setUserInfo();

        destination =
          userType === ROLES.STATE_SUBMITTER || userType === ROLES.HELPDESK
            ? ROUTES.DASHBOARD
            : ROUTES.USER_MANAGEMENT;
        messageState =
          userType === ROLES.HELPDESK
            ? { passCode: RESPONSE_CODE.HELPDESK_USER_SUBMITTED }
            : { passCode: RESPONSE_CODE.USER_SUBMITTED }; //ALERTS_MSG.SUBMISSION_SUCCESS };
      } catch (error) {
        console.error("Could not create new user:", error);
        destination = { ...location, state: undefined };
        messageState = {
          ...location.state,
          passCode: error, // ALERTS_MSG.SUBMISSION_ERROR,
        };
        if (userType === ROLES.HELPDESK) {
          destination.pathname = "/";
        }
      } finally {
        setLoading(false);
        history.replace(destination, messageState);
      }
    },
    [
      email,
      firstName,
      history,
      lastName,
      loading,
      location,
      processAttributes,
      setUserInfo,
      userType,
    ]
  );

  return [loading, signupUser];
}
