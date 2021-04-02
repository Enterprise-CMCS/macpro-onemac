import React from "react";
import { Review } from "@cmsgov/design-system";
import { ROLES } from "cmscommonlib";

import { useAppContext } from "../libs/contextLib";
import { userTypes } from "../libs/userLib";
import { helpDeskContact } from "../libs/helpDeskContact";
import PageTitleBar from "../components/PageTitleBar";

const accesses = [
  {
    state: "Maryland",
    status: "Access Granted",
    contacts: [
      {
        name: "Rick Genstry",
        email: "rick@example.com",
      },
      {
        name: "Pending Polly",
        email: "pendingpolly@example.com",
      },
    ],
  },
  {
    state: "Nebraska",
    status: "Pending",
    contacts: [
      {
        name: "Approving Alice",
        email: "alice@example.com",
      },
    ],
  },
];

const ROLE_TO_APPROVER_LABEL = {
  [ROLES.STATE_USER]: "State Admin",
  [ROLES.STATE_ADMIN]: "CMS Role Approver",
  [ROLES.CMS_APPROVER]: "CMS System Admin",
};

const ContactList = ({ contacts, userType }) => {
  let label = ROLE_TO_APPROVER_LABEL[userType] ?? "Contact";

  if (contacts.length > 1) label += "s";

  return (
    <p>
      <b>{label}:</b>{" "}
      {contacts.map(({ name, email }, idx) => (
        <React.Fragment key={email}>
          <a href={`mailto:${email}`}>{name}</a>
          {idx < contacts.length - 1 && ", "}
        </React.Fragment>
      ))}
    </p>
  );
};

/**
 * Component housing data belonging to a particular user
 */
const UserPage = () => {
  const { userProfile } = useAppContext();
  const { email, firstName, lastName, userData } = userProfile;

  let userType = "user";
  if (userData && userData.type) {
    userType = userTypes[userData.type];
  }

  /**
   * Formats first name and last name into single full name
   * @param {Number} numDigits
   * @returns string of numbers
   */
  function getFullName() {
    let names = [firstName, lastName];
    names = names.filter((name) => name);

    const fullName = names.join(" ");

    return fullName;
  }

  return (
    <div>
      <PageTitleBar heading="Account Management" />
      <div className="profile-container">
        <div className="subheader-message">
          Below is the account information for your role as a {userType}. Your
          name and email cannot be edited in OneMAC. It can be changed in your
          IDM profile. If you have questions, please contact the MACPro Help
          Desk at{" "}
          <a href={`mailto:${helpDeskContact.email}`}>
            {helpDeskContact.email}
          </a>{" "}
          or call {helpDeskContact.phone}.
        </div>
        <div className="ds-l-row">
          <div className="ds-l-col--6">
            <h3>Profile Information</h3>
            <Review heading="Full Name">{getFullName()}</Review>
            <Review heading="Email">{email}</Review>
          </div>
          <div className="ds-l-col--6">
            <h3>State Access Management</h3>
            <dl className="state-access-cards">
              {accesses.map(({ state, status, contacts }) => (
                <div className="state-access-card" key={state}>
                  <dt>{state}</dt>
                  <dd>
                    <em>{status}</em>
                    <br />
                    <br />
                    <ContactList contacts={contacts} type={userType} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
