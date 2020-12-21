/**
 * Transforms DynamoDB Scan into Metrics .
 * @param {Object} json dynamodb scan data
 */

export function generateMetrics(scanData) {

    let submissions = 0;
    let stateMap = new Map();
    let userMap = new Map();
    let submissionTypeMap = new Map();
    scanData.filter(function (item) {
        submissions = submissions + 1;
        let stateCode = item.transmittalNumber.substring(0, 2);
        stateMap[stateCode] = 1 + (stateMap[stateCode] === undefined ? 0 : stateMap[stateCode]);
        userMap[item.user.email] = 1 + (userMap[item.user.email] === undefined ? 0 : userMap[item.user.email]);
        submissionTypeMap[item.type] = 1 + (submissionTypeMap[item.type] === undefined ? 0 : submissionTypeMap[item.type]);
        return true;
    });

    var result = {};
    result["totalSubmissions"] = submissions;
    result["totalUniqueUserSubmissions"] = Object.keys(userMap).length;
    var stateTotals = [];
    Object.keys(stateMap).forEach(function (stateCode) {
        let temp = "{"  + stateCode + ":"  + stateMap[stateCode] +  "}";
        stateTotals.push(temp);
    });
    result["stateTotals"] = stateTotals;

    var typeTotals = [];
    Object.keys(submissionTypeMap).forEach(function (type) {
        let temp = "{" + type + ":" + submissionTypeMap[type] + "}";
        typeTotals.push(temp);
    });
    result["submissionTypeTotals"] = typeTotals;

    return result;
}
