import React from 'react';
import Paper from '@material-ui/core/Paper';

export const Location = ({ timeDifferance, time, city, country, date, type }) => {
    return (
        <Paper className="content-center h-100 flex-column p-2 m-1">
            {type === 'owner' ? <p className="current">You are here</p> : <p>{timeDifferance} hour(s)</p>}
            <h1 className="fs-3">{time}</h1>
            <h2>{city}</h2>
            <h4>{country}</h4>
            <p>{date}</p>
        </Paper>
    );
};
