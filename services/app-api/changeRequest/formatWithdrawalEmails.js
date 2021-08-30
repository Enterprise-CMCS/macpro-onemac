const TYPE_LABELS = {
  spa: "SPA",
  chipspa: "CHIP SPA",
  waiver: "Waiver",
};

const ID_LABELS = {
  spa: "SPA Package ID",
  chipspa: "CHIP SPA Package ID",
  waiver: "Waiver Package #",
};

const compareSubmissionTimestamps = (a, b) =>
  a.submissionTimestamp - b.submissionTimestamp;

const formatPackageDetails = (data) => {
  let detailText = `
    <p>
      <br><b>State or territory</b>: ${data.packageId.substring(0, 2)}
      <br><b>Name</b>: ${data.submitterName}
      <br><b>Email Address</b>: ${data.submitterEmail}
      <br><b>${ID_LABELS[data.packageType]}</b>: ${data.packageId}
    </p>
  `;

  const summaryText = data.changeHistory
    ?.sort(compareSubmissionTimestamps)
    ?.slice(-1)?.[0]?.additionalInformation;

  if (summaryText) {
    detailText += `
      <p>
        <b>Summary</b>:
        <br>${summaryText}
      </p>
    `;
  }

  return detailText;
};

/**
 * Package withdrawal email to CMS
 * @param {Object} data from the package.
 * @returns {Object} email parameters in generic format.
 */
export const CMSWithdrawalEmail = (data) => ({
  ToAddresses: [process.env.reviewerEmail],
  Subject: `${TYPE_LABELS[data.packageType]} Package ${
    data.packageId
  } Withdraw Request`,
  HTML: `
    <p>The OneMAC Submission Portal received a request to withdraw the package below. The package will no longer be considered for CMS review:</p>
    ${formatPackageDetails(data)}
    <p>Thank you!</p>
  `,
});

/**
 * Package withdrawal email to state user(s)
 * @param {Object} data from the package.
 * @returns {Object} email parameters in generic format.
 */
export const StateWithdrawalEmail = (data) => ({
  ToAddresses: data.changeHistory
    ?.sort(compareSubmissionTimestamps)
    ?.slice(-1)
    ?.map(({ submitterEmail }) => submitterEmail),
  Subject: `${TYPE_LABELS[data.packageType]} Package ${
    data.packageId
  } Withdraw Request`,
  HTML: `
    <p>This is confirmation that you have requested to withdraw the package below. The package will no longer be considered for CMS review:</p>
    ${formatPackageDetails(data)}
    <p>Thank you!</p>
    `,
});
