import { Workflow } from "cmscommonlib";
function getDefaultActions(
  packageStatus,
  hasRaiResponse,
  userRole,
  formSource
) {
  const actions = [];
  switch (packageStatus) {
    case Workflow.ONEMAC_STATUS.PENDING:
      if (userRole.canAccessForms)
        actions.push(Workflow.PACKAGE_ACTION.WITHDRAW);
      if (userRole.isCMSUser && hasRaiResponse && formSource === "detail") {
        actions.push(Workflow.PACKAGE_ACTION.ENABLE_RAI_WITHDRAWAL);
      }
      break;
    case Workflow.ONEMAC_STATUS.PENDING_CONCURRENCE:
    case Workflow.ONEMAC_STATUS.PENDING_APPROVAL:
      if (userRole.canAccessForms)
        actions.push(Workflow.PACKAGE_ACTION.WITHDRAW);
      break;
    case Workflow.ONEMAC_STATUS.RAI_ISSUED:
      if (userRole.canAccessForms)
        actions.push(
          Workflow.PACKAGE_ACTION.WITHDRAW,
          Workflow.PACKAGE_ACTION.RESPOND_TO_RAI
        );
      break;
    case Workflow.ONEMAC_STATUS.RAI_RESPONSE_WITHDRAW_ENABLED:
      if (userRole.canAccessForms)
        actions.push(Workflow.PACKAGE_ACTION.WITHDRAW_RAI_RESPONSE);
      break;
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

export function getActionsForPackage(
  packageType,
  packageStatus,
  hasRaiResponse,
  userRole,
  formSource
) {
  const actions = [];
  switch (packageType) {
    case Workflow.ONEMAC_TYPE.CHIP_SPA:
    case Workflow.ONEMAC_TYPE.MEDICAID_SPA:
    case Workflow.ONEMAC_TYPE.WAIVER_AMENDMENT:
    case Workflow.ONEMAC_TYPE.WAIVER_APP_K:
    case Workflow.ONEMAC_TYPE.WAIVER_RAI:
    case Workflow.ONEMAC_TYPE.CHIP_SPA_RAI:
    case Workflow.ONEMAC_TYPE.MEDICAID_SPA_RAI:
      actions.push(
        ...getDefaultActions(
          packageStatus,
          hasRaiResponse,
          userRole,
          formSource
        )
      );
      break;
    case Workflow.ONEMAC_TYPE.WAIVER:
    case Workflow.ONEMAC_TYPE.WAIVER_INITIAL:
    case Workflow.ONEMAC_TYPE.WAIVER_RENEWAL:
      actions.push(
        ...getDefaultActions(
          packageStatus,
          hasRaiResponse,
          userRole,
          formSource
        ),
        ...getWaiverActions(packageStatus, userRole)
      );
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
      break;
  }
  return actions;
}
