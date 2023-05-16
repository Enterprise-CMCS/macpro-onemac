import React from "react";
import { Review } from "@cmsgov/design-system";

import { approvedBlueWarningMessage } from "cmscommonlib";
import {
  OneMACFormConfig,
  stateAccessMessage,
  buildWrongFormatMessage,
  buildMustExistMessage,
  buildMustNotExistMessage,
} from "../libs/formLib";
import PageTitleBar from "../components/PageTitleBar";

import { medicaidSpaFormInfo } from "./medicaid-spa/MedicaidSpaForm";
import { medicaidSPARAIFormInfo } from "./medicaid-spa/MedicaidSPARAIForm";
import { chipSpaFormInfo } from "./chip-spa/ChipSpaForm";
import { chipSPARAIFormInfo } from "./chip-spa/CHIPSPARAIForm";
import { initialWaiverB4FormInfo } from "./initial-waiver/InitialWaiverB4Form";
import { waiverRenewalFormInfo } from "./waiver-renewal/WaiverRenewalB4Form";
import { waiverAmendmentFormInfo } from "./waiver-amendment/WaiverAmendmentB4Form";
import { waiverRAIFormInfo } from "./waiver-rai/WaiverRAIForm";
import { waiverAppendixKFormInfo } from "./waiver-appendix-k/WaiverAppendixKForm";
import { waiverAppendixKRAIFormInfo } from "./waiver-appendix-k/WaiverAppendixKRAIForm";
import { temporaryExtensionFormInfo } from "./temporary-extension/TemporaryExtensionForm";

const configList: OneMACFormConfig[] | any = [
  { ...medicaidSpaFormInfo },
  { ...medicaidSPARAIFormInfo },
  { ...chipSpaFormInfo },
  { ...chipSPARAIFormInfo },
  { ...initialWaiverB4FormInfo },
  { ...waiverRenewalFormInfo },
  { ...waiverAmendmentFormInfo },
  { ...waiverRAIFormInfo },
  { ...waiverAppendixKFormInfo },
  { ...waiverAppendixKRAIFormInfo },
  { ...temporaryExtensionFormInfo },
];

const describeFieldHint = (formConfig: OneMACFormConfig) => {
  return (
    <>
      {formConfig.idFieldHint &&
        formConfig.idFieldHint.map((oneHint, index) => (
          <p key={index}>{oneHint.text}</p>
        ))}
    </>
  );
};

const describeErrors = (formConfig: OneMACFormConfig) => {
  return formConfig.idFormat ? (
    <>
      State Access Error:
      <br />
      {stateAccessMessage.statusMessage}
      <br />
      <br />
      ID Format Error:
      <br />
      {buildWrongFormatMessage(formConfig).statusMessage}
      {formConfig.idAdditionalErrorMessage &&
        formConfig.idAdditionalErrorMessage.map((message, index) => (
          <span key={index}>
            <br />
            {message}
          </span>
        ))}
      <br />
      <br />
      ID must {formConfig.idMustExist === false ? "not " : ""}exist Error:
      <br />
      {formConfig.idMustExist === false
        ? buildMustNotExistMessage(formConfig).statusMessage
        : buildMustExistMessage(formConfig).statusMessage}
    </>
  ) : (
    <>ID not editable.</>
  );
};

