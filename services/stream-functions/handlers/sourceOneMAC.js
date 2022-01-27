import KafkaSourceLib from "../libs/kafka-source-lib";

const staticTopic = "aws.onemac.updates.cdc.one";

class SourceOneMAC extends KafkaSourceLib {

  determineTopicName(record) {
    const recordDetails = JSON.parse(record.value);
    const skSlice = JSON.stringify(recordDetails.NewImage.sk).slice(0,7);
    if (record.headers.eventName === "INSERT" && skSlice !== "SEATool") return staticTopic;
    return null;
  }
}

const sourceOneMAC = new SourceOneMAC();

exports.handler = sourceOneMAC.handler.bind(sourceOneMAC);