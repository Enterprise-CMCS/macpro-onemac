import React, {useEffect} from "react";
import {useAppContext} from "../libs/contextLib";
import {Auth} from "aws-amplify";
import config from "../utils/config";
import CMSTable from "../components/CMSTable";

/**
 * Metrics is a temporary page to allow download of all submissions metadata to generate reports.
 */
export default function Metrics() {
    const {isAuthenticated} = useAppContext();

    useEffect(() => {
        async function onLoad() {
            if (!isAuthenticated) {
                return;
            } else {
                try {
                    var data = await Auth.currentAuthenticatedUser();
                    var metricEmail = config.METRICS_USERS
                    console.log("DEBUG: " + metricEmail + " = " + metricEmail.includes(data.attributes.email))
                    if (!metricEmail.includes(data.attributes.email)) {
                        window.location = "/dashboard"
                        return;
                    }
                } catch {
                    window.location = "/dashboard"
                    return;
                }
            }

        }

        onLoad();
    }, [isAuthenticated]);

    return (
        <div>
            <CMSTable/>
        </div>
    );
}
