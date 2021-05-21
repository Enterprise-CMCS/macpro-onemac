import React  from "react";
import CardButton from "../components/cardButton";
import Waiver from "../changeRequest/Waiver";

export default function ComponentPage() {

return (<>
        <div id="title_bar" className="page-title-bar"><h1>Component Page</h1></div>
        <section className="ds-l-container preview__grid">
            <div className="ds-l-row">
                <div className="ds-l-col--6">
                    <div><h2>SPA Card Button</h2></div>
                    <CardButton type='spa'></CardButton>
                </div>
                <div className="ds-l-col--6">
                    <div><h2>Waiver Card Button</h2></div>
                    <CardButton type='waiver'></CardButton>
                </div>
            </div>
            <div><Waiver/></div>
            </section>
    </>
    );
}
