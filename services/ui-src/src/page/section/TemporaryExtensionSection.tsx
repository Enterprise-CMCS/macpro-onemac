import { Button } from "@cmsgov/design-system";
import classNames from "classnames";
import {
  getUserRoleObj,
  ONEMAC_ROUTES,
  RESPONSE_CODE,
  Workflow,
} from "cmscommonlib";
import React, { FC, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import PopupMenu from "../../components/PopupMenu";
import PortalTable from "../../components/PortalTable";
import { FormLocationState } from "../../domain-types";
import { useAppContext } from "../../libs/contextLib";
import { OneMACDetail } from "../../libs/detailLib";
import PackageApi from "../../utils/PackageApi";
import { ComponentDetail } from "../DetailView";

type PopupMenuItem = {
  label: string;
  value?: any;
  formatConfirmationMessage?: (componentId: any) => string;
  handleSelected?: (rownum: string) => any;
} & Record<string, any>;

export const TemporaryExtensionSection: FC<{
  pageConfig: OneMACDetail;
  detail: ComponentDetail;
  loadDetail: () => void;
  setAlertCode: (code: string) => void;
}> = ({ pageConfig, detail, loadDetail, setAlertCode }) => {
  const { userProfile } = useAppContext() ?? {};
  const userRoleObj = getUserRoleObj(userProfile?.userData?.roleList);

  const tableClassName = classNames({
    "submissions-table-mini-dash": true,
    "submissions-table-actions-column": userRoleObj.canAccessForms,
  });

  //TODO: This should point to....something?
  const extTableRef = React.createRef<HTMLElement>();

  const onPopupActionWithdraw = useCallback(
    async (rowNum) => {
      let packageToModify = detail?.waiverExtensions[rowNum];
      try {
        console.log("package to modify ", packageToModify);
        const resp = await PackageApi.withdraw(
          userProfile?.userData?.fullName,
          userProfile?.email,
          packageToModify.componentId,
          packageToModify.componentType
        );
        setAlertCode(resp);
        loadDetail();
      } catch (e: any) {
        console.log("Error while updating package.", e);
        setAlertCode(RESPONSE_CODE[e.message]);
      }
    },
    [detail, userProfile, setAlertCode, loadDetail]
  );

  const renderActions = useCallback(
    ({ row }) => {
      let menuItems: PopupMenuItem[] = [];

      Workflow.waiverExtensionActionsByStatus[
        row.original.currentStatus
      ]?.forEach((actionLabel) => {
        let newItem: PopupMenuItem = { label: actionLabel };
        if (actionLabel === Workflow.PACKAGE_ACTION.WITHDRAW) {
          newItem.value = "Withdrawn";
          newItem.formatConfirmationMessage = ({ componentId }) =>
            `You are about to withdraw the temporary extension for ${componentId}. Once complete, you will not be able to resubmit this package. CMS will be notified.`;
          newItem.handleSelected = onPopupActionWithdraw;
        }
        menuItems.push(newItem);
      });

      return (
        <PopupMenu
          buttonLabel={`Actions for ${row.original.componentId}`}
          selectedRow={row}
          menuItems={menuItems}
          variation="PackageList"
        />
      );
    },
    [onPopupActionWithdraw]
  );

  const renderTempExtLink = useCallback((props: { value: string }) => {
    return (
      <Link to={ONEMAC_ROUTES.TEMPORARY_EXTENSION_DETAIL + "/" + props.value}>
        {props.value}
      </Link>
    );
  }, []);

  const tempExtColumns = useMemo(() => {
    const theColumns: Column[] = [
      {
        Header: "Extension Id",
        accessor: "componentId",
        Cell: renderTempExtLink,
      },
      {
        Header: "Status",
        accessor: "currentStatus",
      },
    ];
    if (userRoleObj.canAccessForms)
      theColumns.push({
        Header: "Actions",
        accessor: "actions",
        id: "packageActions",
        Cell: renderActions,
      });

    return theColumns;
  }, [renderActions, renderTempExtLink, userRoleObj.canAccessForms]);

  return (
    <section id="temp-ext-base" className="read-only-submission ">
      <div className="mini-dashboard-title">
        <h2>Temporary Extensions</h2>
        {userRoleObj.canAccessForms &&
          pageConfig.actionsByStatus[detail.currentStatus]?.includes(
            Workflow.PACKAGE_ACTION.REQUEST_TEMPORARY_EXTENSION
          ) && (
            <Link<FormLocationState>
              to={{
                pathname: ONEMAC_ROUTES.TEMPORARY_EXTENSION,
                state: {
                  parentId: detail.componentId,
                  parentType: detail.componentType,
                },
              }}
            >
              <Button id="new-temp-ext-button" variation="primary">
                Request Extension
              </Button>
            </Link>
          )}
      </div>
      <div className="ds-u-padding-top--3" />
      <PortalTable
        className={tableClassName}
        columns={tempExtColumns}
        data={detail.waiverExtensions}
        pageContentRef={extTableRef}
      />
      {detail.waiverExtensions.length === 0 && (
        <div className="no-results no-results-message">
          <p>No currently submitted temporary extensions</p>
        </div>
      )}
    </section>
  );
};

export default TemporaryExtensionSection;
