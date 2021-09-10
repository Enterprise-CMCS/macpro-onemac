import React, { useState, useEffect } from "react";
import PolygonGroup from "../assets/images/polygongroup.svg";
import OneMACLogo from "../assets/images/OneMAC_logoLight.svg";

function HomeHeader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const listenToScroll = () => {
      let heightToHideFrom = 500;
      const winScroll = document.documentElement.scrollTop;
      if (winScroll > heightToHideFrom) {
        isVisible && setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };
    window.addEventListener("scroll", listenToScroll);
    return () =>
      window.removeEventListener("scroll", listenToScroll);
  }, [isVisible]);

  return (
    <>
      <div className="home-header">
        <div className="home-header-content">
          <img
            alt="OneMAC Logo"
            className="home-header-image"
            src={OneMACLogo}
          />
          {isVisible && <div className="animation-area">
            <img
              alt="polygon-img"
              className="polygon-image-top"
              src={PolygonGroup}
            />
          </div>}
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
