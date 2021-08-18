import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { LocationsContext } from '../../context/locations';
import logo from '../../assets/images/logo.svg';

const useStyles = makeStyles(theme => ({
    appbar: {
        boxShadow: 'none',
        background: '#464547',
        borderBottom: '2px solid rgba(0,0,0,.06)',
        color: 'white'
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        '& img': {
            height: 28,
            objectFit: 'cover'
        }
    }
}));

const Navbar = () => {
    const classes = useStyles();
    const { actions } = useContext(LocationsContext);

    return (
        <AppBar position="static" className={classes.appbar} color="transparent">
            <Toolbar>
                <div className={classes.title}>
                    <img src={logo} alt="logo" />
                </div>
                <Button variant="outlined" color="inherit" onClick={() => actions.CreateFormHandler(true)}>
                    Add City
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
