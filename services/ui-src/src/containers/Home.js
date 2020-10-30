import React from "react";

/**
 * Component containing html formatted text about the usage of the webform
 */
export default function Home() {
  return (
      <div className="about">
          <h1>CMS State Plan Amendment and Waiver Submission Platform</h1>
          <p>Welcome to the official submission system for email-based state plan 
              amendments (SPAs) and section 1915 waivers. After signing up for the 
              system, you can fill out forms to send the SPA and/or waivers and 
              attached documents to SPA@cms.hhs.gov. After you submit, you will 
              receive an email confirmation that your submission was received, marking 
              the start of the 90-day review process.</p>
              <hr></hr>
          <h2>In this system, you can submit:</h2>
          <ul>
              <li>Amendments to your Medicaid State Plans (not submitted through MACPro or MMDL)</li>
              <li>Official state responses to formal Requests for Additional Information (RAIs) for SPAs (not submitted through MACPro)</li>
              <li>Section 1915(b) waiver submissions (those not submitted through WMS)</li>
              <li>All Cost Effectiveness spreadsheets associated with 1915(b) waivers</li>
              <li>Section 1915(c) Appendix K amendments (which cannot be submitted through WMS)</li>
              <li>Official state responses to formal Requests for Additional Information (RAIs) for Section 1915(b) waiver actions (in addition to submitting waiver changes in WMS, if applicable)</li>
              <li>State requests for Temporary Extensions for section 1915(b) and 1915(c) waivers</li>
          </ul>
      </div>
  );
}
