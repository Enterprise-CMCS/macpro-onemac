import React from "react"
import { Link, useHistory } from "react-router-dom"
import { Auth } from "aws-amplify"
import { Button, FormLabel } from '@cmsgov/design-system'
import { ROUTES } from "../Routes"
import {signInWithOkta} from '../containers/Login'
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
                <div className="navElements">
                    <FormLabel inversed>
                        <Button onClick={() => {
                            Auth.signOut()
                        }} inversed>Logout</Button>
                        <Button onClick={() => {
                           history.push(ROUTES.DEVLOGIN)
                           Auth.signOut()
                        }} inversed>Dev Logout</Button>
                    </FormLabel>
                </div>
            )
        } else {
            return(
                <div className="navElements">
                    <Button onClick={() => signInWithOkta()} inversed>Login</Button>
                    <Button onClick={() => history.push(ROUTES.DEVSIGNUP)} inversed>DevTest Sign Up</Button>
                    <Button onClick={() => history.push(ROUTES.DEVLOGIN)} inversed>DevTest Login</Button>
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
