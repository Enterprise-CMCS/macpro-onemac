import KafkaSourceLib from "../libs/kafka-source-lib";

const staticTopic = "aws.submission_portal.submissions.cdc.submission";

class SourceOneMAC extends KafkaSourceLib {

  determineTopicName(record) {
    if (record.eventName === "INSERT" && record.dynamodb.NewImage.sk !== "SEATool") 
      return staticTopic;
    return null;
  }

}

const sourceOneMAC = new SourceOneMAC();

exports.handler = sourceOneMAC.handler.bind(sourceOneMAC);