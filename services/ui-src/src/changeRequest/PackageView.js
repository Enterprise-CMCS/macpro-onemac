import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import { RESPONSE_CODE, ROUTES, Package } from "cmscommonlib";
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
  const { packageId } = useParams();

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

  const formInfo = Package.CONFIG["spa"];

  return (
    <LoadingScreen isLoading={isLoading}>
      <PageTitleBar heading={formInfo.readOnlyPageTitle} enableBackNav />
      {packageDetails && (
        <article className="form-container">
          <div className="read-only-submission">
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
              heading="Original Attachments"
              uploadList={packageDetails.originalAttachments}
              zipId={packageDetails.packageId}
            />
            {packageDetails.originalAdditionalInformation && (
              <section>
                <Review
                  className="original-review-component"
                  headingLevel="2"
                  heading="Additional Information"
                >
                  {packageDetails.originalAdditionalInformation}
                </Review>
              </section>
            )}
            {packageDetails.raiResponseSubmissionDate && (
              <section>
                <Review
                  className="original-review-component"
                  headingLevel="2"
                  heading="RAI Response Date Submitted"
                >
                  {formatDate(packageDetails.raiResponseSubmissionDate)}
                </Review>
              </section>
            )}
            <FileList
              heading="RAI Response Attachments"
              uploadList={packageDetails.raiResponseAttachments}
              zipId={packageDetails.packageId}
            />
            {packageDetails.raiResponseAdditionalInformation && (
              <section>
                <Review
                  className="original-review-component"
                  headingLevel="2"
                  heading="RAI Response Additional Information"
                >
                  {packageDetails.raiResponseAdditionalInformation}
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
