console.log("Loading sendToSNS");

export const main = async (event, context, callback) => {
  console.log("Received event:", JSON.stringify(event, null, 4));

  // var message = event.Records[0].Sns.Message;
  // console.log('Message received from SNS:', message);
  callback(null, "Success");
};
