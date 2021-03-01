import React, {useState} from "react";
import MultiSelect from 'react-multiple-select-dropdown-lite'
import "./MultiSelectDropDown.css"

/*
    Demonstrate that the multi-chooser has the following abilities:

  1. It displays a list of items

  2. list is searchable via a search box

  3. selecting an item creates a "tag"

  4. tagged item is unselected via an 'x'

  5. Submit button exists and can accept a function  (Callback ???)
*/

const MultiSelectDropDown = ({options, dropDownCallback}) => {


    const [value, setValue] = useState('')

    const  handleOnchange  =  val  => {
        setValue(val)
        dropDownCallback(val)
    }

    return(
        <div className="app">
            <div  className="preview-values">
                <h4>Values</h4>
                {value}
            </div>

            <MultiSelect
                onChange={handleOnchange}
                options={options}
            />
        </div>
    )
}

export default MultiSelectDropDown;
