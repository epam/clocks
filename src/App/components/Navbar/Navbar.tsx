import { FC, useState } from 'react';
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
import CopyURLButton from './components/CopyURLButton';

import styles from './Navbar.module.scss';
import SettingsModal from '../SettingsModal';
import { INavbarProps } from './Navbar.interface';
import { useUrl } from '../../hooks/useUrl';

const Navbar: FC<INavbarProps> = ({
  autoTheming,
  type,
  setTheme,
  toggleAutoTheming,
  snackbar,
  addCitySidebarHandler,
  locations
}) => {
  const { t } = useTranslation();
  const { ResetUrl } = useUrl();

  const [settingsVisibility, setSettingsVisibility] = useState<boolean>(false);

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
            onClick={() => setSettingsVisibility(true)}
          >
            <SettingsOutlined sx={{ color: '#fff' }} />
          </IconButton>
          <CopyURLButton snackbar={snackbar} />
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
      <SettingsModal
        autoTheming={autoTheming}
        type={type}
        setTheme={setTheme}
        toggleAutoTheming={toggleAutoTheming}
        locations={locations}
        visibility={settingsVisibility}
        setVisibility={setSettingsVisibility}
      />
    </AppBar>
  );
};

export default Navbar;
