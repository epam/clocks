import React from 'react';
import { Typography } from '@material-ui/core';
import moment from 'moment-timezone';
import css from './LocationContent.module.scss';

const LocationContent = ({ city = '', country = '', timezone = '' }) => {
    const [time, setTime] = React.useState(moment.tz(timezone));

    React.useEffect(() => {
        const id = setInterval(() => setTime(moment.tz(timezone)), 1000);

        return () => clearInterval(id);
    }, [timezone]);

    return (
        <>
            <span className={css.time}>
                <Typography variant="h2" className={css.hour}>
                    {time.format('HH')}
                </Typography>
                <Typography variant="h2">{time.format('mm')}</Typography>
            </span>

            <Typography paragraph variant="subtitle2" className={css.grey}>
                {time.format('D MMM')}
            </Typography>
            <Typography variant="h5">{city}</Typography>
            <Typography variant="subtitle2" className={css.country}>
                {country}
            </Typography>
            <Typography variant="subtitle2" className={css.grey}>
                {timezone}
            </Typography>
            <Typography variant="body2">{moment.tz(moment.utc(), timezone).utcOffset() / 60}</Typography>
        </>
    );
};

export default LocationContent;
