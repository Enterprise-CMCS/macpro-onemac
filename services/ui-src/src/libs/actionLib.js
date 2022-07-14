import React from "react";
import { Workflow } from "cmscommonlib";
import RequestTemporaryExtension from "../page/action/RequestTemporaryExtension";
import RespondToRAI from "../page/action/RespondToRAI";
import Withdraw from "../page/action/Withdraw";

export const actionComponent = {
  [Workflow.PACKAGE_ACTION.WITHDRAW]: (theComponent, alertCallback) => (
    <Withdraw theComponent={theComponent} alertCallback={alertCallback} />
  ),
  [Workflow.PACKAGE_ACTION.RESPOND_TO_RAI]: (theComponent) => (
    <RespondToRAI theComponent={theComponent} />
  ),
  [Workflow.PACKAGE_ACTION.REQUEST_TEMPORARY_EXTENSION]: (theComponent) => (
    <RequestTemporaryExtension theComponent={theComponent} />
  ),
};
