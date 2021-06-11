import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { RESPONSE_CODE, ROUTES } from "cmscommonlib";
import LoadingScreen from "../components/LoadingScreen";
import FileList from "../components/FileList";
import { TextField } from "@cmsgov/design-system";
import ChangeRequestDataApi from "../utils/ChangeRequestDataApi";
import PropTypes from "prop-types";
import { formatDate } from "../utils/date-utils";
import PageTitleBar from "../components/PageTitleBar";
import { Review } from "@cmsgov/design-system";

/**
 * Given an id and the relevant submission type forminfo, show the details
 * @param {Object} formInfo - all the change request details specific to this submission
 * @param {String} id - the id of the change request data element to view
 * @param {String} userId - the id of the user who created the change request
 */
const SubmissionView = ({ formInfo, id, userId }) => {
  // The browser history, so we can redirect to the home page
  const history = useHistory();

  // so we show the spinner during the data load
  const [isLoading, setIsLoading] = useState(true);

  // The record we are using for the form.
  const [changeRequest, setChangeRequest] = useState();

  useEffect(() => {
    let mounted = true;

    if (!id || !userId) return;

    ChangeRequestDataApi.get(id, userId)
      .then((fetchedChangeRequest) => {
        if (mounted) setChangeRequest(fetchedChangeRequest);
      })
      .then(() => {
        if (mounted) setIsLoading(false);
      })
      .catch(() => {
        history.push({
          pathname: ROUTES.DASHBOARD,
          state: {
            passCode: RESPONSE_CODE.SYSTEM_ERROR,
          },
        });
      });

    return function cleanup() {
      mounted = false;
    };
  }, [id, userId, history]);

  return (
    <LoadingScreen isLoading={isLoading}>
      <PageTitleBar heading={formInfo.readOnlyPageTitle} enableBackNav />
      {changeRequest && (
        <div className="form-container">
          <h3>{formInfo.detailsHeader} Details</h3>
          <div className="form-card">
            {changeRequest.actionType && (
              <Review heading="Action Type">{changeRequest.actionType}</Review>
            )}
            {changeRequest.waiverAuthority && (
              <Review heading="Waiver Authority">
                {changeRequest.waiverAuthority}
              </Review>
            )}
            {changeRequest.transmittalNumber && (
              <Review heading={formInfo.transmittalNumber.idLabel}>
                {changeRequest.transmittalNumber}
              </Review>
            )}
            {changeRequest.submittedAt && (
              <Review heading="Submitted On">
                {formatDate(changeRequest.submittedAt)}
              </Review>
            )}
          </div>
          <h3>Attachments</h3>
          <FileList uploadList={changeRequest.uploads}></FileList>
          <div className="summary-box">
            <TextField
              name="summary"
              label="Additional Information"
              fieldClassName="summary-field"
              multiline
              disabled
              value={changeRequest.summary}
            ></TextField>
          </div>
        </div>
      )}
    </LoadingScreen>
  );
};

SubmissionView.propTypes = {
  formInfo: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};

export default SubmissionView;
