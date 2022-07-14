import {
  Accordion,
  AccordionItem,
  Button,
  Review,
} from "@cmsgov/design-system";
import {
  Workflow,
  RESPONSE_CODE,
  getUserRoleObj,
  ONEMAC_ROUTES,
} from "cmscommonlib";
import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { FormLocationState } from "../../domain-types";
import { useAppContext } from "../../libs/contextLib";
import { formatDetailViewDate } from "../../utils/date-utils";
import PackageApi from "../../utils/PackageApi";
import { ComponentDetail } from "../DetailView";
import { OneMACDetail } from "../../libs/detailLib";
import FileList from "../../components/FileList";
import { AdditionalInfoSection } from "./AdditionalInfoSection";
import { TYPE_TO_RAI_ROUTE } from "cmscommonlib/routes";

export const DetailSection = ({
  pageConfig,
  detail,
  loadDetail,
  setAlertCode,
}: {
  pageConfig: OneMACDetail;
  detail: ComponentDetail;
  loadDetail: () => void;
  setAlertCode: (code: string) => void;
}) => {
  const history = useHistory();
  const { userProfile, confirmAction } = useAppContext() ?? {};

  const downloadInfoText =
    "Documents available on this page may not reflect the actual documents that were approved by CMS. Please refer to your CMS Point of Contact for the approved documents.";

  const ninetyDayText = Workflow.get90thDayText(
    detail.currentStatus,
    detail.clockEndTimestamp
  );

  const onLinkActionWithdraw = useCallback(async () => {
    try {
      const resp = await PackageApi.withdraw(
        userProfile?.userData?.fullName,
        userProfile?.email,
        detail.componentId,
        detail.componentType
      );
      setAlertCode(resp);
      loadDetail();
    } catch (e) {
      console.log("Error while updating package.", e);
      setAlertCode(RESPONSE_CODE[(e as Error).message]);
    }
  }, [detail, userProfile, loadDetail, setAlertCode]);

  const onLinkAction = useCallback(
    (value: { href: string; state?: FormLocationState }) => {
      history.push(`${value.href}`, value.state);
    },
    [history]
  );

  const userRoleObj = getUserRoleObj(userProfile?.userData?.roleList);

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
            {pageConfig.show90thDayInfo && ninetyDayText !== "N/A" && (
              <Review heading="90th Day">
                {Number(ninetyDayText)
                  ? formatDetailViewDate(new Date(ninetyDayText))
                  : ninetyDayText ?? "N/A"}
              </Review>
            )}
            {pageConfig.showEffectiveDate && detail.effectiveDateTimestamp && (
              <Review heading="Effective Date">
                {formatDetailViewDate(detail.effectiveDateTimestamp)}
              </Review>
            )}
          </section>
          {userRoleObj.canAccessForms ? (
            <section className="package-actions">
              <h2>{pageConfig.actionLabel}</h2>
              <ul className="action-list">
                {pageConfig.actionsByStatus[detail.currentStatus]?.length >
                0 ? (
                  pageConfig.actionsByStatus[detail.currentStatus]?.map(
                    (actionLabel, index) => {
                      return (
                        <li key={index}>
                          <Button
                            className="package-action-link"
                            onClick={
                              actionLabel === Workflow.PACKAGE_ACTION.WITHDRAW
                                ? () => {
                                    confirmAction &&
                                      confirmAction(
                                        Workflow.PACKAGE_ACTION.WITHDRAW,
                                        "Withdraw?",
                                        "Cancel",
                                        `You are about to withdraw ${detail.componentId}. Once complete, you will not be able to resubmit this package. CMS will be notified.`,
                                        onLinkActionWithdraw
                                      );
                                  }
                                : actionLabel ===
                                  Workflow.PACKAGE_ACTION.RESPOND_TO_RAI
                                ? () => {
                                    onLinkAction({
                                      href: TYPE_TO_RAI_ROUTE[
                                        detail.componentType
                                      ],
                                      state: {
                                        componentId: detail.componentId,
                                      },
                                    });
                                  }
                                : () => {
                                    onLinkAction({
                                      href: ONEMAC_ROUTES.TEMPORARY_EXTENSION,
                                      state: {
                                        parentId: detail.componentId,
                                        parentType: detail.componentType,
                                      },
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
                  <li>
                    <p>
                      No actions are currently available for this submission.
                    </p>
                  </li>
                )}
              </ul>
            </section>
          ) : (
            <section className="package-actions">
              <div className="column-spacer">&nbsp;</div>
            </section>
          )}
        </div>
      </section>
      <div className="read-only-submission">
        <section className="detail-section">
          <h2>{pageConfig.detailHeader} Details</h2>
          {pageConfig.detailSection?.map(
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
            <h2>Formal RAI Responses</h2>
            <Accordion>
              {detail.raiResponses?.map((raiResponse, index) => {
                return (
                  <AccordionItem
                    buttonClassName="accordion-button"
                    contentClassName="accordion-content"
                    heading={
                      "Submitted on " +
                      formatDetailViewDate(raiResponse.submissionTimestamp)
                    }
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
        {!pageConfig.usesVerticalNav && (
          <AdditionalInfoSection detail={detail} />
        )}
      </div>
    </>
  );
};
