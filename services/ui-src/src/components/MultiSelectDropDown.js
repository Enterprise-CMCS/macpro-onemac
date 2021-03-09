import React, {useState} from "react";
import Select from "react-dropdown-select";

/*
   Simple Multi Select Component

   Reference: https://www.npmjs.com/package/react-dropdown-select

*/

const MultiSelectDropDown = ({options, title, header, subheader, cancelFn, submitFn}) => {

    const [value, setValue] = useState([])

    const handleOnchange = val => {
        console.log(JSON.stringify(val))
        setValue(JSON.stringify(val))
    }

    return (
        <>
            <div className="multi-select-dropdown-container">
                <p className="multicardtitle">{title}</p>
                <p className="multi-select-title">{header} <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.06 6L12 6.94L2.92 16H2V15.08L11.06 6ZM14.66 0C14.41 0 14.15 0.1 13.96 0.29L12.13 2.12L15.88 5.87L17.71 4.04C18.1 3.65 18.1 3 17.71 2.63L15.37 0.29C15.17 0.09 14.92 0 14.66 0ZM11.06 3.19L0 14.25V18H3.75L14.81 6.94L11.06 3.19Z" fill="#0071BC"/>
                </svg></p>
                <p className="multi-select-header">{subheader}</p>

                   <svg className="multi-search-icon" width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.22447 0.285156C6.61008 0.285156 7.93894 0.785533 8.91872 1.67621C9.8985 2.56689 10.4489 3.7749 10.4489 5.03451C10.4489 6.21089 9.97471 7.29228 9.19506 8.12525L9.41208 8.32253H10.047L14.0659 11.9759L12.8602 13.0719L8.8414 9.41853V8.8413L8.62439 8.64402C7.7081 9.35277 6.51853 9.78387 5.22447 9.78387C3.83885 9.78387 2.50999 9.28349 1.53021 8.39281C0.550433 7.50214 0 6.29412 0 5.03451C0 3.7749 0.550433 2.56689 1.53021 1.67621C2.50999 0.785533 3.83885 0.285156 5.22447 0.285156ZM5.22447 1.7465C3.21506 1.7465 1.60753 3.20784 1.60753 5.03451C1.60753 6.86119 3.21506 8.32253 5.22447 8.32253C7.23387 8.32253 8.8414 6.86119 8.8414 5.03451C8.8414 3.20784 7.23387 1.7465 5.22447 1.7465Z" fill="#212121"/>
                    </svg>
                    <Select id="MultiSelect" className="fa fa-search"
                            placeholder=""
                            dropdownHeight="185px"
                            searchable="true"
                            searchBy="label"
                            multi="true"
                            keepOpen="true"
                            onChange={handleOnchange}
                            options={options}
                    />


                <div className="component-submit-solid">
                <button onClick={submitFn(value)} className="multi-select-dropdown-submit-button" type="button">
                    Submit
                </button>
                </div>
            </div>
        </>
    )
}

export default MultiSelectDropDown;
