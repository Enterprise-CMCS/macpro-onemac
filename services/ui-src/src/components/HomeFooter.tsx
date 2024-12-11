import React from "react";
import { FAQ_TARGET, ROUTES } from "cmscommonlib";
import { Button } from "@cmsgov/design-system";

function HomeFooter() {
  return (
    <>
      <section className="home-footer-container">
        <div className="home-footer-angle-box"></div>
        <div className="home-footer-faq-callout">
          <div className="ds-l-col--6 ds-u-margin-left--auto">
            Do you have questions or need support?
          </div>
          <div className="ds-l-col--3 ds-u-margin-left--auto">
            <Button variation="solid" href={ROUTES.FAQ_TOP} target={FAQ_TARGET}>
              View FAQ
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomeFooter;
