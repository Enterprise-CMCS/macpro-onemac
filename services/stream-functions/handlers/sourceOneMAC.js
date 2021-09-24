import KafkaSourceLib from "../../../libs/kafka-source-lib";

class SourceOneMAC extends KafkaSourceLib {
  topicPrefix = "aws.onemac.cdc";
  version = "v0";
  tables = [
    "updates"
  ];
}

const sourceOneMAC = new SourceOneMAC();

exports.handler = sourceOneMAC.handler.bind(sourceOneMAC);