import React, { useState, useEffect, useRef } from "react";
import { Button } from "@cmsgov/design-system";
import ClosingXLight from "../assets/images/closingXlight30x30.svg";
import HamburgerMenuIcon from "../assets/images/HamburgerMenuIcon.svg";
import DotsVector from "../assets/images/dotsvector.svg";
import oneMacLogo from "../assets/images/OneMAC_logoLight.svg";
import { animated, useTransition, easings } from "@react-spring/web";

function HamburgerMenu({ linksToDisplay }) {
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);

  //Mount transitions animation
  const transitionHamburger = useTransition(isMenuExpanded, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    config: {
      duration: 95,
      easing: easings.easeInOutQuad,
    },
  });

  useEffect(() => {
    const listenToWidth = () => {
      let widthToHideFrom = 933;
      const winWidth = window.innerWidth;
      if (winWidth < widthToHideFrom) {
        isMenuExpanded && setIsMenuExpanded(true);
      } else {
        setIsMenuExpanded(false);
      }
    };
    window.addEventListener("resize", listenToWidth);
    return () => window.removeEventListener("resize", listenToWidth);
  }, [isMenuExpanded]);

  const hamburgerWrapperRef = useRef(null);

  useEffect(() => {
    const listenToClick = (event) => {
      let ignoreClickElement = hamburgerWrapperRef;
      if (ignoreClickElement.current) {
        isMenuExpanded &&
          !ignoreClickElement.current.contains(event.target) &&
          setIsMenuExpanded(false);
      }
    };
    window.addEventListener("click", listenToClick);
    return () => window.removeEventListener("click", listenToClick);
  });

  function renderOpenMenu(style) {
    return (
      <animated.div
        id="hamburgerNav"
        role="listbox"
        aria-label="Opened Hamburger Menu"
        className="hamburger-content"
        ref={hamburgerWrapperRef}
        style={style}
      >
        <Button
          onClick={() => setIsMenuExpanded(false)}
          type="button"
          id="close-hamburger-menu"
          className="to-close-hamburger"
          onDark
        >
          <img
            aria-label="Close Hamburger Navigation"
            alt="Close Hamburger Navigation"
            src={ClosingXLight}
          />
        </Button>
        <ul
          role="navigation"
          aria-controls="link-list"
          className="hamburger-nav-links-list"
        >
          {linksToDisplay &&
            linksToDisplay.map((link, index) => {
              return (
                <li key={index} onClick={() => setIsMenuExpanded(false)}>
                  {link}
                </li>
              );
            })}
        </ul>
        <img className="dots-vector" alt="dots vector" src={DotsVector} />
        <img
          className="HamburgerOneMacLogo"
          alt="oneMacLogo"
          src={oneMacLogo}
        />
      </animated.div>
    );
  }

  function renderMenuButton() {
    return (
      <nav className="nav-left-burger">
        <button
          onClick={() => setIsMenuExpanded(true)}
          type="button"
          aria-label="Hamburger Menu"
          id="hamburger-menu"
          className="closed-hamburger"
          aria-controls="link-list"
          aria-expanded="false"
          transparent="true"
        >
          <img
            aria-label="hamburger-icon-closed-nav"
            alt="Open Hamburger Navigation"
            src={HamburgerMenuIcon}
          />
        </button>
      </nav>
    );
  }

  return (
    <>
      {transitionHamburger((style, isMenuExpanded) =>
        isMenuExpanded ? renderOpenMenu(style) : renderMenuButton()
      )}
    </>
  );
}

export default HamburgerMenu;
