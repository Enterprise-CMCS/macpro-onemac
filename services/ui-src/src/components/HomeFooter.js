import React from "react";
import { useHistory } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { Button } from "@cmsgov/design-system";
import { ROUTES } from "cmscommonlib";

function HomeFooter() {
    const history = useHistory();
    return (
        <>
            <section className="home-footer-container">
                <div className="home-footer-angle-box"></div>
                <div class="ds-l-row ds-u-padding--6">
                    <div className="ds-l-col--6 ds-u-margin-left--auto">
                        Do you have questions or need support?
                        </div>
                    <div className="ds-l-col--3 ds-u-margin-left--auto">
                        <HashLink to={ROUTES.FAQ_TOP} 
                            className="ds-c-button ds-c-button--primary ds-u-text-decoration--none">
                            View FAQ
                        </HashLink>
                    </div>
                </div>
            </section>
        </>
    );
}

export default HomeFooter;