import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";

function ScrollToTop() {
  return (
    <div
      className="scrollToTop"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <span>
        <FontAwesomeIcon icon={faAngleUp} />
        <span>Back to Top</span>
      </span>
    </div>
  );
}

export default ScrollToTop;
