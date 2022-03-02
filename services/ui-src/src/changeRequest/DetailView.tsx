import React, { useState, useCallback, useEffect, useMemo } from "react";
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
  componentType: string;
  currentStatus: string;
  attachments: any[];
  additionalInformation: string;
  submissionTimestamp: Date;
  clockEndTimestamp: Date;
  waiverAuthority?: keyof typeof AUTHORITY_LABELS;
  territory: string;
  children: any[];
};

const AUTHORITY_LABELS = {
  "1915(b)": "All other 1915(b) Waivers",
  "1915(b)(4)": "1915(b)(4) FFS Selective Contracting waivers",
} as const;

const PAGE_detail = {
  [ChangeRequest.TYPE.WAIVER_BASE]: {
    detailHeader: "Base Waiver",
    idLabel: "Waiver Number",
  },
  [ChangeRequest.TYPE.SPA]: {
    detailHeader: "Medicaid SPA",
    idLabel: "Medicaid SPA ID",
  },
  [ChangeRequest.TYPE.CHIP_SPA]: {
    detailHeader: "CHIP SPA",
    idLabel: "CHIP SPA ID",
  },
  [ChangeRequest.TYPE.SPA_RAI]: {
    detailHeader: "RAI Response",
    idLabel: "Medicaid SPA ID",
  },
  [ChangeRequest.TYPE.CHIP_SPA_RAI]: {
    detailHeader: "RAI Response",
    idLabel: "CHIP SPA ID",
  },
  waiverrai: {
    detailHeader: "RAI Response",
    idLabel: "Waiver Number",
  },
  waiverrenewal: {
    detailHeader: "Waiver Renewal",
    idLabel: "Waiver Number",
  },
  waiveramendment: {
    detailHeader: "Waiver Amendment",
    idLabel: "Waiver Number",
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

  const packageConfig = ChangeRequest.CONFIG[detail?.componentType ?? ""];

  return (
    <>
      <section>
        <div className="detail-card-top"></div>
        <div className="detail-card">
          <section>
            <h2>{detail.currentStatus}</h2>
            {detail.clockEndTimestamp && (
              <Review heading="90th Day">
                {formatDetailViewDate(detail.clockEndTimestamp)}
              </Review>
            )}
          </section>
          <section className="package-actions">
            <h2>Package Actions</h2>
            <ul className="action-list">
              {(packageConfig?.actionsByStatus ??
                ChangeRequest.defaultActionsByStatus)[
                detail.currentStatus
              ]?.map((actionLabel, index) => {
                return (
                  <li key={index}>
                    <Button
                      className="package-action-link"
                      onClick={
                        actionLabel === ChangeRequest.PACKAGE_ACTION.WITHDRAW
                          ? () => {
                              setConfirmItem({
                                label: actionLabel,
                                confirmationMessage: `You are about to withdraw ${detail.componentId}. Once complete, you will not be able to resubmit this package. CMS will be notified.`,
                                onAccept: onLinkActionWithdraw,
                              });
                            }
                          : () => {
                              onLinkActionRAI({
                                href: `${packageConfig.raiLink}?transmittalNumber=${detail.componentId}`,
                              });
                            }
                      }
                    >
                      {actionLabel}
                    </Button>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </section>
      <div className="read-only-submission">
        <section className="detail-section">
          <h2>Package Details</h2>
          {detail.waiverAuthority && (
            <Review heading="Waiver Authority">
              {AUTHORITY_LABELS[detail.waiverAuthority] ??
                detail.waiverAuthority}
            </Review>
          )}
          {detail.componentId && (
            <Review heading={PAGE_detail[detail.componentType].idLabel}>
              {detail.componentId}
            </Review>
          )}
          {detail.componentType && (
            <Review heading="Type">
              {PAGE_detail[detail.componentType].detailHeader}
            </Review>
          )}
          {detail.territory && (
            <Review heading="State">{territoryMap[detail.territory]}</Review>
          )}
          {detail.submissionTimestamp && (
            <Review heading="Date Submitted">
              {formatDetailViewDate(detail.submissionTimestamp)}
            </Review>
          )}
        </section>
        <section className="detail-section">
          <FileList
            heading="Base Supporting Documentation"
            uploadList={detail.attachments}
            zipId={detail.componentId}
          />
        </section>
        {detail.additionalInformation && (
          <section className="detail-section">
            <h2>Additional Information</h2>
            <Review className="original-review-component" headingLevel="2">
              {detail.additionalInformation}
            </Review>
          </section>
        )}
        {detail.children && (
          <section className="detail-section">
            <h2>RAI Responses</h2>
            <Accordion>
              {detail.children?.map((child, index) => {
                let raiNumber = (detail.children.length - index)
                  .toString()
                  .padStart(2, "0");
                return (
                  <AccordionItem
                    buttonClassName="accordion-button"
                    contentClassName="accordion-content"
                    heading={"RAI - " + raiNumber}
                    headingLevel="6"
                    id={child.componentType + index + "_caret"}
                    key={child.componentType + index}
                    defaultOpen={index === 0}
                  >
                    <FileList
                      heading={"RAI Response Documentation"}
                      uploadList={child.attachments}
                      zipId={child.componentType + index}
                    />
                    {child.additionalInformation && (
                      <section className="detail-section">
                        <h2>Additional Information</h2>
                        <Review
                          className="original-review-component"
                          headingLevel="2"
                        >
                          {child.additionalInformation}
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

enum DetailViewTab {
  DETAIL = "component-details",
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
  const [tab, setTab] = useState<DetailViewTab>(DetailViewTab.DETAIL);
  const [confirmItem, setConfirmItem] = useState<{
    label: ChangeRequest.PACKAGE_ACTION;
    confirmationMessage: string;
    onAccept: () => void;
  } | null>(null);

  // so we show the spinner during the data load
  const [isLoading, setIsLoading] = useState(true);

  // The record we are using for the form.
  const [detail, setDetail] = useState<ComponentDetail>();

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

  const onTabSwitch = useCallback((_event, id) => {
    setTab(id);
  }, []);

  const navItems = useMemo(
    () => [
      {
        label: "Package Overview",
        items: [{ id: DetailViewTab.DETAIL, label: "Package Details" }],
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
      <PageTitleBar heading={detail && detail.componentId} enableBackNav />
      <AlertBar alertCode={alertCode} closeCallback={closedAlert} />
      {detail && (
        <div className="form-container">
          <div className="component-detail-wrapper">
            <VerticalNav
              items={navItems}
              onLinkClick={onTabSwitch}
              selectedId={tab}
            />
            <article className="component-detail">
              {tab === DetailViewTab.DETAIL && (
                <DetailSection
                  detail={detail}
                  loadDetail={loadDetail}
                  setAlertCode={setAlertCode}
                  setConfirmItem={setConfirmItem}
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
