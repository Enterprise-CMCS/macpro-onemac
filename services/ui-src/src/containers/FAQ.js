import React, { useEffect, useRef } from "react";
import PageTitleBar from "../components/PageTitleBar";
import { helpDeskContact } from "../libs/helpDeskContact";
import Collapsible from "react-collapsible";
import TriggerCB from "../components/TriggerCB";

const FAQ = () => {
  const waiverIdRef = useRef(document.location.hash);
  const spaIdRef = useRef(document.location.hash);

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

  useEffect(() => {
    scrollToSection();
  }, []);

  return (
    <div>
      <PageTitleBar heading="Frequently Asked Questions" />
      <div className="form-container" id="top">
        <div className="form-card">
          <div className="faq-border-box"></div>
          <div className="faq-info-box">
            <p className="faq-info-box-title">MACPro Help Desk Contact Info</p>
            <b>Phone Number</b>
            <br />
            <a href="phone:8332282540">(833) 228-2540</a>
            <br />
            <br />
            <b>Email</b>
            <br />
            <a href="mailto:MACPro_HelpDesk@cms.hhs.gov">
              MACPro_HelpDesk@cms.hhs.gov
            </a>
          </div>
          <div className="faq-left-column">
            <h3 className="topic-title">General</h3>
            <Collapsible
              triggerWhenOpen={
                <TriggerCB
                  isOpen={false}
                  text="What browsers can I use to access the system?"
                />
              }
              trigger={
                <TriggerCB
                  isOpen={true}
                  text="  What browsers can I use to access the system?"
                />
              }
            >
             <br />
              The submission portal works best on Google Chrome (Version 
              91.0.4472.77 or later), Firefox  (Version 89.0 or later).
            </Collapsible>
            <hr />
            <h3 className="topic-title">State Plan Amendments (SPAs)</h3>
            <div ref={spaIdRef} id="spa-id-format">
              <Collapsible
                trigger={
                  <TriggerCB
                    isOpen={true}
                    text="What format is used to enter a SPA ID?"
                  />
                }
                triggerWhenOpen={
                  <TriggerCB
                    isOpen={false}
                    text="What format is used to enter a SPA ID?"
                  />
                }
              >
                <br />
                Enter the State Plan Amendment transmittal number. Assign
                consecutive numbers on a calendar year basis (e.g.,
                20-0001-xxxx, 20-0002-xxxx, etc.).
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
              </Collapsible>
              <hr />
            </div>
            <div>
            <Collapsible
                trigger={
                  <TriggerCB
                    isOpen={true}
                    text="What are the attachments for a Medicaid SPA?"
                  />
                }
                triggerWhenOpen={
                  <TriggerCB
                    isOpen={false}
                    text="What are the attachments for a Medicaid SPA?"
                  />
                }
              >
                <br />
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
                  <colgroup>
                    <col />
                    <col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>
                        <p>
                          <strong>
                            <span>Attachment Name</span>
                          </strong>
                        </p>
                      </th>
                      <th>
                        <p>
                          <strong>
                            <span>Description</span>
                          </strong>
                        </p>
                      </th>
                    </tr>
                    <tr>
                      <td className="confluenceTd">
                        <p>
                          <span>CMS Form 179*</span>
                        </p>
                      </td>
                      <td className="confluenceTd">
                        <p>
                          <span>
                            CMS-179 template that contains specific information
                            for SPA submission
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td className="confluenceTd">
                        <p>
                          <span>SPA Pages*</span>
                        </p>
                      </td>
                      <td className="confluenceTd">
                        <p>
                          <span>
                            Clean versions of the State Plan pages being amended
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td className="confluenceTd">
                        <p>
                          <span>Cover Letter</span>
                        </p>
                      </td>
                      <td className="confluenceTd">
                        <p>
                          <span>
                            Cover letter to CMS that could outline SPA
                            submission. Please address the cover letter to:
                            Center for Medicaid &amp; CHIP Services (CMCS)
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td className="confluenceTd">
                        <p>
                          <span>
                            Document Demonstrating Good-Faith Tribal Engagement
                          </span>
                        </p>
                      </td>
                      <td className="confluenceTd">
                        <p>
                          <span>
                            Emails forwarding tribal notice to tribal leaders
                            and tribal contacts; and/or tribal face-to-face
                            meeting agendas indicating SPA discussion
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td className="confluenceTd">
                        <p>
                          <span>Existing State Plan Page(s)</span>
                        </p>
                      </td>
                      <td className="confluenceTd">
                        <p>
                          <span>
                            Current approved SPA page, could include track
                            changes to reflect changes
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td className="confluenceTd">
                        <p>
                          <span>Public Notice</span>
                        </p>
                      </td>
                      <td className="confluenceTd">
                        <p>
                          <span>
                            Notice to stakeholders and interested parties that
                            outlines the changes being proposed by SPA, feedback
                            received from PN, and copies of websites- notices,
                            state register notices, or newspaper notices that
                            includes the date notice was posted
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td className="confluenceTd">
                        <p>
                          <span>Standard Funding Questions (SFQs)</span>
                        </p>
                      </td>
                      <td className="confluenceTd">
                        <p>
                          <span>
                            Word document of the funding questions required to
                            be submitted with reimbursement SPAs
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td className="confluenceTd">
                        <p><span>Tribal Consultation</span></p>
                      </td>
                      <td className="confluenceTd">
                        <p>
                          <span>
                            Document that outline the changes SPA is making and
                            the impact that tribes can expect from the SPA
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td className="confluenceTd">
                        <p>
                          <span>Other</span>
                        </p>
                      </td>
                      <td className="confluenceTd">
                        <p><span>UPLs, reimbursement methodology spreadsheet, Copies of
                          legislation, any document that will assist in the review of SPA</span></p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <h4><span>What are the attachments for a Medicaid response to Request for Additional
                  Information (RAI)?</span></h4>
                <p><span>Note: “*” indicates a required attachment.</span></p>
                <table className="faq-table" >
                  <colgroup>
                    <col />
                    <col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th >
                        <p><strong><span>Attachment Name</span></strong></p>
                      </th>
                      <th >
                        <p><strong><span>Description</span></strong></p>
                      </th>
                    </tr>
                    <tr>
                      <td className="confluenceTd">
                        <p><span>RAI Response*</span></p>
                      </td>
                      <td className="confluenceTd">
                        <p><span>Letter responding to RAI questions, any updated SPA pages,
                          and other documentation requested by CMS in the RAI</span></p>
                      </td>
                    </tr>
                    <tr>
                      <td className="confluenceTd">
                        <p><span>Other</span></p>
                      </td>
                      <td className="confluenceTd">
                        <p><span>Additional document(s) needed to process the SPA RAI
                          submission</span></p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <h4><span>What are the attachments for a CHIP SPA?</span></h4>
                <p><span>Note: “*” indicates a required attachment.</span></p>
                <table className="faq-table">
                  <colgroup>
                    <col />
                    <col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th >
                        <p><strong><span>Attachment Name</span></strong></p>
                      </th>
                      <th >
                        <p><strong><span>Description</span></strong></p>
                      </th>
                    </tr>
                    <tr>
                      <td className="confluenceTd">
                        <p><span>Current State Plan*</span></p>
                      </td>
                      <td className="confluenceTd">
                        <p><span>Current version of the CHIP state plan that details how the
                          State operates its CHIP program</span></p>
                      </td>
                    </tr>
                    <tr>
                      <td className="confluenceTd">
                        <p><span>Amended State Plan Language*</span></p>
                      </td>
                      <td className="confluenceTd">
                        <p><span>Redline version of proposed changes to the existing CHIP
                          state plan pages. State to provide a redline version and a clean version of the CHIP state
                          plan pages being amended.</span></p>
                      </td>
                    </tr>
                    <tr>
                      <td className="confluenceTd">
                        <p><span>Cover Letter*</span></p>
                      </td>
                      <td className="confluenceTd">
                        <p><span>Cover letter to CMS with an authorized signature that
                          outlines the purpose of the CHIP SPA submission</span></p>
                      </td>
                    </tr>
                    <tr>
                      <td className="confluenceTd">
                        <p><span>Budget Docs</span></p>
                      </td>
                      <td className="confluenceTd">
                        <p><span>Updated 1-year budget if applicable of the State’s planned
                          expenditures if the CHIP SPA submission has a significant impact on the approved
                          budget</span></p>
                      </td>
                    </tr>
                    <tr>
                      <td className="confluenceTd">
                        <p><span>Public Notice</span></p>
                      </td>
                      <td className="confluenceTd">
                        <p><span>Process used by the State if applicable to accomplish
                          involvement of the public that occurred specifically for this CHIP SPA submission</span></p>
                      </td>
                    </tr>
                    <tr>
                      <td className="confluenceTd">
                        <p><span>Tribal Consultation</span></p>
                      </td>
                      <td className="confluenceTd">
                        <p><span>Consultation process with Indian Tribes if applicable that
                          occurred specifically for this CHIP SPA submission</span></p>
                      </td>
                    </tr>
                    <tr>
                      <td className="confluenceTd">
                        <p><span>Other</span></p>
                      </td>
                      <td className="confluenceTd">
                        <p><span>Other document(s) needed to process the CHIP SPA
                          submission</span></p>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <h4><span>What are the attachments for a CHIP SPA response to Request for Additional
                  Information (RAI)?</span></h4>
                <p><span>Note: “*” indicates a required attachment.</span></p>
                <table className="faq-table">
                  <colgroup>
                    <col />
                    <col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th >
                        <p><strong><span>Attachment Name</span></strong></p>
                      </th>
                      <th >
                        <p><strong><span>Description</span></strong></p>
                      </th>
                    </tr>
                    <tr>
                      <td className="confluenceTd">
                        <p><span>Revised Amended State Plan Language*</span></p>
                      </td>
                      <td className="confluenceTd">
                        <p><span>Revision made to the amended state plan language of the CHIP
                          SPA submission. State to provide a redline version and a clean version of the revised
                          amended state plan pages</span></p>
                      </td>
                    </tr>
                    <tr>
                      <td className="confluenceTd">
                        <p><span>Official RAI Response*</span></p>
                      </td>
                      <td className="confluenceTd">
                        <p><span>Official response to CMS to support RAI inquiries for the
                          CHIP SPA submission</span></p>
                      </td>
                    </tr>
                    <tr>
                      <td className="confluenceTd">
                        <p><span>Budget Docs</span></p>
                      </td>
                      <td className="confluenceTd">
                        <p><span>Updated 1-year budget if applicable of the State’s planned
                          expenditures if the CHIP SPA submission has a significant impact on the approved
                          budget</span></p>
                      </td>
                    </tr>
                    <tr>
                      <td className="confluenceTd">
                        <p><span>Public Notice</span></p>
                      </td>
                      <td className="confluenceTd">
                        <p><span>Process used by the State if applicable to accomplish
                          involvement of the public that occurred specifically for this CHIP SPA submission</span></p>
                      </td>
                    </tr>
                    <tr>
                      <td className="confluenceTd">
                        <p><span>Tribal Consultation</span></p>
                      </td>
                      <td className="confluenceTd">
                        <p><span>Consultation process with Indian Tribes if applicable that
                          occurred specifically for this CHIP SPA submission</span></p>
                      </td>
                    </tr>
                    <tr>
                      <td className="confluenceTd">
                        <p><span>Other</span></p>
                      </td>
                      <td className="confluenceTd">
                        <p><span>Other document(s) needed to process the CHIP SPA
                          submission</span></p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <br />
                <p><strong><span  >Can I submit SPAs relating to the Public Health Emergency (PHE) in
                  OneMAC?</span></strong><br /><span  >Yes, all PHE-related SPAs should be
                    submitted through OneMAC by completing the Medicaid SPA form.</span></p>
              </Collapsible>
              <hr />
            </div>
            <h3 className="topic-title">Waivers</h3>
            <div ref={waiverIdRef} id="waiver-id-format">
              <Collapsible trigger={<TriggerCB isOpen={true} text="What format is used to enter a 1915(b) waiver number?" />}
                triggerWhenOpen={<TriggerCB isOpen={false} text="What format is used to enter a 1915(b) waiver number?" />} >
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
                <h4>Who can I contact to help me figure out the correct 1915(b) Waiver Number?</h4>
                <p>Email <a href="mailto:MCOGDMCOActions@cms.hhs.gov">MCOGDMCOActions@cms.hhs.gov</a> to get support with determining the correct 1915(b) Waiver Number.</p>
              </Collapsible>
              <hr />
              <Collapsible trigger={<TriggerCB isOpen={true} text="What format is used to enter a 1915(c) waiver number?" />}
                triggerWhenOpen={<TriggerCB isOpen={false} text="What format is used to enter a 1915(c) waiver number?" />} >
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
              </Collapsible>
              <hr />
            </div>
            <Collapsible
              trigger={
                <TriggerCB
                  isOpen={true}
                  text="What attachments are needed to submit a 1915(b) waiver action?"
                />
              }
              triggerWhenOpen={
                <TriggerCB
                  isOpen={false}
                  text="What attachments are needed to submit a 1915(b) waiver action?"
                />
              }
            >
              <br />
              <p>
                <span>
                  The regulations at 42 C.F.R. §430.25, 431.55 and 42 C.F.R.
                  §441.301 describe the requirements for submitting section
                  1915(b) and 1915(c) waivers.
                </span>
              </p>
              <table className="faq-table">
                <colgroup>
                  <col />
                  <col />
                </colgroup>
                <tbody>
                  <tr>
                    <th>
                      <p>
                        <strong>
                          <span>Attachment Name</span>
                        </strong>
                      </p>
                    </th>
                    <th >
                      <p><strong><span>Description</span></strong></p>
                    </th>
                  </tr>
                  <tr>
                    <td className="confluenceTd">
                      <p><span>1915(b)(4) FFS Selective Contracting (Streamlined) waiver
                        application pre-print (Initial, Renewal, Amendment)</span></p>
                    </td>
                    <td className="confluenceTd">
                      <p><span>State submission of the 1915(b)(4) Waiver Fee-for-Service
                        Selective Contracting Program preprint narrative (Sections A, B, and C)</span></p>
                    </td>
                  </tr>
                  <tr>
                    <td className="confluenceTd">
                      <p><span>1915(b) Comprehensive (Capitated) Waiver Application
                        Pre-print (Initial, Renewal, Amendment)</span></p>
                    </td>
                    <td className="confluenceTd">
                      <p><span>State submission of the 1915(b) preprint narrative (Sections
                        A, B, C and D) (non-FFS Selective Contracting Waiver programs)</span></p>
                    </td>
                  </tr>
                  <tr>
                    <td className="confluenceTd">
                      <p><span>1915(b) Comprehensive (Capitated) Waiver Cost effectiveness
                        spreadsheets (Initial, Renewal, Amendment)</span></p>
                    </td>
                    <td className="confluenceTd">
                      <p><span>Appendix D Cost Effectiveness Demonstration for 1915(b)
                        Waivers only (not applicable to 1915(b)(4) Fee-for-Service Selective Contracting
                        programs)</span></p>
                    </td>
                  </tr>
                  <tr>
                    <td className="confluenceTd">
                      <p><span>1915(b)(4) FFS Selective Contracting (Streamlined) and
                        1915(b) Comprehensive (Capitated) Waiver Independent Assessment (first two renewals
                        only)</span></p>
                    </td>
                    <td className="confluenceTd">
                      <p><span>State submission of the findings from the Independent
                        Assessment of their 1915(b) waiver program</span></p>
                    </td>
                  </tr>
                  <tr>
                    <td className="confluenceTd">
                      <p><span>Tribal Consultation (Initial, Renewal, Amendment)</span></p>
                    </td>
                    <td className="confluenceTd">
                      <p><span>Document that outlines the changes the waiver action is
                        making and the impact that tribes can expect from the waiver action</span></p>
                    </td>
                  </tr>
                  <tr>
                    <td className="confluenceTd">
                      <p><span>Other</span></p>
                    </td>
                    <td className="confluenceTd">
                      <p><span>Any other documents or spreadsheets that are supplemental to
                        the state's waiver application</span></p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Collapsible>
            <hr />
            <Collapsible trigger={<TriggerCB isOpen={true} text="What are the attachments for a 1915(b) Waiver response to Request for Additional Information (RAI)?" />}
              triggerWhenOpen={<TriggerCB isOpen={false} text="What are the attachments for a 1915(b) Waiver response to Request for Additional Information (RAI)?" />} >
              <br />
              <p><span>Note: “*” indicates a required attachment.</span></p>
              <table className="faq-table">
                <colgroup>
                  <col />
                  <col />
                </colgroup>
                <tbody>
                  <tr>
                    <th >
                      <p><strong><span>Attachment Name</span></strong></p>
                    </th>
                    <th >
                      <p><strong><span>Description</span></strong></p>
                    </th>
                  </tr>
                  <tr>
                    <td className="confluenceTd">
                      <p><span>Waiver RAI Response</span><strong><span
                      >*</span></strong></p>
                    </td>
                    <td className="confluenceTd">
                      <p><span>Official response to CMS to support RAI inquiries for the
                        Waiver submission</span></p>
                    </td>
                  </tr>
                  <tr>
                    <td className="confluenceTd">
                      <p><span>Other</span></p>
                    </td>
                    <td className="confluenceTd">
                      <p><span>Any other documents or spreadsheets that are supplemental to
                        the state's response to RAI </span></p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Collapsible>
            <hr />
            <Collapsible trigger={<TriggerCB isOpen={true} text="What are the attachments for a 1915(b) Waiver - Request for Temporary Extension?" />}
              triggerWhenOpen={<TriggerCB isOpen={false} text="What are the attachments for a 1915(b) Waiver - Request for Temporary Extension?" />} >
              <br />
              <p><span>Note: “*” indicates a required attachment.</span></p>
              <table className="faq-table">
                <colgroup>
                  <col />
                  <col />
                </colgroup>
                <tbody>
                  <tr>
                    <th >
                      <p><strong><span>Attachment Name</span></strong></p>
                    </th>
                    <th >
                      <p><strong><span>Description</span></strong></p>
                    </th>
                  </tr>
                  <tr>
                    <td className="confluenceTd">
                      <p><span>Waiver Extension Request*</span></p>
                    </td>
                    <td className="confluenceTd">
                      <p><span>A formal letter addressed to the Deputy Director of the
                        Division of Disabled and Elderly Health Programs Group (DEHPG) requesting a temporary
                        extension beyond the current approved waiver period</span></p>
                    </td>
                  </tr>
                  <tr>
                    <td className="confluenceTd">
                      <p><span>Other</span></p>
                    </td>
                    <td className="confluenceTd">
                      <p><span>Supplemental documents for the 1915(c) Appendix K waiver
                        amendment</span></p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p><strong><span>Can I submit Appendix K amendments in
                OneMAC? </span></strong><br /><span>Yes, you can submit Appendix K
                  amendments in the 1915(c) Appendix K form.</span></p>
              <p><strong><span>What are the attachments for a 1915(c) Appendix K
                Waiver?</span></strong></p>
              <p><span>The regulations at 42 C.F.R. §430.25, 431.55 and 42 C.F.R. §441.301 describe
                the requirements for submitting section 1915(b) and 1915(c) waivers.</span></p>
              <p><span>Note: “*” indicates a required attachment.</span></p>
              <table className="faq-table">
                <colgroup>
                  <col />
                  <col />
                </colgroup>
                <tbody>
                  <tr>
                    <th >
                      <p><strong><span>Attachment Name</span></strong></p>
                    </th>
                    <th >
                      <p><strong><span>Description</span></strong></p>
                    </th>
                  </tr>
                  <tr>
                    <td className="confluenceTd">
                      <p><span>1915(c) Appendix K Amendment Waiver Template*</span></p>
                    </td>
                    <td className="confluenceTd">
                      <p><span>Official amendments to 1915(c) waiver programs addressing or
                        in response to Disasters or Emergencies.</span></p>
                    </td>
                  </tr>
                  <tr>
                    <td className="confluenceTd">
                      <p><span>Other</span></p>
                    </td>
                    <td className="confluenceTd">
                      <p><span>Supplemental documents for the 1915(c) Appendix K waiver
                        amendment</span></p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Collapsible>
            <hr />
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
    </div>
  );
};

export default FAQ;
