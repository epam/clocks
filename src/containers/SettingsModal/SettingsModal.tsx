import { useContext, useMemo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {
  Button,
  Typography,
  Select,
  MenuItem,
  Backdrop,
  Fade,
  FormControlLabel,
  Switch
} from '@material-ui/core';
import { Brightness7, Brightness4 } from '@mui/icons-material';
import moment from 'moment-timezone';
import { SettingsContext } from '../../context/settings';
import { ThemeContext } from '../../context/theme';
import {
  AUTO_THEMING,
  CLOCKS_FONT,
  CLOCKS_FONTS,
  EpamColors,
  HAS_COUNTRY,
  HAS_DATE,
  HAS_TIMEZONE,
  THEME,
  THEMES
} from '../../constants';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { LocationsContext } from '../../context/locations';
import { IAppLocation } from '../../types/location';
import {
  getGmtOffset,
  getGreenwichMainTime,
  checkComputerThemeSupport,
  getComputerTheme
} from '../../handlers';
import { EyeButton } from '../../components/EyeButton';
import styles from './SettingsModal.module.scss';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '4px',
    boxShadow: theme.shadows[5],
    outline: 'none',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  textBlock: {
    flex: '1 1 50px',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: '1.3rem',
    color: theme.palette.text.primary
  },
  label: {
    fontFamily: 'Roboto'
  },
  select: {
    width: '200px'
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  button: {
    width: '50%'
  },
  cancelButton: {
    margin: '0 5px 10px 10px'
  },
  saveButton: {
    backgroundColor: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    opacity: 0.95,
    margin: '0 10px 10px 5px',
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      opacity: 1
    }
  },
  grey: {
    color: theme.palette.grey[300]
  },
  default: {
    color: theme.palette.text.primary,
    textAlign: 'center',
    margin: '0px',
    position: 'relative'
  },
  time: {
    color: theme.palette.type === 'light' ? EpamColors.darkGray : 'white',
    display: 'flex',
    position: 'relative'
  },
  hour: {
    '&::after': {
      content: '":"',
      position: 'relative',
      top: '-.1em',
      margin: '0 6px'
    }
  },
  mb20: {
    marginBottom: '20px',
    position: 'relative'
  },
  mb25: {
    marginBottom: '25px',
    textTransform: 'uppercase',
    textAlign: 'center',
    position: 'relative'
  },
  bottomContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  modeControlBtn: {
    height: '56px',
    marginLeft: '10px'
  }
}));

const getStorageValue = (key: string) => {
  const storageValue = localStorage.getItem(key);
  if (!storageValue && storageValue !== 'false') {
    return true;
  }
  return JSON.parse(storageValue);
};

function SettingsModal() {
  const [hasCountry, setHasCountry] = useState<boolean>(
    getStorageValue(HAS_COUNTRY)
  );
  const [hasDate, setHasDate] = useState<boolean>(getStorageValue(HAS_DATE));
  const [hasTimezone, setHasTimezone] = useState<boolean>(
    getStorageValue(HAS_TIMEZONE)
  );
  const [clocksFont, setClocksFont] = useState<string>(
    localStorage.getItem(CLOCKS_FONT) || CLOCKS_FONTS.ROBOTO.value
  );
  const classes = useStyles();
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
    setHasCountry(getStorageValue(HAS_COUNTRY));
    setHasDate(getStorageValue(HAS_DATE));
    setHasTimezone(getStorageValue(HAS_TIMEZONE));
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
      className={`${classes.modal} ${clocksFont}`}
      open={isSettingsModalOpen || false}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={isSettingsModalOpen}>
        <div className={`${classes.paper} ${styles.paper}`}>
          <div className={classes.textBlock}>
            <Typography
              paragraph
              variant="subtitle2"
              className={`${classes.default}`}
            >
              {time.format('D MMM').toUpperCase()}{' '}
              <EyeButton isOpen={hasDate} eyeHandler={setHasDate} />
            </Typography>
            <span className={`${classes.time}`}>
              <Typography variant="h2" className={classes.hour}>
                {time.format('HH')}
              </Typography>
              <Typography variant="h2">{time.format('mm')}</Typography>
            </span>
            <Typography
              className={`${classes.grey} ${classes.mb20}`}
              variant="body2"
            >
              {timezone} GMT {gmtOffset}
              <EyeButton isOpen={hasTimezone} eyeHandler={setHasTimezone} />
            </Typography>
            <Typography className={`${classes.default}`} variant="h5">
              {city}
            </Typography>
            <div className={`${classes.default} ${classes.mb25}`}>
              {country}
              <EyeButton isOpen={hasCountry} eyeHandler={setHasCountry} />
            </div>
            <div className={`${classes.mb25}`}>
              {doesComputerSupportTheming && (
                <FormControlLabel
                  classes={{ root: `${classes.default}` }}
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
                className={classes.modeControlBtn}
              >
                {type === 'light' ? 'LIGHT' : 'DARK'}
              </Button>
            </div>
            <div className={classes.bottomContainer}>
              <Select
                variant="outlined"
                className={classes.select}
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
          <div className={classes.buttonsContainer}>
            <Button
              variant="outlined"
              className={`${classes.button} ${classes.cancelButton}`}
              onClick={cancel}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              onClick={SubmitHandler}
              className={`${classes.button} ${classes.saveButton}`}
            >
              Save
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  );
}

export default SettingsModal;
