import React from "react";

function HomeHeader() {
  return (
    <>
      <div className="container-fluid home-header">
        <div className="ds-l-row home-header-content">
          <div className="ds-l-col" style={{ position: "relative" }}>
            <div className="home-header-image-box"></div>
          </div>
          <div className="ds-l-col" style={{ position: "relative" }}>
            <div className="home-header-text">
              Welcome to the official submission system for <br />
              paper-based state plan amendments (SPAs) and section 1915 waivers.
            </div>
          </div>
        </div>

        <div className="home-header-angle-box"></div>
      </div>
    </>
  );
}
export default HomeHeader;
