import React from "react";
import MultiSelectDropDown from "../components/MultiSelectDropDown";

export default function ComponentPage() {

    const [dropdownValue,setDropDownValue] = useState('')
    const dropDownCallback = (childData) => {
        setDropDownValue(childData)
    }

    const  options  = [
        { label:  'Option 1', value:  'option_1'  },
        { label:  'Option 2', value:  'option_2'  },
        { label:  'Option 3', value:  'option_3'  },
        { label:  'Option 4', value:  'option_4'  },
    ]

    return (
        <>
            <div id="title_bar" className="page-title-bar"><h1>Component Page</h1></div>
            <div><h2>Parent Component Value=({dropdownValue})</h2></div>
            <div><MultiSelectDropDown options={options} dropDownCallback={dropDownCallback}/></div>
        </>
    );
}
