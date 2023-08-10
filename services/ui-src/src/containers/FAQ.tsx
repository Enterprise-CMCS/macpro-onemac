import React, { useEffect, useState } from "react";
import PageTitleBar from "../components/PageTitleBar";
import { helpDeskContact } from "../libs/helpDeskContact";
import { oneMACFAQContent } from "../libs/faq/faqContent";

import { Accordion, AccordionItem } from "@cmsgov/design-system";
import { MACCard } from "../components/MACCard";

const FAQ = () => {
  const [hash, setHash] = useState(window.location.hash.replace("#", ""));

  const hashHandler = () => {
    setHash((prev) => {
      const newHash = window.location.hash.replace("#", "");
      if (prev !== newHash) {
        return newHash;
      }
      return prev;
    });
  };

  window.addEventListener("hashchange", hashHandler);

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(`${hash}-button`);
      if (el) {
        el.scrollIntoView();
        el.focus();
        el.click();
      }
    }
    return () => {
      window.removeEventListener("hashchange", hashHandler);
    };
  }, [hash]);

  const FAQList = () => {
    return (
      <div id="faq-list">
        {oneMACFAQContent.map((section, index) => (
          <div key={index} className="faq-section">
            <h2 className="topic-title">{section.sectionTitle}</h2>
            <Accordion>
              {section.qanda.map((questionAnswer, i) => (
                <div key={i}>
                  <AccordionItem
                    id={questionAnswer.anchorText}
                    heading={questionAnswer.question}
                    buttonClassName="accordion-button"
                    contentClassName="accordion-content"
                  >
                    {questionAnswer.answerJSX}
                  </AccordionItem>
                  <hr></hr>
                </div>
              ))}
            </Accordion>
          </div>
        ))}
      </div>
    );
  };

  const Info = () => {
    const infoDetails = [
      {
        label: "Phone Number",
        linkType: "phone",
        infoValue: helpDeskContact.phone,
      },
      { label: "Email", linkType: "mailto", infoValue: helpDeskContact.email },
    ];
    return (
      <div id="question-list">
        <dl>
          {infoDetails.map((detail, i) => (
            <div key={i} className="faq-info-wrapper">
              <dt>{detail.label}</dt>
              <dd>
                <a href={`${detail.linkType}:${detail.infoValue}`}>
                  {detail.infoValue}
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    );
  };

  return (
    <div>
      <PageTitleBar heading="Frequently Asked Questions" />
      <div className="faq-display" id="top">
        <FAQList />
        <div id="contact-card">
          <MACCard
            title="OneMAC Help Desk Contact Info"
            childContainerClassName="ds-u-padding--4"
          >
            <Info />
          </MACCard>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
