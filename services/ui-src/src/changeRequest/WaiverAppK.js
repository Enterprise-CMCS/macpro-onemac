import React from "react";
import {useParams} from "react-router-dom";
import {CHANGE_REQUEST_TYPES} from "./changeRequestTypes";
import {ROLE_ACL, ROUTES} from "cmscommonlib";
import SubmissionForm from "./SubmissionForm";
import SubmissionView from "./SubmissionView";
import {useAppContext} from "../libs/contextLib";
import NotFound from "../containers/NotFound";

/**
 * WaiverAppK acts as a wrapper around SubmissionForm to render custom Appendix K Waiver form
 */
const WaiverAppK = () => {
    // Optional ID parameter from the URL
    const {id} = useParams();
    const allowedRoutes = ROLE_ACL;
    const {userProfile} = useAppContext();
    const currentPath = ROUTES.WAIVER_APP_K

    const formInfo = {
        pageTitle: "Submit 1915(c) Appendix K Amendment",
        readOnlyPageTitle: "1915(c) Appendix K Amendment",
        subheaderMessage: "If your Appendix K submission is for more than one waiver number, please enter one of the applicable waiver numbers. You do not need to create multiple submissions.",
        detailsHeader: "1915(c) Appendix K Amendment",
        requiredUploads: ["Appendix K Template"],
        optionalUploads: ["Other"],
        transmittalNumber: {
            idType: "waiverappk",
            idLabel: "Waiver Number",
            idFAQLink: ROUTES.FAQ_WAIVER_ID,
            idHintText: "Must follow the format SS.####.R##.## or SS.#####.R##.## (use R00 for waivers without renewals)",
            idFormat: "SS.####.R##.## or SS.#####.R##.##",
            idRegex: "(^[A-Z]{2}[.][0-9]{4,5}[.]R[0-9]{2}[.][0-9]{2}$)",
            idMustExist: true,
            errorLevel: "warn",
            existenceRegex: "^[A-Z]{2}[.][0-9]{4,5}",
        },
    };

    if (allowedRoutes[userProfile.userData.type].includes(currentPath)) {
        if (id) {
            return <SubmissionView formInfo={formInfo} id={id}/>;
        } else {
            return (
                <SubmissionForm
                    formInfo={formInfo}
                    changeRequestType={CHANGE_REQUEST_TYPES.WAIVER_APP_K}
                />
            );
        }
    } else {
        return <NotFound/>
    }
};

export default WaiverAppK;
