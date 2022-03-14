import React, { FC, useState, useCallback, useEffect, useMemo } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";

import {
  Button,
  VerticalNav,
  Accordion,
  AccordionItem,
} from "@cmsgov/design-system";

import {
  RESPONSE_CODE,
  ROUTES,
  ChangeRequest,
  territoryMap,
} from "cmscommonlib";

import { LocationState } from "../domain-types";
import LoadingScreen from "../components/LoadingScreen";
import FileList from "../components/FileList";
import PackageApi from "../utils/PackageApi";
import { formatDetailViewDate } from "../utils/date-utils";
import PageTitleBar from "../components/PageTitleBar";
import AlertBar from "../components/AlertBar";
import { useAppContext } from "../libs/contextLib";
import { Review } from "@cmsgov/design-system";
import { getTerritoryFromTransmittalNumber } from "./SubmissionForm";
import { ConfirmationDialog } from "../components/ConfirmationDialog";

type PathParams = {
  componentType: string;
  componentTimestamp: string;
  componentId: string;
};

type ComponentDetail = {
  componentId: string;
  title: string;
  componentType: string;
  currentStatus: string;
  attachments: any[];
  additionalInformation: string;
  submissionTimestamp: Date;
  clockEndTimestamp: Date;
  proposedEffectiveTimestamp: Date;
  effectiveDateTimestamp: Date;
  waiverAuthority?: keyof typeof AUTHORITY_LABELS;
  territory: string;
  raiResponses: any[];
};

const AUTHORITY_LABELS = {
  "1915(b)": "All other 1915(b) Waivers",
  "1915(b)(4)": "1915(b)(4) FFS Selective Contracting waivers",
} as const;

const PAGE_detail = {
  [ChangeRequest.TYPE.WAIVER_BASE]: {
    detailHeader: "Base Waiver",
    idLabel: "Waiver Number",
    actionLabel: "Package Actions",
    usesVerticalNav: true,
    actionsByStatus: ChangeRequest.defaultActionsByStatus,
    raiLink: ROUTES.WAIVER_RAI,
  },
  [ChangeRequest.TYPE.SPA]: {
    detailHeader: "Medicaid SPA",
    idLabel: "Medicaid SPA ID",
    actionLabel: "Package Actions",
    usesVerticalNav: true,
    actionsByStatus: ChangeRequest.defaultActionsByStatus,
    raiLink: ROUTES.SPA_RAI,
  },
  [ChangeRequest.TYPE.CHIP_SPA]: {
    detailHeader: "CHIP SPA",
    idLabel: "CHIP SPA ID",
    actionLabel: "Package Actions",
    usesVerticalNav: true,
    actionsByStatus: ChangeRequest.defaultActionsByStatus,
    raiLink: ROUTES.CHIP_SPA_RAI,
  },
  [ChangeRequest.TYPE.SPA_RAI]: {
    detailHeader: "RAI Response",
    idLabel: "Medicaid SPA ID",
    actionLabel: "Package Actions",
    usesVerticalNav: false,
    actionsByStatus: ChangeRequest.defaultActionsByStatus,
  },
  [ChangeRequest.TYPE.CHIP_SPA_RAI]: {
    detailHeader: "RAI Response",
    idLabel: "CHIP SPA ID",
    actionLabel: "Package Actions",
    usesVerticalNav: false,
    actionsByStatus: ChangeRequest.defaultActionsByStatus,
  },
  [ChangeRequest.TYPE.WAIVER_RAI]: {
    detailHeader: "RAI Response",
    idLabel: "Waiver Number",
    actionLabel: "Package Actions",
    usesVerticalNav: false,
    actionsByStatus: ChangeRequest.defaultActionsByStatus,
  },
  [ChangeRequest.TYPE.WAIVER_RENEWAL]: {
    detailHeader: "Waiver Renewal",
    idLabel: "Waiver Number",
    actionLabel: "Package Actions",
    usesVerticalNav: true,
    actionsByStatus: ChangeRequest.defaultActionsByStatus,
    raiLink: ROUTES.WAIVER_RAI,
  },
  [ChangeRequest.TYPE.WAIVER_AMENDMENT]: {
    detailHeader: "Waiver Amendment",
    titleHeader: "Amendment Title",
    idLabel: "Amendment Number",
    actionLabel: "Amendment Actions",
    usesVerticalNav: false,
    actionsByStatus: ChangeRequest.defaultActionsByStatus,
    raiLink: ROUTES.WAIVER_RAI,
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
    PAGE_detail[detail?.componentType ?? ChangeRequest.TYPE.SPA];

  return (
    <>
      <section>
        <div className="detail-card-top"></div>
        <div className="detail-card">
          <section>
            <h2>{detail.currentStatus}</h2>
            <Review heading="90th Day">
              {detail.clockEndTimestamp
                ? formatDetailViewDate(detail.clockEndTimestamp)
                : "N/A"}
            </Review>
            {ChangeRequest.MY_PACKAGE_GROUP[detail.componentType] ===
              ChangeRequest.PACKAGE_GROUP.WAIVER &&
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
                            actionLabel ===
                            ChangeRequest.PACKAGE_ACTION.WITHDRAW
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
          {pageConfig.titleHeader && (
            <Review heading={pageConfig.titleHeader}>
              {detail.title ?? "N/A"}
            </Review>
          )}
          {detail.waiverAuthority && (
            <Review heading="Waiver Authority">
              {AUTHORITY_LABELS[detail.waiverAuthority] ??
                detail.waiverAuthority}
            </Review>
          )}
          {detail.componentId && (
            <Review heading={pageConfig.idLabel}>{detail.componentId}</Review>
          )}
          {detail.componentType && (
            <Review heading="Type">{pageConfig.detailHeader}</Review>
          )}
          {detail.territory && (
            <Review heading="State">{territoryMap[detail.territory]}</Review>
          )}
          {detail.submissionTimestamp && (
            <Review heading="Date Submitted">
              {formatDetailViewDate(detail.submissionTimestamp)}
            </Review>
          )}
          {ChangeRequest.MY_PACKAGE_GROUP[detail.componentType] ===
            ChangeRequest.PACKAGE_GROUP.WAIVER && (
            <Review heading="Proposed Effective Date">
              {detail.proposedEffectiveTimestamp
                ? formatDetailViewDate(detail.proposedEffectiveTimestamp)
                : "N/A"}
            </Review>
          )}
        </section>
        <section className="detail-section">
          <FileList
            heading="Base Supporting Documentation"
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

enum DetailViewTab {
  DETAIL = "component-details",
  ADDITIONAL = "additional-info",
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
    label: ChangeRequest.PACKAGE_ACTION;
    confirmationMessage: string;
    onAccept: () => void;
  } | null>(null);

  const detailTab = location.hash.substring(1) || DetailViewTab.DETAIL;

  // so we show the spinner during the data load
  const [isLoading, setIsLoading] = useState(true);

  // The record we are using for the form.
  const [detail, setDetail] = useState<ComponentDetail>();
  const pageConfig =
    PAGE_detail[detail?.componentType ?? ChangeRequest.TYPE.SPA];

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
        ],
      },
    ],
    []
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
              {!pageConfig.usesVerticalNav && (
                <>
                  <br />
                  <br />
                </>
              )}
              {(!pageConfig.usesVerticalNav ||
                detailTab === DetailViewTab.ADDITIONAL) && (
                <AdditionalInfoSection detail={detail} />
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
