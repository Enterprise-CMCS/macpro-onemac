export const logAttempt = (functionName, attemptType, ipAddress, user) => {
  const currentTimeStamp = new Date().toISOString();
  ipAddress = ipAddress ?? "Not found";
  const attemptStatus = attemptType ? "success" : "failure";
  const role = user ? user.role : "Not found";
  const message = `attempts ${functionName}: ${attemptStatus} | request timestamp: ${currentTimeStamp} | userRole: ${role} | IP address: ${ipAddress}`;
  console.log(message);
};
