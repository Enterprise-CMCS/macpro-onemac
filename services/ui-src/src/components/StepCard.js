import React from "react";
import PropTypes from "prop-types";

/**
 * Returns a card component containing text content with a "step" number at the top
 * @param {String} stepNumber the number to display at the top of the card
 * @param {String} content the text content to display on the card
 * @returns the component
 */
export default function StepCard({ stepNumber, content }) {
  return (
    <div className="info-card">
      <div className="circle-single-digit">
        {stepNumber}
      </div>
      <div className="card-content">
        {content}
      </div>
    </div>
  );
}

StepCard.propTypes = {
  stepNumber: PropTypes.string.isRequired,
  content: PropTypes.PropTypes.string.isRequired
};
