import {
  DynamoDBDocument,
  GetCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDB } from "@aws-sdk/client-dynamodb";

const client = DynamoDBDocument.from(
  new DynamoDB(
    process.env.IS_OFFLINE
      ? {
          endpoint: "http://localhost:8000",
        }
      : {}
  )
);

export default {
  get: (params) => client.send(new GetCommand(params)),
  put: (params) => client.put(params),
  query: (params) => client.send(new QueryCommand(params)),
  update: (params) => client.update(params),
  delete: (params) => client.delete(params),
  scan: (params) => client.scan(params),
};
