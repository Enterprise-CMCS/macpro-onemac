import React from "react";
import { Review } from "@cmsgov/design-system";
import { useAppContext } from "../libs/contextLib";
import { userTypes } from "../libs/userTypes";
import PageTitleBar from "../components/PageTitleBar";

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
          <a href="mailto:MACPro_HelpDesk@cms.hhs.gov">
            MACPro_HelpDesk@cms.hhs.gov
          </a>{" "}
          or call (833) 228-2540.
        </div>
        <h3>Profile Information</h3>
        <Review heading="Full Name">{getFullName()}</Review>
        <Review heading="Email">{email}</Review>
      </div>
    </div>
  );
};

export default UserPage;
