import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Review } from "@cmsgov/design-system";

import {
  RESPONSE_CODE,
  ROLES,
  latestAccessStatus,
  territoryMap,
  territoryList,
} from "cmscommonlib";
import { useAppContext } from "../libs/contextLib";
import { userTypes } from "../libs/userLib";
import { getAlert } from "../libs/error-mappings";
import { ALERTS_MSG } from "../libs/alert-messages";
import UserDataApi from "../utils/UserDataApi";

import AlertBar from "../components/AlertBar";
import PageTitleBar from "../components/PageTitleBar";
import { PhoneNumber } from "../components/PhoneNumber";
import { MultiSelectDropDown } from "../components/MultiSelectDropDown";
import closingX from "../images/ClosingX.svg";
import addStateButton from "../images/addStateButton.svg";

const CLOSING_X_IMAGE = <img alt="" className="closing-x" src={closingX} />;

/**
 * Formats multi-part name into single full name
 */
const getFullName = (...names) => names.filter(Boolean).join(" ");

const ROLE_TO_APPROVER_LABEL = {
  [ROLES.STATE_SUBMITTER]: "State Admin",
  [ROLES.STATE_ADMIN]: "CMS Role Approver",
  [ROLES.CMS_APPROVER]: "CMS System Admin",
  [ROLES.HELPDESK]: "CMS System Admin",
};

const ContactList = ({ contacts, userType }) => {
  let label = ROLE_TO_APPROVER_LABEL[userType] ?? "Contact";
  if (!contacts) return null;
  if (contacts.length > 1) label += "s";

  return (
    <p>
      {label}:{" "}
      {contacts.map(({ firstName, lastName, email }, idx) => (
        <React.Fragment key={email}>
          <a href={`mailto:${email}`}>{getFullName(firstName, lastName)}</a>
          {idx < contacts.length - 1 && ", "}
        </React.Fragment>
      ))}
    </p>
  );
};

const ACCESS_LABELS = {
  active: "Access Granted",
  pending: "Pending Access",
  denied: "Access Denied",
  revoked: "Access Revoked",
};

const transformAccesses = (user = {}) => {
  switch (user.type) {
    case ROLES.STATE_SUBMITTER:
    case ROLES.STATE_ADMIN:
      return user.attributes?.map(({ stateCode }) => ({
        state: stateCode,
        status: latestAccessStatus(user, stateCode),
      }));

    case ROLES.CMS_APPROVER:
    case ROLES.HELPDESK:
      return [{ status: latestAccessStatus(user) }];

    case ROLES.SYSTEM_ADMIN:
    default:
      return [];
  }
};

/**
 * Component housing data belonging to a particular user
 */
