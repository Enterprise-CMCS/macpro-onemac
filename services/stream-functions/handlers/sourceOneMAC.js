import KafkaSourceLib from "../libs/kafka-source-lib";

class SourceOneMAC extends KafkaSourceLib {
  topicPrefix = "aws.submission_portal.submissions.cdc.";
  version = "v0";
  tables = [
    process.env.oneMacTableName
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
          records.push(dbAction);
        }
      }
    });
    return super.createOutboundEvents(records);
  }
}

const sourceOneMAC = new SourceOneMAC();

exports.handler = sourceOneMAC.handler.bind(sourceOneMAC);