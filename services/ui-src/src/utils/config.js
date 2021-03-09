export default {
    MAX_ATTACHMENT_SIZE: 5000000,
    ALLOW_DEV_LOGIN: "true",
    METRICS_USERS: "user1@cms.hhs.local,zlewis@clarityinnovates.com",
    s3: {
        REGION: "us-east-1",
        BUCKET: "uploads-develop-attachmentsbucket-10wg5kiraihu1"
    },
    apiGateway: {
        REGION: "us-east-1",
        URL: "https://ydz865dugc.execute-api.us-east-1.amazonaws.com/develop"
    },
    cognito: {
        REGION: "us-east-1",
        USER_POOL_ID: "us-east-1_KDU39SsRi",
        APP_CLIENT_ID: "51g7i130aruj9gugt31mosvfj1",
        APP_CLIENT_DOMAIN: "develop-login-51g7i130aruj9gugt31mosvfj1.auth.us-east-1.amazoncognito.com",
        IDENTITY_POOL_ID: "us-east-1:0209bcbc-4eb4-40c9-8a2f-bef3c123c4ec",
    }
};
