import React from "react";

import OneMACLogo from "../assets/images/OneMAC_logoLight.svg";

function HomeHeader() {
  return (
    <>
      <div className="home-header">
        <div className="home-header-content">
          <img className="home-header-image" src={OneMACLogo} />
          <div className="home-header-text">
            Welcome to the official submission system for paper-
            <wbr />
            based state plan amendments (SPAs) and section 1915 waivers.
          </div>
        </div>

        <div className="home-header-angle-box"></div>
      </div>
    </>
  );
}
export default HomeHeader;
