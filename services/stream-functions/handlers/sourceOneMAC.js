import KafkaSourceLib from "../../../libs/kafka-source-lib";

class SourceOneMAC extends KafkaSourceLib {
  topicPrefix = "aws.onemac.cdc";
  version = "v0";
  tables = [
    "updates"
  ];

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
            SubmitterName: oneMACSubmission.submitterName,
            SubmitterEmail: oneMACSubmission.submitterEmail,
            PackageType: ONEMAC_SUBMISSION_TYPE[oneMACSubmission.componentType],
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