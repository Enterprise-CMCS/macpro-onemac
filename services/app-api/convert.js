import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

// import {
//   baseWaiver,
//   waiverTemporaryExtension,
//   waiverRenewal,
//   waiverAmendment,
//   waiverAppendixK,
//   waiverRAIResponse,
//   medicaidSPA,
//   medicaidSPARAIResponse,
//   chipSPA,
//   chipSPARAIResponse,
// } from "cmscommonlib";

/**
 * Perform data conversions
 */

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
      console.log("Item is: ", item);
      if (i++ > 10) break;
    }

    console.log("results number: ", results.Items.length);
    params.ExclusiveStartKey = results.LastEvaluatedKey;
  } while (params.ExclusiveStartKey);

  return "Done";
});
