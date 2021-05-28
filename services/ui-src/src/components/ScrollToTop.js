import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";

function ScrollToTop() {
    return (
        <div className="scrolltop" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <FontAwesomeIcon icon={faCaretUp} />
        </div>
    );
}

export default ScrollToTop;