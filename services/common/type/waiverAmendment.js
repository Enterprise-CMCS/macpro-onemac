export const waiverAmendment = {
  componentType: "waiveramendment",
  typeLabel: "1915(b) Waiver Amendment",
  idType: "waiver",
  idLabel: "Waiver Number",
  idRegex: "^[A-Z]{2}[.-][0-9]{4,5}.R[0-9]{2}.M(0[1-9]|[1-9][0-9])$",
  idExistValidations: [
    // the base waiver or waiver renewal being amended should exist
    {
      idMustExist: true,
      errorLevel: "warn",
      existenceRegex: "^[A-Z]{2}[.-][0-9]{4,5}.R[0-9]{2}",
    },
    // DON'T want the entire Waiver amendment number to exist
    {
      idMustExist: false,
      errorLevel: "warn",
      existenceRegex: "^[A-Z]{2}[.-][0-9]{4,5}.R[0-9]{2}.(0[1-9]|[1-9][0-9]$",
    },
  ],
  allowMultiplesWithSameId: false,
  requiredAttachments: [],
  optionalAttachments: [
    "1915(b)(4) FFS Selective Contracting (Streamlined) waiver application pre-print (Initial, Renewal, Amendment)",
    "1915(b) Comprehensive (Capitated) Waiver Application Pre-print (Initial, Renewal, Amendment)",
    "1915(b) Comprehensive (Capitated) Waiver Cost effectiveness spreadsheets (Initial, Renewal, Amendment)",
    "1915(b)(4) FFS Selective Contracting (Streamlined) and 1915(b) Comprehensive (Capitated) Waiver Independent Assessment (first two renewals only)",
    "Tribal Consultation (Initial, Renewal, Amendment)",
    "Other",
  ],
  waiverAuthorities: [
    {
      label: "1915(b)(4) FFS Selective Contracting waivers",
      value: "1915(b)(4)",
    },
    { label: "All other 1915(b) Waivers", value: "1915(b)" },
  ],
};
