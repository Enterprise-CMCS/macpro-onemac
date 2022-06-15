import React from "react";
import { helpDeskContact } from "./helpDeskContact";

interface QuestionAnswer {
  anchorText: string;
  question: string;
  answerJSX: JSX.Element;
}

interface FAQContent {
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
        anchorText: "browsers",
        question: "What browsers can I use to access the system?",
        answerJSX: (
          <p>
            The submission portal works best on Google Chrome (Version
            91.0.4472.77 or later), Firefox (Version 89.0 or later).
          </p>
        ),
      },
      {
        anchorText: "confirm-email",
        question: "What should we do if we don’t receive a confirmation email?",
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
        question: "Is this considered the official state submission?",
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
        question: "What are the OneMAC user roles?",
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
        anchorText: "onboarding-materials",
        question: "Onboarding Materials",
        answerJSX: (
          <ul>
            {[
              ["WelcometoOneMAC.pdf", "Welcome to OneMAC"],
              [
                "IDMInstructionsforOneMACUsers.pdf",
                "IDM Instructions for OneMAC Users",
              ],
              ["OneMACIDMGuide.pdf", "OneMAC IDM Guide"],
              ["OneMACStateSubmitterGuide.pdf", "OneMAC State Submitter Guide"],
              [
                "OneMACStateAdministratorGuide.pdf",
                "OneMAC State Administrator Guide",
              ],
              ["OneMACCMSUserGuide.pdf", "OneMAC CMS User Guide"],
              [
                "OneMACCMSRoleApproverGuide.pdf",
                "OneMAC CMS Role Approver Guide",
              ],
            ].map(([filename, label]) => (
              <li key={filename}>
                <a
                  href={`${process.env.PUBLIC_URL}assets/onboarding/${filename}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        ),
      },
    ],
  },
  {
    sectionTitle: "State Plan Amendments (SPAs)",
    qanda: [
      {
        anchorText: "spa-id-format",
        question: "What format is used to enter a SPA ID?",
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
        question: "What are the attachments for a Medicaid SPA?",
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
        question:
          "What are the attachments for a Medicaid response to Request for Additional Information (RAI)?",
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
        question: "What are the attachments for a CHIP SPA?",
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
        question:
          "What are the attachments for a CHIP SPA response to Request for Additional Information (RAI)?",
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
        question:
          "Can I submit SPAs relating to the Public Health Emergency (PHE) in OneMAC?",
        answerJSX: (
          <p>
            Yes, all PHE-related SPAs should be submitted through OneMAC by
            completing the Medicaid SPA form.
          </p>
        ),
      },
    ],
  },
  {
    sectionTitle: "Waivers",
    qanda: [
      {
        anchorText: "waiver-id-format",
        question: "What format is used to enter a 1915(b) waiver number?",
        answerJSX: (
          <>
            <p>
              Waiver number must follow the format SS.####.R##.## or
              SS.#####.R##.## to include:
            </p>
            <ul>
              <li>SS = 2 character state abbreviation</li>
              <li>##### = 4 or 5 digit waiver base number</li>
              <li>
                R## = renewal number (R01, R02, ...) (Use R00 for waivers
                without renewals)
              </li>
              <li>M## = amendment number, prefixed with a capital M (M01)</li>
            </ul>
            <p>
              All separated by periods (.). For example, the waiver number
              KY.0003.R02.M02 is a waiver for the state of Kentucky, with a base
              waiver number of 0003, a second renewal (R02) and a second
              amendment (02). Base waivers without renewals should use “R00” as
              their renewal number.
            </p>
          </>
        ),
      },
      {
        anchorText: "waiver-id-help",
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
        question: "What format is used to enter a 1915(c) waiver number?",
        answerJSX: (
          <>
            <p>
              Waiver number must follow the format SS.####.R##.## or
              SS.#####.R##.## to include:
            </p>
            <ul>
              <li>SS = 2 character state abbreviation</li>
              <li>##### = 4 or 5 digit waiver base number</li>
              <li>
                R## = renewal number (R01, R02, ...) (Use R00 for waivers
                without renewals)
              </li>
              <li>## = appendix K amendment number (01)</li>
            </ul>
            <p>
              All separated by periods (.). For example, the waiver number
              KY.0003.R02.02 is a waiver for the state of Kentucky, with a base
              waiver number of 0003, the second renewal (R02) and the second
              appendix K amendment (02). Base waivers without renewals should
              use “R00” as their renewal number.
            </p>
          </>
        ),
      },
      {
        anchorText: "waiverb-attachments",
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
        anchorText: "waiverb-extension-attachments",
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
                    A formal letter addressed to the Deputy Director of the
                    Division of Disabled and Elderly Health Programs Group
                    (DEHPG) requesting a temporary extension beyond the current
                    approved waiver period
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
    ],
  },
];
