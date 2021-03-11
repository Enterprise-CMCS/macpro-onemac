import React, { useState } from "react";
import CardButton from "../components/cardButton";
import {territoryList} from "../libs/territoryLib";
import MultiSelectDropDown from "../components/MultiSelectDropDown";
export default function ComponentPage() {
    const options = territoryList;
    const [value, setValue] = useState([])

    const handleCancel = () => {
        console.log("handledCancel Called ... Value: " + value)
    }

    return (<>
        <div id="title_bar" className="page-title-bar"><h1>Component Page</h1></div>
        <section class="ds-l-container preview__grid">
            <div class="ds-l-row">
                <div className="ds-l-col--6">
                    <div><h2>SPA Card Button</h2></div>
                    <CardButton type='spa'></CardButton>
                </div>
                <div className="ds-l-col--6">
                    <div><h2>Waiver Card Button</h2></div>
                    <CardButton type='waiver'></CardButton>
                </div>
            </div>
            </section>
    </>
    );
}
