import React from "react";

export default function TriggerCB({ text, isOpen }) {
  return isOpen ? (
    <>
      <h4 className="faq-collapsible-trigger">
        <span className="plus"></span>
        <span className="text">{text}</span>
      </h4>
    </>
  ) : (
    <>
      <h4 className="faq-collapsible-trigger">
        <span className="minus"></span>
        <span className="text">{text}</span>
      </h4>
    </>
  );
}
