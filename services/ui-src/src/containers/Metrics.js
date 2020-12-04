import React, {useEffect, useState} from "react";
import AlertBar from "../components/AlertBar";
import {ALERTS_MSG} from "../libs/alert-messages";
import ChangeRequestDataApi from "../utils/ChangeRequestDataApi";
import {useAppContext} from "../libs/contextLib";
import {
    JsonToCsv,
} from 'react-json-csv';
import LoadingScreen from "../components/LoadingScreen";


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
    var data = [
        {
            "transmittalNumber": "AL-22-2222",
            "summary": "more",
            "userId": "us-east-1:a18d7580-db98-4c95-8342-5428449974ad",
            "territory": "AL",
            "createdAt": 1607095141294,
            "user": {
                "authProvider": "cognito-idp.us-east-1.amazonaws.com/us-east-1_ibScaq0y5,cognito-idp.us-east-1.amazonaws.com/us-east-1_ibScaq0y5:CognitoSignIn:f89d0a56-35f1-4dfb-989a-ba91972401a0",
                "firstName": "TestFirstName",
                "lastName": "TestLastName",
                "id": "us-east-1:a18d7580-db98-4c95-8342-5428449974ad",
                "email": "zlewis@clarityinnovates.com"
            },
            "id": "09acfce0-3644-11eb-8aa2-cba0cfaf8cb5",
            "submittedAt": 1607095141598,
            "state": "submitted",
            "type": "spa",
            "uploads": [
                {
                    "s3Key": "1607095139036/a1.jpg",
                    "filename": "a1.jpg",
                    "title": "CMS Form 179",
                    "contentType": "image/jpeg",
                    "url": "https://uploads-oy2-2805-form-metrics-attachmentsbucket-157c23alfucz7.s3.amazonaws.com/protected/us-east-1%3Aa18d7580-db98-4c95-8342-5428449974ad/1607095139036/a1.jpg"
                },
                {
                    "s3Key": "1607095139038/a1.jpg",
                    "filename": "a1.jpg",
                    "title": "SPA Pages",
                    "contentType": "image/jpeg",
                    "url": "https://uploads-oy2-2805-form-metrics-attachmentsbucket-157c23alfucz7.s3.amazonaws.com/protected/us-east-1%3Aa18d7580-db98-4c95-8342-5428449974ad/1607095139038/a1.jpg"
                }
            ]
        }, {
            "transmittalNumber": "AL-33-3333",
            "summary": "more",
            "userId": "us-east-1:a18d7580-db98-4c95-8342-5428449974ad",
            "territory": "AL",
            "createdAt": 1607095141297,
            "user": {
                "authProvider": "cognito-idp.us-east-1.amazonaws.com/us-east-1_ibScaq0y5,cognito-idp.us-east-1.amazonaws.com/us-east-1_ibScaq0y5:CognitoSignIn:f89d0a56-35f1-4dfb-989a-ba91972401a0",
                "firstName": "TestFirstName",
                "lastName": "TestLastName",
                "id": "us-east-1:a18d7580-db98-4c95-8342-5428449974ad",
                "email": "zlewis@clarityinnovates.com"
            },
            "id": "09acfce0-3644-11eb-8aa2-cba0cfaf8cb5",
            "submittedAt": 1607095141598,
            "state": "submitted",
            "type": "spa",
            "uploads": [
                {
                    "s3Key": "1607095139036/a1.jpg",
                    "filename": "a1.jpg",
                    "title": "CMS Form 179",
                    "contentType": "image/jpeg",
                    "url": "https://uploads-oy2-2805-form-metrics-attachmentsbucket-157c23alfucz7.s3.amazonaws.com/protected/us-east-1%3Aa18d7580-db98-4c95-8342-5428449974ad/1607095139036/a1.jpg"
                },
                {
                    "s3Key": "1607095139038/a1.jpg",
                    "filename": "a1.jpg",
                    "title": "SPA Pages",
                    "contentType": "image/jpeg",
                    "url": "https://uploads-oy2-2805-form-metrics-attachmentsbucket-157c23alfucz7.s3.amazonaws.com/protected/us-east-1%3Aa18d7580-db98-4c95-8342-5428449974ad/1607095139038/a1.jpg"
                }
            ]
        }, {
            "transmittalNumber": "AL-44-4444",
            "summary": "more",
            "userId": "us-east-1:a18d7580-db98-4c95-8342-5428449974ad",
            "territory": "AL",
            "createdAt": 1607095141299,
            "user": {
                "authProvider": "cognito-idp.us-east-1.amazonaws.com/us-east-1_ibScaq0y5,cognito-idp.us-east-1.amazonaws.com/us-east-1_ibScaq0y5:CognitoSignIn:f89d0a56-35f1-4dfb-989a-ba91972401a0",
                "firstName": "TestFirstName",
                "lastName": "TestLastName",
                "id": "us-east-1:a18d7580-db98-4c95-8342-5428449974ad",
                "email": "zlewis@clarityinnovates.com"
            },
            "id": "09acfce0-3644-11eb-8aa2-cba0cfaf8cb5",
            "submittedAt": 1607095141598,
            "state": "submitted",
            "type": "spa",
            "uploads": [
                {
                    "s3Key": "1607095139036/a1.jpg",
                    "filename": "a1.jpg",
                    "title": "CMS Form 179",
                    "contentType": "image/jpeg",
                    "url": "https://uploads-oy2-2805-form-metrics-attachmentsbucket-157c23alfucz7.s3.amazonaws.com/protected/us-east-1%3Aa18d7580-db98-4c95-8342-5428449974ad/1607095139036/a1.jpg"
                },
                {
                    "s3Key": "1607095139038/a1.jpg",
                    "filename": "a1.jpg",
                    "title": "SPA Pages",
                    "contentType": "image/jpeg",
                    "url": "https://uploads-oy2-2805-form-metrics-attachmentsbucket-157c23alfucz7.s3.amazonaws.com/protected/us-east-1%3Aa18d7580-db98-4c95-8342-5428449974ad/1607095139038/a1.jpg"
                }
            ]
        }
    ]
    const text = "Convert Json to Csv";

    useEffect(() => {
        async function onLoad() {
            if (!isAuthenticated) {
                return;
            }
            try {
                setIsLoading(false)
                const metrics = await ChangeRequestDataApi.listAll();
                setChangeRequestList(metrics)
                console.log(JSON.stringify(metrics))
                //setIsLoading(false);
                //
                console.log(metrics);
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
                {changeRequestList}
                <JsonToCsv
                    data={data}
                    filename={filename}
                    fields={fields}
                    style={style}
                    text={text}
                />
            </LoadingScreen>
        </div>
    );

}
