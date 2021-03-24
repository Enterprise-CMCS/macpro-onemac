import React from "react";


function Footer() {

    return (
        <>
            <div>
                <section className="footer-top-container">
                    <div class="ds-l-row">
                        <div className="ds-l-col--7 footer-medicaid-container">
                            <img src="/assets/images/footer/logo-MedicaidGov.svg"
                                alt="Medicaid.gov logo" />
                        </div>
                        <div className="ds-l-col--5">
                            <div className="ds-l-row">
                                <div className="footer-fed-gov-container">
                                    <img src="/assets/images/footer/depthealthhumanservices_usa.svg"
                                        alt="Department of Health and Human Services logo"></img>
                                </div>
                                <div className="ds-l-col--10">
                                    A federal government website managed and paid for by the
                                    U.S. Centers for Medicare and Medicaid Services and part of
                                    the MACPro suite.
                                    </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div>
                <div className="footer-bottom-container">
                    <div className="footer-email-container">
                        Email <a href="sample@cms.gov" style={{color: "#ffffff"}}>sample@cms.gov</a> for help or feedback.
                        </div>
                    <div className="ds-l-col--3">
                        7500 Security Boulevard Baltimore, MD 21244
                        </div>
                </div>
            </div>
        </>
    );
}

export default Footer;