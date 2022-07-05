import React, { FC } from "react";
import DetailView from "../DetailView";
import {
  OneMACDetail,
  defaultDetail,
  typeDefault,
  submissionDateDefault,
  AttributeDetail,
} from "../../libs/detailLib";
import { Workflow, waiverTemporaryExtension } from "cmscommonlib";

const parentIdDetail: AttributeDetail = {
  heading: "Parent Waiver Number",
  fieldName: "parentId",
  default: null,
};

export const waiverTemporaryExtensionDetail: OneMACDetail = {
  ...defaultDetail,
  ...waiverTemporaryExtension,
  detailHeader: "Temporary Extension",
  navItems: [],
  usesVerticalNav: false,
  actionsByStatus: Workflow.waiverExtensionActionsByStatus,
  show90thDayInfo: false,
  detailSection: [parentIdDetail, typeDefault, submissionDateDefault],
};

const WaiverTemporaryExtensionDetail: FC = () => {
  return <DetailView pageConfig={waiverTemporaryExtensionDetail} />;
};

export default WaiverTemporaryExtensionDetail;
