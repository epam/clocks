import React, { useContext } from 'react';

import { IconButton, Typography } from '@material-ui/core';
import moment from 'moment-timezone';
import { Gear } from '../../assets/icons/icons';
import { LocationsContext } from '../../context/locations';
import LocationDropdown from '../../components/locationDropdown';
import LocationOffsets from '../../components/locationOffsets';
import css from './Location.module.scss';

const Location = ({ timezone, city, country, offset, host, message, id }) => {
    const { hours, minutes } = offset;
    const [currentTime, setCurrentTime] = React.useState(moment.tz(timezone));
    const [drawerVisibility, setDrawerVisibility] = React.useState(false);
    const { actions } = useContext(LocationsContext);

    React.useEffect(() => {
        const id = setInterval(() => setCurrentTime(moment.tz(timezone)), 1000);

        return () => clearInterval(id);
    }, [timezone]);

    const handleDelete = () => {
        actions.DeleteLocation(id);
        setDrawerVisibility(false);
    };

    return (
        <div className={css.card}>
            {!host && (
                <div className={css.gear}>
                    <IconButton onClick={() => setDrawerVisibility(true)}>
                        <Gear />
                    </IconButton>
                </div>
            )}
            <LocationDropdown
                visibility={drawerVisibility}
                setVisibility={value => setDrawerVisibility(value)}
                deleteCity={handleDelete}
            />
            <LocationOffsets hours={hours} minutes={minutes} host={host} />

            <span className={css.time}>
                <Typography variant="h2" className={css.hour}>
                    {currentTime.format('HH')}
                </Typography>
                <Typography variant="h2">{currentTime.format('mm')}</Typography>
            </span>

            <Typography paragraph variant="subtitle2" className={css.grey}>
                {currentTime.format('D MMM')}
            </Typography>
            <Typography variant="h5">{city}</Typography>
            <Typography variant="subtitle2" className={css.country}>
                {country}
            </Typography>
            <Typography variant="subtitle2" className={css.grey}>
                {timezone} GMT {moment.tz(moment.utc(), timezone).utcOffset() / 60}
            </Typography>
            <Typography variant="body2">{message}</Typography>
        </div>
    );
};

export default Location;
