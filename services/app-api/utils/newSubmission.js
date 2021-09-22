import { ChangeRequest } from "cmscommonlib";

import dynamoDb from "../libs/dynamodb-lib";
// import updateComponent from "./updateComponent";

export default async function newSubmission(inData) {
  console.log("inData: ", inData);
  const data = ChangeRequest.transformSubmission(inData);

  console.log("data transformed is: ", JSON.stringify(data, null, 2));
  const params = {
    TableName: process.env.oneMACTableName,
    Item: data,
  };

  return dynamoDb.put(params).catch((error) => {
    console.log("newSubmission put error is: ", error);
    throw error;
  });
}
