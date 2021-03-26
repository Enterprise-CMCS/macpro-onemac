import AuthenticatedRoute from "./components/AuthenticatedRoute";
import Dashboard from "./containers/Dashboard";
import Spa from "./changeRequest/Spa";
import Waiver from "./changeRequest/Waiver";
import SpaRai from "./changeRequest/SpaRai";
import WaiverRai from "./changeRequest/WaiverRai";
import WaiverExtension from "./changeRequest/WaiverExtension";
import WaiverAppK from "./changeRequest/WaiverAppK";
import Metrics from "./containers/Metrics";
import React from "react";
import {ROUTES} from "./Routes";
import {useAppContext} from "./libs/contextLib";
import {ROLES} from "cmscommonlib";

export default function DynamicRoutes() {
    const {userProfile} = useAppContext();

    if (userProfile) {
        if (userProfile.userData) {
            console.log(JSON.stringify(userProfile.userData))
            switch (userProfile.userData.type) {
                case ROLES.STATE_USER:
                    return (<>
                        <AuthenticatedRoute exact path={ROUTES.DASHBOARD}>
                            <Dashboard/>
                        </AuthenticatedRoute>
                        <AuthenticatedRoute path={`${ROUTES.SPA}/:id?`}>
                            <Spa/>
                        </AuthenticatedRoute>
                        <AuthenticatedRoute exact path={`${ROUTES.WAIVER}/:id?`}>
                            <Waiver/>
                        </AuthenticatedRoute>
                        <AuthenticatedRoute path={`${ROUTES.SPA_RAI}/:id?`}>
                            <SpaRai/>
                        </AuthenticatedRoute>
                        <AuthenticatedRoute path={`${ROUTES.WAIVER_RAI}/:id?`}>
                            <WaiverRai/>
                        </AuthenticatedRoute>
                        <AuthenticatedRoute path={`${ROUTES.WAIVER_EXTENSION}/:id?`}>
                            <WaiverExtension/>
                        </AuthenticatedRoute>
                        <AuthenticatedRoute exact path={`${ROUTES.WAIVER_APP_K}/:id?`}>
                            <WaiverAppK/>
                        </AuthenticatedRoute>
                        <AuthenticatedRoute path={`${ROUTES.METRICS}`}>
                            <Metrics/>
                        </AuthenticatedRoute>
                    </>)
                    break;
                case ROLES.STATE_ADMIN:
                    return (<>
                            <AuthenticatedRoute exact path={ROUTES.DASHBOARD}>
                                <Dashboard/>
                            </AuthenticatedRoute>
                            <AuthenticatedRoute path={`${ROUTES.METRICS}`}>
                                <Metrics/>
                            </AuthenticatedRoute>
                        </>
                    )
                    break;
                case ROLES.CMS_APPROVER:
                    return <></>
                    break;
                case ROLES.SYSTEM_ADMIN:
                    return <></>
                    break;
            }
        }
    }
    return <></>
}
