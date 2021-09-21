import React, { RefObject, useState, useEffect, useRef } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Auth } from "aws-amplify";
import { AwsCognitoOAuthOpts } from "@aws-amplify/auth/lib-esm/types/Auth";
import { Button } from "@cmsgov/design-system";
import { ROUTES, getUserRoleObj } from "cmscommonlib";
import { getCurrentRoute } from "../utils/routeUtils";
import config from "../utils/config";
import { Alert, UsaBanner } from "@cmsgov/design-system";
import { isIE } from "react-device-detect";
import { useAppContext } from "../libs/contextLib";
import oneMacLogo from "../assets/images/OneMAC_logoLight.svg";
import { ROUTES as RouteList } from "cmscommonlib";
import HamburgerMenu from "../components/HamburgerMenu.js";

/**
 * Get the sign in URL used with OKTA.
 * @returns the signin URL
 */
export function getSignInUrl() {
  const authConfig = Auth.configure();
  const { domain, redirectSignIn, responseType } =
    authConfig.oauth as AwsCognitoOAuthOpts;
  const clientId = authConfig.userPoolWebClientId;
  const url = `https://${domain}/oauth2/authorize?identity_provider=Okta&redirect_uri=${redirectSignIn}&response_type=${responseType}&client_id=${clientId}`;
  return url;
}

/**
 * Get the register URL depending on the current domain.
 * @returns the register URL
 */
function getRegisterUrl() {
  const currentDomain = window.location.hostname;
  let registerUrl = "https://test.home.idm.cms.gov/";

  // TODO remove the 'spa.cms.gov' and 'spa-val.cms.gov' as options
  // after the rebrand has changed the domain to onemac
  if (currentDomain === "onemac.cms.gov" || currentDomain === "spa.cms.gov") {
    registerUrl = "https://home.idm.cms.gov/";
  } else if (
    currentDomain === "onemacval.cms.gov" ||
    currentDomain === "spa-val.cms.gov"
  ) {
    registerUrl = "https://impl.home.idm.cms.gov/";
  }

  return registerUrl;
}

/**
 * Logout the user.
 */
function logout(isLoggedInAsDeveloper?: boolean) {
  const authConfig = Auth.configure();
  Auth.signOut();
  if (isLoggedInAsDeveloper) {
    window.location.replace(
      (authConfig.oauth as AwsCognitoOAuthOpts).redirectSignOut
    );
  } else {
    window.location.href = getRegisterUrl();
  }
}

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
 * Component containing header
 * @param {Object} props - component properties
 */
