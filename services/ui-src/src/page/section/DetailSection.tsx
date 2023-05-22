import {
  Accordion,
  AccordionItem,
  Review,
  Button,
} from "@cmsgov/design-system";
import { Workflow, getUserRoleObj } from "cmscommonlib";
import React from "react";
import { useAppContext } from "../../libs/contextLib";
import { formatDateOnly, formatDate } from "../../utils/date-utils";
import { ComponentDetail } from "../DetailView";
import { OneMACDetail } from "../../libs/detailLib";
import FileList from "../../components/FileList";
import { actionComponent } from "../../libs/actionLib";
import { AdditionalInfoSection } from "./AdditionalInfoSection";
import { FORM_SOURCE } from "../../domain-types";
import { useToggle } from "../../libs/hooksLib";

export const NUM_REVIEWERS_TO_SHOW = 3;

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
  const { userProfile } = useAppContext() ?? {};
  const [showReviewTeam, toggleReviewTeam] = useToggle(false);

  const downloadInfoText =
    "Documents available on this page may not reflect the actual documents that were approved by CMS. Please refer to your CMS Point of Contact for the approved documents.";

  const ninetyDayText = Workflow.get90thDayText(
    detail.currentStatus,
    detail.clockEndTimestamp
  );

  const userRoleObj = getUserRoleObj(userProfile?.userData?.roleList);

  return (
    <>
      <section className="detail-card-section">
        <div className="detail-card-container">
          <div className="detail-card-top"></div>
          <div className="detail-card">
            <section>
              <Review heading="Status">
                <div className="detail-card-status">{detail.currentStatus}</div>
              </Review>

              {pageConfig.show90thDayInfo && ninetyDayText !== "N/A" && (
                <Review heading="90th Day">
                  {Number(ninetyDayText)
                    ? formatDateOnly(new Date(ninetyDayText))
                    : ninetyDayText ?? "N/A"}
                </Review>
              )}
              {pageConfig.showEffectiveDate &&
                detail.effectiveDateTimestamp && (
                  <Review heading="Effective Date">
                    {formatDateOnly(detail.effectiveDateTimestamp)}
                  </Review>
                )}
            </section>
          </div>
        </div>
        <div className="detail-card-container">
          <div className="detail-card-top"></div>
          <div className="detail-card">
            {userRoleObj.canAccessForms ? (
              <section className="package-actions">
                <Review heading={pageConfig.actionLabel}>
                  <ul className="action-list">
                    {pageConfig.actionsByStatus[detail.currentStatus]?.length >
                    0 ? (
                      pageConfig.actionsByStatus[detail.currentStatus]?.map(
                        (actionName, i) => (
                          <li key={i}>
                            {actionComponent[actionName](
                              detail,
                              FORM_SOURCE.DETAIL
                            )}
                          </li>
                        )
                      )
                    ) : (
                      <li>
                        <p>
                          No actions are currently available for this
                          submission.
                        </p>
                      </li>
                    )}
                  </ul>
                </Review>
              </section>
            ) : (
              <section className="package-actions">
                <div className="column-spacer">
                  <Review heading={pageConfig.actionLabel}>
                    <p>
                      No actions are currently available for this submission.
                    </p>
                  </Review>
                </div>
              </section>
            )}
          </div>
        </div>
      </section>
      <div className="read-only-submission">
        <section className="detail-section">
          <h2>{pageConfig.detailHeader} Details</h2>
          {pageConfig.detailSection?.map(
            (item, index) =>
              (detail[item.fieldName] || item.default) &&
              (item.rolePrivilege ? userRoleObj[item.rolePrivilege] : true) && (
                <Review key={index} heading={item.heading}>
                  {detail[item.fieldName] ?? item.default}
                </Review>
              )
          )}
          {detail.reviewTeam && (
            <Review key="srt" heading="Review Team (SRT)">
              {detail.reviewTeam.length === 0
                ? "-- --"
                : showReviewTeam
                ? detail.reviewTeam.map((reviewer) => (
                    <>
                      {reviewer}
                      <br />
                    </>
                  ))
                : detail.reviewTeam.slice(0, 3).map((reviewer) => (
                    <>
                      {reviewer}
                      <br />
                    </>
                  ))}
              {detail.reviewTeam.length > NUM_REVIEWERS_TO_SHOW && (
                <Button
                  className="review-team"
                  aria-expanded="false"
                  onClick={toggleReviewTeam}
                >
                  {showReviewTeam ? "View Less Names" : "View All Names"}
                </Button>
              )}
            </Review>
          )}
        </section>
        <section className="detail-section ds-u-margin-bottom--7">
          {detail.attachments?.length > 0 ? (
            <FileList
              heading={pageConfig.attachmentsHeading}
              infoText={downloadInfoText}
              uploadList={detail.attachments}
              zipId={detail.componentId}
            />
          ) : (
            <>
              <h2>{pageConfig.attachmentsHeading}</h2>
              <Review
                className="original-review-component preserve-spacing"
                headingLevel="2"
              >
                <i>
                  At this time, the attachments for this package are unavailable
                  in this system. Contact your CPOC to verify the initial
                  submission documents.
                </i>
              </Review>
            </>
          )}
        </section>

        <AdditionalInfoSection additionalInfo={detail.additionalInformation} />

        {detail.raiResponses?.length > 0 && (
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
                      formatDate(raiResponse.submissionTimestamp)
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
                    <AdditionalInfoSection
                      additionalInfo={raiResponse.additionalInformation}
                      id={"addl-info-rai-" + index}
                    />
                  </AccordionItem>
                );
              })}
            </Accordion>
          </section>
        )}
        {detail.withdrawalRequests?.length > 0 && (
          <section className="detail-section">
            <h2>Withdrawal Request</h2>
            <Accordion>
              {detail.withdrawalRequests?.map((withdrawalRequest, index) => {
                return (
                  <AccordionItem
                    buttonClassName="accordion-button"
                    contentClassName="accordion-content"
                    heading={
                      "Submitted on " +
                      formatDate(withdrawalRequest.submissionTimestamp)
                    }
                    headingLevel="6"
                    id={withdrawalRequest.componentType + index + "_caret"}
                    key={withdrawalRequest.componentType + index}
                    defaultOpen={index === 0}
                  >
                    {withdrawalRequest.attachments?.length > 0 ? (
                      <FileList
                        heading={"Withdrawal Request Documentation"}
                        uploadList={withdrawalRequest.attachments}
                        zipId={withdrawalRequest.componentType + index}
                      />
                    ) : (
                      <>
                        <h2>Withdrawal Request Documentation</h2>
                        <Review
                          className="original-review-component preserve-spacing"
                          headingLevel="2"
                        >
                          <i>No attachments have been submitted.</i>
                        </Review>
                      </>
                    )}
                    <AdditionalInfoSection
                      additionalInfo={withdrawalRequest.additionalInformation}
                      id={"addl-info-withdraw-" + index}
                    />
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
