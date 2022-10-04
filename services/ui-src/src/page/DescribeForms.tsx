import React from "react";
import { Review } from "@cmsgov/design-system";

import { FieldHint, IdValidation } from "cmscommonlib";

import { OneMACFormConfig } from "../libs/formLib";
import PageTitleBar from "../components/PageTitleBar";

import {
  stateAccessError,
  buildMustExistMessage,
  buildMustNotExistMessage,
} from "./OneMACForm";

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

const describeFieldHint = (inFieldHintArray: FieldHint[]) => {
  return (
    <>
      {inFieldHintArray.map((oneHint, index) => (
        <p key={index}>{oneHint.text}</p>
      ))}
    </>
  );
};

const describeErrors = (
  validationList: IdValidation[],
  idLabel: string | undefined
) => {
  const newLabel = idLabel ?? "ID";
  return (
    <>
      <p>
        State Access Error:
        <br />
        {stateAccessError.statusMessage}
      </p>
      {validationList.map(
        (oneCheck, index) =>
          oneCheck.errorLevel === "error" && (
            <>
              <p key={index}>
                ID must {!oneCheck.idMustExist ? "not " : ""}exist Error:
                <br />
                {!oneCheck.idMustExist
                  ? buildMustNotExistMessage(newLabel)
                  : buildMustExistMessage(newLabel)}
              </p>
            </>
          )
      )}
    </>
  );
};

const DescribeField: React.FC<{
  fieldLabel: string;
  fieldName: string;
  appendText?: string;
  customFunc?: (inVar: FieldHint[] | any, varTwo?: string) => JSX.Element;
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

              if (customFunc)
                displayValue = customFunc(
                  oneConfig[fieldName],
                  oneConfig.idLabel
                );
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
