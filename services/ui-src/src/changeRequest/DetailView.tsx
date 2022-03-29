import React, { FC, useState, useCallback, useEffect, useMemo } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { format, parseISO } from "date-fns";
import classNames from "classnames";

import {
  Button,
  VerticalNav,
  Accordion,
  AccordionItem,
  Review,
} from "@cmsgov/design-system";

import {
  RESPONSE_CODE,
  ROUTES,
  Workflow,
  territoryMap,
  getUserRoleObj,
} from "cmscommonlib";

import { LocationState } from "../domain-types";
import LoadingScreen from "../components/LoadingScreen";
import FileList from "../components/FileList";
import PackageApi from "../utils/PackageApi";
import { formatDetailViewDate } from "../utils/date-utils";
import PageTitleBar from "../components/PageTitleBar";
import AlertBar from "../components/AlertBar";
import { useAppContext } from "../libs/contextLib";
import { getTerritoryFromTransmittalNumber } from "./SubmissionForm";
import { ConfirmationDialog } from "../components/ConfirmationDialog";
import PortalTable from "../components/PortalTable";
import PopupMenu from "../components/PopupMenu";

type PathParams = {
  componentType: string;
  componentTimestamp: string;
  componentId: string;
};

type ComponentDetail = {
  componentId: string;
  title: string;
  componentType: string;
  typeNice: string;
  currentStatus: string;
  attachments: any[];
  additionalInformation: string;
  submissionTimestamp: Date;
  clockEndTimestamp: Date;
  proposedEffectiveTimestamp: Date;
  effectiveDateTimestamp: Date;
  waiverAuthority?: keyof typeof AUTHORITY_LABELS;
  waiverAuthorityNice?: string;
  territory: string;
  territoryNice: string;
  raiResponses: any[];
  waiverExtensions: any[];
} & Record<string, any>;

type PortalMenuItem = {
  label: string;
  value?: any;
  formatConfirmationMessage?: (componentId: any) => string;
  handleSelected?: (rownum: string) => any;
} & Record<string, any>;

const AUTHORITY_LABELS = {
  "1915(b)": "All other 1915(b) Waivers",
  "1915(b)(4)": "1915(b)(4) FFS Selective Contracting waivers",
} as const;

const submissionDateDefault = {
  heading: "Date Submitted",
  fieldName: "submissionDateNice",
  default: null,
};
const waiverAuthorityDefault = {
  heading: "Waiver Authority",
  fieldName: "waiverAuthorityNice",
  default: "N/A",
};
const typeDefault = { heading: "Type", fieldName: "typeNice", default: "N/A" };
const territoryDefault = {
  heading: "State",
  fieldName: "territoryNice",
  default: null,
};
const proposedEffectiveDateDefault = {
  heading: "Proposed Effective Date",
  fieldName: "proposedEffectiveDateNice",
  default: "N/A",
};

const defaultPage = {
  actionLabel: "Package Actions",
  attachmentsHeading: "Base Supporting Documentation",
  usesVerticalNav: true,
  actionsByStatus: Workflow.defaultActionsByStatus,
  detailHeader: "Package",
  raiLink: ROUTES.WAIVER_RAI,
  defaultTitle: null,
  detailsSection: [
    waiverAuthorityDefault,
    { heading: "Waiver Number", fieldName: "componentId", default: "N/A" },
    typeDefault,
    territoryDefault,
    submissionDateDefault,
    proposedEffectiveDateDefault,
  ],
};

const PAGE_detail = {
  default: defaultPage,
  [Workflow.ONEMAC_TYPE.WAIVER_BASE]: {
    ...defaultPage,
  },
  [Workflow.ONEMAC_TYPE.SPA]: {
    ...defaultPage,
    raiLink: ROUTES.SPA_RAI,
    detailsSection: [
      { heading: "Medicaid SPA ID", fieldName: "componentId", default: "N/A" },
      typeDefault,
      territoryDefault,
      submissionDateDefault,
    ],
  },
  [Workflow.ONEMAC_TYPE.CHIP_SPA]: {
    ...defaultPage,
    raiLink: ROUTES.CHIP_SPA_RAI,
    detailsSection: [
      { heading: "CHIP SPA ID", fieldName: "componentId", default: "N/A" },
      typeDefault,
      territoryDefault,
      submissionDateDefault,
    ],
  },
  [Workflow.ONEMAC_TYPE.WAIVER_RENEWAL]: {
    ...defaultPage,
  },
  [Workflow.ONEMAC_TYPE.WAIVER_AMENDMENT]: {
    ...defaultPage,
    actionLabel: "Amendment Actions",
    usesVerticalNav: false,
    detailHeader: "Waiver Amendment",
    attachmentsHeading: "Supporting Documentation",
    defaultTitle: "Waiver Amendment",
    detailsSection: [
      { heading: "Amendment Number", fieldName: "componentId", default: "N/A" },
      { heading: "Amendment Title", fieldName: "title", default: "N/A" },
      {
        heading: "Waiver Authority",
        fieldName: "waiverAuthorityNice",
        default: "N/A",
      },
    ],
  },
};

