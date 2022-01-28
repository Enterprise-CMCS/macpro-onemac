import { main } from "./get";

const testSubmission = {
  Item: {
    transmittalNumber: "MI.7778.R11",
    summary: "",
    createdAt: 1623779834196,
    user: {
      authProvider:
        "cognito-idp.us-east-1.amazonaws.com/us-east-1_KDU39SsRi,cognito-idp.us-east-1.amazonaws.com/us-east-1_KDU39SsRi:CognitoSignIn:3554f7a8-b563-4f7a-bc90-447d44ee3d82",
      firstName: "Angie",
      lastName: "Active",
      id: "us-east-1:4267bada-207d-47f2-8cf9-e80150f3e670",
      email: "statesubmitteractive@cms.hhs.local",
    },
    submittedAt: 1623779834680,
    uploads: [
      {
        s3Key: "1623779833557/test.pdf",
        filename: "test.pdf",
        title:
          "1915(b)(4) FFS Selective Contracting (Streamlined) waiver application pre-print (Initial, Renewal, Amendment)",
        contentType: "application/pdf",
        url: "https://uploads-cover-api-attachments-116229642442.s3.amazonaws.com/protected/us-east-1%3A4267bada-207d-47f2-8cf9-e80150f3e670/1623779833557/test.pdf?AWSAccessKeyId=ASIARWD6TTDFEA7JSOFZ&Expires=1641310192&Signature=9UL1%2B9IUE2ZdP7AXiyF2xftuGF4%3D&x-amz-security-token=IQoJb3JpZ2luX2VjEG8aCXVzLWVhc3QtMSJGMEQCIFfxNQ5j%2FTTQD5rN9wNDDGKoQwE7fI%2Beoyv6hJVjETQ%2BAiAs6Ga3vVfKDwhiq3FAFKVws6hOGHKSmARqzVXGAMAFaCqaAgh3EAEaDDExNjIyOTY0MjQ0MiIMLfKrDUqOBZKdtsWGKvcBmLE9Df6kPKKXw0q9BtmpUfMeqBhT2q98f0aXwLrfUUF4yepqmc2GNqU2eu667TzBt0OZdbau%2BkWrgJv0%2FqTpblVpOUoCyJbbqmzkm6UORpTv5ghF%2FLpTPnD%2BC0%2F843xSLUSOSfJ%2FNM8bm6PFWPcBGQDWO22GahklSOHJ5lruTPhWb%2FZ35R1KM5m%2FLs2nhzG7aD%2Bmet%2BKQNLWzwiwYaAm3iW5WBZf%2FVhJJbdk5kf37Q5q62H80cc54oqEBuYB9ZevXaXfHLWcWezQDOeUcrzYZ0oudaq0fvlR42G2q%2Bh45MgXNslj6AB53JUNiAbsPDs2UucA8RJjMTC8rtGOBjqbAfq%2FT9Qv2nEzDM4AHZDqE1da0mRs9NwV9Nmfvo7XHTi2QXD6UJ%2F6BwTBrz3eipUb5B8W%2FziivmpPWMz9pOO0cGUl0i%2B%2BOIuxlehWVUhv2%2BYAh71LnYLSFPH%2FUjn9DIoVdMcp6mySCBVSFxSD8OPQgQ2oe22DlCHFPkOlTqW54Zdr0nPfJvTI6WYolokLQ91rcmWQO%2FYzwFf%2B7ESh",
      },
    ],
    state: "submitted",
    waiverAuthority: "1915(b)(4)",
    userId: "us-east-1:4267bada-207d-47f2-8cf9-e80150f3e670",
    territory: "MI",
    actionType: "renewal",
    ninetyDayClockEnd: 1631555834680,
    id: "1d9ca140-ce03-11eb-bf37-fb17b319eb72",
    type: "waiver",
  },
};

const responseItem = {
  transmittalNumber: "MI.7778.R11",
  summary: "",
  createdAt: 1623779834196,
  user: {
    authProvider:
      "cognito-idp.us-east-1.amazonaws.com/us-east-1_KDU39SsRi,cognito-idp.us-east-1.amazonaws.com/us-east-1_KDU39SsRi:CognitoSignIn:3554f7a8-b563-4f7a-bc90-447d44ee3d82",
    firstName: "Angie",
    lastName: "Active",
    id: "us-east-1:4267bada-207d-47f2-8cf9-e80150f3e670",
    email: "statesubmitteractive@cms.hhs.local",
  },
  submittedAt: 1623779834680,
  uploads: [
    {
      s3Key: "1623779833557/test.pdf",
      filename: "test.pdf",
      title:
        "1915(b)(4) FFS Selective Contracting (Streamlined) waiver application pre-print (Initial, Renewal, Amendment)",
      contentType: "application/pdf",
      url: "Signed URL",
    },
  ],
  state: "submitted",
  waiverAuthority: "1915(b)(4)",
  userId: "us-east-1:4267bada-207d-47f2-8cf9-e80150f3e670",
  territory: "MI",
  actionType: "renewal",
  ninetyDayClockEnd: 1631555834680,
  id: "1d9ca140-ce03-11eb-bf37-fb17b319eb72",
  type: "waiver",
};

jest.mock("aws-sdk", () => ({
  S3: () => ({
    getSignedUrlPromise: () => "Signed URL",
  }),
}));

jest.mock("./libs/dynamodb-lib", () => ({
  get: () => testSubmission,
}));

const expectedResponse = {
  statusCode: 200,
  body: JSON.stringify(responseItem),
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
};

const testGetEvent = {
  pathParameters: {
    userId: "testUserId",
    id: "testId",
  },
};

it("returns the submission", async () => {
  expect(main(testGetEvent))
    .resolves.toStrictEqual(expectedResponse)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});
