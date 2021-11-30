import { FC, useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button, IconButton, Tooltip } from '@material-ui/core';
import { LocationsContext } from '../../context/locations';
import { ThemeContext } from '../../context/theme';
import logo from '../../assets/images/logo.svg';
import { EpamColors } from '../../constants';
import { DarkModeIcon, LightModeIcon, SettingsIcon, AddIcon } from '../../assets/icons/icons';
import { DashboardName } from '../../components/DashboardName';
import { SettingsContext } from '../../context/settings';
import { ScreenSizesContext } from '../../context/screenSizes';
import styles from './Navbar.module.scss';

const useStyles = makeStyles(theme => ({
    appbar: {
        background: EpamColors.darkGray
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    modeIcon: {
        color: theme.palette.background.paper
    }
}));

const Navbar: FC = () => {
    const classes = useStyles();
    const {
        actions: { CreateFormHandler, ResetUrl }
    } = useContext(LocationsContext);
    const {
        actions: { SettingsModalHandler }
    } = useContext(SettingsContext);

    const {
        actions: { ThemeHandler },
        state: { type }
    } = useContext(ThemeContext);

    const {
        state: { width }
    } = useContext(ScreenSizesContext);

    const [showAddIcon, setShowAddIcon] = useState(false);

    useEffect(() => {
        if (width && width <= 600) {
            setShowAddIcon(true);
        } else {
            setShowAddIcon(false);
        }
    }, [width]);

    const createFormHandler = () => {
        if (CreateFormHandler) {
            CreateFormHandler(true);
        }
    };

    const settingsModalHandler = () => {
        if (SettingsModalHandler) {
            SettingsModalHandler();
        }
    };

    return (
        <AppBar position="static" className={`${classes.appbar} ${styles.appbar}`} color="transparent">
            <Toolbar className={styles.toolbar}>
                <div className="content-center">
                    <Button onClick={ResetUrl}>
                        <img className={styles.title} src={logo} alt="logo" />
                    </Button>
                    <DashboardName />
                </div>
                <div className={styles.buttons}>
                    <IconButton color="inherit" onClick={ThemeHandler} className={classes.modeIcon}>
                        {type === 'light' ? <LightModeIcon /> : <DarkModeIcon />}
                    </IconButton>
                    <IconButton onClick={settingsModalHandler}>
                        <SettingsIcon />
                    </IconButton>
                    <Tooltip title="Toggle, + or = to toggle drawer" enterDelay={1000} leaveDelay={200}>
                        {showAddIcon ? (
                            <IconButton onClick={createFormHandler} className={styles.addCityButton}>
                                <AddIcon />
                            </IconButton>
                        ) : (
                            <Button
                                variant="outlined"
                                color="inherit"
                                onClick={createFormHandler}
                                className={styles.addCityButton}
                            >
                                Add City
                            </Button>
                        )}
                    </Tooltip>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
