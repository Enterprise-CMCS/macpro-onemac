import handler from "./libs/handler-lib";
import idExists from "./changeRequest/changeRequest-util";

export const main = handler(async (event, context) => {
  // If this invokation is a prewarm, do nothing and return.
  if(event.source == "serverless-plugin-warmup" ) {
    console.log("Warmed up!");
    return null;
  }

  return idExists(event.pathParameters.id);
});
