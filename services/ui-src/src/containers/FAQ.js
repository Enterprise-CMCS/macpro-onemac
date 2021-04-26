import React, {useEffect, useRef} from "react";
import PageTitleBar from "../components/PageTitleBar";
import { helpDeskContact } from "../libs/helpDeskContact";

const FAQ = () => {

    const waiverIdRef= useRef(document.location.hash);
    const spaIdRef= useRef(document.location.hash);

    function scrollToSection() {
      switch (window.location.hash) {
        case "#waiver-id-format":
          waiverIdRef.current.scrollIntoView();
          waiverIdRef.current.focus();
          break;
        case "#spa-id-format":
          spaIdRef.current.scrollIntoView();
          spaIdRef.current.focus();
          break;
        default:

      }
    }

    useEffect( () => scrollToSection(), [] )


    return (
    <div>
    <PageTitleBar heading="SPA and Waiver Frequently Asked Questions" text="" />
    <div className="form-container" id="top">
      <div className="form-card">
        <h2>Help Desk Contact Information</h2>
        <p>
          For assistance, please email the MACPro Help Desk at{" "}
          <a href={`mailto:${helpDeskContact.email}`}>
            {helpDeskContact.email}
          </a>{" "}
          or call {helpDeskContact.phone}.
        </p>
        <h2>Frequently Asked Questions</h2>
        <h4>What browsers can I use to access the system?</h4>
        <p>
          The submission portal works best on Google Chrome, Firefox, Edge, and
          Safari. We do not recommend using Internet Explorer due to potential
          functionality issues.
        </p>
        <h3>State Plan Amendments (SPAs)</h3>
        <h4 ref={spaIdRef} id="spa-id-format">What format is used to enter a SPA ID?</h4>
        <p>
          Enter the State Plan Amendment transmittal number. Assign consecutive
          numbers on a calendar year basis (e.g., 20-0001.xxxx, 20-0002.xxxx,
          etc.).
        </p>
        <p>
          The Official Submission package SPA ID must follow the format
          SS-YY-NNNN OR SS-YY-NNNN-xxxx to include:
        </p>
        <ul>
          <li>SS = 2 alpha character (State Abbreviation)</li>
          <li>YY = 2 numeric digits (Year)</li>
          <li>NNNN = 4 numeric digits (Serial number)</li>
          <li>xxxx = OPTIONAL 4 character alpha/numeric modifier (Suffix)</li>
        </ul>

        <h4>What attachments do we need to submit a new SPA?</h4>
        <p>
          SPA submission requirements can be found in regulation&nbsp;
          <a
            href="https://www.ecfr.gov/cgi-bin/text-idx?SID=7d639b87112e05a57ff40731d647bd05&mc=true&node=se42.4.430_112&rgn=div8"
            target="_blank"
            rel="noopener noreferrer"
          >
            42 C.F.R. §430.12.
          </a>
          . Required attachments for form completion are:
        </p>
        <ul>
          <li>
            Digitized Transmittal and Notice of Approval of State Plan Material
            (CMS 179) form{" "}
          </li>
          <li>SPA Pages</li>
        </ul>
        <p>
          In this system, you can submit other optional files. If submitting a
          cover letter, please address the cover letter to: Center for Medicaid
          &amp; CHIP Services (CMCS).
        </p>
        <h3>Waivers</h3>
        <h4 ref={waiverIdRef} id="waiver-id-format">
          What format is used to enter a 1915(b) waiver number?
        </h4>
        <p>Waiver number must follow the format SS.####.R##.## or SS.#####.R##.## to include:</p>
        <ul>
          <li>SS = 2 character state abbreviation</li>
          <li>##### = 4 or 5 digit waiver base number</li>
          <li>R## = renewal number (R01, R02, ...) (Use R00 for waivers without renewals)</li>
          <li>M## = amendment number, prefixed with a capital M (M01)</li>
        </ul>
        <p>
          All separated by periods (.). For example, the waiver number
          KY.0003.R02.M02 is a waiver for the state of Kentucky, with a base
          waiver number of 0003, a second renewal (R02) and a second amendment
          (02). Base waivers without renewals should use “R00” as their renewal number.
        </p>
        <h4>What format is used to enter a 1915(c) waiver number?</h4>
        <p>Waiver number must follow the format SS.####.R##.## or SS.#####.R##.## to include:</p>
        <ul>
          <li>SS = 2 character state abbreviation</li>
          <li>##### = 4 or 5 digit waiver base number</li>
          <li>R## = renewal number (R01, R02, ...) (Use R00 for waivers without renewals)</li>
          <li>## = appendix K amendment number (01)</li>
        </ul>
        <p>
          All separated by periods (.). For example, the waiver number
          KY.0003.R02.02 is a waiver for the state of Kentucky, with a base
          waiver number of 0003, the second renewal (R02) and the second
          appendix K amendment (02). Base waivers without renewals should use
          “R00” as their renewal number.
        </p>
        <h4>
          What attachments are needed to submit 1915(b) and 1915(c) waivers?
        </h4>
        <p>
          The regulations at 42 C.F.R. §430.25, 431.55 and 42 C.F.R. §441.301
          describe the requirements for submitting section 1915(b) and 1915(c)
          waivers.
        </p>
        <h4>What should we do if we don’t receive a confirmation email?</h4>
        <p>
          Refresh your inbox, check your SPAM filters, then contact the MACPro
          Help Desk <a href={`mailto:${helpDeskContact.email}`}>
            {helpDeskContact.email}
          </a>{" "}
          or call {helpDeskContact.phone} or contact your state lead.
        </p>
        <h4>Is this considered the official state submission?</h4>
        <p>
          Yes, as long as you have the electronic receipt (confirmation email).
          Your submission is considered your official state submission and will
          only be considered received by CMS if you have received the electronic
          receipt. You should receive an email confirmation that the formal
          action was received along with information about the 90th day. If you
          do not receive a confirmation email for your SPA or waiver
          submissions, please contact your state lead or your state’s CMS lead
          for HCBS or managed care.
        </p>
      </div>
    </div>
    </div>
  );
};

export default FAQ;
