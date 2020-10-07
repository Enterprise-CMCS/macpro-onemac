import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, NavItem, NavDropdown } from "react-bootstrap";
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

        history.push("/login");
    }

    function renderBranding() {
        return (
            <div>
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

    function renderNavBar() {
        return (
        <Navbar fluid collapseOnSelect>
            <Navbar.Header>
                Header Title
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav pullRight>
                    <LinkContainer to="/FAQ">
                        <NavItem>FAQ</NavItem>
                    </LinkContainer>
                    {isAuthenticated ? (
                        <NavDropdown
                            id="User"
                            title={email}  >
                            <LinkContainer to="/profile">
                                <NavItem>User Profile</NavItem>
                            </LinkContainer>
                            <NavItem onClick={handleLogout}>Logout</NavItem>
                        </NavDropdown>
                    ) : (
                            <div className="navbarButtons">
                                <LinkContainer to="/signup">
                                    <NavItem>
                                        <Button inversed className="button">Sign Up</Button>
                                    </NavItem>
                                </LinkContainer>
                                <LinkContainer to="/login">
                                    <NavItem>
                                        <Button inversed className="button">Login</Button>
                                    </NavItem>
                                </LinkContainer>
                            </div>
                        )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
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
                    <Link to="/">Back to Dashboard</Link>
                    <AppContext.Provider
                        value={{ isAuthenticated, userHasAuthenticated }}
                    >
                        <Routes />
                    </AppContext.Provider>
                </div>
            </div>
        )
    );
}

export default App;
