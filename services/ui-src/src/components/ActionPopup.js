import React, { useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

import { ROUTES } from "cmscommonlib";

export const ActionPopup = ({
  buttonLabel,
  selectedRow,
  menuItems,
  variation,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return isOpen ? (
    <div data-testid="dropdown-content-test" className="dropdown-content">
      <Link
        to={ROUTES.PROFILE}
        id="manageAccountLink"
        onClick={() => setIsOpen(false)}
      >
        &nbsp; Manage Profile
      </Link>
      <Link
        to={ROUTES.SIGNUP}
        id="requestRoleLink"
        onClick={() => setIsOpen(false)}
      >
        &nbsp; Request
      </Link>
      <Link
        to={ROUTES.HOME}
        id="logoutLink"
        onClick={() => {
          setIsOpen(false);
        }}
      >
        &nbsp; Log out
      </Link>
    </div>
  ) : (
    <button
      className="dropdown"
      id="myAccountLink"
      onClick={() => setIsOpen(!isOpen)}
    >
      <FontAwesomeIcon icon={faEllipsisV} />
    </button>
  );
};
