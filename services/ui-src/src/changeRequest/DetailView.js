import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import { RESPONSE_CODE, ROUTES, ChangeRequest } from "cmscommonlib";
import LoadingScreen from "../components/LoadingScreen";
import ChoiceList from "../components/ChoiceList";
import FileList from "../components/FileList";
import PackageApi from "../utils/PackageApi";
import { formatDate } from "../utils/date-utils";
import PageTitleBar from "../components/PageTitleBar";
import { Review } from "@cmsgov/design-system";

const AUTHORITY_LABELS = {
  "1915(b)": "All other 1915(b) Waivers",
  "1915(b)(4)": "1915(b)(4) FFS Selective Contracting waivers",
};

const ACTION_LABELS = {
  amendment: "Waiver Amendment",
  new: "New Waiver",
  renewal: "Request for Waiver Renewal",
};

/**
 * Given an id and the relevant submission type forminfo, show the details
 * @param {Object} formInfo - all the change request details specific to this submission
 */
const DetailView = () => {
  // The browser history, so we can redirect to the home page
  const history = useHistory();
  const { componentType, packageId, componentIndex } = useParams();

  console.log("component type is: ", componentType);
  // so we show the spinner during the data load
  const [isLoading, setIsLoading] = useState(true);

  // The record we are using for the form.
  const [details, setDetails] = useState();

  console.log("here in DetailView with Package ID: ", packageId);
  useEffect(() => {
    let mounted = true;

    if (!packageId) return;

    PackageApi.getDetail(packageId, componentType, componentIndex)
      .then((fetchedDetail) => {
        console.log("got the package: ", fetchedDetail);
        if (mounted) setDetails(fetchedDetail);
      })
      .then(() => {
        if (mounted) setIsLoading(false);
      })
      .catch(() => {
        history.push({
          pathname: ROUTES.DASHBOARD,
          state: {
            passCode: RESPONSE_CODE.SYSTEM_ERROR,
          },
        });
      });

    return function cleanup() {
      mounted = false;
    };
  }, [packageId, history, componentType, componentIndex]);

  const formInfo = ChangeRequest.CONFIG[componentType];

  const renderChangeHistory = (changeHistory) => {
    return (
      <ul>
        {changeHistory.map((oneEvent, index) => {
          return <li key={index}>{JSON.stringify(oneEvent, null, 2)}</li>;
        })}
      </ul>
    );
  };

  return (
    <LoadingScreen isLoading={isLoading}>
      <PageTitleBar heading={formInfo.readOnlyPageTitle} enableBackNav />
      {details && (
        <article className="form-container">
          <div className="read-only-submission">
            {details.RAIResponse && (
              <section>
                <Review
                  className="original-review-component"
                  headingLevel="2"
                  heading="Request for Additional Information"
                >
                  <div className="details-card-container">
                    <ChoiceList
                      choices={details.RAIResponse.map((item, index) => {
                        return {
                          title: "RAI Response",
                          description:
                            "Date submitted: " +
                            formatDate(item.componentTimestamp),
                          linkTo: `/package/sparai/${details.packageId}/${index}`,
                        };
                      })}
                    />
                  </div>
                </Review>
              </section>
            )}
            {details.submissionTimestamp && (
              <section>
                <Review
                  className="original-review-component"
                  headingLevel="2"
                  heading="Date Submitted"
                >
                  {formatDate(details.submissionTimestamp)}
                </Review>
              </section>
            )}
            <section>
              <h2>{formInfo.detailsHeader} Details</h2>
              {details.waiverAuthority && (
                <Review heading="Waiver Authority">
                  {AUTHORITY_LABELS[details.waiverAuthority] ??
                    details.waiverAuthority}
                </Review>
              )}
              {details.actionType && (
                <Review heading="Action Type">
                  {ACTION_LABELS[details.actionType] ?? details.actionType}
                </Review>
              )}
              {details.packageId && (
                <Review heading={formInfo.transmittalNumber.idLabel}>
                  {details.packageId}
                </Review>
              )}
            </section>
            <FileList
              heading="Attachments"
              uploadList={details.attachments}
              zipId={details.packageId}
            />
            {details.additionalInformation && (
              <section>
                <Review
                  className="original-review-component"
                  headingLevel="2"
                  heading="Additional Information"
                >
                  {details.additionalInformation}
                </Review>
              </section>
            )}
            {details.changeHistory && (
              <section>
                <Review
                  className="original-review-component"
                  headingLevel="2"
                  heading="Change History"
                >
                  {renderChangeHistory(details.changeHistory)}
                </Review>
              </section>
            )}
          </div>
        </article>
      )}
    </LoadingScreen>
  );
};

export default DetailView;
