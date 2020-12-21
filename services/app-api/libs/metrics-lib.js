
/**
 * Transforms DynamoDB Scan into Metrics .
 * @param {Object} json dynamodb scan data
 */
export function generateMetrics(scanData) {

    let submissions = 0
    let stateMap = new Map()
    let userMap = new Map()
    let submissionTypeMap = new Map();
    scanData.filter(function(item){
        submissions = submissions + 1;
        let stateCode = item.transmittalNumber.substring(0,2)
        stateMap[stateCode] = 1 + (stateMap[stateCode] === undefined ? 0: stateMap[stateCode])
        userMap[item.user.email] = 1 + (userMap[item.user.email] === undefined ? 0: userMap[item.user.email] )
        submissionTypeMap[item.type] = 1 + (submissionTypeMap[item.type] === undefined ? 0: submissionTypeMap[item.type])
        return true;
    });

    var result =  {}
    result["totalSubmissiona"] = submissions
    result["totalUniqueUserSubmissions"] = Object.keys(userMap).length
    Object.keys(stateMap).forEach(function(key) {
        result["totalForTerritory-" +  key] = stateMap[key]
    })

    Object.keys(submissionTypeMap).forEach(function(key) {
        result["totalForSubmissionType-(" +  key + ")"] = submissionTypeMap[key]
    })

    return result
}
