import React, {useState} from "react";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import Select from "react-dropdown-select";
import {Button} from "@cmsgov/design-system";

/*
   Simple Multi Select Component

   Reference: https://www.npmjs.com/package/react-dropdown-select

*/

const MultiSelectDropDown = ({options}) => {

    const [value, setValue] = useState([])

    const  handleOnchange  =  val  => {
        console.log(JSON.stringify(val))
        setValue(JSON.stringify(val))
    }

    const  handleCancel  =  ()  => {
        ;//  What do Do ?
    }

    const  handleSubmit  =  val  => {
        console.log(value)
    }

    return(
     <div>
        <div style={{ maxWidth: "350px", maxHeight: "200px" }}>
                <Select id="MultiSelect"
                    dropdownHeight="150px"
                    clearable="true"
                    searchable="true"
                    searchBy="label"
                    multi="true"
                    keepOpen="true"
                    onChange={handleOnchange}
                    options={options}
                />
       </div>
        <div style={{ margin: "200px auto" }}>
            <Button
                id="selectedSubmit"
                onClick={handleCancel}
                inversed
             >
                Cancel
            </Button>
            <Button
                id="selectedSubmit"
                onClick={handleSubmit}
                inversed
            >
                Submit
            </Button>
        </div>
        </div>
    )
}

export default MultiSelectDropDown;
