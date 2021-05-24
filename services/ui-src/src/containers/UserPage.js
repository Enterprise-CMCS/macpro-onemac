import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Review } from "@cmsgov/design-system";
import {
  RESPONSE_CODE,
  ROLES,
  latestAccessStatus,
  territoryMap,
} from "cmscommonlib";

import { territoryList } from "cmscommonlib";
import { useSignupCallback } from "../libs/hooksLib";
import { MultiSelectDropDown } from "../components/MultiSelectDropDown";

import { useAppContext } from "../libs/contextLib";
import { userTypes } from "../libs/userLib";
import { helpDeskContact } from "../libs/helpDeskContact";
import AlertBar from "../components/AlertBar";
import PageTitleBar from "../components/PageTitleBar";
import { PhoneNumber } from "../components/PhoneNumber";
import UserDataAPI from "../utils/UserDataApi";
import UserDataApi from "../utils/UserDataApi";
import { getAlert } from "../libs/error-mappings";
import { ALERTS_MSG } from "../libs/alert-messages";
import closingX from "../images/ClosingX.svg";
import addStateButton from "../images/addStateButton.svg";

const CLOSING_X_IMAGE = <img alt="" className="closing-x" src={closingX} />;

/**
 * Formats multi-part name into single full name
 */
const getFullName = (...names) => names.filter(Boolean).join(" ");

const ROLE_TO_APPROVER_LABEL = {
  [ROLES.STATE_USER]: "State Admin",
  [ROLES.STATE_ADMIN]: "CMS Role Approver",
  [ROLES.CMS_APPROVER]: "CMS System Admin",
};

const ContactList = ({ contacts, userType }) => {
  let label = ROLE_TO_APPROVER_LABEL[userType] ?? "Contact";

  if (!contacts) return null;
  if (contacts.length > 1) label += "s";

  return (
    <p>
      <b>{label}:</b>{" "}
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
    case ROLES.STATE_USER:
    case ROLES.STATE_ADMIN:
      return user.attributes?.map(({ stateCode }) => ({
        state: stateCode,
        status: latestAccessStatus(user, stateCode),
      }));

    case ROLES.CMS_APPROVER:
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

  const expandStatesToAttributes = useCallback((values) => {
    return values.map(({ value }) => ({
      stateCode: value,
      status: "pending",
    }));
  }, []);

  const [accesses, setAccesses] = useState(transformAccesses(userData));
  const [isStateSelectorVisible, setIsStateSelectorVisible] = useState(false);
  const [alertCode, setAlertCode] = useState(null);
  const [loading, onSubmit] = useSignupCallback(
    "stateuser",
    expandStatesToAttributes
  );

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

  const xClicked = useCallback(
    (stateCode) => {
      if (
        window.confirm(
          "Warning Withdraw of State Access\n\nThis action cannot be undone. State User Admin will be notified. Are you sure you would like to withdraw State Access?\n\nAre you sure you want to proceed?"
        )
      ) {
        const updateStatusRequest = {
          userEmail: email,
          doneBy: email,
          attributes: [
            {
              stateCode: stateCode, // required for state user and state admin
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

  const renderSelectStateAccess = () => {
    return (
      <div className="profile-signup-container">
        <MultiSelectDropDown
          errorMessage="Please select at least one state."
          loading={loading}
          options={territoryList}
          required
          showCancelButton
          subtitle="Select your State Access."
          submitFn={onSubmit}
          cancelFn={() => setIsStateSelectorVisible(false)}
          title="Choose State Access"
          placeholder="select state here"
          type="selectprofile"
        />
      </div>
    );
  };

  const renderAddStateButton = () => {
    return (
      <button
        onClick={() => setIsStateSelectorVisible(true)}
        className="add-state-button"
      >
        <img src={addStateButton} alt="add state or territiory" />
      </button>
    )
  }

  const accessList = useMemo(() => {
    let heading;

    switch (userType) {
      case ROLES.STATE_USER:
      case ROLES.STATE_ADMIN:
        heading = "State Access Management";
        break;
      case ROLES.CMS_APPROVER:
        heading = "Status";
        break;
      default:
        // CMS System Admins do not see this section at all
        return null;
    }

    return (
      <div className="ds-l-col--6">
        <h3>{heading}</h3>
        <dl className="state-access-cards">
          {accesses.map(({ state, status, contacts }) => (
            <div className="state-access-card" key={state ?? "only-one"}>
              {userType === ROLES.STATE_USER &&
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
          ))}
        </dl>
        <div className="add-access-container">
          {isStateSelectorVisible
            ? renderSelectStateAccess()
            : renderAddStateButton()}
        </div>
      </div>
    );
  }, [accesses, userType, xClicked, isStateSelectorVisible]);

  useEffect(() => {
    (async () => {
      try {
        let contacts = [],
          getContacts = () => contacts;

        switch (userType) {
          case ROLES.STATE_USER: {
            const adminsByState = await UserDataAPI.getStateAdmins(
              userData.attributes
                .map(({ stateCode }) => stateCode)
                .filter(Boolean)
            );
            getContacts = ({ state }) => adminsByState[state];
            break;
          }

          case ROLES.STATE_ADMIN: {
            contacts = await UserDataAPI.getCmsApprovers();
            break;
          }

          case ROLES.CMS_APPROVER: {
            contacts = await UserDataAPI.getCmsSystemAdmins();
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
      <PageTitleBar heading="Account Management" />
      <AlertBar alertCode={alertCode} />
      <div className="profile-container">
        <div className="subheader-message">
          Below is the account information for your role as a{" "}
          {userTypes[userType] ?? userType}. Your name and email cannot be
          edited in OneMAC. It can be changed in your IDM profile. If you have
          questions, please contact the MACPro Help Desk at{" "}
          <a href={`mailto:${helpDeskContact.email}`}>
            {helpDeskContact.email}
          </a>{" "}
          or call{" "}
          <a href={`tel:${helpDeskContact.phone}`}>{helpDeskContact.phone}</a>.
        </div>
        <div className="ds-l-row">
          <div className="ds-l-col--6">
            <h3>Profile Information</h3>
            <Review heading="Full Name">
              {getFullName(firstName, lastName)}
            </Review>
            <Review heading="Email">{email}</Review>
            <PhoneNumber
              initialValue={userData.phoneNumber}
              onSubmit={onPhoneNumberEdit}
            />
          </div>
          {accessList}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
