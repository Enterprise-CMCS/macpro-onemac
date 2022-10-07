/**
 * Formatted Package details for inclusion in Notices and Receipts
 * @param {Object} data from the package.
 * @param {Object} config of the package.
 * @returns {String} HTML for package details.
 */

import { format, parseISO } from "date-fns";
export const formatPackageDetails = (data, config) => {
  let detailText = `
      <p>
        <br><b>State or territory</b>: ${data.componentId.substring(0, 2)}
        ${
          data.withdrawnByName
            ? `<br><b>Withdrawn By</b>: ${data.withdrawnByName}<br><b>Email Address</b>: ${data.withdrawnByEmail}`
            : `<br><b>Name</b>: ${data.submitterName}<br><b>Email Address</b>: ${data.submitterEmail}`
        }
        ${data.title ? `<br><b>Amendment Title</b>: ${data.title}` : ""}
        <br><b>${config.idLabel}</b>: ${data.componentId}
        ${
          data.waiverAuthority
            ? `<br><b>Waiver Authority</b>: ${data.waiverAuthority}`
            : ""
        }
        ${
          data.temporaryExtensionType
            ? `<br><b>Temporary Extension Type</b>: ${data.temporaryExtensionType}`
            : ""
        }
        ${
          data.proposedEffectiveDate
            ? `<br><b>Proposed Effective Date</b>: ${format(
                parseISO(data.proposedEffectiveDate),
                "MMM d yyyy"
              )}`
            : ""
        }
        ${
          data.ninetyDayDate
            ? `<br><b>90th day deadline</b>: ${data.ninetyDayDate}`
            : ""
        }
      </p>`;

  if (data.additionalInformation) {
    detailText += `
        <p>
          <b>Summary</b>:
          <br>${data.additionalInformation}
        </p>
      `;
  }

  if (
    data.attachments &&
    Array.isArray(data.attachments) &&
    data.attachments.length > 0
  ) {
    detailText += `
            <p>
            <b>Files</b>:
            <ul>
            ${data.attachments
              .filter((u) => u && u.title && u.filename)
              .map(({ title, filename }) => `<li>${title}: ${filename}</li>`)
              .join("")}
            </ul>
            </p>
          `;
  }

  return detailText;
};
