import React from "react";
import {useParams} from "react-router-dom";
import {CHANGE_REQUEST_TYPES} from "./changeRequestTypes";
import SubmissionForm from "./SubmissionForm";
import SubmissionView from "./SubmissionView";
import {ROUTES, ROLE_ACL} from "cmscommonlib";
import {useAppContext} from "../libs/contextLib";
import NotFound from "../containers/NotFound";

/**
 * Spa acts as a wrapper around SubmissionForm to render SPA-specific form
 */
const Spa = () => {
    // Optional ID parameter from the URL
    const {id} = useParams();
    const allowedRoutes = ROLE_ACL;
    const {userProfile} = useAppContext();
    const currentPath = ROUTES.SPA

    const formInfo = {
        pageTitle: "Submit New SPA",
        readOnlyPageTitle: "SPA Submission Details",
        detailsHeader: "SPA",
        requiredUploads: ["CMS Form 179", "SPA Pages"],
        optionalUploads: [
            "Cover Letter",
            "Existing State Plan Page(s)",
            "Document Demonstrating Good-Faith Tribal Engagement",
            "Tribal Consultation",
            "Public Notice",
            "Standard Funding Questions (SFQs)",
            "Other",
        ],
        transmittalNumber: {
            idType: "spa",
            idLabel: "SPA ID",
            idHintText: "Must follow the format SS-YY-NNNN-xxxx",
            idFAQLink: ROUTES.FAQ_SPA_ID,
            idFormat: "SS-YY-NNNN or SS-YY-NNNN-xxxx",
            idRegex: "(^[A-Z]{2}-[0-9]{2}-[0-9]{4}-[a-zA-Z0-9]{4}$)|(^[A-Z]{2}-[0-9]{2}-[0-9]{4}$)",
            idMustExist: false,
            errorLevel: "error",
        },

    };

    if (allowedRoutes[userProfile.userData.type].includes(currentPath)) {

        if (id) {
            return <SubmissionView formInfo={formInfo} id={id}/>;
        } else {
            console.log("Here")
            return (

                <SubmissionForm
                    formInfo={formInfo}
                    changeRequestType={CHANGE_REQUEST_TYPES.SPA}
                />
            );
        }
    } else {
        return <NotFound/>
    }
};

export default Spa;
