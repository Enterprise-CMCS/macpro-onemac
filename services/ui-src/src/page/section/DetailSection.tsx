import { Accordion, AccordionItem, Review } from "@cmsgov/design-system";
import { Workflow, getUserRoleObj } from "cmscommonlib";
import React, { useCallback } from "react";
import { useAppContext } from "../../libs/contextLib";
import { formatDetailViewDate } from "../../utils/date-utils";
import { ComponentDetail } from "../DetailView";
import { OneMACDetail } from "../../libs/detailLib";
import FileList from "../../components/FileList";
import { AdditionalInfoSection } from "./AdditionalInfoSection";
import { actionComponent } from "../../libs/actionLib";

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

  const downloadInfoText =
    "Documents available on this page may not reflect the actual documents that were approved by CMS. Please refer to your CMS Point of Contact for the approved documents.";

  const ninetyDayText = Workflow.get90thDayText(
    detail.currentStatus,
    detail.clockEndTimestamp
  );

  const userRoleObj = getUserRoleObj(userProfile?.userData?.roleList);

  const updateData = useCallback(
    async (retCode) => {
      loadDetail();
      setAlertCode(retCode);
    },
    [loadDetail, setAlertCode]
  );

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
            <Review heading="Status" className="detail-card-top-review-item">
              <div className="detail-card-status">{detail.currentStatus}</div>
            </Review>

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
              <Review
                heading={pageConfig.actionLabel}
                className="detail-card-top-review-item"
              >
                <ul className="action-list">
                  {pageConfig.actionsByStatus[detail.currentStatus]?.length >
                  0 ? (
                    pageConfig.actionsByStatus[detail.currentStatus]?.map(
                      (actionName, i) => (
                        <li key={i}>
                          {actionComponent[actionName](detail, updateData)}
                        </li>
                      )
                    )
                  ) : (
                    <li>
                      <p>
                        No actions are currently available for this submission.
                      </p>
                    </li>
                  )}
                </ul>
              </Review>
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
        {detail.raiResponses.length > 0 && (
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
