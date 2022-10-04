import React from "react";
import { Review } from "@cmsgov/design-system";

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
import { initialWaiverFormInfo } from "./initial-waiver/InitialWaiverForm";
import { waiverRenewalFormInfo } from "./waiver-renewal/WaiverRenewalForm";
import { waiverAmendmentFormInfo } from "./waiver-amendment/WaiverAmendmentForm";
import { waiverRAIFormInfo } from "./waiver-rai/WaiverRAIForm";
import { waiverAppendixKFormInfo } from "./waiver-appendix-k/WaiverAppendixKForm";
import { waiverAppendixKRAIFormInfo } from "./waiver-appendix-k/WaiverAppendixKRAIForm";
import { temporaryExtensionFormInfo } from "./temporary-extension/TemporaryExtensionForm";

const configList: OneMACFormConfig[] | any = [
  { ...medicaidSpaFormInfo },
  { ...medicaidSPARAIFormInfo },
  { ...chipSpaFormInfo },
  { ...chipSPARAIFormInfo },
  { ...initialWaiverFormInfo },
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
      {formConfig.idFieldHint.map((oneHint, index) => (
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
            <th>Form</th>
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
                  <td>{oneConfig.typeLabel}</td>
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
      <PageTitleBar heading={"Describe Package View Forms"} enableBackNav />
      <div className="onemac-form">
        {/* <section className="detail-section">
          <h3>Medicaid SPA Form</h3>
          <h4>ID Label: {medicaidSpaFormInfo.idLabel}</h4>
          <p></p>
        </section>
        <hr/> */}
        <section className="detail-section">
          <DescribeField fieldLabel="Page Title" fieldName="pageTitle" />
          <DescribeField
            fieldLabel="Form Title"
            fieldName="detailsHeader"
            appendText=" Details"
          />
          <DescribeField fieldLabel="ID Label" fieldName="idLabel" />
          <DescribeField fieldLabel="ID Format Text" fieldName="idFormat" />
          <DescribeField
            fieldLabel="ID Gray Text"
            fieldName="idFieldHint"
            customFunc={describeFieldHint}
          />
          <DescribeField fieldLabel="ID Blue Text" fieldName="junk" />
          <DescribeField
            fieldLabel="ID Red Text"
            fieldName="idExistValidations"
            customFunc={describeErrors}
          />
          <DescribeField fieldLabel="FAQ Link" fieldName="idFAQLink" />
          <DescribeField
            fieldLabel="Form contains Proposed Effective Date field"
            fieldName="proposedEffectiveDate"
          />
          <DescribeField
            fieldLabel="Form Requires Confirmation"
            fieldName="confirmSubmit"
          />
        </section>
      </div>
    </>
  );
};

export default DescribeForms;
