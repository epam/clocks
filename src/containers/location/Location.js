import React from 'react';

import { IconButton, MenuItem, MenuList, Typography } from '@material-ui/core';
import moment from 'moment-timezone';
import css from './Location.module.scss';
import { CrossIcon, Gear } from '../../assets/icons/icons';

const Location = ({ timezone, city, country, offset, host, message }) => {
    const [currentTime, setCurrentTime] = React.useState(moment.tz(timezone));
    const [drawerVisibility, setDrawerVisibility] = React.useState(false);

    React.useEffect(() => {
        const id = setInterval(() => setCurrentTime(moment.tz(timezone)), 1000);

        return () => clearInterval(id);
    }, [timezone]);
    console.log(drawerVisibility);

    return (
        <div className={css.card}>
            <div className={css.gear}>
                <IconButton onClick={() => setDrawerVisibility(true)}>
                    <Gear />
                </IconButton>
            </div>

            <div className={`${css.backdrop} ${drawerVisibility && css.visible}`}>
                <div className={`${css.drawer} ${drawerVisibility && css.drawerVisible}`}>
                    <div className={css.closeDrawerIcon}>
                        <IconButton onClick={() => setDrawerVisibility(false)}>
                            <CrossIcon />
                        </IconButton>
                    </div>
                    <MenuList className={css.drawerBody}>
                        <MenuItem> Add Comment </MenuItem>
                        <MenuItem> Delete </MenuItem>
                    </MenuList>
                </div>
            </div>
            {host ? (
                <Typography variant="subtitle2" className={css.pointer}>
                    You are here
                </Typography>
            ) : offset < 0 ? (
                <Typography variant="subtitle2" className={css.difference}>
                    &ndash;{Math.abs(offset)} HOURS
                </Typography>
            ) : (
                <Typography variant="subtitle2" className={css.difference}>
                    &#43;{offset} HOURS
                </Typography>
            )}
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
                {timezone}
            </Typography>
            <Typography variant="body2">{message}</Typography>
        </div>
    );
};

export default Location;
