export const defaultFormConfig = {
  idLabel: "Default ID",
  CMSToAddresses: [process.env.reviewerEmail, process.env.testingEmail].filter(
    Boolean
  ),
  CMSCcAddresses: [],
};
