import React from "react";
import CardButton from "../components/cardButton";

export default function ComponentPage() {
    return (
        <>
            <div id="title_bar" className="page-title-bar"><h1>Component Page</h1></div>
            <div>
                <CardButton type='spa'></CardButton>
            </div>
        </>
    );
}