import React, { FC } from "react";
import DetailView from "../DetailView";
import {
  OneMACDetail,
  defaultDetail,
  submissionDateDefault,
  AttributeDetail,
  latestActivityDefault,
} from "../../libs/detailLib";
import { waiverTemporaryExtension } from "cmscommonlib";

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
  show90thDayInfo: false,
  showReviewTeam: false,
  detailSection: [
    componentIdDetail,
    parentIdDetail,
    temporaryExtensionTypeDetail,
    submissionDateDefault,
    latestActivityDefault,
  ],
};

const WaiverTemporaryExtensionDetail: FC = () => {
  return <DetailView pageConfig={waiverTemporaryExtensionDetail} />;
};

export default WaiverTemporaryExtensionDetail;
