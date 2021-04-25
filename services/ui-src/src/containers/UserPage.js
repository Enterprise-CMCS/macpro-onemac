import React, { useEffect, useState, useCallback } from "react";
import { Review } from "@cmsgov/design-system";
import { ROLES, latestAccessStatus, territoryMap } from "cmscommonlib";

import { useAppContext } from "../libs/contextLib";
import { userTypes } from "../libs/userLib";
import { helpDeskContact } from "../libs/helpDeskContact";
import PageTitleBar from "../components/PageTitleBar";
import UserDataAPI from "../utils/UserDataApi";
import closingX from "../images/ClosingX.svg";
import UserDataApi from "../utils/UserDataApi";
import { getAlert } from "../libs/error-mappings";
import { ALERTS_MSG } from "../libs/alert-messages";

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

    case ROLES.CMS_ROLE_APPROVER:
    case ROLES.SYSTEM_ADMIN:
      return [];

    default:
      return [];
  }
};

/**
 * Component housing data belonging to a particular user
 */
const UserPage = () => {
  const { userProfile } = useAppContext();
  const { setUserInfo } = useAppContext();
  const { email, firstName, lastName, userData } = userProfile;

  const [accesses, setAccesses] = useState(transformAccesses(userData));

  let userType = userData?.type ?? "user";

  useEffect(() => {
    (async () => {
      try {
        switch (userType) {
          case ROLES.STATE_USER: {
            const adminsByState = await UserDataAPI.getStateAdmins(
              userData.attributes
                .map(({ stateCode }) => stateCode)
                .filter(Boolean)
            );
            setAccesses(
              transformAccesses(userData).map((access) => ({
                ...access,
                contacts: adminsByState[access.state],
              }))
            );
            break;
          }

          case ROLES.STATE_ADMIN: {
            const contacts = await UserDataAPI.getCmsApprovers();
            setAccesses(
              transformAccesses(userData).map((access) => ({
                ...access,
                contacts,
              }))
            );
            break;
          }

          default:
            break;
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, [userData, userType]);

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
            }
          });
        } catch (err) {
          console.log("setAlert(ALERTS_MSG.SUBMISSION_ERROR)");
        }
      }
    },
    [email, userType, setUserInfo]
  );

  return (
    <div>
      <PageTitleBar heading="Account Management" />
      <div className="profile-container">
        <div className="subheader-message">
          Below is the account information for your role as a{" "}
          {userTypes[userType] ?? userType}. Your name and email cannot be
          edited in OneMAC. It can be changed in your IDM profile. If you have
          questions, please contact the MACPro Help Desk at{" "}
          <a href={`mailto:${helpDeskContact.email}`}>
            {helpDeskContact.email}
          </a>{" "}
          or call {helpDeskContact.phone}.
        </div>
        <div className="ds-l-row">
          <div className="ds-l-col--6">
            <h3>Profile Information</h3>
            <Review heading="Full Name">
              {getFullName(firstName, lastName)}
            </Review>
            <Review heading="Email">{email}</Review>
          </div>
          {(userType === ROLES.STATE_USER ||
            userType === ROLES.STATE_ADMIN) && (
            <div className="ds-l-col--6">
              <h3>State Access Management</h3>
              <dl className="state-access-cards">
                {accesses.map(({ state, status, contacts }) => (
                  <div className="state-access-card" key={state}>
                    {userType === ROLES.STATE_USER &&
                      (status === "active" || status === "pending") && (
                        <button
                          className="close-button"
                          onClick={() => xClicked(state)}
                        >
                          {CLOSING_X_IMAGE}
                        </button>
                      )}
                    <dt>{territoryMap[state] || state}</dt>
                    <dd>
                      <em>{ACCESS_LABELS[status] || status}</em>
                      <br />
                      <br />
                      <ContactList contacts={contacts} userType={userType} />
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
