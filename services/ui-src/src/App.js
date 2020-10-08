import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Dropdown, MenuItem } from "react-bootstrap";
import { Auth } from "aws-amplify";

import Routes from "./Routes";
import { AppContext } from "./libs/contextLib";
import { onError } from "./libs/errorLib";
import { Button } from '@cmsgov/design-system';
import medicaidLogo from "./images/medicaidLogo.png"
import flagIcon from "./images/flagIcon.png"
import "./App.scss";

function App() {
    const [isAuthenticating, setIsAuthenticating] = useState(true);
    const [isAuthenticated, userHasAuthenticated] = useState(false);
    const [email, setEmail] = useState(false);
    const history = useHistory();

    useEffect(() => {
        onLoad();
    }, []);

    async function onLoad() {
        try {
            await Auth.currentSession();
            userHasAuthenticated(true);
            const userInfo = await Auth.currentUserInfo();
            setEmail(userInfo.attributes.email);
        }
        catch(e) {
            if (e !== 'No current user') {
                onError(e);
            }
        }

        setIsAuthenticating(false);
    }

    async function handleLogout() {
        await Auth.signOut();

        userHasAuthenticated(false);
    }

    function renderBranding() {
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
        if (isAuthenticated) {
            return (
                <Dropdown id="account info">
                    <Dropdown.Toggle className="dropdownTitle">
                        {email}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <MenuItem href="/profile">Profile</MenuItem>
                        <MenuItem href="/login" onClick={handleLogout}>Logout</MenuItem>
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

    function generateHeader() {
        return (
            <div className="headerContainer">
                {renderBranding()}
                {renderNavBar()}
            </div>
        )
    }

    return (
        !isAuthenticating && (
            <div>
                {generateHeader()}
                <div className="App container">
                    <AppContext.Provider
                        value={{ isAuthenticated, userHasAuthenticated }}
                    >
                        <Routes />
                    </AppContext.Provider>
                </div>
            </div>
        )
    )
}

export default App;
