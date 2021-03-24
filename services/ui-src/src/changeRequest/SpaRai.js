import React from "react";
import {useParams} from "react-router-dom";
import {CHANGE_REQUEST_TYPES} from "./changeRequestTypes";
import SubmissionForm from "./SubmissionForm";
import SubmissionView from "./SubmissionView";
import {ROLE_ACL, ROUTES} from "cmscommonlib";
import {useAppContext} from "../libs/contextLib";
import NotFound from "../containers/NotFound";

/**
 * SpaRai acts as a wrapper around RaiTemplate to render custom RAI form for a SPA RAI
 */
const SpaRai = () => {
    // Optional ID parameter from the URL
    const {id} = useParams();
    const allowedRoutes = ROLE_ACL;
    const {userProfile} = useAppContext();
    const currentPath = ROUTES.SPA_RAI;

    const formInfo = {
        pageTitle: "Respond to SPA RAI",
        readOnlyPageTitle: "SPA RAI Response Details",
        detailsHeader: "SPA RAI",
        requiredUploads: ["RAI Response"],
        optionalUploads: [
            "CMS Form 179",
            "SPA Pages",
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
            idMustExist: true,
            errorLevel: "error",
        },

    };

    if (allowedRoutes[userProfile.userData.type].includes(currentPath)) {
        if (id) {
            return <SubmissionView formInfo={formInfo} id={id}/>;
        } else {
            return (
                <SubmissionForm
                    formInfo={formInfo}
                    changeRequestType={CHANGE_REQUEST_TYPES.SPA_RAI}
                />
            );
        }
    } else {
        return <NotFound/>
    }
};

export default SpaRai;
