import React from "react"
import { Link, useHistory } from "react-router-dom"
import { Dropdown, MenuItem } from "react-bootstrap"
import { Auth } from "aws-amplify"
import { Button } from '@cmsgov/design-system'

import medicaidLogo from "../images/medicaidLogo.png"
import flagIcon from "../images/flagIcon.png"
import "./Header.scss"

function Header(props) {
    const history = useHistory()

    function renderBrandingBar() {
        return (
            <div tabindex="0">
                <div className="usaBanner">
                    <img src={flagIcon} alt="united states flag" />
                    An offical website of the United States government
                </div>
                <div className="headerLogo">
                    <img src={medicaidLogo} alt="medicaid logo" />
                </div>
                <div className="borderLine" />
            </div>
        )
    }

    function renderAccountButtons() {
        if (props.isAuthenticated) {
            return (
                <Dropdown id="account info">
                    <Dropdown.Toggle className="accountDropdown">
                        Account
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <MenuItem href="/profile">Profile</MenuItem>
                        <MenuItem href="/login" onClick={() => Auth.signOut()}>Logout</MenuItem>
                    </Dropdown.Menu>
                </Dropdown>
            )
        } else {
            return(
                <div className="navElements">
                    <Button onClick={() => history.push("/signup")} inversed>Sign Up</Button>
                    <Button onClick={() => history.push("/login")} inversed>Login</Button>
                </div>
            )
        }
    }

    function renderNavBar() {
        return (
            <div className="navbarContainer">
                <div className="navElements">
                    <Link to="/">About</Link>
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/FAQ">FAQ</Link>
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
