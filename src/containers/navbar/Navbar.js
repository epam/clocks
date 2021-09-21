import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { LocationsContext } from '../../context/locations';
import logo from '../../assets/images/logo.svg';
import { PlanningMode } from '../../components/planningMode/PlanningMode';

const useStyles = makeStyles(theme => ({
    appbar: {
        boxShadow: 'none',
        background: '#464547',
        borderBottom: '2px solid rgba(0,0,0,.06)',
        color: 'white'
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '88px'
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
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
            <Toolbar className={classes.toolbar}>
                <Button className={classes.title} onClick={actions.ResetUrl}>
                    <img src={logo} alt="logo" />
                </Button>
                {/* <PlanningMode /> */}
                <Button variant="outlined" color="inherit" onClick={() => actions.CreateFormHandler(true)}>
                    Add City
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
