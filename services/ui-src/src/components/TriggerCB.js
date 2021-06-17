import React from "react";
import plusSign from "../images/plussignbig.png"
import negativeSign from "../images/horzline.svg"

export default function TriggerCB({ text, isOpen }) {
  return (
    isOpen ?
      <>
        <h4 className="faq-collapsible-trigger">
          {/* <img src={plusSign} alt="+" />
                        &nbsp;&nbsp;&nbsp; {text} */}
          <span className="plus"></span>
          <span className="text">{text}</span>
        </h4>
      </>
      :
      <>
        <h4 className="faq-collapsible-trigger">
          {/* <img src={negativeSign} alt="-" />
                         &nbsp;&nbsp;&nbsp; {text} */}
          <span className="minus"></span>
          <span className="text">{text}</span>
        </h4>
      </>
  )
}
