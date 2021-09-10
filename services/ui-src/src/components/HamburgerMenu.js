import React, { useState } from "react";
import { Button } from "@cmsgov/design-system";
import ClosingXLight from "../assets/images/closingXlight30x30.svg";

function HamburgerMenu({ linksToDisplay }) {
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);

  function renderOpenMenu() {
    return (
      <div id="hamburgerNav" className="hamburger-content">
        <Button
          onClick={() => setIsMenuExpanded(false)}
          type="button"
          id="close-hamburger-menu"
          className="to-close-hamburger"
          inversed
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
              return <li key={index}>{link}</li>;
            })}
        </ul>
      </div>
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
          aria-expanded="true"
          transparent="true"
        >
          ☰
        </button>
      </nav>
    );
  }

  return <>{isMenuExpanded ? renderOpenMenu() : renderMenuButton()}</>;
}

export default HamburgerMenu;
