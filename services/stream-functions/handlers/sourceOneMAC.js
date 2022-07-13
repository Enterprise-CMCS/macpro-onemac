//import { join } from "lodash";
import KafkaSourceLib from "../libs/kafka-source-lib";

const staticTopic = "aws.onemac.updates.cdc.one";

const filterDetails = (inRecord) => {
  const filteredRecord = {
    NewImage: {
    additionalInformation: inRecord.NewImage.additionalInformation,
    componentType: inRecord.NewImage.componentType,
    attachments: inRecord.NewImage.attachments,
    componentId: inRecord.NewImage.componentId,
    currentStatus: inRecord.NewImage.currentStatus,
    submissionTimestamp: inRecord.NewImage.submissionTimestamp,
    proposedEffectiveDate: inRecord.NewImage.proposedEffectiveDate,
    submitterName: inRecord.NewImage.submitterName,
    submitterEmail: inRecord.NewImage.submitterEmail
    },
    OldImage: {},
    Keys: inRecord.Keys,
  };

  return JSON.stringify(filteredRecord);
};

class SourceOneMAC extends KafkaSourceLib {

  determineTopicName(record) {
    const recordDetails = JSON.parse(record.value);
    const isNewMedicaidSPA = (recordDetails.NewImage.sk === "v0#medicaidspa");

    if (record.headers.eventName === "INSERT" && isNewMedicaidSPA) {
      record.value = filterDetails(recordDetails);
      console.log("Sending: ", record.value);
      console.log("would be sent to: ", staticTopic);
      return staticTopic;
    } else {
      console.log("Record Details being ignored: ", recordDetails);
    }

    //if (record.headers.eventName === "INSERT" && skSlice !== "SEATool") return staticTopic;
    return null;
  }
}

const sourceOneMAC = new SourceOneMAC();

exports.handler = sourceOneMAC.handler.bind(sourceOneMAC);