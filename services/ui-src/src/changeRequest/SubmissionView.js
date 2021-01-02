import React, { useState, useEffect } from "react";
import LoadingScreen from "../components/LoadingScreen";
import FileList from "../components/FileList";
import { TextField } from "@cmsgov/design-system";
import ChangeRequestDataApi from "../utils/ChangeRequestDataApi";
import PropTypes from "prop-types";
import { ALERTS_MSG } from "../libs/alert-messages";
import { formatDate } from "../utils/date-utils";
import PageTitleBar, { TITLE_BAR_ID } from "../components/PageTitleBar";
import { Alert, Review } from "@cmsgov/design-system";

/**
 * RAI Form template to allow rendering for different types of RAI's.
 * @param {Object} formInfo - all the change request details specific to this submission
 * @param {String} id - the id of the change request data element to view
 */
const SubmissionView = ({ formInfo, id }) => {

  // for setting the alert
  const [alert, setAlert] = useState(ALERTS_MSG.NONE);

  // The record we are using for the form.
  const [changeRequest, setChangeRequest] = useState();

  useEffect(() => {
    let mounted = true;
    let innerAlert = ALERTS_MSG.NONE;
    let initialChangeRequest;

    console.log("called and id is: " + id);

    async function fetchChangeRequest() {
      if (!id) return;

      try {
        const fetchedChangeRequest = await ChangeRequestDataApi.get(id);
        setChangeRequest(fetchedChangeRequest);
      } catch (error) {
        console.log("Error while fetching submission.", error);
      }
    }

    initialChangeRequest = fetchChangeRequest();
    if (mounted) setChangeRequest(initialChangeRequest);

    if (mounted) setAlert(innerAlert);

    return function cleanup() {
      mounted = false;
    };
  }, [id]);

  const jumpToPageTitle = () => {
    var elmnt = document.getElementById(TITLE_BAR_ID);
    if (elmnt) elmnt.scrollIntoView();
  };

  useEffect(() => {
    if (alert && alert.heading && alert.heading !== "") {
      jumpToPageTitle();
    }
  }, [alert]);

  const renderAlert = (alert) => {
    if (!alert) return;
    if (alert.heading && alert.heading !== "") {
      return (
        <div className="alert-bar">
          <Alert variation={alert.type} heading={alert.heading}>
            <p className="ds-c-alert__text">{alert.text}</p>
          </Alert>
        </div>
      );
    }
  };

  if (!changeRequest) {
    return (
      <LoadingScreen isLoading={true}>
        <PageTitleBar heading={formInfo.readOnlyPageTitle} text="" />
      </LoadingScreen>
    );
  } else {
    return (
      <>
        <PageTitleBar heading={formInfo.readOnlyPageTitle} text="" />
        {renderAlert(alert)}
        <div className="form-container">
          <h3>{formInfo.detailsHeader} Details</h3>
          <div className="form-card">
            {formInfo.territory && changeRequest.territory && (
              <Review heading="State/Territory">
                {changeRequest.territory}
              </Review>
            )}
            {changeRequest.actionType && (
              <Review heading="Action Type">{changeRequest.actionType}</Review>
            )}
            {changeRequest.waiverAuthority && (
              <Review heading="Waiver Authority">
                {changeRequest.waiverAuthority}
              </Review>
            )}
            {changeRequest.transmittalNumber && (
              <Review heading={formInfo.idLabel}>
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
              label="Summary"
              fieldClassName="summary-field"
              multiline
              disabled
              value={changeRequest.summary}
            ></TextField>
          </div>
        </div>
      </>
    );
  }
};

SubmissionView.propTypes = {
  formInfo: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};

export default SubmissionView;
