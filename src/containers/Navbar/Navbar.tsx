import { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { LocationsContext } from '../../context/locations';
import logo from '../../assets/images/logo.svg';
import { EpamColors } from '../../constants';
import { DashboardName } from '../../components/DashboardName';

const useStyles = makeStyles(theme => ({
    appbar: {
        boxShadow: 'none',
        background: EpamColors.black,
        borderBottom: '2px solid rgba(0,0,0,.06)',
        color: 'white'
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
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
    const {
        actions: { CreateFormHandler, ResetUrl }
    } = useContext(LocationsContext);

    const createFormHandler = () => {
        if (CreateFormHandler) {
            CreateFormHandler(true);
        }
    };

    return (
        <AppBar position="static" className={classes.appbar} color="transparent">
            <Toolbar className={classes.toolbar}>
                <div className="content-center">
                    <Button className={classes.title} onClick={ResetUrl}>
                        <img src={logo} alt="logo" />
                    </Button>
                    <DashboardName />
                </div>
                <Button variant="outlined" color="inherit" onClick={createFormHandler}>
                    Add City
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
