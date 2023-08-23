# [OneMAC](https://github.com/CMSgov/onemac) [![Maintainability](https://api.codeclimate.com/v1/badges/2fd2de4673a78225e310/maintainability)](https://codeclimate.com/repos/610aa07d2929cc45c1004225/maintainability) [![Deploy](https://github.com/CMSgov/onemac/actions/workflows/deploy.yml/badge.svg)](https://github.com/CMSgov/onemac/actions/workflows/deploy.yml) [![Test Coverage](https://api.codeclimate.com/v1/badges/2fd2de4673a78225e310/test_coverage)](https://codeclimate.com/repos/610aa07d2929cc45c1004225/test_coverage)

# macstack-spa-submission-form

An official submission system for email-based state plan amendments (SPAs) and section 1915 waivers.

## Architecture

Architecture documentation can be found at: https://qmacbis.atlassian.net/wiki/spaces/DAD/pages/3098771457/OneMAC+Architecture+Documentation

![Architecture Diagram](./.images/architecture.svg?raw=true)

### Application Configuration

The following environment variables can be set to change the configuration of the application (reference [build_vars.sh](./.github/build_vars.sh)):
Lengend: R = Required, O = Optional

- (R) AWS_OIDC_ROLE_TO_ASSUME - the arn of the role to assume for deployment
- (R) AWS_DEFAULT_REGION - The AWS region to deploy the application to
- (O) INFRASTRUCTURE_TYPE - Defaults to "development"
- ROUTE_53_HOSTED_ZONE_ID
- ROUTE_53_DOMAIN_NAME
- CLOUDFRONT_CERTIFICATE_ARN
- (O) CLOUDFRONT_DOMAIN_NAME - The custom domain name for the application
- STAGE_PREFIX
- (R) OKTA_METADATA_URL - The OKTA URL to authenticate at
- METRICS_USERS - A comma separated list of emails of the users that are allowed access to the metrics page
