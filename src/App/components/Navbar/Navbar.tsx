import { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Tooltip
} from '@material-ui/core';
import { SettingsOutlined, Add } from '@mui/icons-material';

import logo from '../../images/logo.svg';
import { DashboardName } from './components/DashboardName';
import { LocationsContext } from '../../context/locations';
import { SettingsContext } from '../../context/settings';
import CopyURLButton from './components/CopyURLButton';

import styles from './Navbar.module.scss';
import { INavbarProps } from './Navbar.interface';

const Navbar: FC<INavbarProps> = ({ addCitySidebarHandler }) => {
  const { t } = useTranslation();
  const {
    actions: { ResetUrl }
  } = useContext(LocationsContext);
  const {
    actions: { SettingsModalHandler }
  } = useContext(SettingsContext);

  const settingsModalHandler = () => {
    if (SettingsModalHandler) {
      SettingsModalHandler();
    }
  };

  return (
    <AppBar
      position="static"
      classes={{ root: styles['app-bar'] }}
      color="transparent"
    >
      <Toolbar className={styles.toolbar}>
        <div className={styles['flex-center']}>
          <Button className={styles.title} onClick={ResetUrl}>
            <img src={logo} alt="logo" />
          </Button>
          <DashboardName />
        </div>
        <div className={styles.buttons}>
          <IconButton
            className={styles['settings-btn']}
            data-testid="settings-icon"
            onClick={settingsModalHandler}
          >
            <SettingsOutlined sx={{ color: '#fff' }} />
          </IconButton>
          <CopyURLButton />
          <div className={styles['add-city-icon-button']}>
            <Tooltip
              title={t('navbar.toggle') || ''}
              enterDelay={1000}
              leaveDelay={200}
            >
              <IconButton
                data-testid="add-city-icon"
                onClick={addCitySidebarHandler}
              >
                <Add sx={{ color: '#fff' }} />
              </IconButton>
            </Tooltip>
          </div>
          <div className={styles['add-city-button']}>
            <Tooltip
              title={t('navbar.toggle') || ''}
              enterDelay={1000}
              leaveDelay={200}
            >
              <Button
                variant="outlined"
                color="inherit"
                onClick={addCitySidebarHandler}
                endIcon={<Add />}
              >
                {t('navbar.addCity')}
              </Button>
            </Tooltip>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
