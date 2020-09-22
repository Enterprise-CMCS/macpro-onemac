import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API, Storage } from "aws-amplify";
import { onError } from "../libs/errorLib";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Select from 'react-select';
import { territoryList } from '../libs/territoryLib';


export default function Waivers() {
    const { id } = useParams();
    const [amendment, setAmendment] = useState(null);
    const [isWaiver, setIsWaiver] = useState("");
    const [territory, setTerritory] = useState("");
    const [actionType, setActionType] = useState("");
    const actionTypeOptions = [
      { label: 'test 1', value: '1'},
      { label: 'test 2', value: '2'},
      { label: 'test 3', value: '3'},
    ];
    const [waiverNumber, setWaiverNumber] = useState("");
    const [waiverAuthority, setWaiverAuthority] = useState("");
    const waiverAuthorityOptions = [
      { label: 'test 1', value: '1'},
      { label: 'test 2', value: '2'},
      { label: 'test 3', value: '3'},
    ];
    const [comments, setComments] = useState("");
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    useEffect(() => {
        function loadWaiver() {
            return API.get("amendments", `/amendments/${id}`);
        }

        async function onLoad() {
            try {
                const amendment = await loadWaiver();
                const { email, firstName, lastName, territory, transmittalNumber, urgent, comments, uploads, isWaiver, actionType, waiverAuthority} = amendment;
                setTerritory(territory);
                setIsWaiver(isWaiver);
                setActionType(actionType);
                setWaiverNumber(transmittalNumber);
                setWaiverAuthority(waiverAuthority);
                setComments(comments);
                setAmendment(amendment);
            } catch (e) {
                onError(e);
            }
        }

        onLoad();
    }, [id]);

    return (
        <div className="Waiver">
            {amendment && (
                <form>
                    <FormGroup controlId="territory">
                        <ControlLabel>State/Territory</ControlLabel>
                        <Select
                            name="form-field-name"
                            value={territoryList.filter(function(option) {
                                return option.value === territory;
                            })}
                            isDisabled={true}
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
                            isDisabled={true}
                            options={actionTypeOptions}
                        />
                    </FormGroup>
                    <FormGroup controlId="waiverNumber">
                        <ControlLabel>Waiver Number)</ControlLabel>
                        <FormControl
                            disabled={true}
                            value={waiverNumber}
                        />
                    </FormGroup>
                    <FormGroup controlId="actionType">
                        <ControlLabel>Waiver Authority</ControlLabel>
                        <Select
                            name="form-field-name"
                            value={waiverAuthorityOptions.filter(function(option) {
                                return option.value === waiverAuthority;
                            })}
                            isDisabled={true}
                            options={waiverAuthorityOptions}
                        />
                    </FormGroup>
                    <FormGroup controlId="comments">
                        <ControlLabel>Summary</ControlLabel>
                        <FormControl
                            componentClass="textarea"
                            value={comments}
                            disabled={true}
                        />
                    </FormGroup>

                </form>
            )}
        </div>
    );
}
