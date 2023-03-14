import { ChangeEvent, useState, useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  RESPONSE_CODE,
  USER_ROLE,
  ROUTES,
  getUserRoleObj,
  ONEMAC_ROUTES,
} from "cmscommonlib";

import UserDataApi from "../utils/UserDataApi";
import { useAppContext } from "./contextLib";

export function useFlag(initialState = false) {
  const [value, setValue] = useState(initialState);
  const setValueFalse = useCallback(() => setValue(false), []);
  const setValueTrue = useCallback(() => setValue(true), []);
  return [value, setValueFalse, setValueTrue, setValue];
}

export function useToggle(
  initialState: boolean
): [boolean, () => void, (newState: boolean) => void] {
  const [value, setValue] = useState(initialState);
  const toggleValue = useCallback(() => setValue((v) => !v), []);
  return [value, toggleValue, setValue];
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
  userType: USER_ROLE,
  processAttributes?: (payload: {}) => string[] | undefined
): [boolean, (payload: {}, additionalProperties?: {}) => void] {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const location = useLocation<{}>();
  const {
    isLoggedInAsDeveloper,
    userProfile: { email = "" } = {},
    setUserInfo,
  } = useAppContext() ?? {};

  const signupUser = useCallback(
    async (payload) => {
      if (loading) return;
      try {
        setLoading(true);

        if (processAttributes) {
          payload = processAttributes(payload);
        }

        let answer = await UserDataApi.requestAccess(email, userType, payload);
        // TODO use RESPONSE_CODE.USER_SUBMITTED when it is exported from common package
        if (answer && answer !== RESPONSE_CODE.USER_SUBMITTED) throw answer;

        await setUserInfo?.(isLoggedInAsDeveloper);

        const roleObj = getUserRoleObj(userType);
        const destination = roleObj.canAccessDashboard
          ? ONEMAC_ROUTES.PACKAGE_LIST
          : ROUTES.USER_MANAGEMENT;

        let messageState;
        switch (userType) {
          case USER_ROLE.HELPDESK:
            messageState = { passCode: RESPONSE_CODE.HELPDESK_USER_SUBMITTED };
            break;
          case USER_ROLE.CMS_REVIEWER:
            messageState = {
              passCode: RESPONSE_CODE.CMS_REVIEWER_USER_SUBMITTED,
            };
            break;
          case USER_ROLE.CMS_ROLE_APPROVER:
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
        if (userType === USER_ROLE.HELPDESK) {
          destination.pathname = "/";
        }

        setLoading(false);
        history.replace(destination);
      }
    },
    [
      email,
      history,
      isLoggedInAsDeveloper,
      loading,
      location,
      processAttributes,
      setUserInfo,
      userType,
    ]
  );

  return [loading, signupUser];
}
