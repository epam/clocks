import { FC, useContext, useMemo, useState } from 'react';
import {
  Button,
  Typography,
  Select,
  MenuItem,
  Backdrop,
  Fade,
  FormControlLabel,
  Switch,
  Modal
} from '@material-ui/core';
import { Brightness7, Brightness4 } from '@mui/icons-material';
import moment from 'moment-timezone';
import clsx from 'clsx';

import { EyeButton } from '../../components/EyeButton';
import { SettingsContext } from '../../context/settings';
import { ThemeContext } from '../../context/theme';
import { LocationsContext } from '../../context/locations';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import {
  getGmtOffset,
  getGreenwichMainTime,
  checkComputerThemeSupport,
  getComputerTheme,
  getClockFieldStorageValue
} from '../../handlers';
import {
  AUTO_THEMING,
  CLOCKS_FONT,
  CLOCKS_FONTS,
  HAS_COUNTRY,
  HAS_DATE,
  HAS_TIMEZONE,
  THEME,
  THEMES
} from '../../constants';
import { IAppLocation } from '../../types/location';

import styles from './SettingsModal.module.scss';

const SettingsModal: FC = () => {
  const [hasCountry, setHasCountry] = useState<boolean>(
    getClockFieldStorageValue(HAS_COUNTRY)
  );
  const [hasDate, setHasDate] = useState<boolean>(
    getClockFieldStorageValue(HAS_DATE)
  );
  const [hasTimezone, setHasTimezone] = useState<boolean>(
    getClockFieldStorageValue(HAS_TIMEZONE)
  );
  const [clocksFont, setClocksFont] = useState<string>(
    localStorage.getItem(CLOCKS_FONT) || CLOCKS_FONTS.ROBOTO.value
  );
  const { setItem, getItem } = useLocalStorage();
  const {
    state: { isSettingsModalOpen },
    actions: { SettingsModalHandler }
  } = useContext(SettingsContext);
  const {
    state: { locations },
    actions: { SetLocationsFromUrl }
  } = useContext(LocationsContext);
  const {
    actions: { ThemeHandler, AutoThemingHandler },
    state: { type, autoTheming }
  } = useContext(ThemeContext);

  const doesComputerSupportTheming = useMemo(
    () => checkComputerThemeSupport(),
    []
  );

  const handleClose = () => {
    if (SettingsModalHandler) {
      SettingsModalHandler(false);
    }
  };

  const cancel = () => {
    setHasCountry(getClockFieldStorageValue(HAS_COUNTRY));
    setHasDate(getClockFieldStorageValue(HAS_DATE));
    setHasTimezone(getClockFieldStorageValue(HAS_TIMEZONE));
    handleClose();
    if (!ThemeHandler || !AutoThemingHandler) return;
    const isAutoThemingOn: boolean | undefined = JSON.parse(
      getItem(AUTO_THEMING) || ''
    );
    AutoThemingHandler(isAutoThemingOn);
    if (isAutoThemingOn) {
      const computerTheme = getComputerTheme();
      ThemeHandler(computerTheme);
    } else {
      const theme = getItem(THEME) || THEMES.light;
      if (theme === 'light' || theme === 'dark') {
        ThemeHandler(theme);
      }
    }
  };

  const autoThemingHandler = () => {
    if (AutoThemingHandler) {
      AutoThemingHandler();
    }
  };

  const SubmitHandler = () => {
    setItem(HAS_TIMEZONE, hasTimezone);
    setItem(HAS_DATE, hasDate);
    setItem(HAS_COUNTRY, hasCountry);
    setItem(CLOCKS_FONT, clocksFont);
    setItem(AUTO_THEMING, autoTheming);
    if (!autoTheming) {
      setItem(THEME, type);
    }
    if (SetLocationsFromUrl) {
      SetLocationsFromUrl();
    }
    handleClose();
  };

  const themeHandler = () => {
    if (ThemeHandler) {
      ThemeHandler();
    }
  };

  const { time, city, country, timezone, gmtOffset } = useMemo(() => {
    let userLocation: Partial<IAppLocation> | undefined = locations?.find(
      location => location.host
    );
    if (!userLocation) {
      const greenwichMainTime = getGreenwichMainTime();
      userLocation = {
        ...greenwichMainTime,
        id: '',
        offset: { hours: 0, minutes: 0 },
        message: '',
        host: false
      };
    }
    const gmtOffset = getGmtOffset(userLocation?.timezone || '');
    const time = moment.tz(userLocation?.timezone || '');
    return { ...userLocation, time, gmtOffset };
  }, [locations]);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={`${styles.modal} ${clocksFont}`}
      open={isSettingsModalOpen || false}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={isSettingsModalOpen}>
        <div
          className={`${styles.paper} ${clsx({
            [styles['paper-light']]: type === THEMES.light,
            [styles['paper-dark']]: type === THEMES.dark
          })}`}
        >
          <div
            className={`${styles['text-block']} ${clsx({
              [styles['text-dark']]: type === THEMES.light,
              [styles['text-light']]: type === THEMES.dark
            })}`}
          >
            <Typography
              paragraph
              variant="subtitle2"
              className={`${styles.default}`}
            >
              {time.format('D MMM').toUpperCase()}{' '}
              <EyeButton isOpen={hasDate} eyeHandler={setHasDate} />
            </Typography>
            <span className={`${styles.time}`}>
              <Typography variant="h2" className={styles.hour}>
                {time.format('HH')}
              </Typography>
              <Typography variant="h2">{time.format('mm')}</Typography>
            </span>
            <Typography
              className={`${styles.grey} ${styles.mb20}`}
              variant="body2"
            >
              {timezone} GMT {gmtOffset}
              <EyeButton isOpen={hasTimezone} eyeHandler={setHasTimezone} />
            </Typography>
            <Typography className={`${styles.default}`} variant="h5">
              {city}
            </Typography>
            <div className={`${styles.default} ${styles.mb25}`}>
              {country}
              <EyeButton isOpen={hasCountry} eyeHandler={setHasCountry} />
            </div>
            <div className={`${styles.mb25}`}>
              {doesComputerSupportTheming && (
                <FormControlLabel
                  classes={{ root: `${styles.default}` }}
                  control={
                    <Switch
                      checked={autoTheming}
                      onChange={autoThemingHandler}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="Auto theming"
                  labelPlacement="start"
                />
              )}
              <Button
                variant="outlined"
                onClick={themeHandler}
                disabled={autoTheming}
                endIcon={type === 'light' ? <Brightness7 /> : <Brightness4 />}
                className={styles['mode-control-btn']}
              >
                {type === 'light' ? 'LIGHT' : 'DARK'}
              </Button>
            </div>
            <div className={styles['bottom-container']}>
              <Select
                variant="outlined"
                className={styles.select}
                onChange={(e: any) => setClocksFont(e.target.value)}
                value={clocksFont}
              >
                {Object.values(CLOCKS_FONTS).map((font, index) => (
                  <MenuItem value={font.value} key={`FONT${index}`}>
                    {font.label}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
          <div className={styles['buttons-container']}>
            <Button
              variant="outlined"
              className={`${styles.button} ${styles['cancel-button']}`}
              onClick={cancel}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              onClick={SubmitHandler}
              className={`${styles.button} ${styles['save-button']} ${clsx({
                [styles['save-btn-light']]: type === THEMES.light,
                [styles['save-btn-dark']]: type === THEMES.dark
              })}`}
            >
              Save
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default SettingsModal;
