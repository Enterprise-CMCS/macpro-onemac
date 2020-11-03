import React from "react"
import { Link, useHistory } from "react-router-dom"
import { Dropdown, MenuItem } from "react-bootstrap"
import { Auth } from "aws-amplify"
import { Button } from '@cmsgov/design-system'

import { ROUTES } from "../Routes"
import medicaidLogo from "../images/medicaidLogo.png"
import flagIcon from "../images/flagIcon.png"

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
     * Renders account related buttons based on whether the user is authenticated or not authenticated
     */
    function renderAccountButtons() {
        if (props.isAuthenticated) {
            return (
                <Dropdown id="account info" className="nav-right">
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
            return (
                <div className="nav-right">
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
            <div className="nav-bar">
                <div className="nav-left">
                    <Link to={ROUTES.HOME}>About</Link>
                    <Link to={ROUTES.DASHBOARD}>Dashboard</Link>
                    <Link to={ROUTES.FAQ}>FAQ</Link>
                </div>
                {renderAccountButtons()}
            </div>
        )
    }

    return (
        <div tabIndex="0">
            {renderUSABar()}
            {renderBrandBar()}
            {renderNavBar()}
        </div>
    )
}

export default Header
