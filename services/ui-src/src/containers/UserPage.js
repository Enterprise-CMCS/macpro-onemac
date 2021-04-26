import React, { useEffect, useMemo, useState } from "react";
import { Review } from "@cmsgov/design-system";
import { ROLES, latestAccessStatus, territoryMap } from "cmscommonlib";

import { useAppContext } from "../libs/contextLib";
import { userTypes } from "../libs/userLib";
import { helpDeskContact } from "../libs/helpDeskContact";
import PageTitleBar from "../components/PageTitleBar";
import UserDataAPI from "../utils/UserDataApi";

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
      return user.attributes ?? [];

    case ROLES.SYSTEM_ADMIN:
    default:
      return [];
  }
};

/**
 * Component housing data belonging to a particular user
 */
const UserPage = () => {
  const { userProfile } = useAppContext();
  const { email, firstName, lastName, userData } = userProfile;

  const [accesses, setAccesses] = useState(transformAccesses(userData));

  let userType = userData?.type ?? "user";

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
      </div>
    );
  }, [accesses, userType]);

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
          </div>
          {accessList}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
