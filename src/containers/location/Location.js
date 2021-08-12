import React from 'react';

import { Typography } from '@material-ui/core';
import moment from 'moment-timezone';
import css from './Location.module.scss';

const offcet = (myTz, timezone) => {
    const now = moment.utc();
    // get the zone offsets for this time, in minutes
    const myTimezone = moment.tz.zone(myTz).offset(now);
    const otherTimezone = moment.tz.zone(timezone).offset(now);
    // calculate the difference in hours
    return Math.floor((myTimezone - otherTimezone) / 60);
};

const Location = ({ timezone, city, country }) => {
    const myTz = moment.tz.guess();
    return (
        <div className={css.card}>
            {myTz === timezone ? (
                <Typography variant="subtitle2" className={css.pointer}>
                    You are here
                </Typography>
            ) : (
                <Typography variant="subtitle2" className={css.difference}>
                    {offcet(myTz, timezone)} HOURS
                </Typography>
            )}
            <Typography paragraph variant="h2" className={css.time}>
                {moment().format('HH:mm:ss')}
            </Typography>
            <Typography variant="h5">{city}</Typography>
            <Typography variant="subtitle2" className={css.country}>
                {country}
            </Typography>
            <Typography variant="subtitle2" className={css.grey}>
                {moment().format('D MMM')}
            </Typography>
        </div>
    );
};

export default Location;
