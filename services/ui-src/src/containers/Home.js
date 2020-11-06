import React from "react";
import serviceTypes from "../libs/serviceTypes.json"
import StepCard from "../components/StepCard"

/**
 * Component containing html formatted text about the usage of the webform
 */
export default function Home() {
  function renderListItems(items) {
    return items.map(item => <li>{item}</li>)
  }

  return (
    <div className="about">
      <div className="section section-how-it-works">
        <div className="section-title black-text">How it Works</div>
        <div className="container-step-cards">
          <StepCard stepNumber="1" content="Login with MACPro credentials." />
          <StepCard stepNumber="2" content="Fill out and attach required forms for your SPA and/or Waiver submission to submit to CMS through the platform." />
          <StepCard stepNumber="3" content="After you submit, you will receive an email confirmation that your submission was received, marking the start of the 90-day review process." />
        </div>
      </div>
      <div className="section section-service-types">
        <div className="section-title black-text">In this system, you can submit</div>
          <div className="section-subtitle">Amendments to your Medicaid State Plans (including related RAIs) for the following service types:</div>
          <ul>
            {renderListItems(serviceTypes)}
          </ul>
          <div className="section-subtitle">Section 1915(b) waiver submissions and related formal Requests for Additional Information (RAIs)</div>
          <div className="section-subtitle">Section 1915(c) Appendix K amendments and related formal Requests for Additional Information (RAIs)</div>
          <div className="section-subtitle">State requests for Temporary Extensions for section 1915(b) and 1915(c) waivers</div>
      </div>
      <div className="section section-support">
        <div className="section-title white-text">Do you have questions or need support?</div>
      </div>
    </div>
  );
}
