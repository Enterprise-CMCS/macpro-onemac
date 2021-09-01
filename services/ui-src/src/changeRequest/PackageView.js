import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import { RESPONSE_CODE, ROUTES, ChangeRequest } from "cmscommonlib";
import LoadingScreen from "../components/LoadingScreen";
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
const PackageView = () => {
  // The browser history, so we can redirect to the home page
  const history = useHistory();
  const { packageType, packageId } = useParams();

  console.log("type is: ", packageType);
  // so we show the spinner during the data load
  const [isLoading, setIsLoading] = useState(true);

  // The record we are using for the form.
  const [packageDetails, setPackageDetails] = useState();

  console.log("here in PackageView with package ID: ", packageId);
  useEffect(() => {
    let mounted = true;

    if (!packageId) return;

    PackageApi.getPackage(packageId)
      .then((fetchedPackage) => {
        console.log("got the package: ", fetchedPackage);
        if (mounted) setPackageDetails(fetchedPackage);
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
  }, [packageId, history]);

  const formInfo = ChangeRequest.CONFIG[packageType];

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
      {packageDetails && (
        <article className="form-container">
          <div className="read-only-submission">
            <section>
              <Review
                className="original-review-component"
                headingLevel="2"
                heading="RAI Response"
              >
                This is where the RAI Response card might go.
              </Review>
            </section>
            {packageDetails.submissionDate && (
              <section>
                <Review
                  className="original-review-component"
                  headingLevel="2"
                  heading="Date Submitted"
                >
                  {formatDate(packageDetails.submissionDate)}
                </Review>
              </section>
            )}
            <section>
              <h2>{formInfo.detailsHeader} Details</h2>
              {packageDetails.waiverAuthority && (
                <Review heading="Waiver Authority">
                  {AUTHORITY_LABELS[packageDetails.waiverAuthority] ??
                    packageDetails.waiverAuthority}
                </Review>
              )}
              {packageDetails.actionType && (
                <Review heading="Action Type">
                  {ACTION_LABELS[packageDetails.actionType] ??
                    packageDetails.actionType}
                </Review>
              )}
              {packageDetails.packageId && (
                <Review heading={formInfo.transmittalNumber.idLabel}>
                  {packageDetails.packageId}
                </Review>
              )}
            </section>
            <FileList
              heading="Attachments"
              uploadList={packageDetails.attachments}
              zipId={packageDetails.packageId}
            />
            {packageDetails.additionalInformation && (
              <section>
                <Review
                  className="original-review-component"
                  headingLevel="2"
                  heading="Additional Information"
                >
                  {packageDetails.additionalInformation}
                </Review>
              </section>
            )}
            {packageDetails.changeHistory && (
              <section>
                <Review
                  className="original-review-component"
                  headingLevel="2"
                  heading="Change History"
                >
                  {renderChangeHistory(packageDetails.changeHistory)}
                </Review>
              </section>
            )}
          </div>
        </article>
      )}
    </LoadingScreen>
  );
};

export default PackageView;
