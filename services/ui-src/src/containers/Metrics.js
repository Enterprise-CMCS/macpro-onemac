import React, {useEffect, useState} from "react";
import AlertBar from "../components/AlertBar";
import {ALERTS_MSG} from "../libs/alert-messages";
import ChangeRequestDataApi from "../utils/ChangeRequestDataApi";
import {useAppContext} from "../libs/contextLib";
import {s3JsonToCsv} from "../utils/csvUtils";
import LoadingScreen from "../components/LoadingScreen";
import {Auth} from "aws-amplify";
import config from "../utils/config";

export default function Metrics() {
    const {isAuthenticated} = useAppContext();
    const [changeRequestList, setChangeRequestList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function onLoad() {
            if (!isAuthenticated) {
                return;
            } else {
                try {
                    var data = await Auth.currentAuthenticatedUser();
                    var metricEmail = config.ALLOWED_METRICS_EMAILS
                    if ( ! metricEmail.includes(data.attributes.email )) {
                        window.location = "/dashboard"
                      return;
                    }
                } catch {
                    window.location = "/dashboard"
                    return ;
                }
            }
            try {
                setIsLoading(true)
                const metrics = await ChangeRequestDataApi.listAll();
                const csvData = s3JsonToCsv(metrics)
                setChangeRequestList(csvData)
                setIsLoading(false)
            } catch (error) {
                AlertBar.alert(ALERTS_MSG.DASHBOARD_LIST_FETCH_ERROR);
            }
        }

        onLoad();
    }, [isAuthenticated]);

    function downloadCsv() {

        var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(changeRequestList);
        hiddenElement.target = '_blank';
        hiddenElement.download = 'SPAFormMetrics.csv';
        hiddenElement.click();

    }

    return (
        <div className="dashboard-container">
            <LoadingScreen isLoading={isLoading}>
                <button class="ds-c-button" onClick={downloadCsv}>&nbsp;Download Metrics (CSV format)</button>
            </LoadingScreen>
        </div>
    );
}
