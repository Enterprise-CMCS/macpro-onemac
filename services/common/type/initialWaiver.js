export const initialWaiver = {
  packageGroup: "waiver",
  componentType: "waivernew",
  typeLabel: "1915(b) Initial Waiver",
  idType: "waiver",
  idLabel: "Initial Waiver Number",
  idRegex: "^[A-Z]{2}[-][0-9]{4,5}[.]R00[.]00$",
  idExistValidations: [
    {
      idMustExist: false,
      errorLevel: "error",
    },
  ],
  allowMultiplesWithSameId: false,
  allowWaiverExtension: true,
  requiredAttachments: [],
  optionalAttachments: [
    "1915(b)(4) FFS Selective Contracting (Streamlined) waiver application pre-print (Initial, Renewal, Amendment)",
    "1915(b) Comprehensive (Capitated) Waiver Application Pre-print (Initial, Renewal, Amendment)",
    "1915(b) Comprehensive (Capitated) Waiver Cost effectiveness spreadsheets (Initial, Renewal, Amendment)",
    "1915(b)(4) FFS Selective Contracting (Streamlined) and 1915(b) Comprehensive (Capitated) Waiver Independent Assessment (first two renewals only)",
    "Tribal Consultation (Initial, Renewal, Amendment)",
    "Other",
  ],
  deprecatedAttachmentTypes: ["Required Upload (per Waiver Authority)"],
  waiverAuthorities: [
    {
      label: "1915(b)(4) FFS Selective Contracting waivers",
      value: "1915(b)(4)",
    },
    { label: "All other 1915(b) Waivers", value: "1915(b)" },
  ],
};
