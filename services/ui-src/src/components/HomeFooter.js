import React from "react";
import { HashLink } from "react-router-hash-link";
import { ROUTES } from "cmscommonlib";

function HomeFooter() {
    return (
        <>
            <section className="home-footer-container">
                <div className="home-footer-angle-box"></div>
                <div class="ds-l-row ds-u-padding--6">
                    <div className="ds-l-col--6 ds-u-margin-left--auto">
                        Do you have questions or need support?
                        </div>
                    <div className="ds-l-col--3 ds-u-margin-left--auto">
                        <a target="new" href={ROUTES.FAQ_TOP}
                            className="ds-c-button ds-c-button--primary ds-u-text-decoration--none">
                            View FAQ
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}

export default HomeFooter;
