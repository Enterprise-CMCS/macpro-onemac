const TYPE_LABELS = {
  spa: "SPA",
  sparai: "SPA RAI",
  chipspa: "CHIP SPA",
  chipsparai: "CHIP SPA RAI",
  waiver: "Waiver",
  waiveramendment: "Waiver Amendment",
  waiverrenewal: "Waiver Renewal",
  waiverextension: "Waiver Temporary Extension",
  waiverrai: "Waiver RAI",
  waiverappk: "1915(c) Appendix K Amendment",
};

const ID_LABELS = {
  spa: "SPA ID",
  sparai: "SPA ID",
  chipspa: "CHIP SPA ID",
  chipsparai: "CHIP SPA ID",
  waiver: "Waiver #",
  waiveramendment: "Waiver #",
  waiverrenewal: "Waiver #",
  waiverextension: "Waiver #",
  waiverrai: "Waiver #",
  waiverappk: "Waiver #",
};

const formatPackageDetails = (data) => {
  let detailText = `
    <p>
      <br><b>State or territory</b>: ${data.componentId.substring(0, 2)}
      <br><b>Name</b>: ${data.submitterName}
      <br><b>Email Address</b>: ${data.submitterEmail}
      <br><b>${ID_LABELS[data.componentType]}</b>: ${data.componentId}
    </p>
  `;

  if (data.additionalInformation) {
    detailText += `
      <p>
        <b>Summary</b>:
        <br>${data.additionalInformation}
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
  CcAddresses:
    data.componentType === "chipspa" || data.componentType === "chipsparai"
      ? process.env.chipCcEmail?.split(";")?.filter((s) => s.trim())
      : [],
  Subject: `${TYPE_LABELS[data.componentType]} Package ${
    data.componentId
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
export const StateWithdrawalEmail = (data, submitterName, submitterEmail) => ({
  ToAddresses: `${submitterName} <${submitterEmail}>`,
  Subject: `${TYPE_LABELS[data.componentType]} Package ${
    data.componentId
  } Withdraw Request`,
  HTML: `
    <p>This is confirmation that you have requested to withdraw the package below. The package will no longer be considered for CMS review:</p>
    ${formatPackageDetails(data)}
    <p>Thank you!</p>
    `,
});
