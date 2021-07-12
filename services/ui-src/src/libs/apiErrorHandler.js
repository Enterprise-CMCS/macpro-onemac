const handleApiError = (err, customError, errorLog) => {
  {
    console.log("API Error: ", errorLog);
    let message;
    if (
      (typeof err === "object" &&
        err !== null &&
        err.message.indexOf("status code 403") !== -1) ||
      (typeof err === "string" &&
        err.indexOf("The user is not authenticated") !== -1)
    ) {
      message = "SESSION_EXPIRED";
    }
    throw new Error(message ? "SESSION_EXPIRED" : customError);
  }
};
export default handleApiError;
