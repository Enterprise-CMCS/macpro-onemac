export const defaultFormConfig = {
  idLabel: "Default ID",
  validateSubmission: (data) => {
    if (data) return true;
    return null;
  },
};
