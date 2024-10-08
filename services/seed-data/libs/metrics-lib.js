/**
 * Transforms DynamoDB Scan into Metrics .
 * @param {Object} json dynamodb scan data
 */

export function generateMetrics(scanData) {
  let submissions = 0;
  const stateMap = new Map();
  const userMap = new Map();
  const submissionTypeMap = new Map();
  scanData.filter(function (item) {
    submissions = submissions + 1;
    const stateCode = item.transmittalNumber.substring(0, 2);
    stateMap[stateCode] =
      1 + (stateMap[stateCode] === undefined ? 0 : stateMap[stateCode]);
    userMap[item.user.email] =
      1 +
      (userMap[item.user.email] === undefined ? 0 : userMap[item.user.email]);
    submissionTypeMap[item.type] =
      1 +
      (submissionTypeMap[item.type] === undefined
        ? 0
        : submissionTypeMap[item.type]);
    return true;
  });

  const result = {};
  result["totalSubmissions"] = submissions;
  result["totalUniqueUserSubmissions"] = Object.keys(userMap).length;
  const stateTotals = [];
  Object.keys(stateMap).forEach(function (stateCode) {
    const temp = " { '" + stateCode + "' : '" + stateMap[stateCode] + "' } ";
    stateTotals.push(temp);
  });
  result["stateTotals"] = stateTotals;

  const typeTotals = [];
  Object.keys(submissionTypeMap).forEach(function (type) {
    const temp = " { '" + type + "' : '" + submissionTypeMap[type] + "' } ";
    typeTotals.push(temp);
  });
  result["submissionTypeTotals"] = typeTotals;

  return result;
}