const DetailSection = ({
  detail,
  loadDetail,
  setAlertCode,
  setConfirmItem,
}: {
  detail: ComponentDetail;
  loadDetail: () => void;
  setAlertCode: (code: string) => void;
  setConfirmItem: (item: any) => void;
}) => {
  const history = useHistory();
  const { userProfile } = useAppContext() ?? {};

  const downloadInfoText =
    "Documents available on this page may not reflect the actual documents that were approved by CMS. Please refer to your CMS Point of Contact for the approved documents.";

  const ninetyDayText = Workflow.get90thDayText(
    detail.currentStatus,
    detail.clockEndTimestamp
  );

  const onLinkActionWithdraw = useCallback(async () => {
    // For now, the second argument is constant.
    // When we add another action to the menu, we will need to look at the action taken here.

    try {
      const resp = await PackageApi.withdraw(
        userProfile?.userData?.fullName,
        userProfile?.email,
        detail?.componentId,
        detail?.componentType
      );
      setAlertCode(resp);
      loadDetail();
    } catch (e) {
      console.log("Error while updating package.", e);
      setAlertCode(RESPONSE_CODE[(e as Error).message]);
    }
  }, [detail, userProfile, loadDetail, setAlertCode]);

  const onLinkActionRAI = useCallback(
    (value) => {
      history.push(`${value.href}`);
    },
    [history]
  );

  const pageConfig =
    PAGE_detail[detail?.componentType ?? "default"] ?? PAGE_detail["default"];

  return (
    <>
      {(detail.title || pageConfig.defaultTitle) && (
        <section className="detail-title">
          <h2>{detail.title ?? pageConfig.defaultTitle}</h2>
        </section>
      )}
      <section>
        <div className="detail-card-top"></div>
        <div className="detail-card">
          <section>
            <h2>{detail.currentStatus}</h2>
            {ninetyDayText && ninetyDayText !== "N/A" && (
              <Review heading="90th Day">
                {Number(ninetyDayText)
                  ? formatDetailViewDate(new Date(ninetyDayText))
                  : ninetyDayText ?? "N/A"}
              </Review>
            )}
            {Workflow.MY_PACKAGE_GROUP[detail.componentType] ===
              Workflow.PACKAGE_GROUP.WAIVER &&
              detail.effectiveDateTimestamp && (
                <Review heading="Effective Date">
                  {formatDetailViewDate(detail.effectiveDateTimestamp)}
                </Review>
              )}
          </section>
          <section className="package-actions">
            <h2>{pageConfig.actionLabel}</h2>
            <ul className="action-list">
              {pageConfig.actionsByStatus[detail.currentStatus]?.length > 0 ? (
                pageConfig.actionsByStatus[detail.currentStatus]?.map(
                  (actionLabel, index) => {
                    return (
                      <li key={index}>
                        <Button
                          className="package-action-link"
                          onClick={
                            actionLabel === Workflow.PACKAGE_ACTION.WITHDRAW
                              ? () => {
                                  setConfirmItem({
                                    label: actionLabel,
                                    confirmationMessage: `You are about to withdraw ${detail.componentId}. Once complete, you will not be able to resubmit this package. CMS will be notified.`,
                                    onAccept: onLinkActionWithdraw,
                                  });
                                }
                              : () => {
                                  onLinkActionRAI({
                                    href: `${pageConfig.raiLink}?transmittalNumber=${detail.componentId}`,
                                  });
                                }
                          }
                        >
                          {actionLabel}
                        </Button>
                      </li>
                    );
                  }
                )
              ) : (
                <p>No actions are currently available for this submission.</p>
              )}
            </ul>
          </section>
        </div>
      </section>
      <div className="read-only-submission">
        <section className="detail-section">
          <h2>{pageConfig.detailHeader} Details</h2>
          {pageConfig.detailsSection?.map(
            (item, index) =>
              (detail[item.fieldName] || item.default) && (
                <Review key={index} heading={item.heading}>
                  {detail[item.fieldName] ?? item.default}
                </Review>
              )
          )}
        </section>
        <section className="detail-section ds-u-margin-bottom--7">
          <FileList
            heading={pageConfig.attachmentsHeading}
            infoText={downloadInfoText}
            uploadList={detail.attachments}
            zipId={detail.componentId}
          />
        </section>
        {detail.raiResponses && (
          <section className="detail-section">
            <h2>RAI Responses</h2>
            <Accordion>
              {detail.raiResponses?.map((raiResponse, index) => {
                let raiNumber = (detail.raiResponses.length - index)
                  .toString()
                  .padStart(2, "0");
                return (
                  <AccordionItem
                    buttonClassName="accordion-button"
                    contentClassName="accordion-content"
                    heading={"RAI - " + raiNumber}
                    headingLevel="6"
                    id={raiResponse.componentType + index + "_caret"}
                    key={raiResponse.componentType + index}
                    defaultOpen={index === 0}
                  >
                    <FileList
                      heading={"RAI Response Documentation"}
                      infoText={downloadInfoText}
                      uploadList={raiResponse.attachments}
                      zipId={raiResponse.componentType + index}
                    />
                    {raiResponse.additionalInformation && (
                      <section
                        id={"addl-info-rai-" + index}
                        className="detail-section"
                      >
                        <h2>Additional Information</h2>
                        <Review
                          className="original-review-component"
                          headingLevel="2"
                        >
                          {raiResponse.additionalInformation}
                        </Review>
                      </section>
                    )}
                  </AccordionItem>
                );
              })}
            </Accordion>
          </section>
        )}
      </div>
    </>
  );
};

