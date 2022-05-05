import { DateTime } from "luxon";
import { Workflow } from "cmscommonlib";

import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import newSubmission from "./utils/newSubmission";

import { validateSubmission } from "./form/validateSubmission";
import { chipSPAFormConfig } from "./form/submitCHIPSPA";
import { baseWaiverFormConfig } from "./form/submitBaseWaiver";
import { waiverTemporaryExtensionFormConfig } from "./form/submitWaiverExtension";
// waiverTemporaryExtension,
// waiverRenewal,
// waiverAmendment,
// waiverAppendixK,
// waiverRAIResponse,
// medicaidSPA,
// medicaidSPARAIResponse,
// chipSPA,
// chipSPARAIResponse,

/**
 * Perform data conversions
 */

const NEW_CONFIG = {
  [Workflow.ONEMAC_TYPE.CHIP_SPA]: chipSPAFormConfig,
  // [Workflow.ONEMAC_TYPE.CHIP_SPA_RAI]: chipSPARAIResponse,
  // [Workflow.ONEMAC_TYPE.SPA]: medicaidSPA,
  // [Workflow.ONEMAC_TYPE.SPA_RAI]: medicaidSPARAIResponse,
  [Workflow.ONEMAC_TYPE.WAIVER]: baseWaiverFormConfig,
  [Workflow.ONEMAC_TYPE.WAIVER_BASE]: baseWaiverFormConfig,
  // [Workflow.ONEMAC_TYPE.WAIVER_RENEWAL]: waiverRenewal,
  // [Workflow.ONEMAC_TYPE.WAIVER_APP_K]: waiverAppendixK,
  [Workflow.ONEMAC_TYPE.WAIVER_EXTENSION]: waiverTemporaryExtensionFormConfig,
  // [Workflow.ONEMAC_TYPE.WAIVER_AMENDMENT]: waiverAmendment,
  // [Workflow.ONEMAC_TYPE.WAIVER_RAI]: waiverRAIResponse,
};

export const main = handler(async (event) => {
  console.log("Convert was called with event: ", event);
  // scan changeRequest table
  const params = {
    TableName: process.env.tableName,
    ExclusiveStartKey: null,
  };

  do {
    const results = await dynamoDb.scan(params);
    let i = 0;
    for (const item of results.Items) {
      console.log("Item " + i + " is: ", item);

      if (item.type === "waiver") {
        item.type += item.actionType; // change-request items use type="waiver" and actionType to differentiate the components
        item.transmittalNumber += ".R00.00"; // change-request item Base Waiver Numbers do not have .R00.00
        item.proposedEffectiveDate = "none"; // original waiver forms did not capture proposedEffectiveDate
      }
      // if (item.type != Workflow.ONEMAC_TYPE.WAIVER_BASE && item.type != Workflow.ONEMAC_TYPE.WAIVER) continue;
      const config = NEW_CONFIG[item.type];
      if (!config) continue;
      //console.log("config is: ", config);
      //console.log("base waiver form config is: ", baseWaiverFormConfig);

      const data = {
        componentId: item.transmittalNumber,
        territory: item.territory,
        attachments: item.uploads,
        additionalInformation: item.summary,
        submissionId: item.id, // not sure we need this anymore
        submitterName: `${item.user.firstName} ${item.user.lastName}`,
        submitterEmail: item.user.email,
        submitterId: item.user.id, // not sure we want this anymore
      };
      if (item.proposedEffectiveDate)
        data.proposedEffectiveDate = item.proposedEffectiveDate;
      if (item.waiverAuthority) data.waiverAuthority = item.waiverAuthority;

      // validating returns null if valid, the error if not
      if (!validateSubmission(data, config)) {
        console.log("data validated for config: ", config.type);
      } else {
        console.log("not validated??");
        continue;
      }

      // these fields are added BY submit, so will fail validation
      data.submissionTimestamp = item.submittedAt;
      data.currentStatus = Workflow.ONEMAC_STATUS.SUBMITTED;
      data.clockEndTimestamp = DateTime.fromMillis(data.submissionTimestamp)
        .setZone("America/New_York")
        .plus({ days: 90 })
        .toMillis();

      await newSubmission(data, config);

      if (i++ > 1000) break;
    }

    console.log("results number: ", results.Items.length);
    params.ExclusiveStartKey = results.LastEvaluatedKey;
  } while (params.ExclusiveStartKey);

  return "Done";
});
