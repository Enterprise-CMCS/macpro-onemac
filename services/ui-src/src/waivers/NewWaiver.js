import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../libs/errorLib";
import { API } from "aws-amplify";
import { Auth } from "aws-amplify"
import Select from 'react-select';
import { territoryList } from '../libs/territoryLib';

export default function NewWaiver() {
    const history = useHistory();  // ?? do we need?

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [transmittalNumber, setTransmittalNumber] = useState("");
    const [territory, setTerritory] = useState("");
    const [urgent, setUrgent] = useState(false);
    const [comments, setComments] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // True when the required uploads have been set.
  //  const [areUploadsComplete, setAreUploadsReady] = useState(false);

    //Reference to the File Uploader.
    const uploader = useRef(null);
   
    const [actionType, setActionType] = useState("");
    const actionTypeOptions = [
      { label: 'test 1', value: '1'},
      { label: 'test 2', value: '2'},
      { label: 'test 3', value: '3'},
    ];
    const [waiverAuthority, setWaiverAuthority] = useState("");
    const waiverAuthorityOptions = [
      { label: 'test 1', value: '1'},
      { label: 'test 2', value: '2'},
      { label: 'test 3', value: '3'},
    ];
 
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    async function populateUserInfo() {
        var userInfo = await Auth.currentUserInfo();
        setEmail(userInfo.attributes.email);
        setFirstName(capitalize(userInfo.attributes.given_name));
        setLastName(capitalize(userInfo.attributes.family_name));
        return userInfo.attributes.email;
    }

    populateUserInfo();

    function validateForm() {
        return territory.length > 0 
         && actionType.length > 0 
         && transmittalNumber.length > 0 
         && waiverAuthority.length > 0 ;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setIsLoading(true);

        try {
            let uploads = null; // await uploader.current.uploadFiles();
            let amendmentType="waivers";
    
            await createWaiver({ email, firstName, lastName, territory, transmittalNumber, urgent, comments, uploads, amendmentType, actionType, waiverAuthority });
            history.push("/");
        } catch (e) {
            onError(e);
            setIsLoading(false);
        }
    }

    function createWaiver(waiver) {
        return API.post("amendments", "/amendments", {
            body: waiver
        });
    }

    return (
        <div className="NewWaiver">
            <form onSubmit={handleSubmit}>
            <FormGroup controlId="territory">
                <ControlLabel>State/Territory</ControlLabel>
                <Select
                    name="form-field-name"
                    value={territoryList.filter(function(option) {
                        return option.value === territory;
                    })}
                    onChange={e => setTerritory(e.value)}
                    options={territoryList}
                />
            </FormGroup>
            <FormGroup controlId="actionType">
                <ControlLabel>Action Type</ControlLabel>
                <Select
                    name="form-field-name"
                    value={actionTypeOptions.filter(function(option) {
                        return option.value === actionType;
                    })}
                    onChange={e => setActionType(e.value)}
                    options={actionTypeOptions}
                />
            </FormGroup>
            <FormGroup controlId="transmittalNumber">
                <ControlLabel>Waiver Number</ControlLabel>
                <FormControl
                    value={transmittalNumber}
                    onChange={e => setTransmittalNumber(e.target.value)}
                />
            </FormGroup>
            <FormGroup controlId="actionType">
                <ControlLabel>Waiver Authority</ControlLabel>
                <Select
                    name="form-field-name"
                    value={waiverAuthorityOptions.filter(function(option) {
                        return option.value === waiverAuthority;
                    })}
                    onChange={e => setWaiverAuthority(e.value)}
                    options={waiverAuthorityOptions}
                />
            </FormGroup>
            <FormGroup controlId="summary">
                <ControlLabel>Summary</ControlLabel>
                <FormControl
                    componentClass="textarea"
                    value={comments}
                    onChange={e => setComments(e.target.value)}
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
