import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";

import Routes from "./Routes";
import Header from "./components/Header"
import { AppContext } from "./libs/contextLib";
import { onError } from "./libs/errorLib";

function App() {
    const [isAuthenticating, setIsAuthenticating] = useState(true);
    const [isAuthenticated, userHasAuthenticated] = useState(false);

    useEffect(() => {
        onLoad();
    }, []);

    async function onLoad() {
        try {
            await Auth.currentSession();
            userHasAuthenticated(true);
        }
        catch(e) {
            if (e !== 'No current user') {
                onError(e);
            }
        }

        setIsAuthenticating(false);
    }

    return (
        !isAuthenticating && (
            <div>
                <Header isAuthenticated={isAuthenticated} />
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

export default App
