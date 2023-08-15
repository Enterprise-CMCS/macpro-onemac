# Cross Account

### Purpose

This service exists to create a single IAM role. This role trusts certain IAM entities in MACPro platform account to assume it. The ultimate purpose is to allow a lambda function in MACPro micro to be able to create short lived presigned S3 urls to the uploads bucket in Onemac; in lieu of migrating the S3 data to platform account, we will simply reach back to the original bucket using this cross account role.
