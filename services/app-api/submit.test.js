import { main } from "./submit";
import { validateSubmission } from "./changeRequest/changeRequest-util";
import { RESPONSE_CODE } from "cmscommonlib";
import getUser from "./utils/getUser";

jest.mock("./changeRequest/changeRequest-util");
jest.mock("./utils/getUser");

const expectedResponse = {
  statusCode: 200,
  body: RESPONSE_CODE.SUBMISSION_SUCCESS,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
};

const testUserEvent = {
  resource: "/submit",
  path: "/submit",
  httpMethod: "POST",
  headers: {
    Accept: "application/json, text/plain, */*",
    "accept-encoding": "gzip, deflate, br",
    "Accept-Language": "en-US,en;q=0.9",
    "CloudFront-Forwarded-Proto": "https",
    "CloudFront-Is-Desktop-Viewer": "true",
    "CloudFront-Is-Mobile-Viewer": "false",
    "CloudFront-Is-SmartTV-Viewer": "false",
    "CloudFront-Is-Tablet-Viewer": "false",
    "CloudFront-Viewer-Country": "US",
    "content-type": "application/json; charset=UTF-8",
    Host: "je8lkoa2u9.execute-api.us-east-1.amazonaws.com",
    origin: "https://d37vvg9moxp7a1.cloudfront.net",
    Referer: "https://d37vvg9moxp7a1.cloudfront.net/",
    "sec-ch-ua":
      '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"macOS"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36",
    Via: "2.0 69e952c7b08727f752b5559b0b6d2109.cloudfront.net (CloudFront)",
    "X-Amz-Cf-Id": "yIp2u_H_Yk7vGXKq9YcN9AvOyyhKz4yXmMn6McC_anAGsMxaALC_Aw==",
    "x-amz-date": "20211214T133015Z",
    "x-amz-security-token":
      "IQoJb3JpZ2luX2VjEHYaCXVzLWVhc3QtMSJGMEQCIFecS2+i1A0GkNHz0XYps3Kl3sUY88VzVm6atSIWKoSCAiB8g41yAkpxx3wdZIWLc/XYN7WTSLNbB9pZsvpgJYXedirEBAhfEAEaDDExNjIyOTY0MjQ0MiIMgzXQ79XuurzQGcOAKqEE/4LhIfW8GCbP52hHFYaEcLykIpPW4zhesEpNx2eeFYn2ENzPP7hlu4LVZt36dATpzD5nQ0XPvogxduJuh26TlzADKRHWndKXZY7InfeZ4ncw2mutpuAZd9X/X3tRUSW6Z4y641a0AoEN3rXQcOUxpI2BSn51P1eeuVuU7c5PdXtaifrMCNZW4WR0c8MepFyJQIyLnVBSDNWPxqRWYNgFU7+JSU8w9aAmXZKCcMTL3a9K47URvgpu1HuksudfUYnL/tEzA/7ayUVbZgGDLNAPfEwwrGysuUiO8qRkTYpUrtqOkrOk9r1jK48hk1KXbAgy6ThLFPpiVURQiAsRSXnSz9qE2nP2LJ4KZvK8MzBJBd40kilTUQR795dMjlJcNkuxw0YdH7cOXfJeByo9koZr5W9tngtBJTNxGMhi55iqrLs35xUpUMVqG5FoF6HSMnBaBjqYcRL/nEvMpDv55l6KxYzUfJoQ4y1Lq+TvpLlyLj1mjyGAnyA99vsuyQEDiizkMgbTMP8Jk3esorXjW00wK4dqlCNsZzPB4tsJbli86iG+A7L5M8eqxGH+WfY6/VaBlqMVEOQjMXJU2o7omVXHIwev58976l53jl53K9P32LjkY5fOaW+Q7Jkr5fPP1OhO/MNye7Hs6ie5S3zn5LDvsTwwZESu9kGuNDn4X2kCi9IYbXWurZVQIPiZ2MX1eMx/MvtTnQIr27PivUYNJElzwxYwjrXijQY6hgIq02dn6756pbwy8zDdb33oejWhQHuprYYJR90I7Cg5I0zRqkuPt4LqK0oJI+xugV3o1Z8oxHfJC1tIZzq5anP+oyKhwqB8mLdYghnUtxeNdPS7koKUI4/gWB/gYK9X92qiyzo7LtPAQm9U1r5UziScA3yPDfBHrqaizCx84OMnsNR4ct9dLolamLUd3hsdAedqpxr1qfBeqU0KrNUw6X3j+ORvQw/OT/YOY7aehY1DfrXqdAt+UeiagikwFH9zGlT9dEMzPrplcwFedoStBuQlNRgNb9RRhUJ3kHQzzbCxseN82kSrRC9meJz5W5fZsEK1RldAYza+coHhnGzXlFo9/sP13S/h",
    "X-Amzn-Trace-Id": "Root=1-61b89c67-6248cd267cc233ba5317aebe",
    "X-Forwarded-For": "52.5.212.71, 130.176.133.73",
    "X-Forwarded-Port": "443",
    "X-Forwarded-Proto": "https",
  },
  multiValueHeaders: {
    Accept: ["application/json, text/plain, */*"],
    "accept-encoding": ["gzip, deflate, br"],
    "Accept-Language": ["en-US,en;q=0.9"],
    "CloudFront-Forwarded-Proto": ["https"],
    "CloudFront-Is-Desktop-Viewer": ["true"],
    "CloudFront-Is-Mobile-Viewer": ["false"],
    "CloudFront-Is-SmartTV-Viewer": ["false"],
    "CloudFront-Is-Tablet-Viewer": ["false"],
    "CloudFront-Viewer-Country": ["US"],
    "content-type": ["application/json; charset=UTF-8"],
    Host: ["je8lkoa2u9.execute-api.us-east-1.amazonaws.com"],
    origin: ["https://d37vvg9moxp7a1.cloudfront.net"],
    Referer: ["https://d37vvg9moxp7a1.cloudfront.net/"],
    "sec-ch-ua": [
      '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
    ],
    "sec-ch-ua-mobile": ["?0"],
    "sec-ch-ua-platform": ['"macOS"'],
    "sec-fetch-dest": ["empty"],
    "sec-fetch-mode": ["cors"],
    "sec-fetch-site": ["cross-site"],
    "User-Agent": [
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36",
    ],
    Via: ["2.0 69e952c7b08727f752b5559b0b6d2109.cloudfront.net (CloudFront)"],
    "X-Amz-Cf-Id": ["yIp2u_H_Yk7vGXKq9YcN9AvOyyhKz4yXmMn6McC_anAGsMxaALC_Aw=="],
    "x-amz-date": ["20211214T133015Z"],
    "x-amz-security-token": [
      "IQoJb3JpZ2luX2VjEHYaCXVzLWVhc3QtMSJGMEQCIFecS2+i1A0GkNHz0XYps3Kl3sUY88VzVm6atSIWKoSCAiB8g41yAkpxx3wdZIWLc/XYN7WTSLNbB9pZsvpgJYXedirEBAhfEAEaDDExNjIyOTY0MjQ0MiIMgzXQ79XuurzQGcOAKqEE/4LhIfW8GCbP52hHFYaEcLykIpPW4zhesEpNx2eeFYn2ENzPP7hlu4LVZt36dATpzD5nQ0XPvogxduJuh26TlzADKRHWndKXZY7InfeZ4ncw2mutpuAZd9X/X3tRUSW6Z4y641a0AoEN3rXQcOUxpI2BSn51P1eeuVuU7c5PdXtaifrMCNZW4WR0c8MepFyJQIyLnVBSDNWPxqRWYNgFU7+JSU8w9aAmXZKCcMTL3a9K47URvgpu1HuksudfUYnL/tEzA/7ayUVbZgGDLNAPfEwwrGysuUiO8qRkTYpUrtqOkrOk9r1jK48hk1KXbAgy6ThLFPpiVURQiAsRSXnSz9qE2nP2LJ4KZvK8MzBJBd40kilTUQR795dMjlJcNkuxw0YdH7cOXfJeByo9koZr5W9tngtBJTNxGMhi55iqrLs35xUpUMVqG5FoF6HSMnBaBjqYcRL/nEvMpDv55l6KxYzUfJoQ4y1Lq+TvpLlyLj1mjyGAnyA99vsuyQEDiizkMgbTMP8Jk3esorXjW00wK4dqlCNsZzPB4tsJbli86iG+A7L5M8eqxGH+WfY6/VaBlqMVEOQjMXJU2o7omVXHIwev58976l53jl53K9P32LjkY5fOaW+Q7Jkr5fPP1OhO/MNye7Hs6ie5S3zn5LDvsTwwZESu9kGuNDn4X2kCi9IYbXWurZVQIPiZ2MX1eMx/MvtTnQIr27PivUYNJElzwxYwjrXijQY6hgIq02dn6756pbwy8zDdb33oejWhQHuprYYJR90I7Cg5I0zRqkuPt4LqK0oJI+xugV3o1Z8oxHfJC1tIZzq5anP+oyKhwqB8mLdYghnUtxeNdPS7koKUI4/gWB/gYK9X92qiyzo7LtPAQm9U1r5UziScA3yPDfBHrqaizCx84OMnsNR4ct9dLolamLUd3hsdAedqpxr1qfBeqU0KrNUw6X3j+ORvQw/OT/YOY7aehY1DfrXqdAt+UeiagikwFH9zGlT9dEMzPrplcwFedoStBuQlNRgNb9RRhUJ3kHQzzbCxseN82kSrRC9meJz5W5fZsEK1RldAYza+coHhnGzXlFo9/sP13S/h",
    ],
    "X-Amzn-Trace-Id": ["Root=1-61b89c67-6248cd267cc233ba5317aebe"],
    "X-Forwarded-For": ["52.5.212.71, 130.176.133.73"],
    "X-Forwarded-Port": ["443"],
    "X-Forwarded-Proto": ["https"],
  },
  queryStringParameters: null,
  multiValueQueryStringParameters: null,
  pathParameters: null,
  stageVariables: null,
  requestContext: {
    resourceId: "kvruyp",
    resourcePath: "/submit",
    httpMethod: "POST",
    extendedRequestId: "KV1gKE7pIAMFn0w=",
    requestTime: "14/Dec/2021:13:30:15 +0000",
    path: "/add-rai/submit",
    accountId: "116229642442",
    protocol: "HTTP/1.1",
    stage: "add-rai",
    domainPrefix: "je8lkoa2u9",
    requestTimeEpoch: 1639488615281,
    requestId: "c6998b30-0037-44ea-b7b2-84fb6db6a097",
    identity: {
      cognitoIdentityPoolId: "us-east-1:59813137-7778-4751-be10-ca7dd7ff230f",
      accountId: "116229642442",
      cognitoIdentityId: "us-east-1:54fb74ef-1d89-4528-bb26-24926cbc5eef",
      caller: "AROARWD6TTDFLDZEL2SVL:CognitoIdentityCredentials",
      sourceIp: "52.5.212.71",
      principalOrgId: "o-ry4nhh9eic",
      accessKey: "ASIARWD6TTDFB5CIV4O3",
      cognitoAuthenticationType: "authenticated",
      cognitoAuthenticationProvider:
        "cognito-idp.us-east-1.amazonaws.com/us-east-1_D76KEX0e0,cognito-idp.us-east-1.amazonaws.com/us-east-1_D76KEX0e0:CognitoSignIn:24d4590e-15b8-4a57-b49a-312fdc1f2ca6",
      userArn:
        "arn:aws:sts::116229642442:assumed-role/ui-auth-add-rai-CognitoAuthRole-19ZNUCUFEE272/CognitoIdentityCredentials",
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36",
      user: "AROARWD6TTDFLDZEL2SVL:CognitoIdentityCredentials",
    },
    domainName: "je8lkoa2u9.execute-api.us-east-1.amazonaws.com",
    apiId: "je8lkoa2u9",
  },
  body: '{"type":"spa","territory":"MI","summary":"valid submission data for testing.","transmittalNumber":"MI-22-0897","actionType":"","waiverAuthority":"","transmittalNumberWarningMessage":"","user":{"email":"statesubmitteractive@cms.hhs.local","firstName":"Angie","lastName":"Active"},"uploads":[{"s3Key":"1639488614688/CMS 179 Form Acronym Removal Signed.pdf","filename":"CMS 179 Form Acronym Removal Signed.pdf","contentType":"application/pdf","url":"https://uploads-add-rai-attachments-116229642442.s3.us-east-1.amazonaws.com/protected/us-east-1%3A54fb74ef-1d89-4528-bb26-24926cbc5eef/1639488614688/CMS%20179%20Form%20Acronym%20Removal%20Signed.pdf","title":"CMS Form 179"},{"s3Key":"1639488614690/Attachment 3.1-A, #4b, Page 3f Track.pdf","filename":"Attachment 3.1-A, #4b, Page 3f Track.pdf","contentType":"application/pdf","url":"https://uploads-add-rai-attachments-116229642442.s3.us-east-1.amazonaws.com/protected/us-east-1%3A54fb74ef-1d89-4528-bb26-24926cbc5eef/1639488614690/Attachment%203.1-A%2C%20%234b%2C%20Page%203f%20Track.pdf","title":"SPA Pages"}]}',
  isBase64Encoded: false,
};

it("tests the warmup", async () => {
  const response = main({ source: "serverless-plugin-warmup" }, "foo");
  expect(response).toBeInstanceOf(Promise);
});

it(`returns an error for invalid submission`, async () => {
  expectedResponse.body = RESPONSE_CODE.VALIDATION_ERROR;

  validateSubmission.mockReturnValue(false);

  const response = main(testUserEvent, "foo");

  expect(response)
    .resolves.toStrictEqual(expectedResponse)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it(`returns an error for unknown user`, async () => {
  expectedResponse.body = RESPONSE_CODE.USER_NOT_FOUND;

  validateSubmission.mockReturnValue(true);
  getUser.mockResolvedValueOnce(null);

  const response = main(testUserEvent, "foo");

  expect(response)
    .resolves.toStrictEqual(expectedResponse)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});
