export const waiverRenewal = {
  componentType: "waiverrenewal",
  typeLabel: "1915(b) Waiver Renewal",
  idType: "waiver",
  idLabel: "Waiver Number",
  idRegex: "^[A-Z]{2}[.-][0-9]{4,5}.R(0[1-9]|[1-9][0-9]).00$",
  idExistValidations: [
    // the base waiver should exist
    {
      idMustExist: true,
      errorLevel: "warn",
      existenceRegex: "^[A-Z]{2}[.-][0-9]{4,5}.R00.00",
    },
    // DON'T want the entire Waiver number with renewal portion to exist
    {
      idMustExist: false,
      errorLevel: "warn",
      existenceRegex: "^[A-Z]{2}[.-][0-9]{4,5}.R(0[1-9]|[1-9][0-9])(|.00)",
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
  requiredUploads: [], // until changed in front end
  optionalUploads: [
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
