import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';

const useStyle = makeStyles({
    host: {
        padding: '2px 8px',
        color: 'white',
        backgroundColor: 'orange',
        borderRadius: 20,
        marginBottom: 8
    },
    text: {
        color: '#bcb9b5'
    }
});

const LocationOffsets = ({ hours, minutes, host }) => {
    const hourDif = Math.abs(hours);
    const minuteDif = Math.abs(minutes);
    const css = useStyle();

    if (host) {
        return (
            <Typography variant="subtitle2" className={css.host}>
                You are here
            </Typography>
        );
    }

    if (hourDif === 0 && minuteDif === 0) return null;

    if (hours < 0) {
        return (
            <Typography variant="subtitle2" className={css.text}>
                &ndash;
                {hourDif}
                {hourDif <= 1 ? ' HOUR ' : ' HOURS '}
                {minuteDif !== 0 && `${minuteDif} ${minuteDif <= 1 ? ' MINUTE' : ' MINUTES'}`}
            </Typography>
        );
    }
    return (
        <Typography variant="subtitle2" className={css.text}>
            {hourDif !== 0 && `+${hourDif} ${hourDif <= 1 ? ' HOUR ' : ' HOURS '}`}
            {minuteDif !== 0 && `${minuteDif} ${minuteDif <= 1 ? ' MINUTE' : ' MINUTES'}`}
        </Typography>
    );
};

export default LocationOffsets;