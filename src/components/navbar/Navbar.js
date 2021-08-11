import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { LocationsContext } from '../../context/locations';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    }
}));

const Navbar = () => {
    const classes = useStyles();
    const { actions } = useContext(LocationsContext);

    return (
        <div className={classes.root}>
            <AppBar position="static" className="bg-blue">
                <Toolbar>
                    {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton> */}
                    <Typography variant="h6" className={classes.title}>
                        &lt;epam&gt;
                    </Typography>
                    <Button color="inherit" onClick={actions.CreateFormHandler}>
                        Add City
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export { Navbar };
