import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@cmsgov/design-system";

function HomeFooter() {
    const history = useHistory();
    return (
        <>
            <section className="home-footer-container">
                <div className="home-footer-angle-box"></div>
                {/* <div className="ds-l-container"> */}
                <div class="ds-l-row ds-u-padding--6">
                    <div className="ds-l-col--6 ds-u-margin-left--auto">
                        Do you have questions or need support?
                        </div>
                    <div className="ds-l-col--3 ds-u-margin-left--auto">
                        <Button className="ds-c-button ds-c-button--primary"
                            onClick={() => history.push('/FAQ')}>
                            View FAQ
                            </Button>
                    </div>
                </div>
            </section>
        </>
    );
}

export default HomeFooter;