import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import { Button, FormLabel } from "@cmsgov/design-system";
import { ROUTES } from "../Routes";
import medicaidLogo from "../images/medicaidLogo.png";
import flagIcon from "../images/flagIcon.png";
import config from "../utils/config";

/**
 * Get the sign in URL used with OKTA.
 * @returns the signin URL
 */
function getSignInUrl() {
  const authConfig = Auth.configure();
  const { domain, redirectSignIn, responseType } = authConfig.oauth;
  const clientId = authConfig.userPoolWebClientId;
  const url = `https://${domain}/oauth2/authorize?identity_provider=Okta&redirect_uri=${redirectSignIn}&response_type=${responseType}&client_id=${clientId}`;
  return url;
}

/**
 * Logout the user.
 */
function logout() {
  const authConfig = Auth.configure();
  Auth.signOut();
  window.location.href = authConfig.oauth.redirectSignOut;
}

/**
 * Component containing header
 * @param {Object} props - component properties
 */
function Header(props) {
  const history = useHistory()

  /**
   * Renders the USA bar
   */
  function renderUSABar() {
    return (
      <div className="usa-bar">
        <img src={flagIcon} alt="united states flag" />
                    An offical website of the United States government
      </div>
    )
  }

  /**
   * Renders a branding bar
   */
  function renderBrandBar() {
    return (
      <div className="brand-bar">
        <a href="https://www.medicaid.gov/">
          <img src={medicaidLogo} alt="Medicaid.gov-Keeping America Healthy" />
        </a>
      </div>
    )
  }

  /**
   * Renders a navigation bar
   */
  function renderNavBar() {
    return (
      <div className="nav-bar">
        <div className="nav-left">
          <Link to={ROUTES.HOME}>About</Link>
          <Link id={"dashboardLink"} to={ROUTES.DASHBOARD}>Dashboard</Link>
          <Link to={ROUTES.FAQ}>FAQ</Link>
        </div>
        {renderAccountButtons()}
      </div>
    )
  }

  /**
   * Renders account related buttons based on whether the user is authenticated or not authenticated
   */
  function renderAccountButtons() {
    let showDevLogin = config.ALLOW_DEV_LOGIN === "true";
    if (props.isAuthenticated) {
      return (
        <div className="nav-right">
          <FormLabel inversed>
            <Button id={"logoutBtn"} onClick={() => logout()} inversed>
              Logout
            </Button>
          </FormLabel>
        </div>
      );
    } else {
      return (
        <div className="nav-right">
          <Button onClick={() => (window.location = getSignInUrl())} inversed>
            Login
          </Button>
          {showDevLogin && (
            <Button id={"devloginBtn"} onClick={() => history.push(ROUTES.DEVLOGIN)} inversed>
              Development Login
            </Button>
          )}
        </div>
      );
    }
  }

  return (
    <div tabIndex="0">
      {renderUSABar()}
      {renderBrandBar()}
      {renderNavBar()}
    </div>
  );
}

export default Header;
