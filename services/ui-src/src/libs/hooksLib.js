import { useState, useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { RESPONSE_CODE, ROLES, ROUTES, getUserRoleObj } from "cmscommonlib";

import UserDataApi from "../utils/UserDataApi";
import { useAppContext } from "./contextLib";

export function useFlag(initialState = false) {
  const [value, setValue] = useState(initialState);
  const setValueFalse = useCallback(() => setValue(false), []);
  const setValueTrue = useCallback(() => setValue(true), []);
  return [value, setValueFalse, setValueTrue, setValue];
}

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
    async (payload, additionalProperties) => {
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
          ...additionalProperties,
        });
        // TODO use RESPONSE_CODE.USER_SUBMITTED when it is exported from common package
        if (answer && answer !== RESPONSE_CODE.USER_SUBMITTED) throw answer;

        await setUserInfo();

        const roleObj = getUserRoleObj(userType);
        destination = roleObj.canAccessDashboard
          ? ROUTES.DASHBOARD
          : ROUTES.USER_MANAGEMENT;
        switch (userType) {
          case ROLES.HELPDESK:
            messageState = { passCode: RESPONSE_CODE.HELPDESK_USER_SUBMITTED };
            break;
          case ROLES.CMS_REVIEWER:
            messageState = {
              passCode: RESPONSE_CODE.CMS_REVIEWER_USER_SUBMITTED,
            };
            break;
          default:
            messageState = { passCode: RESPONSE_CODE.USER_SUBMITTED };
        }
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
