import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {makeStyles} from '@material-ui/core/styles';
import tripleDots from "../images/TripleDots.svg";

const TRIPLE_DOTS_IMAGE = <img alt="" className="triple-dots" src={tripleDots} />;

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
                &nbsp;{TRIPLE_DOTS_IMAGE}
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
                        <MenuItem className={classes.root} onClick={() => {if (window.confirm(item.confirmMessage)) {alert("confirmed");}handleClose(item.value)}}>{item.label}</MenuItem>
                    </React.Fragment>))}
                </div>

            </Menu>
        </>
    );
}
/*

           <PopupMenu
              selectedRow={i}
              userEmail={user.email}
              menuItems={menuItems}
              handleSelected={(row, value) => {
                UserDataApi.setUserStatus(userProfile.email, user.email, value);
                loadUsers();
                console.log("Seleccted:(" + row + " : " + value + ") userEmail : " + user.email + " doneBy " + userProfile.email);
              } }
            />


            */