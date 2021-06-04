import React from "react";
import { Link } from "react-router-dom";

import PageTitleBar from "../components/PageTitleBar";

const NewWaiver = () => {
  return (
    <>
      <PageTitleBar heading="Waiver Action Type" text="" />
      <div className="form-container">
        <h3>Select a Waiver type to start your submission.</h3>
        <ul className="choice-list">
        <li className="choice" key="0" ><Link to="/waiver"><h4>Waiver Action</h4>
          <p>Submit waivers, amendments, and renewals</p></Link></li>
          <li className="choice" key="1" ><Link to="/waiverrai"><h4>Respond to Waiver RAI</h4>
          <p>Submit additional information</p></Link></li>
          <li className="choice" key="2" ><Link to="/waiverextension"><h4>Request Temporary Extension</h4>
          <p>Submit for 1915(b) and 1915(c)</p></Link></li>
          <li className="choice" key="3" ><Link to="/waiverappk"><h4>Appendix K Amendment</h4>
          <p>Submit Appendix K Amendment</p></Link></li>
        </ul>
      </div>
    </>
  );
};

export default NewWaiver;
