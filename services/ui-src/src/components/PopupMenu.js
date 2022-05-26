import React, { Fragment, useCallback, useState } from "react";
import { Button } from "@cmsgov/design-system";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

import { ConfirmationDialog } from "../components/ConfirmationDialog";

export const POPUP_TRIGGER_TEST_ID = "popup-menu-trigger";

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

const VARIATION_PROPS = {
  UserManagement: {
    acceptText: "Confirm",
    dialogTitle: "Modify User's Access?",
    width: "wide",
  },
  PackageList: {
    acceptText: "Yes, withdraw",
    dialogTitle: "Withdraw?",
  },
};

export default function PopupMenu({
  buttonLabel,
  variation,
  selectedRow,
  menuItems,
}) {
  const variationProps = VARIATION_PROPS[variation];

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [confirmItem, setConfirmItem] = useState(null);

  const handleClick = useCallback(
    (event) => setAnchorEl(event.currentTarget),
    []
  );
  const handleClose = useCallback(() => setAnchorEl(null), []);
  const closeConfirmation = useCallback(() => setConfirmItem(null), []);
  const confirmStatusChange = useCallback(() => {
    confirmItem.handleSelected(selectedRow.id, confirmItem.value);
    closeConfirmation();
  }, [closeConfirmation, confirmItem, selectedRow.id]);

  return (
    <>
      <Button
        aria-haspopup="true"
        aria-label={buttonLabel}
        className="popup-menu-button"
        data-testid={POPUP_TRIGGER_TEST_ID}
        disabled={!menuItems || menuItems.length === 0}
        onClick={handleClick}
        size="small"
        variation="transparent"
      >
        <FontAwesomeIcon icon={faEllipsisV} />
      </Button>
      <Menu
        id={"simple-menu-" + selectedRow.id}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
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
                  item.formatConfirmationMessage
                    ? setConfirmItem(item)
                    : item.handleSelected(item.value);
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
          acceptText={variationProps.acceptText}
          heading={variationProps.dialogTitle}
          onAccept={confirmStatusChange}
          onCancel={closeConfirmation}
          size={variationProps.width}
        >
          {confirmItem.formatConfirmationMessage(selectedRow.original)}
        </ConfirmationDialog>
      )}
    </>
  );
}
