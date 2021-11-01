import * as debug from "./debug-lib";

export default function handler(lambda) {
  return async function (event, context) {
    let response = {
      statusCode: 200,
      body: null,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    };

    // Start debugger
    debug.init(event, context);

    // If this invokation is a prewarm, do nothing and return.
    if (event.source == "serverless-plugin-warmup") {
      console.log("Warmed up!");
      return response;
    }

    try {
      // Run the Lambda
      response.body = await lambda(event, context);
    } catch (e) {
      // Print debug messages
      debug.flush(e);

      response.body = { error: e.message };
      response.statusCode = 500;
    }

    // Return HTTP response
    return response;
  };
}
