import { FC, useContext } from 'react';
import { Grid, SwipeableDrawer, Toolbar, IconButton, MenuList, Typography } from '@material-ui/core';
import { AddIcon, CrossIcon, SettingsIcon, DarkModeIcon, LightModeIcon } from '../../assets/icons/icons';
import css from './DrawerMobile.module.scss';
import { LocationsContext } from '../../context/locations';
import { ThemeContext } from '../../context/theme';
import { ScreenSizesContext } from '../../context/screenSizes';
import { SettingsContext } from '../../context/settings';

interface IProps {
    visibility: boolean;
    setVisibility: (isVisible: boolean) => void;
}

const DrawerMobile: FC<IProps> = ({ visibility, setVisibility }) => {
    // @ts-ignore
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

    const {
        actions: { CreateFormHandler }
    } = useContext(LocationsContext);

    const {
        state: { type },
        actions: { ThemeHandler }
    } = useContext(ThemeContext);

    const {
        actions: { HandleDrawerMobile }
    } = useContext(ScreenSizesContext);

    const {
        actions: { SettingsModalHandler }
    } = useContext(SettingsContext);

    const createFormHandler = () => {
        if (CreateFormHandler && HandleDrawerMobile) {
            HandleDrawerMobile(false);
            CreateFormHandler(true);
        }
    };

    const settingsModalHandler = () => {
        if (SettingsModalHandler && HandleDrawerMobile) {
            HandleDrawerMobile(false);
            SettingsModalHandler();
        }
    };

    return (
        <SwipeableDrawer
            classes={{ paper: css.sidebarPaper }}
            anchor="right"
            disableBackdropTransition={!iOS}
            disableDiscovery={iOS}
            open={visibility}
            onClose={() => setVisibility(false)}
            onOpen={() => setVisibility(true)}
            ModalProps={{ keepMounted: true }}
        >
            <Toolbar id={css.toolbar}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <IconButton
                        aria-label="Close Drawer Button"
                        id={css.closeButton}
                        onClick={() => setVisibility(false)}
                    >
                        <CrossIcon />
                    </IconButton>
                </Grid>
            </Toolbar>
            <div className={css.drawerBody}>
                <div className={css.drawerList}>
                    <MenuList variant="selectedMenu" autoFocus>
                        <div>
                            <Typography variant="button">Add New City</Typography>
                            <IconButton onClick={createFormHandler} className={css.addCityButton}>
                                <AddIcon color={type === 'light' ? '#000' : '#FFF'} />
                            </IconButton>
                        </div>
                        <div>
                            <Typography variant="button">Settings</Typography>
                            <IconButton onClick={settingsModalHandler} className={css.addCityButton}>
                                <SettingsIcon color={type === 'light' ? '#000' : '#FFF'} />
                            </IconButton>
                        </div>
                        <div>
                            <Typography variant="button">Mode</Typography>
                            <IconButton color="inherit" onClick={ThemeHandler} className={css.modeIcon}>
                                {type === 'light' ? <LightModeIcon /> : <DarkModeIcon />}
                            </IconButton>
                        </div>
                    </MenuList>
                </div>
            </div>
        </SwipeableDrawer>
    );
};

export default DrawerMobile;
