import React from "react";
import { VideoContent } from "../../components/VideoWithTranscript";
import { helpDeskContact } from "../helpDeskContact";
import { stateSystemOverviewTranscript } from "./stateSystemOverviewTranscript";
import { uploadSubsequentDocumentationTranscript } from "./uploadSubsequentDocumentationTranscript";
import { FILE_TYPES, FileTypesFAQListItem } from "../../utils/fileTypes";
import config from "../../utils/config";

export interface QuestionAnswer {
  anchorText: string;
  isOpen: boolean;
  question: string;
  answerJSX: JSX.Element;
  isMmdl: boolean; 
}

export interface FAQContent {
  sectionTitle: string;
  qanda: QuestionAnswer[];
}

/**
 * List of alert messages for the application.
 */
export const oneMACFAQContent: FAQContent[] = [
  {
    sectionTitle: "General",
    qanda: [
      {
        anchorText: "system",
        isOpen: false,
        question: "Which system should I use for my state’s submission?",
        isMmdl: false,
        answerJSX: (
          <>
            <p>
              Check which system to submit your state plan in with this
              crosswalk training document.
            </p>
            <ul>
              <li>
                <a
                  href={`${process.env.PUBLIC_URL}/assets/onboarding/eligibility-crosswalk-paper-based-state-plan-macpro.pdf`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Crosswalk from Paper-based State Plan to MACPro and MMDL.pdf
                </a>
              </li>
            </ul>
          </>
        ),
      },
      {
        anchorText: "browsers",
        isOpen: false,
        question: "What browsers can I use to access the system?",
        isMmdl: false,
        answerJSX: (
          <p>
            The submission portal works best on Google Chrome (Version
            91.0.4472.77 or later), Firefox (Version 89.0 or later).
          </p>
        ),
      },
      {
        anchorText: "confirm-email",
        isOpen: false,
        question: "What should we do if we don’t receive a confirmation email?",
        isMmdl: false,
        answerJSX: (
          <p>
            Refresh your inbox, check your SPAM filters, then contact the OneMAC
            Help Desk{" "}
            <a href={`mailto:${helpDeskContact.email}`}>
              {helpDeskContact.email}
            </a>{" "}
            or call {helpDeskContact.phone} or contact your state lead.
          </p>
        ),
      },
      {
        anchorText: "is-official",
        isOpen: false,
        question: "Is this considered the official state submission?",
        isMmdl: false,
        answerJSX: (
          <p>
            Yes, as long as you have the electronic receipt (confirmation
            email). Your submission is considered your official state submission
            and will only be considered received by CMS if you have received the
            electronic receipt. You should receive an email confirmation that
            the formal action was received along with information about the 90th
            day. If you do not receive a confirmation email for your SPA or
            waiver submissions, please contact your state lead or your state’s
            CMS lead for HCBS or managed care.
          </p>
        ),
      },
      {
        anchorText: "onemac-roles",
        isOpen: false,
        question: "What are the OneMAC user roles?",
        isMmdl: false,
        answerJSX: (
          <table className="faq-table">
            <thead>
              <tr>
                <th>OneMAC Role</th>
                <th>System Utilization</th>
                <th>Role Approver</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>State Submitter</td>
                <td>
                  Creates new paper-based submissions and submits packages to
                  CMS for review:
                  <ul>
                    <li>Medicaid State Plan Amendments (SPAs)</li>
                    <li>1915(b) waivers</li>
                    <li>1915(c) waivers</li>
                  </ul>
                </td>
                <td>State System Administrator</td>
              </tr>
              <tr>
                <td>State System Administrator</td>
                <td>
                  Reviews and acts on State Submitter user role requests and
                  system access, has all State Submitter permissions (above)
                </td>
                <td>CMS Role Approver</td>
              </tr>
              <tr>
                <td>CMS Role Approver</td>
                <td>
                  Reviews and acts on State System Administrator user role
                  requests
                </td>
                <td>CMS System Administrator</td>
              </tr>
            </tbody>
          </table>
        ),
      },
      {
        anchorText: "acceptable-file-formats",
        isOpen: false,
        question: "What are the kinds of file formats I can upload into OneMAC",
        isMmdl: false,
        answerJSX: (
          <section>
            <p>
              We accept the following file formats under{" "}
              {config.MAX_ATTACHMENT_SIZE_MB}MB in size.{" "}
              <i>
                Unfortunately, we are unable to accept .zip or compressed files.
              </i>
            </p>
            <h3>Acceptable File Formats</h3>
            <ul className="file-type-list">
              {FILE_TYPES.map((info, index) => (
                <li key={`file-${index}`}>
                  <FileTypesFAQListItem info={info} />
                </li>
              ))}
            </ul>
          </section>
        ),
      },
      {
        anchorText: "onboarding-materials",
        isOpen: false,
        question: "Onboarding Materials",
        isMmdl: false,
        answerJSX: (
          <>
            <ul>
              {[
                ["WelcometoOneMAC.pdf", "Welcome to OneMAC"],
                [
                  "IDMInstructionsforOneMACUsers.pdf",
                  "IDM Instructions for OneMAC Users",
                ],
                ["OneMACIDMGuide.pdf", "OneMAC IDM Guide"],
                ["OneMACStateUserGuide.pdf", "OneMAC State User Guide"],
                ["OneMACCMSUserGuide.pdf", "OneMAC CMS User Guide"],
              ].map(([filename, label]) => (
                <li key={filename}>
                  <a
                    href={`${process.env.PUBLIC_URL}/assets/onboarding/${filename}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <VideoContent
              title="OneMAC State System Overview"
              introText="Watch this video for an overview on Package View."
              src={`${process.env.PUBLIC_URL}/assets/onboarding/OneMACPackageViewStateDemo.mp4`}
              transcript={stateSystemOverviewTranscript}
            />
            <VideoContent
              title="Upload Subsequent Documentation Overview"
              introText="Watch this video for an overview on how to upload subsequent documentation to a package under review."
              src={`${process.env.PUBLIC_URL}/assets/onboarding/UploadSubsequentDocumentationDemo.mp4`}
              transcript={uploadSubsequentDocumentationTranscript}
            />
          </>
        ),
      },
    ],
  },
  {
    sectionTitle: "State Plan Amendments (SPAs)",
    qanda: [
      {
        anchorText: "spa-id-format",
        isOpen: false,
        question: "What format is used to enter a SPA ID?",
        isMmdl: false,
        answerJSX: (
          <>
            Enter the State Plan Amendment transmittal number. Assign
            consecutive numbers on a calendar year basis (e.g., 20-0001-xxxx,
            20-0002-xxxx, etc.).
            <br />
            The Official Submission package SPA ID must follow the format
            SS-YY-#### OR SS-YY-####-xxxx to include:
            <ul>
              <li>SS = 2 alpha character (State Abbreviation)</li>
              <li>YY = 2 numeric digits (Year)</li>
              <li>#### = 4 numeric digits (Serial number)</li>
              <li>
                xxxx = OPTIONAL, 1 to 4 characters alpha/numeric modifier
                (Suffix)
              </li>
            </ul>
          </>
        ),
      },
      {
        anchorText: "medicaid-spa-attachments",
        isOpen: false,
        question: "What are the attachments for a Medicaid SPA?",
        isMmdl: false,
        answerJSX: (
          <>
            <p>
              SPA submission requirements can be found in regulation&nbsp;
              <a
                href="https://www.ecfr.gov/cgi-bin/text-idx?SID=7d639b87112e05a57ff40731d647bd05&mc=true&node=se42.4.430_112&rgn=div8"
                target="_blank"
                rel="noopener noreferrer"
              >
                42 C.F.R. §430.12.
              </a>
            </p>
            <p>Note: “*” indicates a required attachment.</p>
            <table className="faq-table">
              <thead>
                <tr>
                  <th>Attachment Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <p>
                      <span>CMS Form 179*</span>
                    </p>
                  </td>
                  <td>
                    CMS-179 template that contains specific information for SPA
                    submission
                  </td>
                </tr>
                <tr>
                  <td>SPA Pages*</td>
                  <td>Clean versions of the State Plan pages being amended</td>
                </tr>
                <tr>
                  <td>Cover Letter</td>
                  <td>
                    Cover letter to CMS that could outline SPA submission.
                    Please address the cover letter to: Center for Medicaid
                    &amp; CHIP Services (CMCS)
                  </td>
                </tr>
                <tr>
                  <td>Document Demonstrating Good-Faith Tribal Engagement</td>
                  <td>
                    Emails forwarding tribal notice to tribal leaders and tribal
                    contacts; and/or tribal face-to-face meeting agendas
                    indicating SPA discussion
                  </td>
                </tr>
                <tr>
                  <td>Existing State Plan Page(s)</td>
                  <td>
                    Current approved SPA page, could include track changes to
                    reflect changes
                  </td>
                </tr>
                <tr>
                  <td>Public Notice</td>
                  <td>
                    Notice to stakeholders and interested parties that outlines
                    the changes being proposed by SPA, feedback received from
                    PN, and copies of websites- notices, state register notices,
                    or newspaper notices that includes the date notice was
                    posted
                  </td>
                </tr>
                <tr>
                  <td>Standard Funding Questions (SFQs)</td>
                  <td>
                    Word document of the funding questions required to be
                    submitted with reimbursement SPAs
                  </td>
                </tr>
                <tr>
                  <td>Tribal Consultation</td>
                  <td>
                    Document that outline the changes SPA is making and the
                    impact that tribes can expect from the SPA
                  </td>
                </tr>
                <tr>
                  <td>Other</td>
                  <td>
                    UPLs, reimbursement methodology spreadsheet, Copies of
                    legislation, any document that will assist in the review of
                    SPA
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        ),
      },
      {
        anchorText: "medicaid-spa-rai-attachments",
        isOpen: false,
        question:
          "What are the attachments for a Medicaid response to Request for Additional Information (RAI)?",
        isMmdl: false,
        answerJSX: (
          <>
            <p>Note: “*” indicates a required attachment.</p>
            <table className="faq-table">
              <thead>
                <tr>
                  <th>Attachment Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>RAI Response*</td>
                  <td>
                    Letter responding to RAI questions, any updated SPA pages,
                    and other documentation requested by CMS in the RAI
                  </td>
                </tr>
                <tr>
                  <td>Other</td>
                  <td>
                    Additional document(s) needed to process the Medicaid SPA
                    RAI submission
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        ),
      },
      {
        anchorText: "chip-spa-attachments",
        isOpen: false,
        question: "What are the attachments for a CHIP SPA?",
        isMmdl: false,
        answerJSX: (
          <>
            <p>Note: “*” indicates a required attachment.</p>
            <table className="faq-table">
              <tbody>
                <tr>
                  <th>Attachment Name</th>
                  <th>Description</th>
                </tr>
                <tr>
                  <td>Current State Plan*</td>
                  <td>
                    Current version of the CHIP state plan that details how the
                    State operates its CHIP program
                  </td>
                </tr>
                <tr>
                  <td>Amended State Plan Language*</td>
                  <td>
                    Redline version of proposed changes to the existing CHIP
                    state plan pages. State to provide a redline version and a
                    clean version of the CHIP state plan pages being amended.
                  </td>
                </tr>
                <tr>
                  <td>Cover Letter*</td>
                  <td>
                    Cover letter to CMS with an authorized signature that
                    outlines the purpose of the CHIP SPA submission
                  </td>
                </tr>
                <tr>
                  <td>Budget Docs</td>
                  <td>
                    Updated 1-year budget if applicable of the State’s planned
                    expenditures if the CHIP SPA submission has a significant
                    impact on the approved budget
                  </td>
                </tr>
                <tr>
                  <td>Public Notice</td>
                  <td>
                    Process used by the State if applicable to accomplish
                    involvement of the public that occurred specifically for
                    this CHIP SPA submission
                  </td>
                </tr>
                <tr>
                  <td>Tribal Consultation</td>
                  <td>
                    Consultation process with Indian Tribes if applicable that
                    occurred specifically for this CHIP SPA submission
                  </td>
                </tr>
                <tr>
                  <td>Other</td>
                  <td>
                    Other document(s) needed to process the CHIP SPA submission
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        ),
      },
      {
        anchorText: "chip-spa-rai-attachments",
        isOpen: false,
        question:
          "What are the attachments for a CHIP SPA response to Request for Additional Information (RAI)?",
        isMmdl: false,
        answerJSX: (
          <>
            <p>Note: “*” indicates a required attachment.</p>
            <table className="faq-table">
              <thead>
                <tr>
                  <th>Attachment Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Revised Amended State Plan Language*</td>
                  <td>
                    Revision made to the amended state plan language of the CHIP
                    SPA submission. State to provide a redline version and a
                    clean version of the revised amended state plan pages
                  </td>
                </tr>
                <tr>
                  <td>Official RAI Response*</td>
                  <td>
                    Official response to CMS to support RAI inquiries for the
                    CHIP SPA submission
                  </td>
                </tr>
                <tr>
                  <td>Budget Docs</td>
                  <td>
                    Updated 1-year budget if applicable of the State’s planned
                    expenditures if the CHIP SPA submission has a significant
                    impact on the approved budget
                  </td>
                </tr>
                <tr>
                  <td>Public Notice</td>
                  <td>
                    Process used by the State if applicable to accomplish
                    involvement of the public that occurred specifically for
                    this CHIP SPA submission
                  </td>
                </tr>
                <tr>
                  <td>Tribal Consultation</td>
                  <td>
                    Consultation process with Indian Tribes if applicable that
                    occurred specifically for this CHIP SPA submission
                  </td>
                </tr>
                <tr>
                  <td>Other</td>
                  <td>
                    Other document(s) needed to process the CHIP SPA submission
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        ),
      },
      {
        anchorText: "public-health-emergency",
        isOpen: false,
        question:
          "Can I submit SPAs relating to the Public Health Emergency (PHE) in OneMAC?",
        isMmdl: false,
        answerJSX: (
          <p>
            Yes, all PHE-related SPAs should be submitted through OneMAC by
            completing the Medicaid SPA form.
          </p>
        ),
      },
      {
        anchorText: "medicaid-spa-rai-response",
        isOpen: false,
        question:
          "How do I submit a Formal Request for Additional Information (RAI) Response for a  Medicaid SPA?",
        isMmdl: false,
        answerJSX: (
          <div>
            <p>
              When necessary, states will receive an RAI via email from CMS.
            </p>
            <ul>
              <li>The state will respond to the RAI through OneMAC.</li>
              <li>
                A Request for Additional Information (RAI) stops the 90-day
                clock, is a formal request for additional information from CMS.
              </li>
              <li>
                Packages pending an official RAI response from the state will
                have a Status of <b>RAI Issued</b>.
              </li>
            </ul>
            <p>
              To respond to a Medicaid SPA RAI, select the SPA Tab view from the
              Package Dashboard.
            </p>
            <ul>
              <li>
                Select the link to the SPA ID. Packages which are in need of an
                RAI response from the state will have a Status of{" "}
                <b>RAI Issued</b>.
              </li>
              <li>
                Then, under Package Actions, select the Respond to RAI link.
              </li>
              <li>
                After attaching any required files, you may include additional
                notes prior to clicking on the submit button.
              </li>
              <li>
                Check your entries, as you cannot edit the submission after you
                select Submit.
              </li>
            </ul>
          </div>
        ),
      },
      {
        anchorText: "medicaid-spa-withdraw-rai-response",
        isOpen: false,
        question: "How do I Withdraw a Formal RAI Response for a Medicaid SPA?",
        isMmdl: false,
        answerJSX: (
          <div>
            <p>
              If a state wishes to withdraw a Formal RAI Response, the state
              must first contact their CMS Point of Contact so the action can be
              enabled.
            </p>
            <ul>
              <li>
                As a CMS user, log in to OneMAC and select the link to the SPA
                ID from the dashboard
              </li>
              <li>
                Then, under Package Actions, select the Enable Formal RAI
                Response Withdraw link, and then Select Submit.
              </li>
            </ul>
            <p>
              After receiving confirmation from your CMS Point of Contact that
              the Withdraw Formal RAI Response feature has been enabled, locate
              and select the Medicaid SPA submission package.
            </p>
            <p>
              The package status remains as Under Review and a substatus of
              Withdraw Formal RAI Response Enabled will be reflected below the
              status for the SPA or waiver submission package.
            </p>
            <p>
              <b>
                Note: These submissions will remain on the clock until the
                package action has been taken.
              </b>
            </p>
            <ul>
              <li>
                On the Formal RAI Response Withdraw form, upload any supporting
                documentation and fill out the Additional Information section
                explaining your need to withdraw the Formal RAI Response (all
                required information is marked with an asterisk).
              </li>
              <li>Select Submit.</li>
              <ul>
                <li>
                  You will receive a confirmation message asking if you are sure
                  that you want to withdraw the Formal RAI Response. Select Yes,
                  withdraw response.
                </li>
              </ul>
            </ul>
          </div>
        ),
      },
      {
        anchorText: "withdraw-medicaid-spa",
        isOpen: false,
        question: "How do I Withdraw a Package for a  Medicaid SPA?",
        isMmdl: false,
        answerJSX: (
          <div>
            <p>
              A state can withdraw a submission package if it is in the Under
              Review or RAI Issued status. However, please note that once
              withdrawn, a submission package cannot be resubmitted to CMS.{" "}
              <b>
                Completing this action will conclude the review of this SPA
                package.
              </b>
            </p>
            <p>
              There are two methods you can use to withdraw a submission
              package:
            </p>
            <ul>
              <li>
                In OneMAC, Locate and select the link to the SPA ID. Then, under
                Package Actions, select the Withdraw Package link.
              </li>
              <li>
                Alternatively, the Withdraw Package action can be accessed by
                selecting the three dots icon in the Actions column on the
                Package Dashboard. Then, select Withdraw Package from the
                drop-down list.
              </li>
            </ul>
            <p>
              A warning message will appear letting you know that if the package
              is withdrawn, it cannot be resubmitted and this action will
              conclude the review of this package. Select Yes, withdraw package
              to complete the task.
            </p>
          </div>
        ),
      },
      {
        anchorText: "chip-spa-rai-response",
        isOpen: false,
        question:
          "How do I submit a Formal Request for Additional Information (RAI) Response for a CHIP SPA?",
        isMmdl: false,
        answerJSX: (
          <div>
            <p>
              When necessary, states will receive an RAI via email from CMS.
            </p>
            <ul>
              <li>The state will respond to the RAI through OneMAC.</li>
              <li>
                A Request for Additional Information (RAI) stops the 90-day
                clock, is a formal request for additional information from CMS.
              </li>
              <li>
                Packages pending an official RAI response from the state will
                have a Status of <b>RAI Issued</b>.
              </li>
            </ul>
            <p>
              To respond to a CHIP SPA RAI, select the SPA Tab view from the
              Package Dashboard.
            </p>
            <ul>
              <li>
                Select the link to the SPA ID. Packages which are in need of an
                RAI response from the state will have a Status of{" "}
                <b>RAI Issued</b>.
              </li>
              <li>
                Then, under Package Actions, select the Respond to RAI link.
              </li>
              <li>
                After attaching any required files, you may include additional
                notes prior to clicking on the submit button.
              </li>
              <li>
                Check your entries, as you cannot edit the submission after you
                select Submit.
              </li>
            </ul>
          </div>
        ),
      },
      {
        anchorText: "chip-spa-withdraw-rai-response",
        isOpen: false,
        question: "How do I Withdraw a Formal RAI Response for a CHIP SPA?",
        isMmdl: false,
        answerJSX: (
          <div>
            <p>
              If a state wishes to withdraw a Formal RAI Response, the state
              must first contact their CMS Point of Contact so the action can be
              enabled.
            </p>
            <ul>
              <li>
                As a CMS user, log in to OneMAC and select the link to the SPA
                ID from the dashboard
              </li>
              <li>
                Then, under Package Actions, select the Enable Formal RAI
                Response Withdraw link, and then Select Submit.
              </li>
            </ul>
            <p>
              After receiving confirmation from your CMS Point of Contact that
              the Withdraw Formal RAI Response feature has been enabled, locate
              and select the CHIP SPA submission package.
            </p>
            <p>
              The package status remains as Under Review and a substatus of
              Withdraw Formal RAI Response Enabled will be reflected below the
              status for the SPA or waiver submission package.
            </p>
            <p>
              <b>
                Note: These submissions will remain on the clock until the
                package action has been taken.
              </b>
            </p>
            <ul>
              <li>
                On the Formal RAI Response Withdraw form, upload any supporting
                documentation and fill out the Additional Information section
                explaining your need to withdraw the Formal RAI Response (all
                required information is marked with an asterisk).
              </li>
              <li>Select Submit.</li>
              <ul>
                <li>
                  You will receive a confirmation message asking if you are sure
                  that you want to withdraw the Formal RAI Response. Select Yes,
                  withdraw response.
                </li>
              </ul>
            </ul>
          </div>
        ),
      },
      {
        anchorText: "withdraw-chip-spa",
        isOpen: false,
        question: "How do I Withdraw a Package for a CHIP SPA?",
        isMmdl: false,
        answerJSX: (
          <div>
            <p>
              A state can withdraw a submission package if it is in the Under
              Review or RAI Issued status. However, please note that once
              withdrawn, a submission package cannot be resubmitted to CMS.{" "}
              <b>
                Completing this action will conclude the review of this SPA
                package.
              </b>
            </p>
            <p>
              There are two methods you can use to withdraw a submission
              package:
            </p>
            <ul>
              <li>
                In OneMAC, Locate and select the link to the CHIP SPA ID. Then,
                under Package Actions, select the Withdraw Package link.
              </li>
              <li>
                Alternatively, the Withdraw Package action can be accessed by
                selecting the three dots icon in the Actions column on the
                Package Dashboard. Then, select Withdraw Package from the
                drop-down list.
              </li>
            </ul>
            <p>
              A warning message will appear letting you know that if the package
              is withdrawn, it cannot be resubmitted and this action will
              conclude the review of this package. Select Yes, withdraw package
              to complete the task.
            </p>
          </div>
        ),
      },
      {
        anchorText: "which-spa-submitted",
        isOpen: false,
        question: "What State Plan Amendments (SPAs) can be submitted to OneMAC",
        isMmdl: true,
        answerJSX: (
          <div>
            <p>
             OneMAC is the electronic submission system for all paper-based Medicaid and Children's Health insurance Program (CHIP) SPAs. 
            </p>
             <p>
             Starting [TBD], CMS is modifying the state transmittal process for Medicaid.
             Alternative Benefit Plan SPAs, Medicaid Premium and Cost Sharing SPAs, and CHIP Eligibility SPAs which were previously submitted to CMS through Medicaid Model Data Lab (MMDL).
             </p>
             <p>
             In order to be processed, States will need to submit these state actions to the OneMAC system. The MMDL system will no longer accept new submissions for these SPA actions.
             </p>
             <p>
             MMDL SPA submissions submitted prior to [TBD], including those SPA actions currently off the clock with a Request for Additional Information; will continue to be processed through the MMDL system.
             However, no new submissions or amendments will be accepted in the MMDL system.
             </p>
             <p>
             Medicaid Alternative Benefit SPAs, Premium and Cost Sharing SPAs, and CHIP Eligibility SPAs will continue to use the published SPA templates and Implementation Guides which can now be found here/below. This change does not apply to electronic Medicaid SPA submissions processed in the Medicaid and CHIP Program Portal (MACPro) system.
            </p>
          </div>
        ),
      },
      {
        anchorText: "medicaid-alternative-benifit-plan-pdfs",
        isOpen: false,
        question:
          "Where can I download Medicaid Alternative Benefit Plan (ABP) SPA PDFs?",
        isMmdl: true,
        answerJSX: (
            <>
              <ul className="file-type-list">
                {[
                  ["ABP1.pdf", "ABP 1: Alternative Benefit Plan Populations"],
                  ["ABP2a.pdf", "ABP 2a: Voluntary Benefit Package Selection Assurances - Eligibility Group under Section 1902(a)(10)(A)(i)(VIII) of the Act"],
                  ["ABP2b.pdf", "ABP 2b: Voluntary Enrollment Assurances for Eligibility Groups other than the Adult Group under Section 1902(a)(10)(A)(i)(VIII) of the Act"],
                  ["ABP3.pdf", "ABP 3: Selection of Benchmark Benefit Package or Benchmark-Equivalent Benefit Package Use only if ABP has an effective date earlier than 1/1/2020 or if only changing the Section 1937 Coverage Option of an ABP implemented before 1/1/2020"],
                  ["ABP3.1.pdf", "ABP 3.1: Selection of Benchmark Benefit or Benchmark-Equivalent Benefit Package Use only for ABP's effective on or after 1/1/2020"],
                  ["ABP4.pdf", "ABP 4: Alternative Benefit Plan Cost Sharing"],
                  ["ABP5.pdf", "ABP 5: Benefits Description"],
                  ["ABP6.pdf", "ABP 6: Benchmark-Equivalent Benefit Package"],
                  ["ABP7.pdf", "ABP 7: Benefits Assurances"],
                  ["ABP8.pdf", "ABP 8: Service Delivery Systems"],
                  ["ABP9.pdf", "ABP 9: Employer-Sponsored Insurance and Payment of Premiums"],
                  ["ABP10.pdf", "ABP 10: General Assurances"],
                  ["ABP11.pdf", "ABP 11: Payment Methodology"],
                ].map(([filename, label]) => ( !label.includes("or Benchmark-Equivalent Benefit Package") && !label.includes("3.1") ? 
                  <li key={filename}>
                    <a
                      href={`${process.env.PUBLIC_URL}/assets/forms/${filename}`}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="spa-link"
                    >
                      {label}
                    </a>
                  </li> :  label.includes("3.1") ?
                  <li key={filename}>
                    <div>
                      <a
                        href={`${process.env.PUBLIC_URL}/assets/forms/${filename}`}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="spa-link"
                      >
                      {label.substring(0,79)}
                      </a>
                      <ul>
                        <li className="list-item-with-bullet"> 
                          {label.substring(79)}
                        </li>
                      </ul>
                    </div>
                  </li>  :
                  <li key={filename}>
                  <div>
                    <a
                      href={`${process.env.PUBLIC_URL}/assets/forms/${filename}`}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="spa-link"
                    >

                    {label.substring(0,85)}
                    </a>
                    <ul>
                      <li className="list-item-with-bullet"> 
                          {label.substring(85)}
                      </li>
                    </ul>
                  </div>
                </li> 
                ))}
              </ul>
            </>
          ),
      },
      {
        anchorText: "medicaid-alternative-benifit-plan-implimention-guides",
        isOpen: false,
        question:
          "Where can I download Medicaid Alternative Benefit Plan (ABP) implementation guides?",
        isMmdl: true,
          answerJSX: (
            <>
              <ul className="file-type-list">
                {[
                  ["IG_ABP1_AlternativeBenefitPlanPopulations.doc", "ABP 1: Alternative Benefit Plan Populations Implementation Guide"],
                  ["IG_ABP2a_VoluntaryBenefitPackageAssurances.doc", "ABP 2a: Voluntary Benefit Package Selection Assurances - Eligibility Group under Section 1902(a)(10)(A)(i)(VIII) of the Act Implementation Guide"],
                  ["IG_ABP2b_VoluntaryEnrollmentAssurances.doc", "ABP 2b: Voluntary Enrollment Assurances for Eligibility Groups other than the Adult Group under Section 1902(a)(10)(A)(i)(VIII) of the Act Implementation Guide"],
                  ["IG_ABP3_SelectionOfBenchmark.doc", "ABP 3: Selection of Benchmark Benefit Package or Benchmark-Equivalent Benefit Package Implementation Guide"],
                  ["IG_ABP3.1_SelectionOfBenchmark20190819-Final.docx", "ABP 3.1: Selection of Benchmark Benefit Package or Benchmark-Equivalent Benefit Package Implementation Guide"],
                  ["IG_ABP4_AbpCostSharing.doc", "ABP 4: Alternative Benefit Plan Cost Sharing Implementation Guide"],
                  ["IG_ABP5_BenefitsDescription-Final.docx", "ABP 5: Benefits Description Implementation Guide"],
                  ["IG_ABP6_BenchmarkEquivalentBenefit.doc", "ABP 6: Benchmark-Equivalent Benefit Package Implementation Guide"],
                  ["IG_ABP7_BenefitAssurances.doc", "ABP 7: Benefit Assurances Implementation Guide"],
                  ["IG_ABP8_ServiceDeliverySystems.doc", "ABP 8:Service Delivery Systems Implementation Guide"],
                  ["IG_ABP9_EmployerSponsoredInsurance.doc", "ABP 9: Employer-Sponsored Insurance and Payment of Premiums Implementation Guide"],
                  ["IG_ABP10_GeneralAssurances.doc", "ABP 10: General Assurances Implementation Guide"],
                  ["IG_ABP11_PaymentMethodology.doc", "ABP 11: Payment Methodology Implementation Guide"],
                ].map(([filename, label]) => (
                  <li key={filename}>
                    <a
                      href={`${process.env.PUBLIC_URL}/assets/docs/${filename}`}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="spa-link"
                      download
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ),
      },
      {
        anchorText: "medicaid-premiums-cost-sharing-pdfs",
        isOpen: false,
        isMmdl: true,
        question:
          "Where can I download Medicaid Premiums and Cost Sharing (P&CS) SPA PDFs?",
          answerJSX: (
            <>
              <ul className="file-type-list">
                {[
                  ["G1.pdf", "G 1: Cost Sharing Requirements"],
                  ["G2a.pdf", "G 2a: Cost Sharing Amounts - Categorically Needy"],
                  ["G2b.pdf", "G 2b: Cost Sharing Amounts - Medically Needy"],
                  ["G2c.pdf", "G 2c: Cost Sharing Amounts - Targeting"],
                  ["G3.pdf", "G 3: Cost Sharing Limitations"],
                ].map(([filename, label]) => (
                  <li key={filename}>
                    <a
                      href={`${process.env.PUBLIC_URL}/assets/forms/${filename}`}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="spa-link"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ),
      },
      {
        anchorText: "medicaid-premiums-cost-sharing-inplementation guides",
        isOpen: false,
        isMmdl: true,
        question:
          "Where can I download Medicaid Premiums and Cost Sharing (P&CS) SPA implementation guides?",
          answerJSX: (
            <>
              <ul className="file-type-list">
                {[
                  ["IG_G1_CostSharingRequirements.doc", "G 1: Cost-Sharing Requirements Implementation Guide"],
                  ["IG_G2a_CostSharingAmountsCN.doc", "Cost Sharing Amounts - Categorically Needy Implementation Guide"],
                  ["IG_G2b_CostSharingAmountsMN.doc", "Cost Sharing Amounts - Medically Needy Implementation Guide"],
                  ["IG_G2c_CostSharingAmountsTargeting.doc", "Cost Sharing Amounts - Targeting Implementation Guide"],
                  ["IG_G3_CostSharingLimitations.doc", "Cost Sharing Limitations Implementation Guide"],
                ].map(([filename, label]) => (
                  <li key={filename}>
                    <a
                      href={`${process.env.PUBLIC_URL}/assets/docs/${filename}`}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="spa-link"
                      download
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ),
      },
      {
        anchorText: "chip-spa-pdfs",
        isOpen: false,
        isMmdl: true,
        question:
          "Where can I download CHIP SPA PDFs?",
          answerJSX: (
            <>
              <h4>MAGI Eligibility & Methods</h4>
              <ul className="file-type-list">
                {[
                  ["CS7.pdf", "CS 7: Eligibility - Targeted Low-Income Children"],
                  ["CS8.pdf", "CS 8: Eligibility - Targeted Low-Income Pregnant Women"],
                  ["CS9.pdf", "CS 9: Eligibility - Coverage From Conception to Birth"],
                  ["CS10.pdf", "CS 10: Eligibility - Children Who Have Access to Public Employee Coverage"],
                  ["CS11.pdf", "CS 11: Eligibility - Pregnant Women Who Have Access to Public Employee Coverage"],
                  ["CS12.pdf", "CS 12: Eligibility - Dental Only Supplemental Coverage"],
                  ["CS13.pdf", "CS 13: Eligibility - Deemed Newborns"],
                  ["CS15.pdf", "CS 15: MAGI-Based Income Methodologies"],
                  ["CS16.pdf", "CS 16: Other Eligibility Criteria - Spenddowns"],
                ].map(([filename, label]) => (
                  <li key={filename}>
                    <a
                      href={`${process.env.PUBLIC_URL}/assets/forms/${filename}`}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="spa-link"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
              <h4>XXI Medicaid Expansion</h4>
              <a
                      href={`${process.env.PUBLIC_URL}/assets/forms/CS3.pdf`}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="spa-link"
                    >
                      "CS 3: Eligibility for Medicaid Expansion Program"
              </a>
              <h4>Establish 2101(f) Groups</h4>
              <a
                      href={`${process.env.PUBLIC_URL}/assets/forms/CS14.pdf`}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="spa-link"
                    >
                      "CS 14: Eligibility - Children Ineligible for Medicaid as a Result of the
                      Elimination of Income Disregards"
              </a>
              <h4>Eligibility Processing</h4>
              <a
                      href={`${process.env.PUBLIC_URL}/assets/forms/CS14.pdf`}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="spa-link"
                    >
                      "CS 24: General Eligibility - Eligibility Processing"
              </a>
              <h4>Non-Financial Eligibility</h4>
              <ul className="file-type-list">
                {[
                  ["CS17.pdf", "Non-Financial Eligibility - Residency"],
                  ["CS18.pdf", "Non-Financial Eligibility - Citizenship"],
                  ["CS19.pdf", "Non-Financial Eligibility - Social Security Number"],
                  ["CS20.pdf", "Non-Financial Eligibility - Substitution of Coverage"],
                  ["CS21.pdf", "Non-Financial Eligibility - Non-Payment of Premiums"],
                  ["CS23.pdf", "Non-Financial Requirements - Other Eligibility Standards"],
                  ["CS27.pdf", "General Eligibility - Continuous Eligibility"],
                  ["CS28.pdf", "General Eligibility - Presumptive Eligibility for Children"],
                  ["CS29.pdf", "General Eligibility - Presumptive Eligibility for Pregnant Women"],
                ].map(([filename, label]) => (
                  <li key={filename}>
                    <a
                      href={`${process.env.PUBLIC_URL}/assets/forms/${filename}`}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="spa-link"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ),
      },
      {
        anchorText: "chip-spa-implimentation-guides",
        isOpen: false,
        isMmdl: true,
        question:
          "Where can I download CHIP SPA implementation guides?",
          answerJSX: (
            <>
              <h4>MAGI Eligibility & Methods</h4>
              <ul className="file-type-list">
                {[
                  ["IG_CS7_TargetedLow-IncomeChildren.doc", "CS 7: Eligibility - Targeted Low-Income Children Implementation Guide"],
                  ["IG_CS8_TargetedLow-IncomePregnantWomen.doc", "CS 8: Eligibility - Targeted Low-Income Pregnant Women Implementation Guide"],
                  ["IG_CS9_CoverageFromConceptionToBirth.doc", "CS 9: Eligibility - Coverage From Conception to Birth Implementation Guide"],
                  ["IG_CS10_ChildrenWhoHaveAccessToPublicEmployeeCoverage.doc", "CS 10: Eligibility - Children Who Have Access to Public Employee Coverage Implementation Guide"],
                  ["IG_CS11_PregnantWomenWhoHaveAccessToPublicEmployeeCoverage.doc", "CS 11: Eligibility - Pregnant Women Who Have Access to Public Employee Coverage Implementation Guide"],
                  ["IG_CS12_DentalOnlySupplementalCoverage.doc", "CS 12: Eligibility - Dental Only Supplemental Coverage Implementation Guide"],
                  ["IG_CS13_DeemedNewborns.doc", "CS 13: Eligibility - Deemed Newborns Implementation Guide"],
                  ["IG_CS15_MAGI-BasedIncomeMethodologies.doc", "CS 15: MAGI-Based Income Methodologies Implementation Guide"],
                  ["IG_CS16_Spenddown.doc", "CS 16: Other Eligibility Criteria - Spenddowns Implementation Guide"],
                ].map(([filename, label]) => (
                  <li key={filename}>
                    <a
                      href={`${process.env.PUBLIC_URL}/assets/docs/${filename}`}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="spa-link"
                      download
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
              <h4>XXI Medicaid Expansion</h4>
              <a
                      href={`${process.env.PUBLIC_URL}/assets/docs/IG_CS3_MedicaidExpansion.doc`}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="spa-link"
                      download
                    >
                  CS 3: Eligibility for Medicaid Expansion Program Implementation Guide
              </a>
              <h4>Establish 2101(f) Groups</h4>
              <a
                      href={`${process.env.PUBLIC_URL}/assets/docs/IG_CS14_ChildrenIneligForMedicaid.doc`}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="spa-link"
                      download
                    >
                  CS 14: Eligibility - Children Ineligible for Medicaid as a Result of the
                  Elimination of Income Disregards Implementation Guide
              </a>
              <h4>Eligibility Processing</h4>
              <a
                      href={`${process.env.PUBLIC_URL}/assets/docs/IG_CS24_EligibilityProcessing.doc`}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="spa-link"
                      download
                    >
                  CS 24: General Eligibility - Eligibility Processing Implementation Guide
              </a>
              <h4>Non-Financial Eligibility</h4>
              <ul className="file-type-list">
                {[
                  ["IG_CS17_Non-Financial-Residency.doc", "CS 17: Non-Financial Eligibility - Residency Implementation Guide"],
                  ["IG_CS18_Non-Financial-Citizenship.doc", "CS 18: Non-Financial Eligibility - Citizenship Implementation Guide"],
                  ["IG_CS19_Non-Financial-SocialSecurityNumber.doc", "CS 19: Non-Financial Eligibility - Social Security Number Implementation Guide"],
                  ["IG_CS20_Non-Financial-SubstitutionOfCoverage.doc", "CS 20: Non-Financial Eligibility - Substitution of Coverage Implementation Guide"],
                  ["IG_CS21_NonFinancialNonPaymentOfPremiums.doc", "CS 21: Non-Financial Eligibility - Non-Payment of Premiums Implementation Guide"],
                  ["IG_CS23_NonFinancialRequirementOtherEligibilityStandards.doc", "CS 23: Non-Financial Requirements - Other Eligibility Standards Implementation Guide"],
                  ["IG_CS27_ContinuousEligibility.doc", "CS 27: General Eligibility - Continuous Eligibility Implementation Guide"],
                  ["IG_CS28_PresumptiveEligibilityForChildren.doc", "CS 28: General Eligibility - Presumptive Eligibility for Children Implementation Guide"],
                  ["IG_CS29_PresumptiveEligibilityForPregnantWomen.doc", "CS 29: General Eligibility - Presumptive Eligibility for Pregnant Women Implementation Guide"],
                ].map(([filename, label]) => (
                  <li key={filename}>
                    <a
                      href={`${process.env.PUBLIC_URL}/assets/docs/${filename}`}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="spa-link"
                      download
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ),
      },
    ],
  },
  {
    sectionTitle: "Waivers",
    qanda: [
      {
        anchorText: "initial-waiver-id-format",
        isOpen: false,
        isMmdl: false,
        question:
          "What format is used to enter a 1915(b) Initial Waiver number?",
        answerJSX: (
          <>
            <p>
              1915(b) Initial Waiver numbers must follow the format
              SS-####.R00.00 or SS-#####.R00.00 to include:
            </p>
            <ul>
              <li>SS = 2 character state abbreviation</li>
              <li>##### = 4 or 5 digit initial waiver number</li>
              <li>R00 = initial number</li>
              <li>00 = amendment number (00 for initial)</li>
            </ul>
            <p>
              State abbreviation is separated by dash (-) and later sections are
              separated by periods (.). For example, the waiver number
              KY-0003.R00.00 is a waiver for the state of Kentucky, with an
              initial waiver number of 0003, no renewal number (R00), and no
              amendment number (00).
            </p>
          </>
        ),
      },
      {
        anchorText: "waiver-renewal-id-format",
        isOpen: false,
        isMmdl: false,
        question:
          "What format is used to enter a 1915(b) Waiver Renewal number?",
        answerJSX: (
          <>
            <p>
              1915(b) Waiver Renewal must follow the format SS-####.R##.00 or
              SS-#####.R##.00 to include:
            </p>
            <ul>
              <li>SS = 2 character state abbreviation</li>
              <li>####(#)= 4 or 5 digit initial waiver number</li>
              <li>R## = renewal number (R01, R02, ...)</li>
              <li>00 = amendment number (00 for renewals)</li>
            </ul>
            <p>
              State abbreviation is separated by dash (-) and later sections are
              separated by periods (.). For example, the waiver number
              KY-0003.R02.00 is a waiver for the state of Kentucky, with a
              initial waiver number of 0003, a second renewal (R02), and no
              amendment number (00).
            </p>
          </>
        ),
      },
      {
        anchorText: "waiver-amendment-id-format",
        isOpen: false,
        isMmdl: false,
        question:
          "What format is used to enter a 1915(b) Waiver Amendment number?",
        answerJSX: (
          <>
            <p>
              1915(b) Waiver Amendment must follow the format SS-####.R##.## or
              SS-#####.R##.## to include:
            </p>
            <ul>
              <li>SS = 2 character state abbreviation</li>
              <li>####(#)= 4 or 5 digit initial waiver number</li>
              <li>R## = renewal number (R01, R02, ...)</li>
              <li>## = amendment number (01)</li>
            </ul>
            <p>
              State abbreviation is separated by dash (-) and later sections are
              separated by periods (.). For example, the waiver number
              KY-0003.R02.02 is a waiver for the state of Kentucky, with a
              initial waiver number of 0003, a second renewal (R02), and a
              second amendment (02). Amendments for initial waivers without
              renewals should use “R00” as their renewal number.
            </p>
          </>
        ),
      },
      {
        anchorText: "waiver-id-help",
        isOpen: false,
        isMmdl: false,
        question:
          "Who can I contact to help me figure out the correct 1915(b) Waiver Number?",
        answerJSX: (
          <p>
            Email{" "}
            <a href="mailto:MCOGDMCOActions@cms.hhs.gov">
              MCOGDMCOActions@cms.hhs.gov
            </a>{" "}
            to get support with determining the correct 1915(b) Waiver Number.
          </p>
        ),
      },
      {
        anchorText: "waiver-c-id",
        isOpen: false,
        isMmdl: false,
        question: "What format is used to enter a 1915(c) waiver number?",
        answerJSX: (
          <>
            <p>
              Waiver number must follow the format SS-####.R##.## or
              SS-#####.R##.## to include:
            </p>
            <ul>
              <li>SS = 2 character state abbreviation</li>
              <li>##### = 4 or 5 digit waiver initial number</li>
              <li>
                R## = renewal number (R01, R02, ...) (Use R00 for waivers
                without renewals)
              </li>
              <li>## = appendix K amendment number (01)</li>
            </ul>
            <p>
              State abbreviation is followed by a dash (-). All other sections
              are separated by periods (.). For example, the waiver number
              KY-0003.R02.02 is a waiver for the state of Kentucky, with a
              initial waiver number of 0003, the second renewal (R02) and the
              second appendix K amendment (02). Initial waivers without renewals
              should use “R00” as their renewal number.
            </p>
          </>
        ),
      },
      {
        anchorText: "waiverb-attachments",
        isOpen: false,
        isMmdl: false,
        question:
          "What attachments are needed to submit a 1915(b) waiver action?",
        answerJSX: (
          <>
            <p>
              The regulations at 42 C.F.R. §430.25, 431.55 and 42 C.F.R.
              §441.301 describe the requirements for submitting section 1915(b)
              and 1915(c) waivers.
            </p>
            <table className="faq-table">
              <thead>
                <tr>
                  <th>Attachment Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    1915(b)(4) FFS Selective Contracting (Streamlined) waiver
                    application pre-print (Initial, Renewal, Amendment)
                  </td>
                  <td>
                    State submission of the 1915(b)(4) Waiver Fee-for-Service
                    Selective Contracting Program preprint narrative (Sections
                    A, B, and C)
                  </td>
                </tr>
                <tr>
                  <td>
                    1915(b) Comprehensive (Capitated) Waiver Application
                    Pre-print (Initial, Renewal, Amendment)
                  </td>
                  <td>
                    State submission of the 1915(b) preprint narrative (Sections
                    A, B, C and D) (non-FFS Selective Contracting Waiver
                    programs)
                  </td>
                </tr>
                <tr>
                  <td>
                    1915(b) Comprehensive (Capitated) Waiver Cost effectiveness
                    spreadsheets (Initial, Renewal, Amendment)
                  </td>
                  <td>
                    Appendix D Cost Effectiveness Demonstration for 1915(b)
                    Waivers only (not applicable to 1915(b)(4) Fee-for-Service
                    Selective Contracting programs)
                  </td>
                </tr>
                <tr>
                  <td>
                    1915(b)(4) FFS Selective Contracting (Streamlined) and
                    1915(b) Comprehensive (Capitated) Waiver Independent
                    Assessment (first two renewals only)
                  </td>
                  <td>
                    State submission of the findings from the Independent
                    Assessment of their 1915(b) waiver program
                  </td>
                </tr>
                <tr>
                  <td>Tribal Consultation (Initial, Renewal, Amendment)</td>
                  <td>
                    Document that outlines the changes the waiver action is
                    making and the impact that tribes can expect from the waiver
                    action
                  </td>
                </tr>
                <tr>
                  <td>Other</td>
                  <td>
                    Any other documents or spreadsheets that are supplemental to
                    the state's waiver application
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        ),
      },
      {
        anchorText: "waiverb-rai-attachments",
        isOpen: false,
        isMmdl: false,
        question:
          "What are the attachments for a 1915(b) Waiver response to Request for Additional Information (RAI)?",
        answerJSX: (
          <>
            <p>
              <span>Note: “*” indicates a required attachment.</span>
            </p>
            <table className="faq-table">
              <thead>
                <tr>
                  <th>Attachment Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Waiver RAI Response*</td>
                  <td>
                    Official response to CMS to support RAI inquiries for the
                    Waiver submission
                  </td>
                </tr>
                <tr>
                  <td>Other</td>
                  <td>
                    Any other documents or spreadsheets that are supplemental to
                    the state's response to RAI{" "}
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        ),
      },
      {
        anchorText: "waiver-extension-id-format",
        isOpen: false,
        isMmdl: false,
        question:
          "What format is used to enter a 1915(b) and 1915(c) Temporary Extension number?",
        answerJSX: (
          <>
            <p>
              Temporary extension numbers must follow the format
              SS-####.R##.TE## or SS-#####.R##.TE## to include:
            </p>
            <ul>
              <li>SS = 2 character state abbreviation</li>
              <li>####(#)= 4 or 5 digit initial waiver number</li>
              <li>
                R## = renewal number (R01, R02, ...) (Use R00 for waivers
                without renewals)
              </li>
              <li>
                TE## = temporary extension number, prefixed with a capital TE
                (TE01)
              </li>
            </ul>
            <p>
              State abbreviation is separated by dash (-) and later sections are
              separated by periods (.). For example, the waiver number
              KY-0003.R02.TE02 is a waiver for the state of Kentucky, with a
              initial waiver number of 0003, a second renewal (R02), and a
              second temporary extension (02). Initial waivers without renewals
              should use “R00” as their renewal number.
            </p>
          </>
        ),
      },
      {
        anchorText: "waiver-extension-status",
        isOpen: false,
        isMmdl: false,
        question:
          "Why does the status of my Temporary Extension Request continue to show as 'Submitted'?",
        answerJSX: (
          <>
            <p>
              Temporary Extensions Requests will only show a status of
              ‘Submitted’ in the OneMAC system at this time. Their status does
              not update regardless of where that request is in the Submission
              Review process.
            </p>
          </>
        ),
      },
      {
        anchorText: "waiverb-extension-attachments",
        isOpen: false,
        isMmdl: false,
        question:
          "What are the attachments for a 1915(b) Waiver - Request for Temporary Extension?",
        answerJSX: (
          <>
            <p>Note: “*” indicates a required attachment.</p>
            <table className="faq-table">
              <thead>
                <tr>
                  <th>Attachment Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Waiver Extension Request*</td>
                  <td>
                    A formal letter addressed to Carrie Smith, Deputy Director
                    of the Disabled and Elderly Health Program Group (DEHPG),
                    requesting a temporary extension beyond the current approved
                    waiver period.
                  </td>
                </tr>
                <tr>
                  <td>Other</td>
                  <td>
                    Supplemental documents for the Waiver Extension Request
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        ),
      },
      {
        anchorText: "waiverc-extension-attachments",
        isOpen: false,
        isMmdl: false,
        question:
          "What are the attachments for a 1915(c) Waiver - Request for Temporary Extension",
        answerJSX: (
          <>
            <p>Note: “*” indicates a required attachment.</p>
            <table className="faq-table">
              <thead>
                <tr>
                  <th>Attachment Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Waiver Extension Request*</td>
                  <td>
                    A formal letter addressed to George Failla, Director of the
                    Division of HCBS Operations & Oversight requesting a
                    temporary extension beyond the current approved waiver
                    period.
                  </td>
                </tr>
                <tr>
                  <td>Other</td>
                  <td>
                    Supplemental documents for the Waiver Extension Request
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        ),
      },
      {
        anchorText: "appk",
        isOpen: false,
        isMmdl: false,
        question: "Can I submit Appendix K amendments in OneMAC?",
        answerJSX: (
          <p>
            Yes, you can submit Appendix K amendments in the 1915(c) Appendix K
            form.
          </p>
        ),
      },
      {
        anchorText: "appk-attachments",
        isOpen: false,
        isMmdl: false,
        question: "What are the attachments for a 1915(c) Appendix K Waiver?",
        answerJSX: (
          <>
            <p>
              The regulations at 42 C.F.R. §430.25, 431.55 and 42 C.F.R.
              §441.301 describe the requirements for submitting section 1915(b)
              and 1915(c) waivers.
            </p>
            <p>Note: “*” indicates a required attachment.</p>
            <table className="faq-table">
              <thead>
                <tr>
                  <th>Attachment Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1915(c) Appendix K Amendment Waiver Template*</td>
                  <td>
                    Official amendments to 1915(c) waiver programs addressing or
                    in response to Disasters or Emergencies.
                  </td>
                </tr>
                <tr>
                  <td>Other</td>
                  <td>
                    Supplemental documents for the 1915(c) Appendix K waiver
                    amendment
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        ),
      },
      {
        anchorText: "waiver-rai-response",
        isOpen: false,
        isMmdl: false,
        question:
          "How do I submit a Formal Request for Additional Information (RAI) Response for a Waiver?",
        answerJSX: (
          <div>
            <p>
              When necessary, states will receive an RAI via email from CMS.
            </p>
            <ul>
              <li>The state will respond to the RAI through OneMAC.</li>
              <li>
                A Request for Additional Information (RAI) stops the 90-day
                clock, is a formal request for additional information from CMS.
              </li>
              <li>
                Packages pending an official RAI response from the state will
                have a Status of <b>RAI Issued</b>.
              </li>
            </ul>
            <p>
              To respond to a Waiver RAI, select the Waiver Tab view from the
              Package Dashboard.
            </p>
            <ul>
              <li>
                Select the link to the Waiver ID. Packages which are in need of
                an RAI response from the state will have a Status of{" "}
                <b>RAI Issued</b>.
              </li>
              <li>
                Then, under Package Actions, select the Respond to RAI link.
              </li>
              <li>
                After attaching any required files, you may include additional
                notes prior to clicking on the submit button.
              </li>
              <li>
                Check your entries, as you cannot edit the submission after you
                select Submit.
              </li>
            </ul>
          </div>
        ),
      },
      {
        anchorText: "waiver-withdraw-rai-response",
        isOpen: false,
        isMmdl: false,
        question:
          "How do I Withdraw a Formal RAI Response for a Medicaid Waiver?",
        answerJSX: (
          <div>
            <p>
              If a state wishes to withdraw a Formal RAI Response, the state
              must first contact their CMS Point of Contact so the action can be
              enabled.
            </p>
            <ul>
              <li>
                As a CMS user, log in to OneMAC and select the link to the
                Waiver number from the dashboard
              </li>
              <li>
                Then, under Package Actions, select the Enable Formal RAI
                Response Withdraw link, and then Select Submit.
              </li>
            </ul>
            <p>
              After receiving confirmation from your CMS Point of Contact that
              the Withdraw Formal RAI Response feature has been enabled, locate
              and select the Medicaid Waiver submission package.
            </p>
            <p>
              The package status remains as Under Review and a substatus of
              Withdraw Formal RAI Response Enabled will be reflected below the
              status for the SPA or waiver submission package.
            </p>
            <p>
              <b>
                Note: These submissions will remain on the clock until the
                package action has been taken.
              </b>
            </p>
            <ul>
              <li>
                On the Formal RAI Response Withdraw form, upload any supporting
                documentation and fill out the Additional Information section
                explaining your need to withdraw the Formal RAI Response (all
                required information is marked with an asterisk).
              </li>
              <li>Select Submit.</li>
              <ul>
                <li>
                  You will receive a confirmation message asking if you are sure
                  that you want to withdraw the Formal RAI Response. Select Yes,
                  withdraw response.
                </li>
              </ul>
            </ul>
          </div>
        ),
      },
      {
        anchorText: "withdraw-waiver",
        isOpen: false,
        isMmdl: false,
        question: "How do I Withdraw a Package for a Waiver?",
        answerJSX: (
          <div>
            <p>
              A state can withdraw a submission package if it is in the Under
              Review or RAI Issued status. However, please note that once
              withdrawn, a submission package cannot be resubmitted to CMS.{" "}
              <b>
                Completing this action will conclude the review of this Waiver
                package.
              </b>
            </p>
            <p>
              There are two methods you can use to withdraw a submission
              package:
            </p>
            <ul>
              <li>
                In OneMAC, Locate and select the link to the Waiver ID. Then,
                under Package Actions, select the Withdraw Package link.
              </li>
              <li>
                Alternatively, the Withdraw Package action can be accessed by
                selecting the three dots icon in the Actions column on the
                Package Dashboard. Then, select Withdraw Package from the
                drop-down list.
              </li>
            </ul>
            <p>
              A warning message will appear letting you know that if the package
              is withdrawn, it cannot be resubmitted and this action will
              conclude the review of this package. Select Yes, withdraw package
              to complete the task.
            </p>
          </div>
        ),
      },
    ],
  },
];
