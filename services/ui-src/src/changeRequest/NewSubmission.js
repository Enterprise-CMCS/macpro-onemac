import React from "react";
import { Link } from "react-router-dom";

import PageTitleBar from "../components/PageTitleBar";

const NewSubmission = () => {
  return (
    <>
      <PageTitleBar heading="Submission Type" text="" />
      <div className="form-container">
        <h3>Select a Submission Type.</h3>
        <ul className="choice-list">
          <li className="choice" key="0" ><Link to="/newspa"><h4>State Plan Amendment (SPA)</h4>
          <p>Submit a new Medicaid &amp; CHIP State Plan Amendments or RAI</p></Link></li>
          <li className="choice" key="1" ><Link to="/newwaiver"><h4>Waiver Action</h4>
          <p>Submit Waivers, Amendments, Renewals, RAI, or Temp. Extension</p></Link></li>
        </ul>
      </div>
    </>
  );
};

export default NewSubmission;
