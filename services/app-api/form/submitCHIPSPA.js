export const CHIPSPA = {
  componentType: "chipspa",
  typeLabel: "CHIP SPA",
  idLabel: "SPA ID",
  CMSCcAddresses: process.env.chipCcEmail?.split(";")?.filter((s) => s.trim()),
};
