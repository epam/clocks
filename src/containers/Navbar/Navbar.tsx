import { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { LocationsContext } from '../../context/locations';
import { ThemeContext } from '../../context/theme';
import logo from '../../assets/images/logo.svg';
import { EpamColors } from '../../constants';
import { DarkModeIcon, LightModeIcon } from '../../assets/icons/icons';

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
    },
    buttons: {
        display: 'flex',
        alignItems: 'center'
    },
    modeIcon: {
        color: theme.palette.background.paper
    },
    addCityButton: {
        marginLeft: '1rem'
    }
}));

const Navbar = () => {
    const classes = useStyles();
    const {
        actions: { CreateFormHandler, ResetUrl }
    } = useContext(LocationsContext);

    const {
        actions: { ThemeHandler },
        state: { type }
    } = useContext(ThemeContext);

    const createFormHandler = () => {
        if (CreateFormHandler) {
            CreateFormHandler(true);
        }
    };

    return (
        <AppBar position="static" className={classes.appbar} color="transparent">
            <Toolbar className={classes.toolbar}>
                <Button className={classes.title} onClick={ResetUrl}>
                    <img src={logo} alt="logo" />
                </Button>
                <div className={classes.buttons}>
                    <Button color="inherit" onClick={ThemeHandler} className={classes.modeIcon}>
                        {type === 'light' ? <LightModeIcon color="#fff" /> : <DarkModeIcon color="#000" />}
                    </Button>
                    <Button
                        variant="outlined"
                        color="inherit"
                        onClick={createFormHandler}
                        className={classes.addCityButton}
                    >
                        Add City
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
