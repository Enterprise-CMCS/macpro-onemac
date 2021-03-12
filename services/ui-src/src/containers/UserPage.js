import React from "react";
import { Review } from "@cmsgov/design-system";
import { useAppContext } from "../libs/contextLib";
import PageTitleBar from "../components/PageTitleBar";

/**
 * Component housing data belonging to a particular user
 */
const UserPage = () => {
  const { userProfile } = useAppContext();
  const { email, firstName, lastName } = userProfile;

  /**
   * Formats first name and last name into single full name
   * @param {Number} numDigits
   * @returns string of numbers
   */
  function getFullName() {
    let names = [firstName, lastName]
    names = names.filter(name => name)

    const fullName = names.join(' ')

    return fullName
  };

  return (
    <div>
      <PageTitleBar heading="Account Management" />
      <div className="profile-container">
        <div className="subheader-message">
          This page contains Profile Information for the State Submitter. The
          information cannot be changed in the portal. However, the State
          Submitter can change their contact phone number in their account.
        </div>
        <h3>Profile Information</h3>
        <div>
          <Review heading="Full Name">
            {getFullName()}
          </Review>
          <Review heading="Email">
            {email}
          </Review>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
