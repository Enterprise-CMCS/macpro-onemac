import React, { useState, useCallback, useEffect } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";

import { Button } from "@cmsgov/design-system";

import {
  RESPONSE_CODE,
  ROUTES,
  ChangeRequest,
  territoryMap,
} from "cmscommonlib";
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

const AUTHORITY_LABELS = {
  "1915(b)": "All other 1915(b) Waivers",
  "1915(b)(4)": "1915(b)(4) FFS Selective Contracting waivers",
};

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

/**
 * Given an id and the relevant submission type forminfo, show the detail
 */
const DetailView = () => {
  // The browser history, so we can redirect to the home page
  const history = useHistory();
  const { componentType, componentTimestamp, componentId } = useParams();
  const location = useLocation();
  const [alertCode, setAlertCode] = useState(location?.state?.passCode);
  const { userProfile } = useAppContext();
  const [confirmItem, setConfirmItem] = useState(null);

  // so we show the spinner during the data load
  const [isLoading, setIsLoading] = useState(true);

  // The record we are using for the form.
  const [detail, setDetail] = useState();

  function closedAlert() {
    setAlertCode(RESPONSE_CODE.NONE);
  }
  const closeConfirmation = useCallback(() => setConfirmItem(null), []);

  const loadDetail = useCallback(
    async (ctrlr) => {
      let fetchedDetail;
      let stillLoading = true;
      if (componentId) {
        try {
          fetchedDetail = await PackageApi.getDetail(
            componentId,
            componentType,
            componentTimestamp
          );
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
      }
      if (!ctrlr?.signal.aborted) setDetail(fetchedDetail);
      if (!ctrlr?.signal.aborted) setIsLoading(stillLoading);
    },
    [history, componentId, componentType, componentTimestamp]
  );

  const onLinkActionWithdraw = useCallback(async () => {
    // For now, the second argument is constant.
    // When we add another action to the menu, we will need to look at the action taken here.

    try {
      const resp = await PackageApi.withdraw(
        userProfile.userData.fullName,
        userProfile.email,
        detail.componentId,
        detail.componentType
      );
      setAlertCode(resp);
      loadDetail();
    } catch (e) {
      console.log("Error while updating package.", e);
      setAlertCode(RESPONSE_CODE[e.message]);
    }
  }, [detail, userProfile, loadDetail]);

  const onLinkActionRAI = useCallback(
    (value) => {
      history.push(`${value.href}`);
    },
    [history]
  );

  const renderActionList = () => {
    const packageConfig = ChangeRequest.CONFIG[detail.componentType];

    return (packageConfig?.actionsByStatus ??
      ChangeRequest.defaultActionsByStatus)[detail.currentStatus]?.map(
      (actionLabel, index) => {
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
                      onLinkActionRAI();
                    }
              }
            >
              {actionLabel}
            </Button>
          </li>
        );
      }
    );
  };

  useEffect(() => {
    const ctrlr = new AbortController();

    loadDetail(ctrlr);

    return function cleanup() {
      ctrlr.abort();
    };
  }, [componentId, componentType, componentTimestamp, loadDetail]);

  return (
    <LoadingScreen isLoading={isLoading}>
      <PageTitleBar heading={componentId} enableBackNav />
      <AlertBar alertCode={alertCode} closeCallback={closedAlert} />
      {detail && (
        <div className="form-container">
          <article className="component-detail">
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
                  <ul className="action-list">{renderActionList()}</ul>
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
                  <Review heading={PAGE_detail[componentType].idLabel}>
                    {detail.componentId}
                  </Review>
                )}
                {detail.componentType && (
                  <Review heading="Type">
                    {PAGE_detail[componentType].detailHeader}
                  </Review>
                )}
                {detail.territory && (
                  <Review heading="State">
                    {territoryMap[detail.territory]}
                  </Review>
                )}
                {detail.submissionTimestamp && (
                  <Review heading="Date Submitted">
                    {formatDetailViewDate(detail.submissionTimestamp)}
                  </Review>
                )}
              </section>
              <FileList
                heading="Base Supporting Documentation"
                uploadList={detail.attachments}
                zipId={detail.componentId}
              />
              {detail.additionalInformation && (
                <section className="detail-section">
                  <h2>Additional Information</h2>
                  <Review
                    className="original-review-component"
                    headingLevel="2"
                  >
                    {detail.additionalInformation}
                  </Review>
                </section>
              )}
            </div>
          </article>
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
