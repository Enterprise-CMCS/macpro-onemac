import React from "react"
import { Link, useHistory } from "react-router-dom"
import { Dropdown, MenuItem } from "react-bootstrap"
import { Auth } from "aws-amplify"
import { Button } from '@cmsgov/design-system'

import { ROUTES } from "../Routes"
import medicaidLogo from "../images/medicaidLogo.png"
import flagIcon from "../images/flagIcon.png"
import "./Header.scss"

/**
 * Component containing header
 * @param {Object} props - component properties
 */
function Header(props) {
    const history = useHistory()

    /**
     * Renders a branding bar
     */
    function renderBrandingBar() {
        return (
            <div tabIndex="0">
                <div className="usaBanner">
                    <img src={flagIcon} alt="united states flag" />
                    An offical website of the United States government
                </div>
                <div className="headerLogo">
                    <a href="https://www.medicaid.gov/">
                        <img src={medicaidLogo} alt="Medicaid.gov-Keeping America Healthy" />
                    </a>
                </div>
            </div>
        )
    }

    /**
     * Renders account related buttons based on whether the user is authenticated or not authenticated
     */
    function renderAccountButtons() {
        if (props.isAuthenticated) {
            return (
                <Dropdown id="account info">
                    <Dropdown.Toggle className="accountDropdown">
                        Account
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <MenuItem href={ROUTES.PROFILE}>Profile</MenuItem>
                        <MenuItem href={ROUTES.LOGIN} onClick={() => Auth.signOut()}>Logout</MenuItem>
                    </Dropdown.Menu>
                </Dropdown>
            )
        } else {
            return(
                <div className="navElements">
                    <Button onClick={() => history.push(ROUTES.SIGNUP)} inversed>Sign Up</Button>
                    <Button onClick={() => history.push(ROUTES.LOGIN)} inversed>Login</Button>
                </div>
            )
        }
    }

    /**
     * Renders a navigation bar
     */
    function renderNavBar() {
        return (
            <div className="navbarContainer">
                <div className="navElements">
                    <Link to={ROUTES.HOME}>About</Link>
                    <Link to={ROUTES.DASHBOARD}>Dashboard</Link>
                    <Link to={ROUTES.FAQ}>FAQ</Link>
                </div>
                {renderAccountButtons()}
            </div>
        )
    }

    return (
        <div className="headerContainer">
            {renderBrandingBar()}
            {renderNavBar()}
        </div>
    )
}

export default Header
