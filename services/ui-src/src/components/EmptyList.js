import React from "react";
import PropTypes from "prop-types";

import puzzlePiece from "../images/PuzzlePiece.svg";
import { ROUTES } from "cmscommonlib";

const DEFAULT_IMAGE = <img alt="Puzzle piece icon" src={puzzlePiece} />;

/**
 * Display an image and a message. Intended as a placeholder for empty tables.
 * @param {Object} props - component properties @returns the component
 *
 * The `image` prop defaults to a yellow puzzle piece.
 */
export function EmptyList({ image, message, showProfileLink }) {
  if (showProfileLink) {
    return (
      <div className="empty-list">
        {image || DEFAULT_IMAGE}
        <h4>
          {message}, or visit your <a href={ROUTES.PROFILE}>user profile</a> for
          more information.
        </h4>
      </div>
    );
  } else {
    return (
      <div className="empty-list">
        {image || DEFAULT_IMAGE}
        <h4>{message}</h4>
      </div>
    );
  }
}

EmptyList.propTypes = {
  image: PropTypes.node,
  message: PropTypes.node.isRequired,
};
