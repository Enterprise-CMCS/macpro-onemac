export default {
    MAX_ATTACHMENT_SIZE: 5000000,
    ALLOW_DEV_LOGIN: "true",
    s3: {
        REGION: "us-east-1",
        BUCKET: "uploads-oy3088-storybook-figma-attachmentsbucket-1twn51p951zou"
    },
    apiGateway: {
        REGION: "us-east-1",
        URL: "https://g0i63eeypf.execute-api.us-east-1.amazonaws.com/oy3088-storybook-figma"
    },
    cognito: {
        REGION: "us-east-1",
        USER_POOL_ID: "us-east-1_g1CoR3kNs",
        APP_CLIENT_ID: "fllf7qear614m9kvhftrlh4lk",
        APP_CLIENT_DOMAIN: "oy3088-storybook-figma-login-fllf7qear614m9kvhftrlh4lk.auth.us-east-1.amazoncognito.com",
        IDENTITY_POOL_ID: "us-east-1:7d5b79e2-99df-4082-aa25-ba210d48f44a",
    }
};
