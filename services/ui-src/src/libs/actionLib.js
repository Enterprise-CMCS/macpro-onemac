import React from "react";
import { Workflow } from "cmscommonlib";
import RequestTemporaryExtension from "../page/action/RequestTemporaryExtension";
import RespondToRAI from "../page/action/RespondToRAI";
import Withdraw from "../page/action/Withdraw";
import AddAmendment from "../page/action/AddAmendment";
import EnableWithdraw from "../page/action/EnableWithdraw";

export const actionComponent = {
  [Workflow.PACKAGE_ACTION.WITHDRAW]: (theComponent, formSource) => (
    <Withdraw theComponent={theComponent} formSource={formSource} />
  ),
  [Workflow.PACKAGE_ACTION.RESPOND_TO_RAI]: (theComponent) => (
    <RespondToRAI theComponent={theComponent} />
  ),
  [Workflow.PACKAGE_ACTION.REQUEST_TEMPORARY_EXTENSION]: (theComponent) => (
    <RequestTemporaryExtension theComponent={theComponent} />
  ),
  [Workflow.PACKAGE_ACTION.ADD_AMENDMENT]: (theComponent) => (
    <AddAmendment theComponent={theComponent} />
  ),
  [Workflow.PACKAGE_ACTION.ENABLE_RAI_WITHDRAWAL]: (theComponent) => (
    <EnableWithdraw theComponent={theComponent} />
  ),
};
