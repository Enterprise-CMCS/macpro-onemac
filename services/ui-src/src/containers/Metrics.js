import React, {useEffect, useState} from "react";
import {useAppContext} from "../libs/contextLib";
import {Auth} from "aws-amplify";
import config from "../utils/config";
import ChangeRequestDataApi from "../utils/ChangeRequestDataApi";
import {s3JsonToCsv} from "../utils/csvUtils";
import LoadingScreen from "../components/LoadingScreen";
import "./Metrics.css"


/**
 * Read only component to Display Submission Data With GroupBy Metrics.
 * @returns the component
 */
export default function Metrics() {
    const {isAuthenticated} = useAppContext();
    const [changeRequestCSV, setChangeRequestCSV] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function onLoad() {
            if (!isAuthenticated) {
                return;
            } else {
                try {
                    var data = await Auth.currentAuthenticatedUser();
                    var metricEmail = config.METRICS_USERS
                    const metrics = await ChangeRequestDataApi.listAll();
                    console.log("DEBUG:(" + metrics )
                    setChangeRequestCSV(metrics)
                    if (!metricEmail.includes(data.attributes.email)) {
                        window.location = "/dashboard"
                        return;
                    }
                } catch {
                    window.location = "/dashboard"
                    return;
                }
                setIsLoading(false)
            }

        }

        onLoad();
    }, [isAuthenticated]);


    return (
        <div>
            <LoadingScreen isLoading={isLoading}>
                <div class="ds-l-row ds-u-justify-content--center ds-u-padding--1">
                    {changeRequestCSV}
                </div>
            </LoadingScreen>
        </div>
    );
}
