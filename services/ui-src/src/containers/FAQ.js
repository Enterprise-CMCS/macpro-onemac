import React, { Component } from "react";
import PageTitleBar from "../components/PageTitleBar";

export default class FAQ extends Component {

    render() {
        PageTitleBar.setPageTitleInfo({ heading: "SPA and Waiver Frequently Asked Questions", text: "" })

        return (
            <div className="form-container">
                <div className="form-card">
                    <h2>Help Desk Contact Information</h2>
                    <p>For assistance, please email the MACPro Help Desk at MACPro_HelpDesk@cms.hhs.gov or call (833) 228-2540.</p>
                    <h2>Frequently Asked Questions</h2>
                    <h3>State Plan Amendments (SPAs)</h3>
                    <h4 id="spa-id-format">What format is used to enter a SPA ID?</h4>
                    <p>Enter the State Plan Amendment transmittal number. Assign consecutive numbers on a calendar year basis (e.g., 20-0001.xxxx, 20-0002.xxxx, etc.).</p>
                    <p>The Official Submission package SPA ID must follow the format SS-YY-NNNN-xxxx where:</p>
                    <ul>
                        <li>SS = 2 alpha character (State Abbreviation)</li>
                        <li>YY = 2 numeric digits (Year)</li>
                        <li>NNNN = 4 numeric digits (Serial number)</li>
                        <li>xxxx = 4 character alpha/numeric modifier (Suffix)</li>
                    </ul>

                    <h4>What attachments do we need to submit a new SPA?</h4>
                    <p>SPA submission requirements can be found in regulation&nbsp;
                <a href="https://www.ecfr.gov/cgi-bin/text-idx?SID=7d639b87112e05a57ff40731d647bd05&mc=true&node=se42.4.430_112&rgn=div8">42 C.F.R. §430.12.</a>.  Required attachments for form completion are:</p>
                    <ul>
                        <li>Digitized Transmittal and Notice of Approval of State Plan Material (CMS 179) form </li>
                        <li>SPA Pages</li>
                    </ul>
                    <p>In this system, you can submit other optional files. If submitting a cover letter, please address the cover letter to: Center for Medicaid &amp; CHIP Services (CMCS).</p>
                    <h3>Waivers</h3>
                    <h4>What format is used to enter a 1915(b) waiver number?</h4>
                    <p id="waiver-id-format">Waiver number must follow the format SS.##.R##.M## to include:</p>
                    <ul>
                        <li>SS=  2 character state abbreviation</li>
                        <li>##= 2 digit waiver base number</li>
                        <li>R## = renewal number (R01, R02, ...)</li>
                        <li>M## = amendment number, prefixed with a capital M (M01)</li>
                    </ul>
                    <p>All separated by periods (.). For example, the waiver number KY.03.R02.M02 is a waiver for the state of Kentucky, with a base waiver number of 03, a second renewal (R02) and a second amendment (02).</p>
                    <h4>What format is used to enter a 1915(c) waiver number?</h4>
                    <p>Waiver number must follow the format  SS.##.R##.## to include:</p>
                    <ul>
                        <li>SS=  2 character state abbreviation</li>
                        <li>####= 4 digit waiver base number</li>
                        <li>R## = renewal number (R01, R02, ...)</li>
                        <li>## = appendix K amendment number (01)</li>
                    </ul>
                    <p>All separated by periods (.). For example, the waiver number KY.0003.R02.02 is a waiver for the state of Kentucky, with a base waiver number of 0003, the second renewal (R02) and the second appendix K amendment (02).</p>
                    <h4>What attachments are needed to submit 1915(b) and 1915(c) waivers?</h4>
                    <p>The regulations at 42 C.F.R. §430.25, 431.55 and 42 C.F.R. §441.301 describe the requirements for submitting section 1915(b) and 1915(c) waivers.</p>
                    <h4>What should we do if we don’t receive a confirmation email?</h4>
                    <p>Refresh your inbox, check your SPAM filters, then contact the MACPro Help Desk (MACPro_HelpDesk@cms.hhs.gov or call (833) 228-2540 or contact your state lead.</p>
                    <h4>Is this considered the official state submission?</h4>
                    <p>Yes, as long as you have the electronic receipt (confirmation email). Your submission is considered your official state submission and will only be considered received by CMS if you have received the electronic receipt. You should receive an email confirmation that the formal action was received along with information about the 90th day. If you do not receive a confirmation email for your SPA or waiver submissions, please contact your state lead or your state’s CMS lead for HCBS or managed care.</p>
                </div>
            </div>
        );
    }
}
