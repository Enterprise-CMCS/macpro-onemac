import React from "react";
import PageTitleBar from "../components/PageTitleBar";

/**
 * Component housing data belonging to a particular user
 */
const UserPage = () => {
  return (
    <div className="dashboard-white">
       <PageTitleBar heading="Account Management" />
    </div>
  );
};

export default UserPage;
