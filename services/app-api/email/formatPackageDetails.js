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
          data.submitterName
            ? `<br><b>Name</b>: ${data.submitterName}<br><b>Email Address</b>: ${data.submitterEmail}`
            : ""
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
          <br>${data.additionalInformation.replace(/\n/g, "<br/>")}
        </p>
      `;
  }

  if (
    data.attachments &&
    Array.isArray(data.attachments) &&
    data.attachments.length > 0
  ) {
    // using Mako Title map, to correctly display title names
    const attachmentTitleMap = {
      // SPA
      cmsForm179: "CMS Form 179",
      currentStatePlan: "Current State Plan",
      spaPages: "SPA Pages",
      coverLetter: "Cover Letter",
      tribalEngagement: "Document Demonstrating Good-Faith Tribal Engagement",
      existingStatePlanPages: "Existing State Plan Page(s)",
      publicNotice: "Public Notice",
      sfq: "Standard Funding Questions (SFQs)",
      tribalConsultation: "Tribal Consultation",
      amendedLanguage: "Amended State Plan Language",
      budgetDocuments: "Budget Documents",
      officialWithdrawalLetter: "Official Withdrawal Letter",
      // ISSUE RAI
      formalRaiLetter: "Formal RAI Letter",
      // RAI RESPONSE
      raiResponseLetter: "RAI Response Letter",
      raiResponseLetterWaiver: "Waiver RAI Response",
      revisedAmendedStatePlanLanguage: "Revised Amended State Plan Language",
      officialRaiResponse: "Official RAI Response",
      // MISC
      other: "Other",
      // RAI WITHDRAW
      supportingDocumentation: "Supporting Documentation",
      bCapWaiverApplication:
        "1915(b) Comprehensive (Capitated) Waiver Application Pre-print",
      bCapCostSpreadsheets:
        "1915(b) Comprehensive (Capitated) Waiver Cost Effectiveness Spreadsheets",
      bCapIndependentAssessment:
        "1915(b) Comprehensive (Capitated) Waiver Independent Assessment (first two renewals only)",
      b4WaiverApplication:
        "1915(b)(4) FFS Selective Contracting (Streamlined) Waiver Application Pre-print",
      b4IndependentAssessment:
        "1915(b)(4) FFS Selective Contracting (Streamlined) Independent Assessment (first two renewals only)",
      appk: "1915(c) Appendix K Amendment Waiver Template",
      waiverExtensionRequest: "Waiver Extension Request",
    };
    detailText += `
            <p>
            <b>Files</b>:
            <ul>
            ${data.attachments
              .filter((u) => u && u.title && u.filename)
              .map(
                ({ title, filename }) =>
                  `<li>${title}: ${
                    attachmentTitleMap[filename] ?? filename
                  }</li>`
              )
              .join("")}
            </ul>
            </p>
          `;
  }

  return detailText;
};
