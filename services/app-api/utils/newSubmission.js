import { ChangeRequest } from "cmscommonlib";

import dynamoDb from "../libs/dynamodb-lib";
import updatePackage from "./updatePackage";

const getBaseWaiverId = (inId) => {
  console.log(
    "regex is: ",
    ChangeRequest.CONFIG[ChangeRequest.TYPE.WAIVER].newTransmittalNumber.idRegex
  );
  //const baseRE = new RegExp(ChangeRequest.CONFIG[ChangeRequest.TYPE.WAIVER].newTransmittalNumber.idRegex);
  const baseRE = new RegExp("^[A-Z]{2}[.][0-9]{4,5}");
  // SEA Tool sometimes uses hyphens in Waiver Numbers
  if (inId[2] === "-") inId[2] = ".";
  console.log("id is: ", inId);
  console.log(baseRE.exec(inId));
  return baseRE.exec(inId)[0];
};

const decodeId = (inId, inType) => {
  const returnInfo = {
    packageId: inId,
    parentType: "spa",
    componentId: inId,
    componentType: inType,
    isNewPackage: true,
  };
  switch (inType) {
    case ChangeRequest.TYPE.WAIVER_RAI:
      returnInfo.parentType = "waivernew";
    // falls through
    case ChangeRequest.TYPE.CHIP_SPA_RAI:
    case ChangeRequest.TYPE.SPA_RAI:
      returnInfo.componentType = "RAIResponse";
      returnInfo.isNewPackage = false;
      break;
    case ChangeRequest.TYPE.WAIVER_NEW:
    case ChangeRequest.TYPE.WAIVER_AMENDMENT:
    case ChangeRequest.TYPE.WAIVER_RENEWAL:
      returnInfo.packageId = getBaseWaiverId(inId);
      returnInfo.parentType = "waivernew";
      returnInfo.isNewPackage =
        returnInfo.packageId.length === returnInfo.componentId.length;
      break;
    case ChangeRequest.TYPE.WAIVER_EXTENSION:
      returnInfo.parentType = "waivernew";
      returnInfo.isNewPackage = false;
      break;
  }
  return returnInfo;
};

export default async function newSubmission(inData) {
  const idInfo = decodeId(inData.transmittalNumber, inData.submissionType);

  const data = {
    pk: idInfo.componentId,
    sk: idInfo.componentType,
    packageId: idInfo.packageId,
    componentId: idInfo.componentId,
    componentType: idInfo.componentType,
    currentStatus: "Submitted",
    submissionTimestamp: inData.submissionTimestamp,
    submissionId: inData.submissionId,
    submitterId: inData.submitterId,
    submitterName: inData.submitterName,
    submitterEmail: inData.submitterEmail,
    attachments: inData.attachments,
    additionalInformation: inData.additionalInformation,
  };

  if (inData.waiverAuthority) data.waiverAuthority = inData.waiverAuthority;

  // use the scarce index for anything marked as a package.
  if (idInfo.isNewPackage) {
    data.GSI1pk = "OneMAC";
    data.GSI1sk = data.pk;
  } else {
    data.sk += `#${inData.submissionTimestamp}`;
  }

  const params = {
    TableName: process.env.oneMacTableName,
    Item: data,
  };

  console.log("params is: ", params);
  return dynamoDb
    .put(params)
    .then(() => {
      if (!idInfo.isNewPackage) {
        data.currentStatus = `${data.componentType} Submitted`;
        data.parentType = idInfo.parentType;
        return updatePackage(data);
      } else {
        return "Compnent is a Package.";
      }
    })
    .catch((error) => {
      console.log("newSubmission put error is: ", error);
      throw error;
    });
}
