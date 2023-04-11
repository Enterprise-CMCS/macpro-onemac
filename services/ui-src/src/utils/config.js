const config = {
  ATTACHMENT_FILE_TYPES: ".pdf, .docx, .jpg, .png",
  MAX_ATTACHMENT_SIZE_MB: 80,
  MAX_ADDITIONAL_INFO_LENGTH: 4000,
  MAX_PACKAGE_TITLE_LENGTH: 128,
  ALLOW_DEV_LOGIN: window._env_.ALLOW_DEV_LOGIN,
  METRICS_USERS: window._env_.METRICS_USERS,
  s3: {
    REGION: window._env_.S3_ATTACHMENTS_BUCKET_REGION,
    BUCKET: window._env_.S3_ATTACHMENTS_BUCKET_NAME,
  },
  apiGateway: {
    REGION: window._env_.API_REGION,
    URL: window._env_.API_URL,
  },
  cognito: {
    REGION: window._env_.COGNITO_REGION,
    USER_POOL_ID: window._env_.COGNITO_USER_POOL_ID,
    APP_CLIENT_ID: window._env_.COGNITO_USER_POOL_CLIENT_ID,
    APP_CLIENT_DOMAIN: window._env_.COGNITO_USER_POOL_CLIENT_DOMAIN,
    IDENTITY_POOL_ID: window._env_.COGNITO_IDENTITY_POOL_ID,
  },
};

export default config;
