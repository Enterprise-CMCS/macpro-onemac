import React, {useState} from "react";
import Select from "react-dropdown-select";

/*
   Simple Multi Select Component

   Reference: https://www.npmjs.com/package/react-dropdown-select

*/

const MultiSelectDropDown = ({options, header, subheader, cancelFn, submitFn}) => {

    const [value, setValue] = useState([])

    const handleOnchange = val => {
        console.log(JSON.stringify(val))
        setValue(JSON.stringify(val))
    }

    return (
        <div className="multi-select-dropdown-container">
            <div>
                <p className="multi-select-title">{header}</p>
                <p className="multi-select-header">{subheader}</p>
                <div>
                    <Select id="MultiSelect" className="fa fa-search"
                            placeholder="Select ..."
                            dropdownHeight="190px"
                            clearable="false"
                            searchable="true"
                            searchBy="label"
                            multi="true"
                            keepOpen="true"
                            onChange={handleOnchange}
                            options={options}
                    />

                </div>
            </div>
            <div className="ReactDropdownButtons">
                <button onClick={cancelFn} className="reactDropdownCancelButton" type="button">
                    Cancel
                </button>
                &nbsp; &nbsp;
                <button onClick={submitFn(value)} className="reactDropdownSubmitButton" type="button">
                    Submit
                </button>
            </div>
        </div>
    )
}

export default MultiSelectDropDown;
