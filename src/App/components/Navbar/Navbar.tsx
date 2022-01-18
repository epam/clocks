import { FC, useEffect, useState, KeyboardEvent } from 'react';
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
import SettingsModal from '../SettingsModal';
import { INavbarProps } from './Navbar.interface';
import { useUrl } from '../../hooks/useUrl';
import { getClockFieldStorageValue, getUserTheme } from '../../handlers';
import {
  HAS_COUNTRY,
  HAS_DATE,
  HAS_TIMEZONE,
  AUTO_THEMING
} from '../../redux/navbarRedux/navbar.constants';

import AddCity from './components/AddCity';
import styles from './Navbar.module.scss';
import { DashboardName } from './components/DashboardName';
import CopyURLButton from './components/CopyURLButton';

const Navbar: FC<INavbarProps> = ({
  autoTheming,
  type,
  setTheme,
  dashboardFont,
  DashboardFontHandler,
  toggleAutoTheming,
  snackbarHandler,
  locations,
  HasCountryHandler,
  HasDateHandler,
  HasTimezoneHandler,
  hasDate,
  hasCountry,
  hasTimezone
}) => {
  const { t } = useTranslation();
  const { ResetUrl } = useUrl();

  const [settingsVisibility, setSettingsVisibility] = useState<boolean>(false);
  const [isAddCitySidebarOpen, setIsAddCitySidebarOpen] =
    useState<boolean>(false);

  const addCitySidebarHandler = () => setIsAddCitySidebarOpen(prev => !prev);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === '=' || event.key === '+') {
      addCitySidebarHandler();
      event.preventDefault();
    }
  };

  useEffect(() => {
    const autoTheming = localStorage.getItem(AUTO_THEMING);
    if (autoTheming && autoTheming === 'true') {
      toggleAutoTheming(true);
    } else {
      toggleAutoTheming(false);
    }
    const hasCountry = getClockFieldStorageValue(HAS_COUNTRY);
    const hasDate = getClockFieldStorageValue(HAS_DATE);
    const hasTimezone = getClockFieldStorageValue(HAS_TIMEZONE);
    HasCountryHandler(hasCountry);
    HasDateHandler(hasDate);
    HasTimezoneHandler(hasTimezone);
    setTheme(getUserTheme());
  }, []);

  return (
    <AppBar
      tabIndex={0}
      role="button"
      onKeyPress={handleKeyDown}
      className={dashboardFont}
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
          <CopyURLButton snackbar={snackbarHandler} />
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
      {settingsVisibility && (
        <SettingsModal
          autoTheming={autoTheming}
          hasCountry={hasCountry}
          hasDate={hasDate}
          hasTimezone={hasTimezone}
          type={type}
          setTheme={setTheme}
          toggleAutoTheming={toggleAutoTheming}
          locations={locations}
          visibility={settingsVisibility}
          setVisibility={setSettingsVisibility}
          hasCountryHandler={HasCountryHandler}
          hasDateHandler={HasDateHandler}
          hasTimezoneHandler={HasTimezoneHandler}
          dashboardFont={dashboardFont}
          fontHandler={DashboardFontHandler}
        />
      )}
      <AddCity
        type={type}
        visibility={isAddCitySidebarOpen}
        visibilityHandler={addCitySidebarHandler}
      />
    </AppBar>
  );
};

export default Navbar;
