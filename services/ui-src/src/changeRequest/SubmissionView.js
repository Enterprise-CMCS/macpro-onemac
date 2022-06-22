import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import { RESPONSE_CODE, ROUTES, ChangeRequest } from "cmscommonlib";
import LoadingScreen from "../components/LoadingScreen";
import FileList from "../components/FileList";
import ChangeRequestDataApi from "../utils/ChangeRequestDataApi";
import PropTypes from "prop-types";
import { formatDate } from "../utils/date-utils";
import PageTitleBar from "../components/PageTitleBar";
import { Review } from "@cmsgov/design-system";

const AUTHORITY_LABELS = {
  "1915(b)": "All other 1915(b) Waivers",
  "1915(b)(4)": "1915(b)(4) FFS Selective Contracting waivers",
};

const ACTION_LABELS = {
  amendment: "Waiver Amendment",
  new: "New Waiver",
  renewal: "Request for Waiver Renewal",
};

/**
 * Given an id and the relevant submission type forminfo, show the details
 * @param {Object} formInfo - all the change request details specific to this submission
 */
const SubmissionView = ({ changeRequestType }) => {
  // The browser history, so we can redirect to the home page
  const history = useHistory();
  const { id, userId } = useParams();

  // so we show the spinner during the data load
  const [isLoading, setIsLoading] = useState(true);

  // The record we are using for the form.
  const [changeRequest, setChangeRequest] = useState();

  useEffect(() => {
    let mounted = true;

    if (!id || !userId) return;
    (async () => {
      try {
        const fetchedChangeRequest = await ChangeRequestDataApi.get(id, userId);
        if (mounted) setChangeRequest(fetchedChangeRequest);
        if (mounted) setIsLoading(false);
      } catch (e) {
        history.push({
          pathname: ROUTES.DASHBOARD,
          state: {
            passCode: RESPONSE_CODE.SYSTEM_ERROR,
          },
        });
      }
    })();
    return function cleanup() {
      mounted = false;
    };
  }, [id, userId, history]);

  const formInfo = ChangeRequest.CONFIG[changeRequestType];

  return (
    <LoadingScreen isLoading={isLoading}>
      <PageTitleBar heading={formInfo.readOnlyPageTitle} enableBackNav />
      {changeRequest && (
        <article className="form-container">
          <div className="read-only-submission">
            {changeRequest.submittedAt && (
              <section>
                <Review
                  className="original-review-component"
                  headingLevel="2"
                  heading="Date Submitted"
                >
                  {formatDate(changeRequest.submittedAt)}
                </Review>
              </section>
            )}
            <section>
              <h2>
                {formInfo.readOnlyDetailsHeader ?? formInfo.detailsHeader}{" "}
                Details
              </h2>
              {changeRequest.waiverAuthority && (
                <Review heading="Waiver Authority">
                  {AUTHORITY_LABELS[changeRequest.waiverAuthority] ??
                    changeRequest.waiverAuthority}
                </Review>
              )}
              {changeRequest.actionType && (
                <Review heading="Action Type">
                  {ACTION_LABELS[changeRequest.actionType] ??
                    changeRequest.actionType}
                </Review>
              )}
              {changeRequest.transmittalNumber && (
                <Review heading={formInfo.transmittalNumber.idLabel}>
                  {changeRequest.transmittalNumber}
                </Review>
              )}
            </section>
            <FileList
              heading="Attachments"
              uploadList={changeRequest.uploads}
              zipId={changeRequest.transmittalNumber}
            />
            {changeRequest.summary && (
              <section>
                <Review
                  className="original-review-component preserve-spacing"
                  headingLevel="2"
                  heading="Additional Information"
                >
                  {changeRequest.summary}
                </Review>
              </section>
            )}
          </div>
        </article>
      )}
    </LoadingScreen>
  );
};

SubmissionView.propTypes = {
  changeRequestType: PropTypes.string.isRequired,
};

export default SubmissionView;
