import React from "react";
import PageTitleBar from "../components/PageTitleBar";
import { HashLink } from "react-router-hash-link";
import { ROUTES } from "../Routes";
import StepCard from "../components/StepCard";

/**
 * Displays information about the usage of the webform
 */
export default function Home() {
  const submissionsList = [
    "Amendments to your Medicaid State Plans (not submitted through MACPro, MMDL or WMS);",
    "Official state responses to formal requests for additional information (RAIs) for SPAs (not submitted through MACPro),",
    "Section 1915(b) waiver submissions (those not submitted through WMS),",
    "Section 1915(c) Appendix K amendments (which cannot be submitted through WMS);",
    "Official state responses to formal requests for additional information (RAIs) for Section 1915(b) waiver actions (in addition to submitting waiver changes in WMS, if applicable); and",
    "State requests for Temporary Extensions for section 1915(b) and 1915(c) waivers.",
  ];
  const submissionTypesid = "submission-types";

  PageTitleBar.setPageTitleInfo({
    heading: "CMS State Plan Amendment and Waiver Submission Platform",
    text:
      "Welcome to the official submission system for paper-based state plan amendments (SPAs) and section 1915 waivers.",
  });

  /**
   * Takes a list of items and renders it into an unordered list.
   * @param {Array} listData data items for the list
   * @param {String} ariaLabelledBy aria-labelledby attribute on the unordered list for accessiblity
   * @returns an unordered list of data items
   */
  function renderList(listData, ariaLabelledBy = "") {
    const list = listData.map((dataItem, index) => (
      <li key={index}>{dataItem}</li>
    ));

    return <ul aria-labelledby={ariaLabelledBy}>{list}</ul>;
  }

  return (
    <div className="about">
      <div className="section section-how-it-works">
        <div className="section-title-center">How it Works</div>
        <div className="container-step-cards">
          <StepCard
            stepNumber="1"
            content="Login with your EIDM username and password to access your SPA and Waiver dashboard."
          />
          <StepCard
            stepNumber="2"
            content="Select a submission type and attach required documents relevant your SPA and/or Waiver submission."
          />
          <StepCard
            stepNumber="3"
            content="After you submit, you will receive an email confirmation that your submission was successful, marking the start of the 90-day review process."
          />
        </div>
      </div>
      <div className="section section-submission-types">
        <div className="section-title" id={submissionTypesid}>
          In this system, pilot program users can submit paper-based
          submissions, including:
        </div>
        {renderList(submissionsList, submissionTypesid)}
      </div>
      <div className="section section-support">
        <div className="section-title-center white-text">
          {"Do you have questions or need support? "}
          <HashLink to={ROUTES.FAQ_TOP}>Please read the FAQ page.</HashLink>
        </div>
      </div>
    </div>
  );
}
