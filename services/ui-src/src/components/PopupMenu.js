import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {makeStyles} from '@material-ui/core/styles';
import {tablePopupIcon} from '../images/common'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        color: "#000000",
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));


export default function PopupMenu({selectedRow, menuItems, handleSelected }) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (value) => {
        setAnchorEl(null);
        handleSelected(selectedRow, value)
    };

    return (
        <>
            <Button aria-haspopup="true" onClick={handleClick}>
                {tablePopupIcon()}
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
                    <React.Fragment key={item.value}>
                        {i !== 0  && <hr/>}
                        <MenuItem className={classes.root} onClick={() => handleClose(item.value)}>{item.label}</MenuItem>
                    </React.Fragment>))}
                </div>

            </Menu>
        </>
    );
}
