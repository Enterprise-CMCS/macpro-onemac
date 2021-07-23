import React from "react";
import { useLocation } from "react-router-dom";
import HomeHeader from "../components/HomeHeader";
import HomeFooter from "../components/HomeFooter";
import AlertBar from "../components/AlertBar";

/**
 * Displays information about the usage of the webform
 */
export default function Home() {
  const location = useLocation();

  const submissionTitle = "How to create a submission";
  const submissionsList = [
    {
      image: "login",
      subTitle: "Login with IDM",
      text: "Login with your IDM username and password to access your SPA and Waiver dashboard.",
      verticalLineClass: "vertical-line-64",
    },
    {
      image: "attach",
      subTitle: "Attach your documents",
      text: "Select a submission type and attach required documents relevant to your SPA and/or Waiver submission.",
      verticalLineClass: "vertical-line-96",
    },
    {
      image: "email",
      subTitle: "Recieve an email confirmation",
      text: `After you submit, you will receive an email confirmation that your submission was 
        successful, marking the start of the 90-day review process.`,
      verticalLineClass: "",
    },
  ];

  const paperSubmissionTitle =
    "You can submit paper-based submissions, including:";

  const paperSubmissionList = [
    {
      text: "Amendments to your Medicaid and CHIP State Plans (not submitted through MACPro, MMDL or WMS)",
    },
    {
      text: "Official state responses to formal requests for additional information (RAIs) for SPAs (not submitted through MACPro)",
    },
    {
      text: "Section 1915(b) waiver submissions (those not submitted through WMS)",
    },
    {
      text: "Section 1915(c) Appendix K amendments (which cannot be submitted through WMS)",
    },
    {
      text: "Official state responses to formal requests for additional information (RAIs) for Section 1915(b) waiver actions (in addition to submitting waiver changes in WMS, if applicable)",
    },
    {
      text: "State requests for Temporary Extensions for section 1915(b) and 1915(c) waivers.",
    },
  ];

  /**
   * Takes a list of items for the Submission List.
   * @param {Array} submissionsList data items for the list
   * @returns  list of data divs
   */
  const renderSubmissionSteps = (submissionsList) => {
    return submissionsList.map((item, i) => {
      return (
        <div key={i}>
          <div className="ds-l-row">
            <div className="ds-l-col--1 ds-u-padding--0">
              <img
                src={`/assets/images/icons/${item.image}.svg`}
                alt={item.subTitle}
              />
            </div>
            <div className="ds-l-col--11 ds-u-padding-left--1 sub-title">
              {item.subTitle}
            </div>
          </div>

          <div className="ds-l-row">
            <div className="ds-l-col--1 ds-u-padding--0">
              <div className={item.verticalLineClass}></div>
            </div>
            <div className="ds-l-col--11 ds-u-padding-left--1 text">
              {item.text}
            </div>
          </div>
        </div>
      );
    });
  };

  /**
   * Takes a list of items for the Submission List.
   * @param {Array} renderSubmissionSteps data items for the list
   * @returns  Unordered list of data items
   */
  const renderPaperSubmissionInfo = (renderSubmissionSteps) => {
    return (
      <ul className="ds-u-padding--0">
        {renderSubmissionSteps.map((item, i) => (
          <li key={i} className="text">
            {item.text}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <HomeHeader />
      <AlertBar alertCode={location?.state?.passCode} />
      <div className="home-content-box">
        <div className="home-content-wrapper">
          <div className="home-content-left-box">
            <div className="ds-l-container ds-u-margin--0">
              <div className="title">{submissionTitle}</div>
              {renderSubmissionSteps(submissionsList)}
            </div>
          </div>
          <div className="home-content-right-box">
            <div className="title">{paperSubmissionTitle}</div>
            {renderPaperSubmissionInfo(paperSubmissionList)}
          </div>
        </div>
      </div>
      <HomeFooter />
    </>
  );
}
