import { useMemo, useState, useEffect, FC } from 'react';
import { Typography } from '@material-ui/core';
import moment from 'moment-timezone';
import LocationOffsets from '../LocationOffsets';
import css from './LocationContent.module.scss';
import { TCity, TCountry, TTimezone } from '../../types/location';

interface IProps {
    city: TCity;
    country: TCountry;
    timezone: TTimezone;
    hours: number;
    minutes: number;
    host: boolean;
}

const LocationContent: FC<IProps> = ({ city = '', country = '', timezone = '', hours, minutes, host }) => {
    const [time, setTime] = useState(moment.tz(timezone));

    useEffect(() => {
        const id = setInterval(() => setTime(moment.tz(timezone)), 1000);

        return () => clearInterval(id);
    }, [timezone]);

    const gmtOffset = useMemo(() => {
        const offset = moment.tz(moment.utc(), timezone).utcOffset();
        if (offset > 0) {
            return `+${offset / 60}`;
        }
        return offset / 60;
    }, [timezone]);

    return (
        <>
            <Typography paragraph variant="subtitle2" className={`${css.grey} m-0 text-center`} color="textPrimary">
                {time.format('D MMM')}
            </Typography>
            <span className={css.time}>
                <Typography variant="h2" className={css.hour} color="textPrimary">
                    {time.format('HH')}
                </Typography>
                <Typography variant="h2" color="textPrimary">
                    {time.format('mm')}
                </Typography>
            </span>
            <LocationOffsets hours={hours} minutes={minutes} host={host} />
            <Typography className="text-center" variant="h5" color="textPrimary">
                {city}
            </Typography>
            <Typography variant="subtitle2" className="text-uppercase text-gray text-center" color="textSecondary">
                {country}
            </Typography>
            <Typography className="text-center" variant="body2" color="textPrimary">
                {timezone} GMT {gmtOffset}
            </Typography>
        </>
    );
};

export default LocationContent;
