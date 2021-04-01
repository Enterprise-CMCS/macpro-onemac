const isLambdaWarmup = (event) => {
    // If this invocation is a prewarm, do nothing and return.
    return event.source == "serverless-plugin-warmup";
};
export default isLambdaWarmup;
