import {
  Accordion,
  AccordionItem,
  Review,
  Button,
} from "@cmsgov/design-system";
import { Workflow, getUserRoleObj } from "cmscommonlib";
import React, { useCallback, useMemo } from "react";
import { useAppContext } from "../../libs/contextLib";
import { formatDateOnly, formatDate } from "../../utils/date-utils";
import { ComponentDetail } from "../DetailView";
import { AttributeDetail, OneMACDetail } from "../../libs/detailLib";
import FileList from "../../components/FileList";
import { actionComponent } from "../../libs/actionLib";
import { AdditionalInfoSection } from "./AdditionalInfoSection";
import { FORM_SOURCE } from "../../domain-types";
import { useToggle } from "../../libs/hooksLib";
import { Grid } from "@material-ui/core";

export const NUM_REVIEWERS_TO_SHOW = 3;

const TwoColumnDetails = ({
  detailSection,
  attributes,
}: {
  detailSection: AttributeDetail[];
  attributes: ComponentDetail;
}) => {
  {
    /* TODO: TWO COLUMN WORK
     *  - Figure out sorting/sort list of items in detailSection
     *  - Ensure scaling properly stacks each row */
  }
  const DetailItem = ({ item }: { item: AttributeDetail }) => (
    <Review heading={item.heading}>
      {attributes[item.fieldName] ?? item.default ?? "-- --"}
    </Review>
  );
  const DetailRow = ({
    firstColumn,
    secondColumn,
  }: {
    firstColumn?: AttributeDetail;
    secondColumn?: AttributeDetail;
  }) => {
    const { userProfile } = useAppContext() ?? {};
    const userRoleObj = getUserRoleObj(userProfile?.userData?.roleList);
    const hasPermission = useCallback((item: AttributeDetail) => {
      return item.rolePrivilege ? userRoleObj[item.rolePrivilege] : true;
    }, []);
    return (
      <Grid container item direction="row" className="detail-grid-item">
        {firstColumn && hasPermission(firstColumn) && (
          <Grid item className="detail-grid-item">
            <DetailItem item={firstColumn} />
          </Grid>
        )}
        {secondColumn && hasPermission(secondColumn) && (
          <Grid item className="detail-grid-item">
            <DetailItem item={secondColumn} />
          </Grid>
        )}
      </Grid>
    );
  };
  const twoColumnArray = useMemo(() => {
    const twoColArray: Array<Array<AttributeDetail>> = [];
    for (let i = 0; i <= detailSection.length; i += 2) {
      twoColArray.push([detailSection[i], detailSection[i + 1]]);
    }
    return twoColArray;
  }, []);
  const getItem = (fieldName: string): AttributeDetail | undefined => {
    return detailSection.find((item) => item.fieldName === fieldName);
  };
  return (
    <div>
      <Grid container>
        {/*<DetailRow firstColumn={getItem("componentId")} />*/}
        {/*<DetailRow*/}
        {/*  firstColumn={getItem("territoryNice")}*/}
        {/*  secondColumn={getItem("typeNice")} />*/}
        {/*<DetailRow*/}
        {/*  firstColumn={getItem("submissionDateNice")}*/}
        {/*  secondColumn={getItem("proposedEffectiveDateNice")} />*/}
        {/*<DetailRow firstColumn={getItem("latestRaiResponseDateNice")} />*/}
        {twoColumnArray.map((row, index) => (
          <DetailRow key={index} firstColumn={row[0]} secondColumn={row[1]} />
        ))}
      </Grid>
      {/*{detailSection?.map(*/}
      {/*  (item, index) =>*/}
      {/*    <Review key={index} heading={item.heading}>*/}
      {/*      {attributes[item.fieldName] ?? item.default}*/}
      {/*    </Review>*/}
      {/*  )}*/}
    </div>
  );
};

const ExpandableList = ({
  heading,
  list,
  numToShow,
  className = "expandable-list",
}: {
  heading: string;
  list: string[];
  numToShow: number;
  className: string;
}) => {
  const [showExpanded, toggleExpanded] = useToggle(false);

  if (!list) return <></>;

  return (
    <Review key="expanded-list" heading={heading}>
      {list.length === 0
        ? "-- --"
        : list.slice(0, showExpanded ? list.length : numToShow).map((line) => (
            <>
              {line}
              <br />
            </>
          ))}
      {list.length > numToShow && (
        <Button
          className={className}
          aria-expanded="false"
          onClick={toggleExpanded}
        >
          {showExpanded ? "View Less Names" : "View All Names"}
        </Button>
      )}
    </Review>
  );
};

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
          <TwoColumnDetails
            detailSection={pageConfig.detailSection}
            attributes={detail}
          />
          {pageConfig.showReviewTeam && (
            <ExpandableList
              heading="Review Team (SRT)"
              list={detail.reviewTeam}
              numToShow={NUM_REVIEWERS_TO_SHOW}
              className="review-team"
            ></ExpandableList>
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
