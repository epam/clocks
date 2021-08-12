import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { LocationsContext } from '../../context/locations';

const useStyles = makeStyles(theme => ({
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1,
        color: '#464547',
        '& em': {
            color: '#39c2d7'
        }
    }
}));

const Navbar = () => {
    const classes = useStyles();
    const { actions } = useContext(LocationsContext);

    return (
        <AppBar position="static" color="transparent">
            <Toolbar>
                <Typography variant="h5" className={classes.title}>
                    <em>&lt;</em>epam<em>&gt;</em>
                </Typography>
                <Button variant="outlined" color="inherit" onClick={actions.CreateFormHandler}>
                    Add City
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export { Navbar };
