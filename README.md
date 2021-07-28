[macstack-spa-submission-form](https://github.com/CMSgov/macstack-spa-submission-form) [![Maintainability](https://api.codeclimate.com/v1/badges/4ad566f3e59e2a003451/maintainability)](https://codeclimate.com/repos/60413fbab8e5b05d5101a9f6/maintainability) [![Deploy](https://github.com/CMSgov/macstack-spa-submission-form/actions/workflows/deploy.yml/badge.svg)](https://github.com/CMSgov/macstack-spa-submission-form/actions/workflows/deploy.yml)

# macstack-spa-submission-form

An official submission system for email-based state plan amendments (SPAs) and section 1915 waivers.

## Architecture

![Architecture Diagram](./.images/architecture.svg?raw=true)

### Application Configuration

The following environment variables can be set to change the configuration of the application (reference [build_vars.sh](./.github/build_vars.sh)):
Lengend: R = Required, O = Optional

- (O) CMS_SPA_FORM_CMS_EMAIL - The CMS email address submissions (all except CHIP SPAs) are sent to. Defaults to *OneMAC@cms.hhs.gov*
- (O) CMS_CHIP_FORM_CMS_EMAIL - The CMS email address CHIP SPA submissions are sent to. Defaults to *OneMAC@cms.hhs.gov*
- (O) CMS_SPA_FORM_FROM_EMAIL - The CMS email address used to send emails from (the FROM email address in the emails). Defaults to *spa-reply@cms.hhs.gov*
- (O) CMS_SYSTEM_ADMIN_EMAIL - This is the optional over ride system admin email id to the ones that exist in the db. Mainly used for testing purposes
- (R) AWS_ACCESS_KEY_ID - AWS Access key with write access for creating AWS resources in the account
- (R) AWS_SECRET_ACCESS_KEY - AWS secret with write access for creating AWS resources in the account
- (R) AWS_DEFAULT_REGION - The AWS region to deploy the application to
- (O) INFRASTRUCTURE_TYPE - Defaults to "development"
- ROUTE_53_HOSTED_ZONE_ID
- ROUTE_53_DOMAIN_NAME
- CLOUDFRONT_CERTIFICATE_ARN
- (O) CLOUDFRONT_DOMAIN_NAME - The custom domain name for the application
- (O) IAM_PATH - Defaults to "/"
- IAM_PERMISSIONS_BOUNDARY_POLICY
- STAGE_PREFIX
- (R) OKTA_METADATA_URL - The OKTA URL to authenticate at
- METRICS_USERS - A comma separated list of emails of the users that are allowed access to the metrics page
