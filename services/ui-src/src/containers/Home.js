import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import HomeHeader from "../components/HomeHeader";
import HomeFooter from "../components/HomeFooter";
import AlertBar from "../components/AlertBar";
import { MACCard } from "../components/MACCard";
import NotificationApi from "../utils/NotificationApi";
import { NotificationCard } from "../components/NotificationCard";
import { useFlags } from "launchdarkly-react-client-sdk";
const stateSubmissionTitle = "How to create a submission";
const stateSubmissionsList = [
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
    subTitle: "Receive an email confirmation",
    text: `After you submit, you will receive an email confirmation that your submission was 
        successful, marking the start of the 90-day review process.`,
    verticalLineClass: "",
  },
];

const statePaperSubmissionTitle = "Submission Types include:";

const statePaperSubmissionList = [
  {
    text: "Amendments to your Medicaid and CHIP State Plans (not submitted through MACPro, MMDL or WMS).",
  },
  {
    text: "Official state responses to formal requests for additional information (RAIs) for SPAs (not submitted through MACPro).",
  },
  {
    text: "Section 1915(b) waiver submissions (those not submitted through WMS).",
  },
  {
    text: "Section 1915(c) Appendix K amendments (which cannot be submitted through WMS).",
  },
  {
    text: "Official state responses to formal requests for additional information (RAIs) for Section 1915(b) waiver actions (in addition to submitting waiver changes in WMS, if applicable).",
  },
  {
    text: "State requests for Temporary Extensions for section 1915(b) and 1915(c) waivers.",
  },
];

const cmsSubmissionTitle = "How to review a submission";
const cmsSubmissionsList = [
  {
    image: "attach",
    subTitle: "Receive an email for submission notification",
    text: "After a state adds a submission to OneMAC, you will receive an email notification that a submission was made requiring your review and the submission is on the clock.",
    verticalLineClass: "vertical-line-65",
  },
  {
    image: "login",
    subTitle: "Login with EUA",
    text: "Login with your EUA username and password to access the SPA and Waiver dashboard.",
    verticalLineClass: "vertical-line-96",
  },
  {
    image: "email",
    subTitle: "Review your assigned submission",
    text: `Search the submission ID from the email and click on the submission to view and review details and attachments.`,
    verticalLineClass: "",
  },
];

const cmsPaperSubmissionTitle = "Submission Types include:";

const cmsPaperSubmissionList = [
  {
    text: "Amendments to your Medicaid and CHIP State Plans.",
  },
  {
    text: "Official state responses to formal requests for additional information (RAIs) for SPAs.",
  },
  {
    text: "Section 1915(b) waiver submissions. ",
  },
  {
    text: "Section 1915(c) Appendix K amendments.",
  },
  {
    text: "Official state responses to formal requests for additional information (RAIs) for Section 1915(b) waiver actions.",
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
  /** Refactored into reusable component for later extraction and inclusion
   * in cms-ux-lib */
  const Step = ({ subTitle, text, icon, verticalLineClass }) => (
    <div className="home-content-card-step">
      <div className="icon-and-line">
        <img src={`/assets/images/icons/${icon}.svg`} alt={subTitle} />
        <div className={verticalLineClass} />
      </div>
      <div className="subtitle-and-text">
        <h2>{subTitle}</h2>
        <p className="text">{text}</p>
      </div>
    </div>
  );
  return submissionsList.map((item, i) => (
    <Step
      subTitle={item.subTitle}
      text={item.text}
      icon={item.image}
      verticalLineClass={item.verticalLineClass}
      key={i}
    />
  ));
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

/**
 * Displays information about the usage of the webform
 */
export default function Home() {
  const location = useLocation();
  const { mmdlNotification } = useFlags();
  const [systemNotifications, setSystemNotifications] = useState([]);

  useEffect(() => {
    (async () => {
      // mmdlNotification: flag for all notifications
      if (mmdlNotification) {
        const notifications =
          await NotificationApi.getActiveSystemNotifications();
        if (notifications && notifications.length)
          setSystemNotifications([...notifications]);
        else {
          console.log(
            "Either no notifications or an error occured",
            notifications
          );
        }
      }
    })();
  }, [mmdlNotification]);

  return (
    <>
      <HomeHeader />
      <AlertBar alertCode={location?.state?.passCode} />
      {mmdlNotification && systemNotifications.length !== 0 && (
        <div className="home-content-container">
          <h2>New and Notable</h2>
          {systemNotifications.map((notification) => (
            <NotificationCard key={notification.sk} {...notification} />
          ))}
        </div>
      )}

      <div className="home-content-container">
        <h1>State Users</h1>
        <section>
          <MACCard
            title={stateSubmissionTitle}
            childContainerClassName="home-content-left-box"
          >
            {renderSubmissionSteps(stateSubmissionsList)}
          </MACCard>
          <div className="home-content-right-box">
            <h2>{statePaperSubmissionTitle}</h2>
            {renderPaperSubmissionInfo(statePaperSubmissionList)}
          </div>
        </section>
        <h1>CMS Users</h1>
        <section>
          <MACCard
            title={cmsSubmissionTitle}
            childContainerClassName="home-content-left-box"
          >
            {renderSubmissionSteps(cmsSubmissionsList)}
          </MACCard>
          <div className="home-content-right-box">
            <h2>{cmsPaperSubmissionTitle}</h2>
            {renderPaperSubmissionInfo(cmsPaperSubmissionList)}
          </div>
        </section>
      </div>
      <HomeFooter />
    </>
  );
}
