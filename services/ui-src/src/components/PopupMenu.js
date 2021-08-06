import React, { Fragment, useCallback, useState } from "react";
import { Button } from "@cmsgov/design-system";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";

import { ConfirmationDialog } from "../components/ConfirmationDialog";
import tripleDots from "../images/TripleDots.svg";

const TRIPLE_DOTS_IMAGE = (
  <img alt="" className="triple-dots" src={tripleDots} />
);

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    color: "#000000",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function PopupMenu({ selectedRow, menuItems, handleSelected }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [confirmItem, setConfirmItem] = useState(null);

  const handleClick = useCallback(
    (event) => setAnchorEl(event.currentTarget),
    []
  );
  const handleClose = useCallback(() => setAnchorEl(null), []);
  const closeConfirmation = useCallback(() => setConfirmItem(null), []);
  const confirmStatusChange = useCallback(
    () => handleSelected(selectedRow.id, confirmItem.value),
    [confirmItem, handleSelected, selectedRow.id]
  );

  return (
    <>
      <Button
        aria-haspopup="true"
        onClick={handleClick}
        size="small"
        variation="transparent"
      >
        {TRIPLE_DOTS_IMAGE}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div>
          {menuItems.map((item, i) => (
            <Fragment key={item.value}>
              {i !== 0 && <hr />}
              <MenuItem
                key={item.value}
                className={classes.root}
                onClick={() => {
                  handleClose();
                  setConfirmItem(item);
                }}
              >
                {item.label}
              </MenuItem>
            </Fragment>
          ))}
        </div>
      </Menu>
      {confirmItem && (
        <ConfirmationDialog
          acceptText="Confirm"
          heading="Modify User's Access?"
          onAccept={confirmStatusChange}
          onCancel={closeConfirmation}
          size="wide"
        >
          {confirmItem.formatConfirmationMessage(selectedRow.original)}
        </ConfirmationDialog>
      )}
    </>
  );
}
