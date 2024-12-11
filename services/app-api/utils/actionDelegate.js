import { Workflow } from "cmscommonlib";
import { init } from "@launchdarkly/node-server-sdk";

// Global variable to hold the LD client so it's reused on subsequent invocations
let ldClient;

async function initializeLaunchDarkly() {
  if (!ldClient) {
    ldClient = init(process.env.launchDarklySdkKey, {
      baseUri: "https://clientsdk.launchdarkly.us",
      streamUri: "https://clientstream.launchdarkly.us",
      eventsUri: "https://events.launchdarkly.us",
    });

    try {
      await ldClient.waitForInitialization({ timeout: 10 });
      console.log("LD Initialization successful");
    } catch (err) {
      console.error("LD Initialization failed:", err.message || err);
    }
  }
}

function getDefaultActions(
  packageStatus,
  hasRaiResponse,
  packageSubStatus,
  userRole,
  formSource
) {
  const actions = [];
  switch (packageStatus) {
    case Workflow.ONEMAC_STATUS.PENDING:
      if (userRole.canAccessForms) {
        actions.push(Workflow.PACKAGE_ACTION.WITHDRAW);
        actions.push(Workflow.PACKAGE_ACTION.SUBSEQUENT_SUBMISSION);
      }
      if (
        userRole.isCMSUser &&
        hasRaiResponse &&
        packageSubStatus !== Workflow.ONEMAC_STATUS.WITHDRAW_RAI_ENABLED &&
        formSource === "detail"
      ) {
        actions.push(Workflow.PACKAGE_ACTION.ENABLE_RAI_WITHDRAWAL);
      }
      break;
    case Workflow.ONEMAC_STATUS.PENDING_CONCURRENCE:
    case Workflow.ONEMAC_STATUS.PENDING_APPROVAL:
      if (userRole.canAccessForms) {
        actions.push(Workflow.PACKAGE_ACTION.WITHDRAW);
        actions.push(Workflow.PACKAGE_ACTION.SUBSEQUENT_SUBMISSION);
      }
      break;
    case Workflow.ONEMAC_STATUS.RAI_ISSUED:
      if (userRole.canAccessForms)
        actions.push(
          Workflow.PACKAGE_ACTION.WITHDRAW,
          Workflow.PACKAGE_ACTION.RESPOND_TO_RAI
        );
      break;
  }

  if (packageSubStatus === Workflow.ONEMAC_STATUS.WITHDRAW_RAI_ENABLED) {
    if (userRole.canAccessForms)
      actions.push(Workflow.PACKAGE_ACTION.WITHDRAW_RAI);
    if (userRole.isCMSUser && formSource === "detail") {
      actions.push(Workflow.PACKAGE_ACTION.DISABLE_RAI_WITHDRAWAL);
    }
  }

  return actions;
}

function getWaiverActions(packageStatus, userRole) {
  const actions = [];
  if (
    packageStatus === Workflow.ONEMAC_STATUS.APPROVED &&
    userRole.canAccessForms
  ) {
    actions.push(
      Workflow.PACKAGE_ACTION.REQUEST_TEMPORARY_EXTENSION,
      Workflow.PACKAGE_ACTION.ADD_AMENDMENT
    );
  }
  return actions;
}

function getWaiverExtensionActions(packageStatus, userRole) {
  const actions = [];
  if (
    packageStatus === Workflow.ONEMAC_STATUS.RAI_ISSUED &&
    userRole.canAccessForms
  ) {
    actions.push(Workflow.PACKAGE_ACTION.WITHDRAW);
  }
  return actions;
}

export async function getActionsForPackage(
  packageType,
  packageStatus,
  hasRaiResponse,
  packageSubStatus,
  userRole,
  formSource
) {
  // Initialize LaunchDarkly client (if not already initialized)
  await initializeLaunchDarkly();

  const ENABLE_SUBSEQUENT_SUBMISSION = await ldClient.variation(
    "enableSubsequentDocumentation",
    { key: userRole },
    false
  );
  console.log("Flag value:", ENABLE_SUBSEQUENT_SUBMISSION);

  let actions = getDefaultActions(
    packageStatus,
    hasRaiResponse,
    packageSubStatus,
    userRole,
    formSource
  );

  switch (packageType) {
    case Workflow.ONEMAC_TYPE.WAIVER:
    case Workflow.ONEMAC_TYPE.WAIVER_INITIAL:
    case Workflow.ONEMAC_TYPE.WAIVER_RENEWAL:
      actions.push(...getWaiverActions(packageStatus, userRole));
      break;
    case Workflow.ONEMAC_TYPE.WAIVER_EXTENSION:
    case Workflow.ONEMAC_TYPE.WAIVER_EXTENSION_B:
    case Workflow.ONEMAC_TYPE.WAIVER_EXTENSION_C:
      actions.push(
        ...getDefaultActions(
          packageStatus,
          hasRaiResponse,
          userRole,
          formSource
        ),
        ...getWaiverExtensionActions(packageStatus, userRole)
      );
      //Extensions should remove SUBSEQUENT_SUBMISSION action
      actions = actions.filter(
        (action) => action !== Workflow.PACKAGE_ACTION.SUBSEQUENT_SUBMISSION
      );
      break;
  }

  const uniqueActions = actions.filter((action, index) => {
    // Filter out SUBSEQUENT_SUBMISSION if not enabled
    const isNotSubsequentSubmission =
      action !== Workflow.PACKAGE_ACTION.SUBSEQUENT_SUBMISSION ||
      ENABLE_SUBSEQUENT_SUBMISSION;

    // Remove duplicates: only keep the first occurrence of each action
    const isUnique = actions.indexOf(action) === index;

    return isNotSubsequentSubmission && isUnique;
  });

  return uniqueActions;
}
