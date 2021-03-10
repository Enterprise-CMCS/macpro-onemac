import React, { useState } from "react";
import CardButton from "../components/cardButton";
import { EmptyList } from "../components/EmptyList.js";
import { territoryList } from "../libs/territoryLib";
import MultiSelectDropDown from "../components/MultiSelectDropDown";
export default function ComponentPage() {
  const options = territoryList;
  const [value, setValue] = useState([]);

  const handleCancel = () => {
    console.log("handledCancel Called ... Value: " + value);
  };

  return (
    <>
      <div id="title_bar" className="page-title-bar">
        <h1>Component Page</h1>
      </div>
      <section className="ds-l-container preview__grid">
        <div className="ds-l-row">
          <div className="ds-l-col--6">
            <div>
              <h2>SPA Card Button</h2>
            </div>
            <CardButton type="spa"></CardButton>
          </div>
          <div className="ds-l-col--6">
            <div>
              <h2>Waiver Card Button</h2>
            </div>
            <CardButton type="waiver"></CardButton>
          </div>
        </div>
        <div className="ds-1-row">
          <div className="ds-1-col--6">
            <h3>Empty List placeholder</h3>
            <EmptyList message="This is an example of an empty list." />
          </div>
        </div>
      </section>
    </>
  );
}
