import React, { useState } from "react";
import CardButton from "../components/cardButton";
import MultiSelectDropDown from "../components/MultiSelectDropDown";

export default function ComponentPage() {

    const options = [
        { label: 'Maryland', value: 'MD' },
        { label: 'Alabama', value: 'AL' },
        { label: 'Texas', value: 'TX' },
        { label: 'Oregon', value: 'OR' },
        { label: 'Option 1', value: 'option_1' },
        { label: 'Option 2', value: 'option_2' },
        { label: 'Option 3', value: 'option_3' },
        { label: 'Option 4', value: 'option_4' },
    ]

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
            <div style={{ position: "relative" }}>
                <div><h2>MultiSelect Component</h2></div>
                <MultiSelectDropDown
                    options={options}
                    header="Passed In Value when used."
                    subheader="Passed In Value when used."
                    submitFn={val => setValue(val)}
                    cancelFn={handleCancel} />
            </div>
        </div>
    </>
    );
}
