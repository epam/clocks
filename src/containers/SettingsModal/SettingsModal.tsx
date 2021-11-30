import { ChangeEvent, useContext, useMemo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Typography } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import moment from 'moment-timezone';
import { SettingsContext } from '../../context/settings';
import { CLOCKS_FONT, CLOCKS_FONTS, EpamColors, HAS_COUNTRY, HAS_DATE, HAS_TIMEZONE } from '../../constants';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { LocationsContext } from '../../context/locations';
import { IAppLocation } from '../../types/location';
import { getGmtOffset, getGreenwichMainTime } from '../../handlers';
import { EyeButton } from '../../components/EyeButton';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: 0,
        boxShadow: theme.shadows[5],
        minWidth: '400px',
        minHeight: '150px',
        outline: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    textBlock: {
        flex: '1 1 50px',
        padding: '2rem'
    },
    text: {
        fontSize: '1.3rem',
        color: theme.palette.text.primary
    },
    label: {
        textAlign: 'center'
    },
    select: {
        border: 'none',
        outline: 'none',
        textAlign: 'center',
        paddingLeft: '4%'
    },
    buttonsContainer: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    button: {
        width: '50%',
        borderRadius: 0
    },
    cancelButton: {
        backgroundColor: EpamColors.red,
        opacity: 0.95,
        color: 'white',
        '&:hover': {
            backgroundColor: EpamColors.red,
            opacity: 1
        }
    },
    deleteButton: {
        backgroundColor: theme.palette.primary.main,
        opacity: 0.95,
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
        textAlign: 'center'
    },
    time: {
        color: theme.palette.type === 'light' ? EpamColors.darkGray : 'white',
        display: 'flex'
    },
    hour: {
        '&::after': {
            content: '":"',
            position: 'relative',
            top: '-.1em',
            margin: '0 6px'
        }
    },
    marginBottom: {
        marginBottom: 12
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
    const [hasCountry, setHasCountry] = useState<boolean>(getStorageValue(HAS_COUNTRY));
    const [hasDate, setHasDate] = useState<boolean>(getStorageValue(HAS_DATE));
    const [hasTimezone, setHasTimezone] = useState<boolean>(getStorageValue(HAS_TIMEZONE));
    const [clocksFont, setClocksFont] = useState<string>(
        localStorage.getItem(CLOCKS_FONT) || CLOCKS_FONTS.ROBOTO.value
    );
    const classes = useStyles();
    const { setItem } = useLocalStorage();
    const {
        state: { isSettingsModalOpen },
        actions: { SettingsModalHandler }
    } = useContext(SettingsContext);
    const {
        state: { locations },
        actions: { SetLocationsFromUrl }
    } = useContext(LocationsContext);

    const handleClose = () => {
        if (SettingsModalHandler) {
            SettingsModalHandler(false);
        }
    };

    const SubmitHandler = () => {
        setItem(HAS_TIMEZONE, hasTimezone);
        setItem(HAS_DATE, hasDate);
        setItem(HAS_COUNTRY, hasCountry);
        setItem(CLOCKS_FONT, clocksFont);
        if (SetLocationsFromUrl) {
            SetLocationsFromUrl();
        }
        handleClose();
    };

    const { time, city, country, timezone, gmtOffset } = useMemo(() => {
        let userLocation: Partial<IAppLocation> | undefined = locations?.find(location => location.host);
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

    const SetClocksFont = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedFont = event.target.value;
        setClocksFont(selectedFont);
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={`${classes.modal} ${clocksFont}`}
            open={isSettingsModalOpen || false}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500
            }}
        >
            <Fade in={isSettingsModalOpen}>
                <div className={classes.paper}>
                    <div className={`content-center flex-column ${classes.textBlock}`}>
                        <Typography
                            paragraph
                            variant="subtitle2"
                            className={`${classes.default} m-0 position-relative`}
                        >
                            {time.format('D MMM')} <EyeButton isOpen={hasDate} eyeHandler={setHasDate} />
                        </Typography>
                        <span className={`${classes.time} position-relative`}>
                            <Typography variant="h2" className={classes.hour}>
                                {time.format('HH')}
                            </Typography>
                            <Typography variant="h2">{time.format('mm')}</Typography>
                        </span>
                        <Typography className={`${classes.default}`} variant="h5">
                            {city}
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            className={`${classes.grey} ${classes.marginBottom} text-uppercase text-center position-relative`}
                        >
                            {country}
                            <EyeButton isOpen={hasCountry} eyeHandler={setHasCountry} />
                        </Typography>
                        <Typography
                            className={`${classes.default} ${classes.marginBottom} position-relative`}
                            variant="body2"
                        >
                            {timezone} GMT {gmtOffset}
                            <EyeButton isOpen={hasTimezone} eyeHandler={setHasTimezone} />
                        </Typography>
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label htmlFor="font-selector" className={`${classes.label} ${classes.marginBottom}`}>
                            Select a font
                        </label>
                        <select
                            id="font-selector"
                            className={classes.select}
                            onBlur={SetClocksFont}
                            defaultValue={clocksFont}
                        >
                            {Object.values(CLOCKS_FONTS).map((font, index) => (
                                <option value={font.value} key={index}>
                                    {font.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={classes.buttonsContainer}>
                        <Button
                            variant="contained"
                            className={`${classes.button} ${classes.cancelButton}`}
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            onClick={SubmitHandler}
                            className={`${classes.button} ${classes.deleteButton}`}
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
