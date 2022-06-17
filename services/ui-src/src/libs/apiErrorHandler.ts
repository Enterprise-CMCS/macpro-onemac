const handleApiError = (
  err: any, // must be `any` to handle errors from a `catch (...)` without type assertion
  customError: string,
  errorLog?: string
): never => {
  let message;

  const errIs403 =
    typeof err === "object" &&
    err !== null &&
    err.message.indexOf("status code 403") !== -1;
  const errIsMissingToken =
    typeof err === "object" &&
    err !== null &&
    err.message.indexOf("Missing Authentication Token") !== -1;
  const errIsNotAuthed =
    typeof err === "string" &&
    err.indexOf("The user is not authenticated") !== -1;

  if (errIs403 || errIsMissingToken || errIsNotAuthed) {
    message = "SESSION_EXPIRED";
  }

  console.log("error:", err, "message: ", message, "info:", errorLog);
  throw new Error(message ? "SESSION_EXPIRED" : "SY000");
};
export default handleApiError;
