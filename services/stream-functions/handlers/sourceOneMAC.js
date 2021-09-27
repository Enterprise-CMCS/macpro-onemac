import KafkaSourceLib from "../../../libs/kafka-source-lib";

class SourceOneMAC extends KafkaSourceLib {
  topicPrefix = "aws.onemac.cdc";
  version = "v0";
  tables = [
    "updates"
  ];

  createPayload(record) {
    return record;
  }

  createOutboundEvents(inRecords) {
    const records = [];
    
    inRecords.forEach( (dbAction) => {
      if (dbAction.eventName === "INSERT") {
        const oneMACSubmission = dbAction.dynamodb.NewImage;
        if (oneMACSubmission.sk === "SEATool")
          console.log("sourceOneMAC! that submission came from SEA Tool, don't send back: ", oneMACSubmission);
        else {
          console.log("sourceOneMAC! New oneMAC Record inserted?? ", JSON.stringify(oneMACSubmission, null, 2));
          const toPublish = {
            PackageID: oneMACSubmission.pk,
            PackageStatus: oneMACSubmission.componentStatus,
            PackageType: oneMACSubmission.componentType,
            Territory: oneMACSubmission.territory,
            SubmissionTimestamp: oneMACSubmission.submissionTimestamp,
            SubmitterName: oneMACSubmission.submitterName,
            SubmitterEmail: oneMACSubmission.submitterEmail,
            AdditionalInformation: oneMACSubmission.AdditionalInformation,
          }
          records.push({value: JSON.stringify(toPublish)});
        }
      }
    });
    return super.createOutboundEvents(records);
  }
}

const sourceOneMAC = new SourceOneMAC();

exports.handler = sourceOneMAC.handler.bind(sourceOneMAC);