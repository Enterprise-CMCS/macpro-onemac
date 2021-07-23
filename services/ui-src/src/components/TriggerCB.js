import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

export default function TriggerCB({ text, isOpen }) {
  return isOpen ? (
    <>
      <h4 className="faq-collapsible-trigger">
        <FontAwesomeIcon icon={faChevronDown} />
        <span className="text">{text}</span>
      </h4>
    </>
  ) : (
    <>
      <h4 className="faq-collapsible-trigger">
        <FontAwesomeIcon icon={faChevronUp} />
        <span className="text">{text}</span>
      </h4>
    </>
  );
}