const UserPage = () => {
  const {
    userProfile: { email, firstName, lastName, userData },
    setUserInfo,
  } = useAppContext();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [alertCode, setAlertCode] = useState(location?.state?.passCode);
  const [accesses, setAccesses] = useState(transformAccesses(userData));
  const [isStateSelectorVisible, setIsStateSelectorVisible] = useState(false);

  let userType = userData?.type ?? "user";

  const onPhoneNumberEdit = useCallback(
    async (newNumber) => {
      try {
        const result = await UserDataApi.updatePhoneNumber(email, newNumber);
        setAlertCode(result);
      } catch (e) {
        console.error("Error updating phone number", e);
        setAlertCode(RESPONSE_CODE.USER_SUBMISSION_FAILED);
      }
    },
    [email]
  );

  const signupUser = useCallback(
    async (payload) => {
      try {
        setLoading(true);

        payload = payload.map(({ value }) => ({
          stateCode: value,
          status: "pending",
        }));

        let answer = await UserDataApi.updateUser({
          userEmail: email,
          doneBy: email,
          firstName,
          lastName,
          type: userType,
          attributes: payload,
        });

        if (answer && answer !== RESPONSE_CODE.USER_SUBMITTED) throw answer;
        setAlertCode(RESPONSE_CODE.USER_SUBMITTED);
        setIsStateSelectorVisible(false);
        setUserInfo();
      } catch (error) {
        console.error("Could not create new user:", error);
        setAlertCode(RESPONSE_CODE.USER_SUBMISSION_FAILED);
      } finally {
        setLoading(false);
      }
    },
    [
      email,
      firstName,
      lastName,
      userType,
      setIsStateSelectorVisible,
      setLoading,
      setUserInfo,
    ]
  );

  const xClicked = useCallback(
    (stateCode) => {
      if (
        window.confirm(
          "Warning Withdraw of State Access\n\nThis action cannot be undone. State Admin will be notified. Are you sure you would like to withdraw State Access?\n\nAre you sure you want to proceed?"
        )
      ) {
        const updateStatusRequest = {
          userEmail: email,
          doneBy: email,
          attributes: [
            {
              stateCode: stateCode, // required for state submitter and state admin
              status: "revoked",
            },
          ],
          type: userType,
        };
        try {
          console.log("updateStatusRequest", updateStatusRequest);
          UserDataApi.setUserStatus(updateStatusRequest).then(function (
            returnCode
          ) {
            if (getAlert(returnCode) === ALERTS_MSG.SUBMISSION_SUCCESS) {
              setUserInfo();
            } else {
              console.log("Returned: ", returnCode);
              setAlertCode(returnCode);
            }
          });
        } catch (err) {
          setAlertCode(RESPONSE_CODE.USER_SUBMISSION_FAILED);
        }
      }
    },
    [email, userType, setUserInfo]
  );

  const renderSelectStateAccess = useMemo(() => {
    return (
      <div className="profile-signup-container">
        <MultiSelectDropDown
          cancelFn={() => setIsStateSelectorVisible(false)}
          errorMessage="Please select at least one state."
          loading={loading}
          options={territoryList}
          placeholder="Select state here"
          required
          showCancelButton
          subtitle="Select your State Access."
          submitFn={signupUser}
          title="Choose State Access"
          type="selectprofile"
        />
      </div>
    );
  }, [loading, signupUser, setIsStateSelectorVisible]);

  const renderAddStateButton = useMemo(() => {
    return (
      <Button
        className="add-state-button"
        onClick={() => setIsStateSelectorVisible(true)}
      >
        <img src={addStateButton} alt="add state or territiory" />
      </Button>
    );
  }, [setIsStateSelectorVisible]);

  const accessSection = useMemo(() => {
    let heading;

    switch (userType) {
      case ROLES.STATE_SUBMITTER:
      case ROLES.STATE_ADMIN:
        heading = "State Access Management";
        break;
      case ROLES.CMS_APPROVER:
      case ROLES.HELPDESK:
        heading = "Status";
        break;
      default:
        // CMS System Admins do not see this section at all
        return null;
    }

    return (
      <div className="ds-l-col--6">
        <h2>{heading}</h2>
        <dl>
          {accesses.map(({ state, status, contacts }) => (
            <div className="access-card-container" key={state ?? "only-one"}>
              <div className="gradient-border" />
              <div className="state-access-card">
                {userType === ROLES.STATE_SUBMITTER &&
                  (status === "active" || status === "pending") && (
                    <button
                      className="close-button"
                      onClick={() => xClicked(state)}
                    >
                      {CLOSING_X_IMAGE}
                    </button>
                  )}
                {!!state && <dt>{territoryMap[state] || state}</dt>}
                <dd>
                  <em>{ACCESS_LABELS[status] || status}</em>
                  <br />
                  <br />
                  <ContactList contacts={contacts} userType={userType} />
                </dd>
              </div>
            </div>
          ))}
        </dl>
        {userType === ROLES.STATE_SUBMITTER && (
          <div className="add-access-container">
            {isStateSelectorVisible
              ? renderSelectStateAccess
              : renderAddStateButton}
          </div>
        )}
      </div>
    );
  }, [
    accesses,
    userType,
    xClicked,
    isStateSelectorVisible,
    renderSelectStateAccess,
    renderAddStateButton,
  ]);

  useEffect(() => {
    (async () => {
      try {
        let contacts = [],
          getContacts = () => contacts;

        switch (userType) {
          case ROLES.STATE_SUBMITTER: {
            const adminsByState = await UserDataApi.getStateAdmins(
              userData.attributes
                .map(({ stateCode }) => stateCode)
                .filter(Boolean)
            );
            getContacts = ({ state }) => adminsByState[state];
            break;
          }

          case ROLES.STATE_ADMIN: {
            contacts = await UserDataApi.getCmsApprovers();
            break;
          }
          case ROLES.HELPDESK:
          case ROLES.CMS_APPROVER: {
            contacts = await UserDataApi.getCmsSystemAdmins();
            break;
          }

          default:
            return;
        }

        setAccesses(
          transformAccesses(userData).map((access) => ({
            ...access,
            contacts: getContacts(access),
          }))
        );
      } catch (e) {
        console.error(e);
      }
    })();
  }, [userData, userType]);

  return (
    <div>
      <PageTitleBar heading="User Profile" />
      <AlertBar alertCode={alertCode} />
      <div className="profile-container">
        <div className="ds-l-row">
          <div className="ds-l-col--6">
            <h2>Profile Information</h2>
            <Review heading="Full Name">
              {getFullName(firstName, lastName)}
            </Review>
            <Review heading="Email">{email}</Review>
            <PhoneNumber
              initialValue={userData.phoneNumber}
              onSubmit={onPhoneNumberEdit}
            />
          </div>
          {accessSection}
        </div>
        <div className="disclaimer-message">
          This page contains Profile Information for the{" "}
          {userTypes[userType] ?? userType}. The information cannot be changed
          in the portal. However, the {userTypes[userType] ?? userType} can
          change their contact phone number in their account.
        </div>
      </div>
    </div>
  );
};

export default UserPage;
