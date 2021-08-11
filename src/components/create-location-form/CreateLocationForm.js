import { Paper } from '@material-ui/core';
import React from 'react';

export const CreateLocationForm = () => {
    return (
        <Paper className="content-center h-100 flex-column p-2 m-1">
            <p>0 hour(s)</p>
            <h1 className="fs-3">00:00:00</h1>
            <select />
        </Paper>
    );
};