export function Header() {
  const history = useHistory();
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
    isAuthenticated: boolean | undefined,
    userType: string
  ) {
    const userObj = getUserRoleObj(userType, !userProfile?.cmsRoles);

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
        href={ROUTES.FAQ}
        className={getActiveClass(currentRoute, RouteList.FAQ_TOP)}
        target="_blank"
        rel="noreferrer noopener"
      >
        FAQ
      </a>
    );

    const dashboardLink = (
      <Link
        id="dashboardLink"
        to={ROUTES.DASHBOARD}
        className={getActiveClass(currentRoute, RouteList.DASHBOARD)}
      >
        Dashboard
      </Link>
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

    let linksToDisplay = [homeLink];
    if (isAuthenticated) {
      if (userObj.canAccessDashboard) {
        linksToDisplay.push(dashboardLink);
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
              {renderAccountButtons(isLoggedInAsDeveloper)}
            </div>
          </div>
        );
    }
  }

  const getActiveClass = (currentRoute: string, targetRoute: string) =>
    currentRoute === targetRoute.split("/")[1].toUpperCase()
      ? "activeLink"
      : "ds-u-text-decoration--none";

  /**
   * Renders account related buttons based on whether the user is authenticated or not authenticated
   */
  function renderAccountButtons(isLoggedInAsDeveloper?: boolean) {
    let showDevLogin = config.ALLOW_DEV_LOGIN === "true";
    if (isAuthenticated) {
      return (
        <div className="nav-right" ref={wrapperRef}>
          <button
            className="dropdown"
            id="myAccountLink"
            onClick={() => setShowMenu(!showMenu)}
          >
            My Account&nbsp;
            <svg
              width="11"
              height="9"
              viewBox="0 0 11 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.66016 4.52295L0.660156 0.0229473L10.6602 0.0229473L5.66016 4.52295Z"
                fill="white"
              ></path>
            </svg>
          </button>
          {showMenu && (
            <div className="dropdown-content">
              <Link
                to={ROUTES.PROFILE}
                id="manageAccountLink"
                onClick={() => setShowMenu(false)}
              >
                <svg
                  width="14"
                  height="15"
                  viewBox="0 0 14 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.6663 14.9999H0.333008V12.3332H13.6663V14.9999ZM7.70634 2.45988L10.2063 4.95988L4.16634 10.9999H1.66634V8.49987L7.70634 2.45988ZM10.9197 4.24654L8.41968 1.74654L9.63968 0.526543C9.89968 0.266543 10.3197 0.266543 10.5797 0.526543L12.1397 2.08654C12.3997 2.34654 12.3997 2.76654 12.1397 3.02654L10.9197 4.24654Z"
                    fill="white"
                  />
                </svg>
                &nbsp; Manage Profile
              </Link>
              <Link
                to={ROUTES.HOME}
                id="logoutLink"
                onClick={() => {
                  setShowMenu(false);
                  logout(isLoggedInAsDeveloper);
                }}
              >
                <svg
                  width="17"
                  height="12"
                  viewBox="0 0 17 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.0975 11.78L16.7645 6.53083C17.0782 6.23713 17.0782 5.76221 16.7645 5.46851L11.0975 0.219378C10.5882 -0.249294 9.71454 0.081901 9.71454 0.75054V3.75004H5.12701C4.67837 3.75004 4.31744 4.08436 4.31744 4.49992V7.49942C4.31744 7.91498 4.67837 8.24929 5.12701 8.24929H9.71454V11.2488C9.71454 11.9206 10.5916 12.2486 11.0975 11.78ZM6.47651 10.3739V11.6237C6.47651 11.83 6.29436 11.9987 6.07173 11.9987H3.23826C1.45047 11.9987 0 10.6551 0 8.99917V3.00017C0 1.34419 1.45047 0.000664544 3.23826 0.000664544H6.07173C6.29436 0.000664544 6.47651 0.169387 6.47651 0.375602V1.62539C6.47651 1.83161 6.29436 2.00033 6.07173 2.00033H3.23826C2.6412 2.00033 2.15884 2.44713 2.15884 3.00017V8.99917C2.15884 9.5522 2.6412 9.999 3.23826 9.999H6.07173C6.29436 9.999 6.47651 10.1677 6.47651 10.3739Z"
                    fill="white"
                  />
                </svg>
                &nbsp; Log out
              </Link>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div className="nav-right">
          <Button href={getRegisterUrl()} inversed className="register-link">
            Register
          </Button>
          <Button href={getSignInUrl()} id="loginBtn" inversed>
            Login
          </Button>
          {showDevLogin && (
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
        </div>
      );
    }
  }

  const { userData } = useAppContext()?.userProfile ?? {};
  let userType = userData?.type ?? "user";

  return (
    <>
      <div className="usa-banner-custom">
        <UsaBanner />
      </div>
      {isIE && (
        <Alert variation="error" heading="Internet Explorer Browser Issues">
          Please consider upgrading to a recommended browser. Internet Explorer
          may have functionality issues and we recommend using another browser
          to access the system. Check out the <a href="/FAQ"> FAQ page</a> for a
          list of recommended browsers.”
        </Alert>
      )}
      {renderNavBar(
        isLoggedInAsDeveloper,
        getCurrentRoute(useLocation().pathname),
        isAuthenticated,
        userType
      )}
    </>
  );
}
