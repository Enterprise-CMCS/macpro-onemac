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
import { MACCard } from "../../components/MACCard";

export const NUM_REVIEWERS_TO_SHOW = 3;

/** The detail section you know and love, now sporting a brand new second
 * column! Uses Material-UI {@link Grid} and the CMS {@link Review} components.
 * */
const TwoColumnDetails = ({
  detailSection,
  attributes,
}: {
  detailSection: AttributeDetail[];
  attributes: ComponentDetail;
}) => {
  /** Sorting the incoming `detailSection` into groups of two so each
   * single array item is an array where index 0 is column 1, and index
   * 1 is column 2.
   * @example [1, 2, 3, 4] => [[1, 2], [3, 4]]*/
  const twoColumnArray = useMemo(() => {
    const twoColArray: Array<Array<AttributeDetail>> = [];
    for (let i = 0; i <= detailSection.length; i += 2) {
      twoColArray.push([detailSection[i], detailSection[i + 1]]);
    }
    return twoColArray;
  }, [detailSection]);
  /** A single detail item using {@link Review} for styles and handling
   * defaults. */
  const DetailItem = ({ item }: { item?: AttributeDetail }) =>
    item !== undefined ? (
      <Review heading={item.heading}>
        {attributes[item.fieldName] ?? item.default ?? <></>}
      </Review>
    ) : (
      <div className="detail-grid-item"></div>
    );
  /** A single row of TWO {@link DetailItem}s and {@link Grid} styles from
   * Material-UI. Handles validating a user's level of access for a field. */
  const DetailRow = ({
    firstColumn,
    secondColumn,
  }: {
    firstColumn?: AttributeDetail;
    secondColumn?: AttributeDetail;
  }) => {
    const { userProfile } = useAppContext() ?? {};
    const userRoleObj = getUserRoleObj(userProfile?.userData?.roleList);
    // Can be invoked to check permission to view
    const hasPermission = useCallback(
      (item?: AttributeDetail) => {
        if (item === undefined || item === null) return false;
        return item.rolePrivilege ? userRoleObj[item.rolePrivilege] : true;
      },
      [userRoleObj]
    );
    return (
      <Grid
        justifyContent="space-between"
        container
        item
        direction="row"
        className="detail-grid-item"
      >
        <Grid xs={12} sm={5} item className="detail-grid-item">
          {hasPermission(firstColumn) && <DetailItem item={firstColumn} />}
        </Grid>
        <Grid xs={12} sm={5} item className="detail-grid-item">
          {hasPermission(secondColumn) && <DetailItem item={secondColumn} />}
        </Grid>
      </Grid>
    );
  };

  return (
    <div>
      <Grid container>
        {twoColumnArray.map((row, index) => (
          <DetailRow key={index} firstColumn={row[0]} secondColumn={row[1]} />
        ))}
      </Grid>
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
  const downloadInfoText =
    "Documents available on this page may not reflect the actual documents that were approved by CMS. Please refer to your CMS Point of Contact for the approved documents.";

  const ninetyDayText = Workflow.get90thDayText(
    detail.currentStatus,
    detail.clockEndTimestamp
  );

  const actions = detail.actions;

  return (
    <>
      <section className="mac-detail-card-section">
        <MACCard childContainerClassName="mac-detail-card">
          <section>
            <Review heading="Status" className="no-bottom-padding">
              <div className="detail-card-status">{detail.currentStatus}</div>
            </Review>
            {/* Displays 2nd Clock subtitle under status if status is pending (sans Pending - RAI) and
             latestRaiResponseTimestamp is present */}
            {pageConfig.secondClockStatuses &&
              pageConfig.secondClockStatuses.includes(detail.currentStatus) &&
              detail?.latestRaiResponseTimestamp && <span>2nd Clock</span>}
            {pageConfig.show90thDayInfo && ninetyDayText !== "N/A" && (
              <Review heading="90th Day">
                {Number(ninetyDayText)
                  ? formatDateOnly(new Date(ninetyDayText))
                  : ninetyDayText ?? "N/A"}
              </Review>
            )}
            {pageConfig.showEffectiveDate && detail.effectiveDateTimestamp && (
              <Review heading="Effective Date">
                {formatDateOnly(detail.effectiveDateTimestamp)}
              </Review>
            )}
          </section>
        </MACCard>
        <MACCard childContainerClassName="mac-detail-card">
          <section className="package-actions">
            <Review heading={pageConfig.actionLabel}>
              <ul className="action-list">
                {}
                {actions?.length > 0 ? (
                  actions?.map((actionName, i) => (
                    <li key={i}>
                      {actionComponent[actionName](detail, FORM_SOURCE.DETAIL)}
                    </li>
                  ))
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
        </MACCard>
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
        {detail.reverseChrono?.length > 0 && (
          <section className="detail-section">
            <Accordion>
              {detail.reverseChrono?.map((anEvent, index) => {
                return (
                  <AccordionItem
                    buttonClassName="accordion-button"
                    contentClassName="accordion-content"
                    heading={
                      anEvent.type +
                      " -- " +
                      anEvent.action +
                      " -- " +
                      formatDate(anEvent.timestamp)
                    }
                    headingLevel="2"
                    id={anEvent.type + index + "_caret"}
                    key={anEvent.type + index}
                    defaultOpen={index === 0}
                  >
                    {anEvent.attachments?.length > 0 ? (
                      <FileList
                        heading={"Supporting Documentation"}
                        infoText={downloadInfoText}
                        uploadList={anEvent.attachments}
                        zipId={`${anEvent.type}-` + index}
                      />
                    ) : (
                      <>
                        <h2>Supporting Documentation</h2>
                        <Review
                          className="original-review-component preserve-spacing"
                          headingLevel="2"
                        >
                          <i>No attachments have been submitted.</i>
                        </Review>
                      </>
                    )}
                    <AdditionalInfoSection
                      additionalInfo={anEvent.additionalInformation}
                      id={"addl-info-chrono-" + index}
                    />
                  </AccordionItem>
                );
              })}
            </Accordion>
          </section>
        )}
        {detail.adminChanges?.length > 0 && (
          <section className="detail-section">
            <h2>Administrative Package Changes</h2>
            <p>
              Administrative changes reflect updates to specific data fields. If
              you have additional questions, please contact the assigned CPOC.
            </p>
            <Accordion>
              {detail.adminChanges?.map((adminChange, index) => {
                return (
                  <AccordionItem
                    buttonClassName="accordion-button"
                    contentClassName="accordion-content"
                    heading={
                      "Submitted on " +
                      formatDate(adminChange.changeTimestamp) +
                      " - " +
                      (adminChange.changeType
                        ? adminChange.changeType
                        : "Manual Update")
                    }
                    headingLevel="6"
                    id={"admin_change_" + index + "_caret"}
                    key={"admin_change_" + index}
                    defaultOpen={index === 0}
                  >
                    <Review className="preserve-spacing" heading="Change Made">
                      {adminChange.changeMade}
                    </Review>
                    {!adminChange.changeMade.includes(
                      "abled State package action to withdraw Formal RAI Response"
                    ) && (
                      <Review
                        className="preserve-spacing"
                        heading="Change Reason"
                      >
                        {adminChange.changeReason}
                      </Review>
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
