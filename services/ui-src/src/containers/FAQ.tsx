import React, { useEffect, useState } from "react";
import PageTitleBar from "../components/PageTitleBar";
import { helpDeskContact } from "../libs/helpDeskContact";
import {
  QuestionAnswer,
  FAQContent,
  oneMACFAQContent,
} from "../libs/faq/faqContent";

import { Accordion, AccordionItem, Button } from "@cmsgov/design-system";
import { MACCard } from "../components/MACCard";
import { useFlags} from 'launchdarkly-react-client-sdk';

/** Refactored out for later extraction by cms-ux-lib. However, using this
 * abstraction rather than doing it inline as we do in the FAQ return created
 * out-of-scope test fixes; specifically, jest could no longer find the
 * accordion and determine whether it had expanded. Manual testing showed
 * no bugs in browser rendering/performance.
 *
 * TODO: Utilize this component in FAQ's return and update tests. */
export const FAQSection = ({ section }: { section: FAQContent }) => {
  return (
    <div className="faq-section">
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
  );
};

const FAQ = () => {

  const {mmdlFaq} = useFlags()
  const [faqItems, setFaqItems] = useState(oneMACFAQContent);
  const [hash, setHash] = useState(window.location.hash.replace("#", ""));

  const toggleAccordianItem = (anchorText: string) => {
    const newItems = faqItems.map((section) => {
      return {
        sectionTitle: section.sectionTitle,
        qanda: section.qanda.map((qa) => {
          const openState =
            qa.anchorText === anchorText ? !qa.isOpen : qa.isOpen;
          return { ...qa, isOpen: openState } as QuestionAnswer;
        }),
      } as FAQContent;
    });
    setFaqItems(newItems);
  };

  const openAll = () => {
    const newItems = faqItems.map((section) => {
      return {
        sectionTitle: section.sectionTitle,
        qanda: section.qanda.map((qa) => {
          return { ...qa, isOpen: true } as QuestionAnswer;
        }),
      } as FAQContent;
    });
    setFaqItems(newItems);
  };

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
        <div id="faq-list">
          <Button className="faqButtonLink" onClick={() => openAll()}>
            Expand all to search with CTRL+F
          </Button>
          {faqItems.map((section, idx) => (
            /** To be replaced with {@link FAQSection} */
            <div key={`faq-section-${idx}`} className="faq-section">
              <h2 className="topic-title">{section.sectionTitle}</h2>
              {mmdlFaq ? 
                  <Accordion>
                    {section.qanda.map((questionAnswer, i) => (
                      <div key={i}>
                        <AccordionItem
                          id={questionAnswer.anchorText}
                          heading={questionAnswer.question}
                          buttonClassName="accordion-button"
                          contentClassName="accordion-content"
                          isControlledOpen={questionAnswer.isOpen}
                          onChange={() =>
                            toggleAccordianItem(questionAnswer.anchorText)
                          }
                        >
                          {questionAnswer.answerJSX}
                        </AccordionItem>
                        <hr></hr>
                      </div>
                    ))}
                  </Accordion> : 
                  <Accordion>
                  {section.qanda.map((questionAnswer, i) => (
                    !questionAnswer.isMmdl && 
                      <div key={i}>
                        <AccordionItem
                          id={questionAnswer.anchorText}
                          heading={questionAnswer.question}
                          buttonClassName="accordion-button"
                          contentClassName="accordion-content"
                          isControlledOpen={questionAnswer.isOpen}
                          onChange={() =>
                            toggleAccordianItem(questionAnswer.anchorText)
                          }
                        >
                          {questionAnswer.answerJSX}
                        </AccordionItem>
                        <hr></hr>
                      </div>
                  ))}
                </Accordion>
              }
            </div>
          ))}
        </div>
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

