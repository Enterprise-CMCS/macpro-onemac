import KafkaSourceLib from "../libs/kafka-source-lib";

class SourceOneMAC extends KafkaSourceLib {
  staticTopic = "aws.submission_portal.submissions.cdc.submission";

  shouldPayloadBeSent(payload) {
    
    if (payload.eventName === "INSERT") {
      if (payload.dynamodb.NewImage.sk === "SEATool") {
          console.log("sourceOneMAC! that submission came from SEA Tool, don't send back: ", payload);
          return false;
      } else {
          console.log("sourceOneMAC! New oneMAC Record inserted?? ", JSON.stringify(payload, null, 2));
        }
    }
    return super.shouldPayloadBeSent(payload);
  }
}

const sourceOneMAC = new SourceOneMAC();

exports.handler = sourceOneMAC.handler.bind(sourceOneMAC);