const DescribeField: React.FC<{
  fieldLabel: string;
  fieldName: string;
  appendText?: string;
  customFunc?: (formConfig: OneMACFormConfig) => JSX.Element;
}> = ({ fieldLabel, fieldName, appendText, customFunc }) => {
  return (
    <Review heading={fieldLabel + "s"}>
      <table className="form-describe">
        <thead>
          <tr>
            <th>Package Form</th>
            <th>{fieldLabel} Value</th>
          </tr>
        </thead>
        <tbody>
          {configList.map(
            (oneConfig: OneMACFormConfig | any, index: number) => {
              let displayValue: string | JSX.Element = "None";

              if (customFunc) displayValue = customFunc(oneConfig);
              else if (
                typeof oneConfig[fieldName] === "string" ||
                typeof oneConfig[fieldName] === "boolean"
              )
                displayValue =
                  oneConfig[fieldName] + (appendText ? appendText : "");
              else if (Array.isArray(oneConfig[fieldName]))
                displayValue = JSON.stringify(oneConfig[fieldName]);
              return (
                <tr key={index}>
                  <td>{oneConfig.pageTitle}</td>
                  <td>{displayValue}</td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </Review>
  );
};

/**
 * For easy viewing of the Form configuration values
 */
const DescribeForms: React.FC = () => {
  return (
    <>
      <PageTitleBar heading={"Describe Forms"} enableBackNav />
      <div className="form-container">
        <h2>Package View</h2>
        <p>
          NOTE: These are generated from application, so reflect the true
          values.
        </p>
        <section className="detail-section">
          {/* <DescribeField fieldLabel="Page Title" fieldName="pageTitle" />
          <DescribeField
            fieldLabel="Form Title"
            fieldName="detailsHeader"
            appendText=" Details"
          />
          <DescribeField fieldLabel="ID Label" fieldName="idLabel" />
          <DescribeField fieldLabel="ID Format Text" fieldName="idFormat" /> */}
          <DescribeField
            fieldLabel="ID Gray Text"
            fieldName="idFieldHint"
            customFunc={describeFieldHint}
          />
          <DescribeField fieldLabel="ID Blue Text" fieldName="junk" />
          <DescribeField
            fieldLabel="ID Red Text"
            fieldName="idMustExist"
            customFunc={describeErrors}
          />
          <DescribeField
            fieldLabel="Parent ID Gray Text"
            fieldName="parentFieldHint"
            customFunc={describeFieldHint}
          />
          <DescribeField
            fieldLabel="Red Parent Not Found Message"
            fieldName="parentNotFoundMessage"
          />

          {/* <DescribeField fieldLabel="FAQ Link" fieldName="idFAQLink" />
          <DescribeField
            fieldLabel="Form contains Proposed Effective Date field"
            fieldName="proposedEffectiveDate"
          />
          <DescribeField
            fieldLabel="Form Requires Confirmation"
            fieldName="confirmSubmit"
          /> */}
        </section>
        <hr />
        <h2>Submission View</h2>
        <p>
          NOTE: These are hand-entered and therefore may be out of date with the
          application.
        </p>
        <section className="detail-section">
          <Review heading="ID Gray Text Values">
            <table className="form-describe">
              <thead>
                <tr>
                  <th>Submission Form</th>
                  <th>ID Gray Text Values</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Submit New Medicaid SPA</td>
                  <td>
                    Must follow the format SS-YY-NNNN-xxxx
                    <br />
                    Reminder - CMS recommends that all SPA numbers start with
                    the year in which the package is submitted.
                  </td>
                </tr>
                <tr>
                  <td>Respond to Formal Medicaid SPA RAI</td>
                  <td>
                    Please use the exact Medicaid SPA ID sent with the RAI
                  </td>
                </tr>
                <tr>
                  <td>Submit New CHIP SPA</td>
                  <td>Must follow the format SS-YY-NNNN-xxxx</td>
                </tr>
                <tr>
                  <td>Respond to Formal CHIP SPA RAI</td>
                  <td>Please use the exact CHIP SPA ID sent with the RAI</td>
                </tr>
                <tr>
                  <td>Submit New 1915(b) Waiver Action</td>
                  <td>
                    Changes depending on selected Action Type
                    <br />
                    Default: Must follow the format required by the Action Type
                    <br />
                    New Waiver: Must be a new initial number with the format
                    SS-####.R00.00 or SS-#####.R00.00
                    <br />
                    Waiver Amendment: Must follow the format SS-####.R##.## or
                    SS-#####.R##.##
                    <br />
                    Request for waiver renewal: Must follow the format
                    SS-####.R##.00 or SS-#####.R##.00
                  </td>
                </tr>
                <tr>
                  <td>Request 1915(b) and 1915(c) Temporary Extension</td>
                  <td>
                    Must follow the format SS-####.R##.TE## or SS-#####.R##.TE##
                    (use R00 for waivers without renewals)
                  </td>
                </tr>
                <tr>
                  <td>Respond to Waiver RAI</td>
                  <td>
                    Please enter the waiver number for the RAI you are
                    responding to. Use a dash after the two character state
                    abbreviation.
                  </td>
                </tr>
                <tr>
                  <td>Submit 1915(c) Appendix K Amendment</td>
                  <td>
                    Must follow the format SS-####.R##.## or SS-#####.R##.##
                    (use R00 for waivers without renewals)
                  </td>
                </tr>
              </tbody>
            </table>
          </Review>
          <Review heading="ID Blue Text Values">
            <table className="form-describe">
              <thead>
                <tr>
                  <th>Submission Form</th>
                  <th>ID Blue Text Values</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Submit New Medicaid SPA</td>
                  <td>None</td>
                </tr>
                <tr>
                  <td>Respond to Formal Medicaid SPA RAI</td>
                  <td>
                    Medicaid SPA ID should exist warning:
                    <br />
                    {approvedBlueWarningMessage}
                  </td>
                </tr>
                <tr>
                  <td>Submit New CHIP SPA</td>
                  <td>None</td>
                </tr>
                <tr>
                  <td>Respond to Formal CHIP SPA RAI</td>
                  <td>
                    CHIP SPA ID should exist warning:
                    <br />
                    {approvedBlueWarningMessage}
                  </td>
                </tr>
                <tr>
                  <td>Submit New 1915(b) Waiver Action</td>
                  <td>
                    Changes depending on selected Action Type
                    <br />
                    Default: None
                    <br />
                    New Waiver: None
                    <br />
                    Waiver Amendment: If the "parent ID" (the first three
                    sections of the entered ID) is not found:
                    <br />
                    {approvedBlueWarningMessage}
                    <br />
                    Request for waiver renewal: If the "parent ID" (the first
                    two sections of the entered ID) is not found:
                    <br />
                    {approvedBlueWarningMessage}
                    <br />
                  </td>
                </tr>
                <tr>
                  <td>Request 1915(b) and 1915(c) Temporary Extension</td>
                  <td>None</td>
                </tr>
                <tr>
                  <td>Respond to Waiver RAI</td>
                  <td>None</td>
                </tr>
                <tr>
                  <td>Submit 1915(c) Appendix K Amendment</td>
                  <td>
                    If the "parent ID" (the first two sections of the entered
                    ID) is not found:
                    <br />
                    {approvedBlueWarningMessage}
                  </td>
                </tr>
              </tbody>
            </table>
          </Review>
          <Review heading="ID Red Text Values">
            <table className="form-describe">
              <thead>
                <tr>
                  <th>Submission Form</th>
                  <th>ID Red Text Values</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Submit New Medicaid SPA</td>
                  <td>
                    State Access Error:
                    <br />
                    You can only submit for a state you have access to. If you
                    need to add another state, visit your user profile to
                    request access.
                    <br />
                    <br />
                    ID format error:
                    <br />
                    The SPA ID must be in the format of SS-YY-NNNN or
                    SS-YY-NNNN-xxxx
                    <br />
                    <br />
                    ID must not exist:
                    <br />
                    According to our records, this SPA ID already exists. Please
                    check the SPA ID and try entering it again.
                  </td>
                </tr>
                <tr>
                  <td>Respond to Formal Medicaid SPA RAI</td>
                  <td>
                    State Access Error:
                    <br />
                    You can only submit for a state you have access to. If you
                    need to add another state, visit your user profile to
                    request access.
                    <br />
                    <br />
                  </td>
                </tr>
                <tr>
                  <td>Submit New CHIP SPA</td>
                  <td>
                    State Access Error:
                    <br />
                    You can only submit for a state you have access to. If you
                    need to add another state, visit your user profile to
                    request access.
                    <br />
                    <br />
                    ID format error:
                    <br />
                    The SPA ID must be in the format of SS-YY-NNNN or
                    SS-YY-NNNN-xxxx
                    <br />
                    <br />
                    ID must not exist:
                    <br />
                    According to our records, this SPA ID already exists. Please
                    check the SPA ID and try entering it again.
                  </td>
                </tr>
                <tr>
                  <td>Respond to Formal CHIP SPA RAI</td>
                  <td>
                    State Access Error:
                    <br />
                    You can only submit for a state you have access to. If you
                    need to add another state, visit your user profile to
                    request access.
                    <br />
                    <br />
                  </td>
                </tr>
                <tr>
                  <td>Submit New 1915(b) Waiver Action</td>
                  <td>
                    State Access Error:
                    <br />
                    You can only submit for a state you have access to. If you
                    need to add another state, visit your user profile to
                    request access.
                    <br />
                    <br />
                    ID format error:
                    <br />
                    Changes depending on selected Action Type
                    <br />
                    Default: The Waiver Number must be in the format of the
                    Action Type. Please select an Action Type first.
                    <br />
                    New Waiver: The Waiver Number must be in the format of
                    SS-####.R00.00 or SS-#####.R00.00
                    <br />
                    Waiver Amendment: The Waiver Number must be in the format of
                    SS-####.R##.## or SS-#####.R##.##
                    <br />
                    For amendments, the last two digits start with “01” and
                    ascends.
                    <br />
                    Request for waiver renewal: The Waiver Number must be in the
                    format of SS-####.R##.00 or SS-#####.R##.00
                    <br />
                    <br />
                    ID existence errors:
                    <br />
                    Changes depending on selected Action Type
                    <br />
                    Default: None
                    <br />
                    New Waiver: ID must NOT exist error: According to our
                    records, this Waiver Number already exists. Please check the
                    Waiver Number and try entering it again.
                    <br />
                    Waiver Amendment: ID must NOT exist error: According to our
                    records, this Waiver Number already exists. Please check the
                    Waiver Number and try entering it again.
                    <br />
                    Request for waiver renewal: ID must NOT exist error:
                    According to our records, this Waiver Number already exists.
                    Please check the Waiver Number and try entering it again.
                    <br />
                  </td>
                </tr>
                <tr>
                  <td>Request 1915(b) and 1915(c) Temporary Extension</td>
                  <td>
                    State Access Error:
                    <br />
                    You can only submit for a state you have access to. If you
                    need to add another state, visit your user profile to
                    request access.
                    <br />
                    <br />
                    ID format error:
                    <br />
                    The Temporary Extension Request Number must be in the format
                    of SS-####.R##.TE## or SS-#####.R##.TE##
                    <br />
                    <br />
                    ID must not exist:
                    <br />
                    According to our records, this Temporary Extension Request
                    Number already exists. Please check the Temporary Extension
                    Request Number and try entering it again.
                  </td>
                </tr>
                <tr>
                  <td>Respond to Waiver RAI</td>
                  <td>
                    State Access Error:
                    <br />
                    You can only submit for a state you have access to. If you
                    need to add another state, visit your user profile to
                    request access.
                    <br />
                    <br />
                    ID must exist:
                    <br />
                    The waiver number entered does not appear to match our
                    records. Please enter the waiver number sent with the RAI,
                    using a dash after the two character state abbreviation.
                  </td>
                </tr>
                <tr>
                  <td>Submit 1915(c) Appendix K Amendment</td>
                  <td>
                    State Access Error:
                    <br />
                    You can only submit for a state you have access to. If you
                    need to add another state, visit your user profile to
                    request access.
                    <br />
                    <br />
                    ID format error:
                    <br />
                    The Waiver Number must be in the format of SS-####.R##.## or
                    SS-#####.R##.##
                    <br />
                    For amendments, the last two digits start with “01” and
                    ascends.
                  </td>
                </tr>
              </tbody>
            </table>
          </Review>
          <Review heading="Parent ID Messaging">
            <table className="form-describe">
              <thead>
                <tr>
                  <th>Submission Form</th>
                  <th>Parent ID Messaging Values</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Submit New Medicaid SPA</td>
                  <td>No Parent ID on form.</td>
                </tr>
                <tr>
                  <td>Respond to Formal Medicaid SPA RAI</td>
                  <td>No Parent ID on form.</td>
                </tr>
                <tr>
                  <td>Submit New CHIP SPA</td>
                  <td>No Parent ID on form.</td>
                </tr>
                <tr>
                  <td>Respond to Formal CHIP SPA RAI</td>
                  <td>No Parent ID on form.</td>
                </tr>
                <tr>
                  <td>Submit New 1915(b) Waiver Action</td>
                  <td>No Parent ID on form.</td>
                </tr>
                <tr>
                  <td>Request 1915(b) and 1915(c) Temporary Extension</td>
                  <td>
                    Gray text:
                    <br />
                    Please enter the initial or renewal waiver number you are
                    requesting a Temporary Extension for
                    <br />
                    <br />
                    Blue text: None
                    <br />
                    <br />
                    Red text:
                    <br />
                    ID must exist:
                    <br />
                    The waiver number entered does not appear to match our
                    records. Please enter an approved initial or renewal waiver
                    number, using a dash after the two character state
                    abbreviation.
                  </td>
                </tr>
                <tr>
                  <td>Respond to Waiver RAI</td>
                  <td>No Parent ID on form.</td>
                </tr>
                <tr>
                  <td>Submit 1915(c) Appendix K Amendment</td>
                  <td>No Parent ID on form.</td>
                </tr>
              </tbody>
            </table>
          </Review>
        </section>
      </div>
    </>
  );
};

export default DescribeForms;
