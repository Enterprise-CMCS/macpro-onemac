import { Review } from "@cmsgov/design-system";
import React, { FC } from "react";

export const AdditionalInfoSection: FC<{
  additionalInfo: string;
  id?: string;
}> = ({ additionalInfo, id = "addl-info-base" }) => {
  return (
    <>
      <section id={id} className="detail-section">
        <h2>Additional Information</h2>
        <Review
          className="original-review-component preserve-spacing"
          headingLevel="2"
        >
          {additionalInfo || (
            <i>No Additional Information has been submitted.</i>
          )}
        </Review>
      </section>
    </>
  );
};
