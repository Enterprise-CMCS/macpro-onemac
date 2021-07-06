import { API } from "aws-amplify";

const get = async (endpointName, apiPath) => {
  try {
    return await API.get(endpointName, apiPath);
  } catch (err) {
    errorHandler(err);
  }
};

const post = async (endpointName, apiPath, body) => {
  try {
    return await API.post(endpointName, apiPath, body);
  } catch (err) {
    errorHandler(err);
  }
};

const put = async (endpointName, apiPath, body) => {
  try {
    return await API.put(endpointName, apiPath, body);
  } catch (err) {
    errorHandler(err);
  }
};

const errorHandler = (err) => {
  {
    console.log("API Error: ", err);
    if (err.message.indexOf("status code 403") !== -1) {
      throw new Error("SESSION_EXPIRED");
    } else {
      throw err;
    }
  }
};

const APIWrapper = {
  get,
  post,
  put,
};

export default APIWrapper;
