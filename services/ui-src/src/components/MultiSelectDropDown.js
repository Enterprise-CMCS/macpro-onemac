import React, {useState} from "react";
import Select from "react-dropdown-select";

/*
   Simple Multi Select Component

   Reference: https://www.npmjs.com/package/react-dropdown-select

*/

const MultiSelectDropDown = ({options,header,subheader}) => {

    const [value, setValue] = useState([])

    const handleOnchange = val => {
        console.log(JSON.stringify(val))
        setValue(JSON.stringify(val))
    }

    const handleCancel = () => {
        ;//  What do Do ?
    }

    const handleSubmit = val => {
        console.log(value)
    }
    return (
        <div className="multi-select-dropdown-container">
            <div >
                <h1>{header}</h1>
                <h2>{subheader}</h2>
                <div className="ReactDropdownSelect">
                <Select id="MultiSelect"
                        placeholder="&#128269; Select ..."
                        dropdownHeight="150px"
                        clearable="false"
                        searchable="true"
                        searchBy="label"
                        multi="true"
                        keepOpen="true"
                        onChange={handleOnchange}
                        options={options}
                />
                </div>
                <div  className="multi-select-dropdown-buttons">
                    <button onClick={handleCancel} type="button" className="multi-select-dropdown-cancel-button">
                        Cancel
                    </button><button onClick={handleSubmit} className="form-submit" type="button" >
                    Submit
                </button>
                </div>
            </div>
        </div>
    )
}

export default MultiSelectDropDown;
