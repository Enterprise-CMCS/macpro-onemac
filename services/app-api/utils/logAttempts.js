export const logAttempt = (functionName, attemptType, req, user) => {
  const currentTimeStamp = new Date().toISOString();
  const ipAddress = (
    req.headers["x-forwarded-for"] || req.connection.remoteAddress
  ).split(",")[0];
  const attemptStatus = attemptType ? "success" : "failure";
  if (!user) user.role = "NA";
  const message = `attempts ${functionName}: ${attemptStatus} | request timestamp: ${currentTimeStamp} | userRoles: ${user.role} | IP address: ${ipAddress}`;

  console.log(message);
};
