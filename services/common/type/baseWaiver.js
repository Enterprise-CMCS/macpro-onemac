export const baseWaiver = {
  type: "waiverbase",
  label: "1915(b) Base Waiver",
  idType: "waiver",
  idLabel: "Waiver Number",
  idRegex: "^[A-Z]{2}[.][0-9]{2}[.]R[0-9]{2}[.]M[0-9]{2}$",
  idExistValidations: [
    {
      idMustExist: false,
      errorLevel: "error",
    },
  ],
  requiredUploads: [],
  optionalUploads: [
    "1915(b)(4) FFS Selective Contracting (Streamlined) waiver application pre-print (Initial, Renewal, Amendment)",
    "1915(b) Comprehensive (Capitated) Waiver Application Pre-print (Initial, Renewal, Amendment)",
    "1915(b) Comprehensive (Capitated) Waiver Cost effectiveness spreadsheets (Initial, Renewal, Amendment)",
    "1915(b)(4) FFS Selective Contracting (Streamlined) and 1915(b) Comprehensive (Capitated) Waiver Independent Assessment (first two renewals only)",
    "Tribal Consultation (Initial, Renewal, Amendment)",
    "Other",
  ],
  waiverAuthority: {
    fieldName: "waiverAuthority",
    errorMessage: "Please select the Waiver Authority.",
    optionsList: [
      { label: "-- select a waiver authority --", value: "" },
      {
        label: "1915(b)(4) FFS Selective Contracting waivers",
        value: "1915(b)(4)",
      },
      { label: "All other 1915(b) Waivers", value: "1915(b)" },
    ],
  },
};
