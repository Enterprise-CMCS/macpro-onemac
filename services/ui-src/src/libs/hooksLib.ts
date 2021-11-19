import { ChangeEvent, useState, useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { RESPONSE_CODE, USER_TYPE, ROUTES, getUserRoleObj } from "cmscommonlib";

import UserDataApi from "../utils/UserDataApi";
import { useAppContext } from "./contextLib";

export function useFlag(initialState = false) {
  const [value, setValue] = useState(initialState);
  const setValueFalse = useCallback(() => setValue(false), []);
  const setValueTrue = useCallback(() => setValue(true), []);
  return [value, setValueFalse, setValueTrue, setValue];
}

export function useFormFields(
  initialState: Record<string, string>
): [Record<string, string>, (event: ChangeEvent<HTMLFormElement>) => void] {
  const [fields, setValues] = useState(initialState);

  return [
    fields,
    function (event: ChangeEvent<HTMLFormElement>) {
      setValues({
        ...fields,
        [event.target.id]: event.target.value,
      });
    },
  ];
}

export function useSignupCallback(
  userType: USER_TYPE,
  processAttributes: (payload: {}) => {}[]
): [boolean, (payload: {}, additionalProperties?: {}) => void] {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const location = useLocation<{}>();
  const {
    isLoggedInAsDeveloper,
    userProfile: {
      cmsRoles = "",
      email = "",
      firstName = "",
      lastName = "",
    } = {},
    setUserInfo,
  } = useAppContext() ?? {};

  const signupUser = useCallback(
    async (payload, additionalProperties) => {
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

        await setUserInfo?.(isLoggedInAsDeveloper);

        const roleObj = getUserRoleObj(userType, !cmsRoles);
        const destination = roleObj.canAccessDashboard
          ? ROUTES.DASHBOARD
          : ROUTES.USER_MANAGEMENT;

        let messageState;
        switch (userType) {
          case USER_TYPE.HELPDESK:
            messageState = { passCode: RESPONSE_CODE.HELPDESK_USER_SUBMITTED };
            break;
          case USER_TYPE.CMS_REVIEWER:
            messageState = {
              passCode: RESPONSE_CODE.CMS_REVIEWER_USER_SUBMITTED,
            };
            break;
          case USER_TYPE.CMS_ROLE_APPROVER:
            messageState = {
              passCode: RESPONSE_CODE.CMS_ROLE_APPROVER_USER_SUBMITTED,
            };
            break;
          default:
            messageState = { passCode: RESPONSE_CODE.USER_SUBMITTED };
        }
        setLoading(false);
        history.replace(destination, messageState);
      } catch (error) {
        console.error("Could not create new user:", error);
        const destination = {
          ...location,
          state: {
            ...location.state,
            passCode: error, // ALERTS_MSG.SUBMISSION_ERROR,
          },
        };
        if (userType === USER_TYPE.HELPDESK) {
          destination.pathname = "/";
        }

        setLoading(false);
        history.replace(destination);
      }
    },
    [
      cmsRoles,
      email,
      firstName,
      history,
      isLoggedInAsDeveloper,
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
