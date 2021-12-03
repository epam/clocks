import { FC, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button, IconButton } from '@material-ui/core';
import { ScreenSizesContext } from '../../context/screenSizes';
import { LocationsContext } from '../../context/locations';
import logo from '../../assets/images/logo.svg';
import { EpamColors } from '../../constants';
import { MenuIcon } from '../../assets/icons/icons';
import { DashboardName } from '../../components/DashboardName';
import styles from './NavbarMobile.module.scss';

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

const NavbarMobile: FC = () => {
    const classes = useStyles();
    const {
        actions: { ResetUrl }
    } = useContext(LocationsContext);

    const {
        state: { showDrawerMobile },
        actions: { HandleDrawerMobile }
    } = useContext(ScreenSizesContext);

    const handleDrawerMobile = () => {
        if (HandleDrawerMobile) {
            HandleDrawerMobile(!showDrawerMobile);
        }
    };

    return (
        <AppBar position="static" className={`${classes.appbar} ${styles.appbar}`} color="transparent">
            <Toolbar className={styles.toolbar}>
                <div className="content-center">
                    <Button onClick={ResetUrl}>
                        <img className={styles.title} src={logo} alt="logo" />
                    </Button>
                </div>
                <DashboardName />
                <IconButton onClick={handleDrawerMobile} color="inherit">
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default NavbarMobile;
