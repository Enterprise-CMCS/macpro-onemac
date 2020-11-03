export default {
  MAX_ATTACHMENT_SIZE_MB: 50,
  s3: {
    REGION: 'window._env_.S3_ATTACHMENTS_BUCKET_REGION',
    BUCKET: 'window._env_.S3_ATTACHMENTS_BUCKET_NAME'
  },
  apiGateway: {
    REGION: 'window._env_.API_REGION',
    URL: 'window._env_.API_URL'
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
