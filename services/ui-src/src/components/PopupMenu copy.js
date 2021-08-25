import React, { useCallback, useState } from "react";
import { Button } from "@cmsgov/design-system";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

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

export default function PopupMenu({ menuItems, handleSelected }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = useCallback(
    (event) => setAnchorEl(event.currentTarget),
    []
  );
  const handleClose = useCallback(() => setAnchorEl(null), []);

  return (
    <>
      <Button
        aria-haspopup="true"
        data-testid={POPUP_TRIGGER_TEST_ID}
        onClick={handleClick}
        size="small"
        variation="transparent"
      >
        <FontAwesomeIcon icon={faEllipsisV} />
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
            <MenuItem
              key={i}
              className={classes.root}
              onClick={() => {
                handleClose();
                handleSelected(item.value);
              }}
            >
              {item.label}
            </MenuItem>
          ))}
        </div>
      </Menu>
    </>
  );
}
