console.log("Loading processEmailEvents");

export const main = async (event, context, callback) => {
  console.log("Received email event:", JSON.stringify(event, null, 4));

  var message = event.Records[0].Sns.Message;
  console.log("Message received from SNS:", message);
  callback(null, "Success");
};
