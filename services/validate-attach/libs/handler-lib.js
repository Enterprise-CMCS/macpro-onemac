export default function handler(lambda) {
  return async function (event, context) {
    const response = {
      statusCode: 200,
      body: null,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    };

    // If this invokation is a prewarm, do nothing and return.
    if (event.source != "serverless-plugin-warmup") {
      try {
        // Run the Lambda
        response.body = await lambda(event, context);
      } catch (e) {
        response.body = { error: e.message };
        response.statusCode = 500;
      }
      response.body = JSON.stringify(response.body);
    }
    // Return HTTP response
    return response;
  };
}
