import { FC, useContext, useState } from 'react';
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
import CopyURLButton from './components/CopyURLButton';
import { ScreenSizesContext } from '../../context/screenSizes';

import styles from './Navbar.module.scss';
import SettingsModal from '../SettingsModal';
import { INavbarProps } from './Navbar.interface';

const Navbar: FC<INavbarProps> = ({ addCitySidebarHandler }) => {
  const { t } = useTranslation();
  const {
    actions: { ResetUrl }
  } = useContext(LocationsContext);
  const {
    state: { width }
  } = useContext(ScreenSizesContext);

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
          {width && width <= 600 ? '' : <DashboardName />}
        </div>
        <div className={styles.buttons}>
          <IconButton
            className={styles['settings-btn']}
            data-testid="settings-icon"
            onClick={() => setSettingsVisibility(true)}
          >
            <SettingsOutlined sx={{ color: '#fff' }} />
          </IconButton>
          <CopyURLButton />
          <Tooltip
            title={t('navbar.toggle') || ''}
            enterDelay={1000}
            leaveDelay={200}
          >
            {width && width <= 600 ? (
              <IconButton
                data-testid="settings-icon"
                onClick={addCitySidebarHandler}
              >
                <Add sx={{ color: '#fff' }} />
              </IconButton>
            ) : (
              <Button
                variant="outlined"
                color="inherit"
                onClick={addCitySidebarHandler}
                className={styles['add-city-button']}
                endIcon={<Add />}
              >
                {t('navbar.addCity')}
              </Button>
            )}
          </Tooltip>
        </div>
      </Toolbar>
      <SettingsModal
        visibility={settingsVisibility}
        setVisibility={setSettingsVisibility}
      />
    </AppBar>
  );
};

export default Navbar;
