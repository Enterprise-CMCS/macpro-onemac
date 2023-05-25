import React, { FC } from "react";
import DetailView from "../DetailView";
import {
  OneMACDetail,
  defaultDetail,
  submissionDateDefault,
  AttributeDetail,
} from "../../libs/detailLib";
import { Workflow, waiverTemporaryExtension } from "cmscommonlib";

const parentIdDetail: AttributeDetail = {
  heading: "Approved Initial or Renewal Number",
  fieldName: "parentId",
  default: null,
};

const componentIdDetail: AttributeDetail = {
  heading: "Temporary Extension Request Number",
  fieldName: "componentId",
  default: "N/A",
};

const temporaryExtensionTypeDetail: AttributeDetail = {
  heading: "Temporary Extension Type",
  fieldName: "temporaryExtensionTypeNice",
  default: "N/A",
};

export const waiverTemporaryExtensionDetail: OneMACDetail = {
  ...defaultDetail,
  ...waiverTemporaryExtension,
  detailHeader: "Temporary Extension Request",
  actionsByStatus: Workflow.waiverExtensionActionsByStatus,
  show90thDayInfo: false,
  showReviewTeam: false,
  detailSection: [
    componentIdDetail,
    parentIdDetail,
    temporaryExtensionTypeDetail,
    submissionDateDefault,
  ],
};

const WaiverTemporaryExtensionDetail: FC = () => {
  return <DetailView pageConfig={waiverTemporaryExtensionDetail} />;
};

export default WaiverTemporaryExtensionDetail;
