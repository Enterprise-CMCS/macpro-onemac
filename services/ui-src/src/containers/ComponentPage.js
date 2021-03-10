import React, { useState } from "react";
import CardButton from "../components/cardButton";
import MultiSelectDropDown from "../components/MultiSelectDropDown";
import {territoryList} from "../libs/territoryLib";

export default function ComponentPage() {

    const options = territoryList;

    const [value, setValue] = useState([])

    const handleCancel = () => {
        console.log("handledCancel Called ... Value: " + value)
    }

    return (<>
        <div id="title_bar" className="page-title-bar"><h1>Component Page</h1></div>
        <div>
            <div class="ds-u-margin--4" style={{ position: "relative" }}>
                <div><h2>SPA Card Button</h2></div>
                <CardButton type='spa'></CardButton>
            </div>
        </div>
            <div>
                <div style={{position: "relative"}}>
                    <div><h2>MultiSelect State Example Component</h2></div>
                    <MultiSelectDropDown
                        options={options}
                        type="selectstate"
                        title="User Role"
                        header="State Submitter"
                        subheader="Select your State Access"
                        submitFn={val => setValue(val)}
                        cancelFn={handleCancel}/>
                </div>
                <div style={{position: "relative"}}>
                    <div><h2>Profile Example MultiSelect Component</h2></div>
                    <MultiSelectDropDown
                        options={options}
                        type="selectprofile"
                        title="Choose State Access"
                        header="Select your State Access"
                        submitFn={val => setValue(val)}
                        cancelFn={handleCancel}/>
                </div>
                <hr/>
            </div>
        </div>
    </>
    );
}
