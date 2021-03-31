const lambdaWarmup = (event) => {
    // If this invocation is a prewarm, do nothing and return.
    if (event.source == "serverless-plugin-warmup") {
        console.log("Warmed up!");
        return null;
    }
};
export default lambdaWarmup;