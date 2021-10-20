import React, { useEffect } from "react";
import PageTitleBar from "../components/PageTitleBar";
import { helpDeskContact } from "../libs/helpDeskContact";
import { oneMACFAQContent } from "../libs/faqContent";

import { Accordion, AccordionItem } from "@cmsgov/design-system";

const FAQ = () => {
  var openId: string | undefined;

  useEffect(() => {
    if (openId) {
      const el = document.getElementById(openId);
      if (el) {
        el.scrollIntoView();
        el.focus();
      }
    }
  }, [openId]);

  const renderFAQ = () => {
    return oneMACFAQContent.map((section, index) => (
      <div key={index} className="faq-section">
        <h2 className="topic-title">{section.sectionTitle}</h2>
        <Accordion>
          {section.qanda.map((questionAnswer, i) => {
            let defaultOpen = null;
            if (questionAnswer.anchorText === window.location.hash) {
              openId = questionAnswer.anchorText;
              defaultOpen = { defaultOpen: true };
            }
            return (
              <div key={i} id={questionAnswer.anchorText}>
                <AccordionItem
                  heading={questionAnswer.question}
                  buttonClassName="faq-question"
                  contentClassName="faq-answer"
                  {...defaultOpen}
                >
                  {questionAnswer.answerJSX}
                </AccordionItem>
                <hr></hr>
              </div>
            );
          })}
        </Accordion>
      </div>
    ));
  };

  const infoDetails = [
    {
      label: "Phone Number",
      linkType: "phone",
      infoValue: helpDeskContact.phone,
    },
    { label: "Email", linkType: "mailto", infoValue: helpDeskContact.email },
  ];

  const renderInfo = () => {
    return (
      <dl>
        {infoDetails.map((detail) => (
          <div className="faq-info-wrapper">
            <dt>{detail.label}</dt>
            <dd>
              <a href={`${detail.linkType}:${detail.infoValue}`}>
                {detail.infoValue}
              </a>
            </dd>
          </div>
        ))}
      </dl>
    );
  };

  return (
    <div>
      <PageTitleBar heading="Frequently Asked Questions" />
      <div className="form-container" id="top">
        <div className="faq-card">
          <aside id="faq-contact-info-box">
            <div className="faq-border-box"></div>
            <div className="faq-info-box">
              <h3>OneMAC Help Desk Contact Info</h3>
              {renderInfo()}
            </div>
          </aside>
          <div className="faq-left-column">{renderFAQ()}</div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
