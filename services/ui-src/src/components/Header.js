import React, {useEffect, useState} from "react"
import { Link } from "react-router-dom"
//import { Dropdown, MenuItem } from "react-bootstrap"
import { Auth } from "aws-amplify"
import { Button } from '@cmsgov/design-system'
import {signInWithOkta} from '../containers/Login'
import { ROUTES } from "../Routes"
import medicaidLogo from "../images/medicaidLogo.png"
import flagIcon from "../images/flagIcon.png"
import "./Header.scss"
//import {onError} from "../libs/errorLib";

/**
 * Component containing header
 * @param {Object} props - component properties
 */
function Header(props) {
    //const history = useHistory()
    const [email, setEmail] = useState("");
    useEffect(() => {
        function loadProfile() {
            return Auth.currentSession();
        }

        async function onLoad() {
            try {
                const userInfo = await loadProfile();
                setEmail(userInfo.idToken.payload.email);
            } catch (e) {
               // onError(e);
                console.log("Debug: Auth.currentSession:" + e)
            }
        }

        onLoad();
    }, []);

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
                    <Button onClick={() => console.log("here") } inversed>{email}</Button>
                    <Button onClick={() => Auth.signOut() } inversed>Logout</Button>
                </div>
            )
        } else {
            return(
                <div className="navElements">
                      <Button onClick={() => signInWithOkta()} inversed>Login</Button>
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
