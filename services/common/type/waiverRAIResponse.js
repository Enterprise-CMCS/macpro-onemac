import { waiverAuthorityB4, waiverAuthorityB } from "../waiverAuthorities.js";
import { initialWaiverB4, initialWaiverB } from "./initialWaiver.js";
import { waiverRenewalB4, waiverRenewalB } from "./waiverRenewal.js";
import { waiverAmendmentB4, waiverAmendmentB } from "./waiverAmendment.js";

export const waiverRAIResponse = {
  componentType: "waiverrai",
  typeLabel: "1915(b) RAI Response",
  idLabel: "Waiver Number",
  idRegex:
    "(^[A-Z]{2}[.-][0-9]{4,5}$)|(^[A-Z]{2}[.-][0-9]{4,5}[.]R[0-9]{2}$)|(^[A-Z]{2}[.-][0-9]{4,5}[.]R[0-9]{2}[.]M?[0-9]{2}$)",
  idMustExist: true,
  allowMultiplesWithSameId: true,
  requiredAttachments: ["Waiver RAI Response"],
  optionalAttachments: ["Other"],
  theAttributes: [
    "componentId",
    "submissionTimestamp",
    "currentStatus",
    "attachments",
    "additionalInformation",
    "submitterName",
    "submitterEmail",
  ],
  allowedParentTypes: ["waivernew", "waiverrenewal", "waiveramendment"],
  allowedParentStatuses: ["RAI Issued"],
};

export const getFormConfigByTypeAndAuthority = (type, authority) => {
  //based on type and authority, return the proper config using the initial config as a base and overwriting attachments
  switch (type) {
    case "waivernew":
      switch (authority) {
        case waiverAuthorityB4.value:
          return {
            ...initialWaiverB4,
            ...waiverRAIResponse,
            optionalAttachments: [
              ...initialWaiverB4.requiredAttachments,
              ...initialWaiverB4.optionalAttachments,
            ],
          };
        case waiverAuthorityB.value:
          return {
            ...initialWaiverB,
            ...waiverRAIResponse,
            optionalAttachments: [
              ...initialWaiverB.requiredAttachments,
              ...initialWaiverB.optionalAttachments,
            ],
          };
        default:
          throw new Error("Waiver Authority not found");
      }
    case "waiverrenewal":
      switch (authority) {
        case waiverAuthorityB4.value:
          return {
            ...waiverRenewalB4,
            ...waiverRAIResponse,
            optionalAttachments: [
              ...waiverRenewalB4.requiredAttachments,
              ...waiverRenewalB4.optionalAttachments,
            ],
          };
        case waiverAuthorityB.value:
          return {
            ...waiverRenewalB,
            ...waiverRAIResponse,
            optionalAttachments: [
              ...waiverRenewalB.requiredAttachments,
              ...waiverRenewalB.optionalAttachments,
            ],
          };
        default:
          throw new Error("Waiver Authority not found");
      }
    case "waiveramendment":
      switch (authority) {
        case waiverAuthorityB4.value:
          return {
            ...waiverAmendmentB4,
            ...waiverRAIResponse,
            optionalAttachments: [
              ...waiverAmendmentB4.requiredAttachments,
              ...waiverAmendmentB4.optionalAttachments,
            ],
          };
        case waiverAuthorityB.value:
          return {
            ...waiverAmendmentB,
            ...waiverRAIResponse,
            optionalAttachments: [
              ...waiverAmendmentB.requiredAttachments,
              ...waiverAmendmentB.optionalAttachments,
            ],
          };
        default:
          throw new Error("Waiver Authority not found");
      }
    default:
      throw new Error("Waiver Type not found");
  }
};
