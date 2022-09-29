import React from "react";
import { Review } from "@cmsgov/design-system";

import { OneMACFormConfig } from "../libs/formLib";
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

const DescribeField: React.FC<{ fieldLabel: string; fieldName: string }> = ({
  fieldLabel,
  fieldName,
}) => {
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
  return (
    <Review heading={fieldLabel + "s"}>
      <table className="form-describe">
        <th>Form</th>
        <th>{fieldLabel} Value</th>
        {configList.map((oneConfig: OneMACFormConfig | any, index: number) => {
          // const fieldValue = oneConfig[fieldName] || "None"
          return (
            <tr key={index}>
              <td>{oneConfig.typeLabel}</td>
              <td>{oneConfig[fieldName] || "None"}</td>
            </tr>
          );
        })}
      </table>
    </Review>
  );
};

/**
 * For easy viewing of the Form configuration values
 */
const DescribeForms: React.FC = () => {
  const formConfig = medicaidSpaFormInfo;
  return (
    <>
      <PageTitleBar heading={"Describe Package View Forms"} enableBackNav />
      <div className="onemac-form">
        <section className="detail-section">
          <DescribeField fieldLabel="ID Label" fieldName="idLabel" />
          <DescribeField fieldLabel="ID Format Text" fieldName="idFormat" />
          {/* <DescribeField fieldLabel="ID FieldHint" fieldName="idFieldHint" /> */}
          <DescribeField fieldLabel="FAQ Link" fieldName="idFAQLink" />
          <DescribeField
            fieldLabel="Form Requires Confirmation"
            fieldName="confirmSubmit"
          />
          <hr />
          <p>{JSON.stringify(formConfig)}</p>
        </section>
      </div>
    </>
  );
};

export default DescribeForms;
