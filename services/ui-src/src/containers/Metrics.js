import React, {useEffect, useState} from "react";
import AlertBar from "../components/AlertBar";
import {ALERTS_MSG} from "../libs/alert-messages";
import ChangeRequestDataApi from "../utils/ChangeRequestDataApi";
import {useAppContext} from "../libs/contextLib";
import {
    JsonToCsv,
} from 'react-json-csv';
import LoadingScreen from "../components/LoadingScreen";
import {Spinner} from "@cmsgov/design-system";


export default function Metrics() {
    const {isAuthenticated} = useAppContext();
    const [changeRequestList, setChangeRequestList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const filename = 'Csv-file'
    const fields = {
        "transmittalNumber": "transmittalNumber",
        "territory": "territory",
        "type": "type",
        "user": "user",
        "createdAt": "createdAt",
    }
    const style = {
        padding: "5px"
    }

    const text = "Convert Json to Csv";

    useEffect(() => {
        async function onLoad() {
            if (!isAuthenticated) {
                return;
            }
            try {
                setIsLoading(true)
                const metrics = await ChangeRequestDataApi.listAll();
                setChangeRequestList(metrics)
                setIsLoading(false)
            } catch (error) {
                console.log("Error while fetching list.", error);
                AlertBar.alert(ALERTS_MSG.DASHBOARD_LIST_FETCH_ERROR);
            }
        }

        onLoad();
    }, [isAuthenticated]);

    return (
        <div className="dashboard-container">
            <LoadingScreen isLoading={isLoading}>
                <JsonToCsv
                    data={changeRequestList}
                    filename={filename}
                    fields={fields}
                    style={style}
                    text={text}
                />
            </LoadingScreen>
        </div>
    );
}
