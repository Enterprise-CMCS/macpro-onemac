export default {
  MAX_ATTACHMENT_SIZE_MB: 50,
  s3: {
    REGION: "us-east-1",
    BUCKET: "https://uploads-oy2-1060-view-submissio-attachmentsbucket-169tt83bmjna5"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://ole6o1ykv5.execute-api.us-east-1.amazonaws.com"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_dlVhoTlYZ",
    APP_CLIENT_ID: "4rpjmbt5css7h0mqvs2lm577f2",
    IDENTITY_POOL_ID: "us-east-1:eb8619ee-7a34-438c-87ca-4df26051649d",
    APP_CLIENT_DOMAIN: "demookta8c722025-8c722025-dev.auth.us-east-1.amazoncognito.com",
    REDIRECT_SIGNIN: "https://dlnchbzzackox.cloudfront.net/",
    REDIRECT_SIGNOUT: "https://dlnchbzzackox.cloudfront.net/"
  }
};
