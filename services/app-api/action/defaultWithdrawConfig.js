export const defaultWithdrawConfig = {
  idLabel: "Default ID",
  validateSubmission: (data) => {
    if (data) return true;
    return null;
  },
};
