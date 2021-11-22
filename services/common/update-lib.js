export const decodeId = (inId, inType) => {
  const returnInfo = {
    packageId: inId,
    parentType: TYPE.SPA,
    componentId: inId,
    componentType: inType,
    isNewPackage: true,
  };
  switch (inType) {
    case TYPE.WAIVER_RAI:
      returnInfo.parentType = TYPE.WAIVER_BASE;
    // falls through
    case TYPE.CHIP_SPA_RAI:
      if (inType === TYPE.CHIP_SPA_RAI) returnInfo.parentType = TYPE.CHIP_SPA;
    // falls through
    case TYPE.SPA_RAI:
      returnInfo.isNewPackage = false;
      break;
    case TYPE.WAIVER_AMENDMENT:
    case TYPE.WAIVER_RENEWAL:
    case TYPE.WAIVER_EXTENSION:
    case TYPE.WAIVER_APP_K:
      returnInfo.packageId = getBaseWaiverId(inId);
      returnInfo.isNewPackage = false;
    // falls through
    case TYPE.WAIVER:
    case TYPE.WAIVER_BASE:
      returnInfo.parentType = TYPE.WAIVER_BASE;
      break;
  }
  return returnInfo;
};

export const getUpdateParams = (inData, topLevelUpdates = []) => {
  const idInfo = decodeId(inData.componentId, inData.componentType);

  const updateParams = {
    TableName: process.env.oneMacTableName,
    Key: {
      pk: idInfo.componentId,
      sk: idInfo.componentType,
    },
    ConditionExpression: "pk = :pkVal AND sk = :skVal",
    UpdateExpression:
      "SET changeHistory = list_append(:newChange, if_not_exists(changeHistory, :emptyList))",
    ExpressionAttributeValues: {
      ":pkVal": inData.pk,
      ":skVal": inData.sk,
      ":newChange": [inData],
      ":emptyList": [],
    },
  };

  topLevelUpdates[topic].forEach((attributeName) => {
    if (inData[attributeName]) {
      const newLabel = `:new${attributeName}`;
      updateParams.ExpressionAttributeValues[newLabel] = inData[attributeName];
      if (Array.isArray(inData[attributeName]))
        updateParams.UpdateExpression += `, ${attributeName} = list_append(if_not_exists(${attributeName},:emptyList), ${newLabel})`;
      else updateParams.UpdateExpression += `, ${attributeName} = ${newLabel}`;
    }
  });

  return updateParams;
};
