import { FC, useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Typography, Backdrop, Fade, Modal } from '@material-ui/core';
import moment from 'moment-timezone';
import clsx from 'clsx';

import { ThemeContext } from '../../context/theme';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import {
  getGmtOffset,
  getGreenwichMainTime,
  getComputerTheme,
  getClockFieldStorageValue
} from '../../handlers';
import {
  CLOCKS_FONT,
  CLOCKS_FONTS,
  HAS_COUNTRY,
  HAS_DATE,
  HAS_TIMEZONE
} from '../../lib/constants';

import { FontSelector } from './components/FontSelector';
import { Theming } from './components/Theming';
import { Heading } from './components/Heading';
import { Time } from './components/Time';
import styles from './SettingsModal.module.scss';
import { ISettingsModalProps } from './SettingsModal.interface';
import { IAppLocation } from '../../redux/locationsRedux/locations.interface';
import {
  AUTO_THEMING,
  THEME,
  THEMES
} from '../../redux/themeRedux/theme.constants';

const SettingsModal: FC<ISettingsModalProps> = ({
  locations,
  visibility,
  setVisibility
}) => {
  const { t } = useTranslation();
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
    actions: { ThemeHandler, AutoThemingHandler },
    state: { type, autoTheming }
  } = useContext(ThemeContext);

  const handleCancel = () => {
    setHasCountry(getClockFieldStorageValue(HAS_COUNTRY));
    setHasDate(getClockFieldStorageValue(HAS_DATE));
    setHasTimezone(getClockFieldStorageValue(HAS_TIMEZONE));
    setVisibility(false);
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
    setVisibility(false);
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
      open={visibility}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={visibility}>
        <div
          className={`${styles.paper} ${clsx({
            [styles['paper-light']]: type === THEMES.light,
            [styles['paper-dark']]: type === THEMES.dark
          })}`}
        >
          <div className={styles['text-block']}>
            <Heading
              className={styles.default}
              eyeIsOpen={hasDate}
              eyeHandler={setHasDate}
            >
              {time.format('D MMM').toUpperCase()}{' '}
            </Heading>
            <Time time={time} />
            <Heading
              eyeIsOpen={hasTimezone}
              eyeHandler={setHasTimezone}
              className={`${styles.grey} ${styles.mb20}`}
            >
              {timezone} GMT {gmtOffset}
            </Heading>
            <Typography className={`${styles.default}`} variant="h5">
              {city}
            </Typography>
            <Heading
              eyeIsOpen={hasCountry}
              eyeHandler={setHasCountry}
              className={`${styles.default} ${styles.mb25}`}
            >
              {country}
            </Heading>
            <div className={`${styles.mb25}`}>
              <Theming
                autoTheming={autoTheming}
                autoThemingHandler={autoThemingHandler}
                theme={type}
                themeHandler={themeHandler}
              />
            </div>
            <div className={styles['bottom-container']}>
              <FontSelector font={clocksFont} changeHandler={setClocksFont} />
            </div>
          </div>
          <div className={styles['buttons-container']}>
            <Button
              variant="outlined"
              className={`${styles.button} ${styles['cancel-button']}`}
              onClick={handleCancel}
            >
              {t('cancel', { ns: 'common' })}
            </Button>
            <Button
              variant="outlined"
              onClick={SubmitHandler}
              className={`${styles.button} ${styles['save-button']}`}
            >
              {t('settingsModal.save')}
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default SettingsModal;
