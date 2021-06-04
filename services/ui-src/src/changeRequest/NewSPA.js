import React from "react";
import { Link } from "react-router-dom";

import PageTitleBar from "../components/PageTitleBar";

const NewSPA = () => {
  return (
    <>
      <PageTitleBar heading="SPA Type" text="" />
      <div className="form-container">
        <h3>Select a SPA type to start your submission.</h3>
        <ul className="choice-list">
          <li className="choice" key="0" ><Link to="/spa"><h4>Medicaid SPA</h4>
          <p>Submit new Medicaid State Plan Amendment</p></Link></li>
          <li className="choice" key="1" ><Link to="/sparai"><h4>Respond to Medicaid SPA RAI</h4>
          <p>Submit additional information</p></Link></li>
          <li className="choice" key="2" ><Link to="/chipspa"><h4>CHIP SPA</h4>
          <p>Submit new CHIP State Plan Amendment</p></Link></li>
          <li className="choice" key="3" ><Link to="/chipsparai"><h4>Respond to CHIP SPA RAI</h4>
          <p>Submit additional information</p></Link></li>
        </ul>
      </div>
    </>
  );
};

export default NewSPA;
