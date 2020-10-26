import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { API, Auth } from "aws-amplify";
import Select from "react-select";
import { ROUTES } from "../Routes";
import { territoryList } from "../libs/territoryLib";
import {
  actionTypeOptions,
  waiverAuthorityOptions,
  requiredUploads,
  optionalUploads,
} from "../libs/waiverLib.js";
import FileUploader from "../components/FileUploader";
import { CHANGE_REQUEST_TYPES } from "../changeRequest/changeRequestTypes";
import AlertBar from "../components/AlertBar";
import { ALERTS_MSG } from "../libs/alert-messages";

export default function NewWaiver() {
  const history = useHistory();

  const [waiverNumber, setWaiverNumber] = useState("");
  const [territory, setTerritory] = useState("");
  const [summary, setSummary] = useState("");
  const [actionType, setActionType] = useState("");
  const [waiverAuthority, setWaiverAuthority] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // True when the required uploads have been set.
  const [areUploadsComplete, setAreUploadsReady] = useState(false);

  //Reference to the File Uploader.
  const uploader = useRef(null);

  function validateForm() {
    return (
      territory.length > 0 &&
      actionType.length > 0 &&
      waiverNumber.length > 0 &&
      waiverAuthority.length > 0 &&
      areUploadsComplete
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    var user = await Auth.currentUserInfo();
    let type = CHANGE_REQUEST_TYPES.WAIVER;

    try {
      let uploads = await uploader.current.uploadFiles();
      let transmittalNumber = waiverNumber;
      await createWaiver({
        type,
        user,
        transmittalNumber,
        waiverNumber,
        territory,
        actionType,
        waiverAuthority,
        summary,
        uploads,
      });
      history.push(ROUTES.DASHBOARD);
      //Alert must come last or it will be cleared after the history push.
      AlertBar.alert(ALERTS_MSG.SUBMISSION_SUCCESS);
    } catch (error) {
      console.log("There was an error submitting a request.", error);
      AlertBar.alert(ALERTS_MSG.SUBMISSION_ERROR);
      setIsLoading(false);
    }
  }

  function createWaiver(waiver) {
    return API.post("changeRequestAPI", "/submit", {
      body: waiver,
    });
  }

  /**
   * Callback for the uploader to set if the upload requirements are met.
   * @param {Boolean} state true if the required uploads have been specified
   */
  function uploadsReadyCallbackFunction(state) {
    setAreUploadsReady(state);
  }

  return (
    <div className="NewWaiver">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="territory">
          <ControlLabel>State/Territory</ControlLabel>
          <Select
            name="form-field-name"
            value={territoryList.filter(function (option) {
              return option.value === territory;
            })}
            onChange={(e) => setTerritory(e.value)}
            options={territoryList}
          />
        </FormGroup>
        <FormGroup controlId="actionType">
          <ControlLabel>Action Type</ControlLabel>
          <Select
            name="form-field-name"
            value={actionTypeOptions.filter(function (option) {
              return option.value === actionType;
            })}
            onChange={(e) => setActionType(e.value)}
            options={actionTypeOptions}
          />
        </FormGroup>
        <FormGroup controlId="waiverAuthority">
          <ControlLabel>Waiver Authority</ControlLabel>
          <Select
            name="form-field-name"
            value={waiverAuthorityOptions.filter(function (option) {
              return option.value === waiverAuthority;
            })}
            onChange={(e) => setWaiverAuthority(e.value)}
            options={waiverAuthorityOptions}
          />
        </FormGroup>
        <FormGroup controlId="waiverNumber">
          <ControlLabel>Waiver Number</ControlLabel>
          <FormControl
            value={waiverNumber}
            placeholder="AA.####.R##.##"
            onChange={(e) => setWaiverNumber(e.target.value)}
          />
        </FormGroup>
        <h3>Attachments</h3>
        <FileUploader
          ref={uploader}
          requiredUploads={requiredUploads}
          optionalUploads={optionalUploads}
          readyCallback={uploadsReadyCallbackFunction}
        ></FileUploader>
        <br />
        <FormGroup controlId="summary">
          <ControlLabel>Summary</ControlLabel>
          <FormControl
            componentClass="textarea"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          bsStyle="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Submit
        </LoaderButton>
      </form>
    </div>
  );
}