const AdditionalInfoSection: FC<{ detail: ComponentDetail }> = ({ detail }) => {
  return (
    <>
      <section id="addl-info-base" className="read-only-submission">
        <h2>Additional Information</h2>
        <Review className="original-review-component" headingLevel="2">
          {detail.additionalInformation || (
            <i>No Additional Information has been submitted.</i>
          )}
        </Review>
      </section>
    </>
  );
};

const TemporaryExtensionSection: FC<{
  detail: ComponentDetail;
  loadDetail: () => void;
  setAlertCode: (code: string) => void;
}> = ({ detail, loadDetail, setAlertCode }) => {
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
      const packageConfig = PAGE_detail[row.original.componentType];
      let menuItems: PortalMenuItem[] = [];

      (packageConfig?.actionsByStatus ?? Workflow.defaultActionsByStatus)[
        row.original.currentStatus
      ]?.forEach((actionLabel) => {
        let newItem: PortalMenuItem = { label: actionLabel };
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

  const tempExtColumns = useMemo(
    () => [
      {
        Header: "Extension Id",
        accessor: "componentId",
      },
      {
        Header: "Status",
        accessor: "currentStatus",
      },
      {
        Header: "Actions",
        accessor: "actions",
        id: "packageActions",
        Cell: renderActions,
      },
    ],
    [renderActions]
  );

  return (
    <section id="temp-ext-base" className="read-only-submission ">
      <h2>Temporary Extensions</h2>
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

enum DetailViewTab {
  DETAIL = "component-details",
  ADDITIONAL = "additional-info",
  EXTENSION = "temp-extenstion",
}

/**
 * Given an id and the relevant submission type forminfo, show the detail
 */
const DetailView = () => {
  // The browser history, so we can redirect to the home page
  const history = useHistory();
  const { componentType, componentTimestamp, componentId } =
    useParams<PathParams>();
  const location = useLocation<LocationState>();
  const [alertCode, setAlertCode] = useState(location?.state?.passCode);
  const [confirmItem, setConfirmItem] = useState<{
    label: Workflow.PACKAGE_ACTION;
    confirmationMessage: string;
    onAccept: () => void;
  } | null>(null);

  const detailTab = location.hash.substring(1) || DetailViewTab.DETAIL;

  // so we show the spinner during the data load
  const [isLoading, setIsLoading] = useState(true);

  // The record we are using for the form.
  const [detail, setDetail] = useState<ComponentDetail>();
  const pageConfig =
    PAGE_detail[detail?.componentType ?? "default"] ?? PAGE_detail["default"];

  function closedAlert() {
    setAlertCode(RESPONSE_CODE.NONE);
  }
  const closeConfirmation = useCallback(() => setConfirmItem(null), []);

  const loadDetail = useCallback(
    async (ctrlr?: AbortController) => {
      let fetchedDetail;
      let stillLoading = true;

      try {
        fetchedDetail = (await PackageApi.getDetail(
          componentId,
          componentType,

          componentTimestamp
        )) as ComponentDetail;
        if (!fetchedDetail.territory)
          fetchedDetail.territory = getTerritoryFromTransmittalNumber(
            fetchedDetail.componentId
          );
        fetchedDetail.territoryNice = territoryMap[fetchedDetail.territory];
        fetchedDetail.typeNice =
          Workflow.ONEMAC_LABEL[fetchedDetail.componentType];

        if (fetchedDetail.waiverAuthority) {
          fetchedDetail.waiverAuthorityNice =
            AUTHORITY_LABELS[fetchedDetail.waiverAuthority];
        }
        if (fetchedDetail.submissionTimestamp) {
          fetchedDetail.submissionDateNice = formatDetailViewDate(
            fetchedDetail.submissionTimestamp
          );
        }
        if (fetchedDetail.proposedEffectiveDate) {
          const effDate = parseISO(fetchedDetail.proposedEffectiveDate);

          fetchedDetail.proposedEffectiveDateNice = format(
            effDate,
            "MMM d yyyy"
          );
        }
        console.log("got the package: ", fetchedDetail);
        stillLoading = false;
      } catch (e) {
        history.push({
          pathname: ROUTES.DASHBOARD,
          state: {
            passCode: RESPONSE_CODE.SYSTEM_ERROR,
          },
        });
      }

      if (!ctrlr?.signal.aborted) setDetail(fetchedDetail);
      if (!ctrlr?.signal.aborted) setIsLoading(stillLoading);
    },
    [history, componentId, componentType, componentTimestamp]
  );

  const navItems = useMemo(
    () => [
      {
        label: "Package Overview",
        items: [
          {
            id: DetailViewTab.DETAIL,
            label: "Package Details",
            url: `#${DetailViewTab.DETAIL}`,
          },
          {
            id: DetailViewTab.ADDITIONAL,
            label: "Additional Information",
            url: `#${DetailViewTab.ADDITIONAL}`,
          },
          Workflow.ALLOW_WAIVER_EXTENSION_TYPE.includes(componentType) && {
            id: DetailViewTab.EXTENSION,
            label: "Temporary Extension",
            url: `#${DetailViewTab.EXTENSION}`,
          },
        ],
      },
    ],
    [componentType]
  );

  useEffect(() => {
    const ctrlr = new AbortController();

    loadDetail(ctrlr);

    return function cleanup() {
      ctrlr.abort();
    };
  }, [componentId, componentType, componentTimestamp, loadDetail]);

  return (
    <LoadingScreen isLoading={isLoading}>
      <PageTitleBar
        backTo={ROUTES.PACKAGE_LIST}
        heading={detail && detail.componentId}
        enableBackNav
      />
      <AlertBar alertCode={alertCode} closeCallback={closedAlert} />
      {detail && (
        <div className="form-container">
          <div className="component-detail-wrapper">
            {pageConfig.usesVerticalNav && (
              <VerticalNav
                // component="button"
                items={navItems}
                selectedId={detailTab}
              />
            )}
            <article className="component-detail">
              {detailTab === DetailViewTab.DETAIL && (
                <DetailSection
                  detail={detail}
                  loadDetail={loadDetail}
                  setAlertCode={setAlertCode}
                  setConfirmItem={setConfirmItem}
                />
              )}
              {(!pageConfig.usesVerticalNav ||
                detailTab === DetailViewTab.ADDITIONAL) && (
                <AdditionalInfoSection detail={detail} />
              )}
              {detailTab === DetailViewTab.EXTENSION && (
                <TemporaryExtensionSection
                  detail={detail}
                  loadDetail={loadDetail}
                  setAlertCode={setAlertCode}
                />
              )}
            </article>
          </div>
        </div>
      )}
      {confirmItem && (
        <ConfirmationDialog
          acceptText={confirmItem.label + "?"}
          heading={confirmItem.label}
          onAccept={() => {
            confirmItem.onAccept();
            closeConfirmation();
          }}
          onCancel={closeConfirmation}
        >
          {confirmItem.confirmationMessage}
        </ConfirmationDialog>
      )}
    </LoadingScreen>
  );
};

export default DetailView;
