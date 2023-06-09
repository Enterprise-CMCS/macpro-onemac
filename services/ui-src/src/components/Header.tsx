import React, { RefObject, useState, useEffect, useRef } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Button, SkipNav } from "@cmsgov/design-system";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faUserEdit,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

import {
  ROUTES,
  USER_ROLE,
  getUserRoleObj,
  inFlightRoleRequestForUser,
  FAQ_TARGET,
} from "cmscommonlib";
import { getRegisterUrl, getSignInUrl, logout } from "../libs/logoutLib";
import { getCurrentRoute } from "../utils/routeUtils";
import config from "../utils/config";
import { Alert, UsaBanner } from "@cmsgov/design-system";
import { isIE } from "react-device-detect";
import { useAppContext } from "../libs/contextLib";
import oneMacLogo from "../assets/images/OneMAC_logoLight.svg";
import { ONEMAC_ROUTES, ROUTES as RouteList } from "cmscommonlib";
import HamburgerMenu from "../components/HamburgerMenu.js";

import { animated, useSpring } from "@react-spring/web";
import { clearTableStateStorageKeys } from "../utils/StorageKeys";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(
  ref: RefObject<HTMLElement>,
  setShowMenu: (status: boolean) => void
) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    const handleClickOutside = (event: MouseEvent): void => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setShowMenu]);
}

/**
 * Renders account related buttons based on whether the user is authenticated or not authenticated
 */
const AccountButtons: React.FC<{
  showMenu: boolean;
  setShowMenu: (newValue: boolean) => void;
}> = ({ showMenu, setShowMenu }) => {
  const history = useHistory();
  const {
    isAuthenticated,
    userRole,
    userProfile: { userData: { roleList = [] } = {} } = {},
  } = useAppContext() ?? {};

  if (!isAuthenticated) {
    return (
      <>
        <Button href={getRegisterUrl()} inversed className="register-link">
          Register
        </Button>
        <Button href={getSignInUrl()} id="loginBtn" inversed>
          Login
        </Button>
        {config.ALLOW_DEV_LOGIN === "true" && (
          <div className="dev-login">
            <Button
              id="devloginBtn"
              onClick={() => history.push(ROUTES.DEVLOGIN)}
              inversed
            >
              Development Login
            </Button>
          </div>
        )}
      </>
    );
  }

  const shouldShowSignupLink =
    userRole !== USER_ROLE.HELPDESK &&
    userRole !== USER_ROLE.SYSTEM_ADMIN &&
    !inFlightRoleRequestForUser(roleList);

  const RotateIcon: React.FC<{
    transform?: boolean | string;
    config?: number | string;
    duration?: number;
  }> = () => {
    const myAccountIconRotate = useSpring({
      transform: showMenu ? "rotateX(180deg)" : "rotateX(0deg)",
    });

    return (
      <>
        <animated.svg
          width="11"
          height="9"
          viewBox="0 0 11 5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={myAccountIconRotate}
        >
          <path
            d="M5.66016 4.52295L0.660156 0.0229473L10.6602 0.0229473L5.66016 4.52295Z"
            fill="white"
          ></path>
        </animated.svg>
      </>
    );
  };

  return (
    <>
      <button
        className="dropdown"
        id="myAccountLink"
        onClick={() => setShowMenu(!showMenu)}
      >
        My Account&nbsp;
        <RotateIcon />
      </button>
      {showMenu && (
        <div data-testid="dropdown-content-test" className="dropdown-content">
          <Link
            to={ROUTES.PROFILE}
            id="manageAccountLink"
            onClick={() => setShowMenu(false)}
          >
            <FontAwesomeIcon icon={faUserEdit} />
            &nbsp; Manage Profile
          </Link>
          {shouldShowSignupLink && (
            <Link
              to={ROUTES.SIGNUP}
              id="requestRoleLink"
              onClick={() => setShowMenu(false)}
            >
              <FontAwesomeIcon icon={faUserPlus} />
              &nbsp; Request {userRole ? "a Role Change" : "OneMAC Role"}
            </Link>
          )}
          <Link
            to={ROUTES.HOME}
            id="logoutLink"
            onClick={() => {
              setShowMenu(false);
              clearTableStateStorageKeys();
              logout();
            }}
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            &nbsp; Log out
          </Link>
        </div>
      )}
    </>
  );
};

