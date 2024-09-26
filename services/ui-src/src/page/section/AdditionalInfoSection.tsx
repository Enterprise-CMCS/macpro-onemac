import { Review } from "@cmsgov/design-system";
import React, { FC } from "react";

export const AdditionalInfoSection: FC<{
  additionalInfo: string;
  isSubSub?: boolean;
  id?: string;
}> = ({ additionalInfo, isSubSub, id = "addl-info-base" }) => {
  return (
    <>
      <section id={id} className="detail-section">
        <h2>
          {isSubSub
            ? "Reason for subsequent document"
            : "Additional Information"}
        </h2>
        <Review
          className="original-review-component preserve-spacing"
          headingLevel="2"
        >
          {/* for sub subs' reasons MUST be submitted but just in case I added this switch */}
          {additionalInfo || (
            <i>
              No {isSubSub ? "Reason" : "Additional Information"} has been
              submitted.
            </i>
          )}
        </Review>
      </section>
    </>
  );
};
