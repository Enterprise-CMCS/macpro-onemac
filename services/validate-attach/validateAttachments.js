import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const validate = async () => {
  console.log("Im validating......that I ran");
};

export const main = handler(async (event) => {
  await validate();
  return "validated";
});
