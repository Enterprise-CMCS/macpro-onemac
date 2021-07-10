const handleApiError = (err, customError, errorLog) => {
  {
    console.log("API Error: ", errorLog);
    if (err.message.indexOf("status code 403") !== -1) {
      throw new Error("SESSION_EXPIRED");
    } else {
      throw new Error(customError);
    }
  }
};
export default handleApiError;
