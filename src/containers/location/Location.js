import React, { useContext } from 'react';

import { IconButton, MenuItem, MenuList, Typography } from '@material-ui/core';
import moment from 'moment-timezone';
import css from './Location.module.scss';
import { CrossIcon, Gear } from '../../assets/icons/icons';
import { LocationsContext } from '../../context/locations';

const Location = ({ timezone, city, country, offset, host, message, id }) => {
    const { hours, minutes } = offset;
    const [currentTime, setCurrentTime] = React.useState(moment.tz(timezone));
    const [drawerVisibility, setDrawerVisibility] = React.useState(false);
    const { actions } = useContext(LocationsContext);

    React.useEffect(() => {
        const id = setInterval(() => setCurrentTime(moment.tz(timezone)), 1000);

        return () => clearInterval(id);
    }, [timezone]);

    const Delete = () => {
        actions.DeleteLocation(id);
        setDrawerVisibility(false);
    };

    const GetOffset = () => {
        if (host) {
            return (
                <Typography variant="subtitle2" className={css.pointer}>
                    You are here
                </Typography>
            );
        }
        const hourDif = Math.abs(hours);
        const minuteDif = Math.abs(minutes);
        if (hourDif === 0 && minuteDif === 0) {
            return <></>;
        }
        if (hours < 0) {
            return (
                <Typography variant="subtitle2" className={css.difference}>
                    &ndash;{hourDif} {hourDif <= 1 ? 'HOUR ' : 'HOURS '}
                    {minuteDif !== 0 && `${minuteDif} ${minuteDif <= 1 ? ' MINUTE' : ' MINUTES'}`}
                </Typography>
            );
        }
        return (
            <Typography variant="subtitle2" className={css.difference}>
                {hourDif !== 0 && `+${hourDif} ${hourDif <= 1 ? 'HOUR ' : 'HOURS '}`}
                {minuteDif !== 0 && `${minuteDif} ${minuteDif <= 1 ? ' MINUTE' : ' MINUTES'}`}
            </Typography>
        );
    };

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
                        <MenuItem onClick={Delete}> Delete </MenuItem>
                    </MenuList>
                </div>
            </div>
            {GetOffset()}
            {/* {host ? (
                <Typography variant="subtitle2" className={css.pointer}>
                    You are here
                </Typography>
            ) : hours < 0 ? (
                <Typography variant="subtitle2" className={css.difference}>
                    &ndash;{Math.abs(hours)} {Math.abs(hours) <= 1 ? 'HOUR ' : 'HOURS '}
                    {Math.abs(minutes)} {Math.abs(minutes) <= 1 ? 'MINUTE' : 'MINUTES'}
                </Typography>
            ) : (
                <Typography variant="subtitle2" className={css.difference}>
                    &#43;{hours} {Math.abs(hours) <= 1 ? 'HOUR ' : 'HOURS '}
                    {minutes} {Math.abs(minutes) <= 1 ? 'MINUTE' : 'MINUTES'}
                </Typography>
            )} */}
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
