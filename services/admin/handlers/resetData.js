import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient(
  process.env.IS_OFFLINE
    ? {
        endpoint: "http://localhost:8000",
      }
    : {}
);

const resetIds = [
  "MD-22-0018",
  "MD-22-0019",
  "MD-22-0020",
  "MD-22-0021",
  "MD-22-0022",
  "MD-22-0023",
  "MD-22-4234",
  "MD-22-0283-9434",
  "MD.12896",
  "MD.12893",
  "MD.12958",
  "MD.38430",
  "MD.123456",
  "MD-12896.R00.00",
  "MD-12893.R00.00",
  "MD-12958.R00.00",
  "MD-39253.R00.00",
  "MD-38430.R00.00",
  "MD-33463.R00.00",
  "MD-39263.R00.00",
  "MD-123456.R00.00",
  "MD.33463.R00.00",
  "MD.39253.R00.00",
  "MD.33463.R00.TE00",
  "MD.33463.R00.TE01",
  "MD.33463.R00.TE02",
  "MD-12893.R00.TE01",
  "MD-5533.R01.00",
  "MD-5533.R02.00",
  "MD-5533.R03.00",
  "MD-5533.R00.01",
  "MD-5533.R00.02",
  "MD-5533.R00.03",
  "MD-5533.R00.04",
  "MD-5533.R00.TE00",
  "MD-5533.R00.TE01",
  "MD-5533.R00.TE02",
  "MD-5533.R00.TE03",
  "MD-5533.R00.TE04",
  "MD-5533.R00.TE05",
  "MD-5533.R00.TE06",
  "MD-5533.R00.TE07",
  "MD-5533.R00.TE08",
  "MD-5533.R00.TE09",
  "MD-10330.R00.12",
  "MD-22106.R01.02",
];

const snapshotIds = [
  "MD-22-2300-VM",
  "MD-22-2301-VM",
  "MD-22-2302-VM",
  "MD-22-2303-VM",
  "MD-22-4441-VM",
  "MD-22-2305-VM",
  "MD-22-2306-VM",
  "MD-22-2307-VM",
  "MD-23-3333-VM",
  "MD-22-2201-VM",
  "MD-22-2202-VM",
  "MD-22-2203-VM",
  "MD-22-2204-VM",
  "MD-23-3331-VM",
  "MD-23-4441-VM",
  "MD-22-2206-VM",
  "MD-22-2207-VM",
  "MD-12958.R00.02",
  "MD-22002.R00.00",
  "MD-22007.R00.00",
  "MD-22003.R00.00",
  "MD-22004.R00.00",
  "MD-22005.R00.00",
  "MD-22006.R00.00",
  "MD-2200.R00.00",
  "MD-22008.R00.00",
  "MD-22001.R01.00",
  "MD-22002.R01.00",
  "MD-22007.R01.00",
  "MD-22003.R01.00",
  "MD-22005.R01.00",
  "MD-22006.R01.00",
  "MD-22004.R01.00",
  "MD-22008.R01.00",
  "MD-12958.R01.00",
  "MD-22001.R00.01",
  "MD-22006.R00.01",
  "MD-22005.R00.01",
  "MD-22001.R01.01",
  "MD-22003.R01.01",
  "MD-22005.R01.02",
  "MD-22007.R00.01",
  "MD-22008.R01.01",
  "MD-22100.R01.01",
  "MD-22100.R00.01",
  "MD-22103.R00.01",
  "MD-22101.R00.01",
  "MD-22102.R01.01",
  "MD-22102.R00.01",
  "MD-22101.R01.01",
  "MD-22103.R01.01",
  "MD-0645.R00.00",
  "MD-9996",
  "MD-40198.R02",
  "MD-0645.R01",
  "MD-0265.R04.02",
  "MD-40198.R02.01",
  "MD-01.000",
  "MD-9995",
  "MD.20230",
  "MD.2233",
  "MD-02.R00.M04",
  "MD-21-0999-SID",
];

/**
 * Reset test Data
 */

export const main = async (event) => {
  console.log("resetData event: ", event);

  const promiseItems = [];

  await Promise.all(
    resetIds.map(async (id) => {
      console.log("Checking for id: ", id);
      const qParams = {
        TableName: process.env.oneMacTableName,
        KeyConditionExpression: "pk = :inPk",
        ExpressionAttributeValues: {
          ":inPk": id,
        },
        ProjectionExpression: "pk,sk",
      };
      try {
        const results = await dynamoDb.query(qParams).promise();
        console.log("Found these results in One Table: ", results);
        for (const item of results.Items) {
          promiseItems.push({
            TableName: process.env.oneMacTableName,
            Key: {
              pk: item.pk,
              sk: item.sk,
            },
          });
        }
      } catch (e) {
        console.log("query error: ", e.message);
      }
    })
  );

  await Promise.all(
    snapshotIds.map(async (id) => {
      console.log("Checking for id: ", id);
      const qParams = {
        TableName: process.env.oneMacTableName,
        KeyConditionExpression: "pk = :inPk",
        ExpressionAttributeValues: {
          ":inPk": id,
        },
        ProjectionExpression: "pk,sk",
      };
      try {
        const results = await dynamoDb.query(qParams).promise();
        console.log("Found these results in One Table: ", results);
        for (const item of results.Items) {
          const [, eventTimestamp] = item.sk.split("#");
          if (eventTimestamp > 1676384054014)
            promiseItems.push({
              TableName: process.env.oneMacTableName,
              Key: {
                pk: item.pk,
                sk: item.sk,
              },
            });
        }
      } catch (e) {
        console.log("query error: ", e.message);
      }
    })
  );

  await Promise.all(
    promiseItems.map(async (deleteParams) => {
      try {
        console.log(`Delete Params are ${JSON.stringify(deleteParams)}`);

        await dynamoDb.delete(deleteParams).promise();
      } catch (e) {
        console.log("delete error: ", e.message);
      }
    })
  );
  console.log("lambda thinks " + promiseItems.length + " Items are deleted");
  return "Done";
};