/**
 * Component containing header
 * @param {Object} props - component properties
 */
export function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const { isAuthenticated, isLoggedInAsDeveloper, userProfile } =
    useAppContext() ?? {};

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setShowMenu);

  /**
   * Renders a navigation bar
   */

  function renderNavBar(
    isLoggedInAsDeveloper: boolean | undefined,
    currentRoute: string,
    isAuthenticated: boolean | undefined
  ) {
    const userObj = getUserRoleObj(userProfile?.userData?.roleList);

    const homeLink = (
      <Link
        to={ROUTES.HOME}
        className={getActiveClass(currentRoute, RouteList.HOME)}
      >
        Home
      </Link>
    );

    // Target new ensures FAQ opens in new window.
    const faq = (
      <a
        id="faqLink"
        href={ROUTES.FAQ}
        className={getActiveClass(currentRoute, RouteList.FAQ_TOP)}
        target={FAQ_TARGET}
      >
        FAQ
      </a>
    );

    const userManagementLink = (
      <Link
        id="userManagementLink"
        to={ROUTES.USER_MANAGEMENT}
        className={getActiveClass(currentRoute, RouteList.USER_MANAGEMENT)}
      >
        User Management
      </Link>
    );

    const packageListLink = (
      <Link
        id="packageListLink"
        to={ONEMAC_ROUTES.PACKAGE_LIST}
        className={getActiveClass(currentRoute, ONEMAC_ROUTES.PACKAGE_LIST)}
      >
        Dashboard
      </Link>
    );

    let linksToDisplay = [homeLink];
    if (isAuthenticated) {
      if (userObj.canAccessDashboard) {
        linksToDisplay.push(packageListLink);
      }
      if (userObj.canAccessUserManagement) {
        linksToDisplay.push(userManagementLink);
      }
    }
    // This is to ensure FAQ shows up last in the link order.
    linksToDisplay.push(faq);

    switch (document.location.pathname) {
      case ROUTES.FAQ:
      case ROUTES.FAQ + "/":
        return (
          <div className="nav-bar">
            <div className="header-wrapper">
              <div className="nav-left-faq">
                <img id="oneMacLogo" alt="OneMac Logo" src={oneMacLogo} />
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="nav-bar">
            <div className="header-wrapper">
              <HamburgerMenu linksToDisplay={linksToDisplay} />
              <div className="nav-left">
                <img id="oneMacLogo" alt="OneMac Logo" src={oneMacLogo} />
                <div className="nav-left-links">
                  {linksToDisplay.map((link, index) => {
                    return <div key={index}>{link}</div>;
                  })}
                </div>
              </div>
              <div className="nav-right" ref={wrapperRef}>
                <AccountButtons showMenu={showMenu} setShowMenu={setShowMenu} />
              </div>
            </div>
          </div>
        );
    }
  }

  const getActiveClass = (currentRoute: string, targetRoute: string) =>
    currentRoute === targetRoute.split("/")[1].toUpperCase()
      ? "activeLink"
      : "ds-u-text-decoration--none";

  return (
    <>
      <SkipNav href="#main">Skip to content</SkipNav>
      <header>
        <div className="usa-banner-custom">
          <UsaBanner />
        </div>
        {isIE && (
          <Alert variation="error" heading="Internet Explorer Browser Issues">
            Please consider upgrading to a recommended browser. Internet
            Explorer may have functionality issues and we recommend using
            another browser to access the system. Check out the{" "}
            <a href="/FAQ"> FAQ page</a> for a list of recommended browsers.”
          </Alert>
        )}
      </header>
      <nav>
        {renderNavBar(
          isLoggedInAsDeveloper,
          getCurrentRoute(useLocation().pathname),
          isAuthenticated
        )}
      </nav>
    </>
  );
}
