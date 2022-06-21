import { Review } from "@cmsgov/design-system";
import React, { FC } from "react";
import { ComponentDetail } from "../DetailView";

export const AdditionalInfoSection: FC<{ detail: ComponentDetail }> = ({
  detail,
}) => {
  return (
    <>
      <section id="addl-info-base" className="read-only-submission">
        <h2>Additional Information</h2>
        <Review className="original-review-component" headingLevel="2">
          {detail.additionalInformation || (
            <i>No Additional Information has been submitted.</i>
          )}
        </Review>
      </section>
    </>
  );
};
