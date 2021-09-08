import React, { useContext } from 'react';

import { IconButton, Typography } from '@material-ui/core';
import { Gear } from '../../assets/icons/icons';
import { LocationsContext } from '../../context/locations';
import LocationDropdown from '../../components/locationDropdown';
import LocationOffsets from '../../components/locationOffsets';
import LocationContent from '../../components/locationContent';
import css from './Location.module.scss';

const Location = ({ timezone, city, country, offset, host, id, message }) => {
    const { hours, minutes } = offset;
    const { actions } = useContext(LocationsContext);

    const [drawerVisibility, setDrawerVisibility] = React.useState(false);
    const [messageVisibility, setMessageVisibility] = React.useState(false);

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
                addComment={() => setMessageVisibility(true)}
                deleteCity={handleDelete}
            />
            <LocationOffsets hours={hours} minutes={minutes} host={host} />

            <LocationContent city={city} country={country} timezone={timezone} />
            {messageVisibility ? (
                <textarea name="" id="" cols="20" rows="3" />
            ) : (
                <Typography variant="subtitle2">{message}</Typography>
            )}
        </div>
    );
};

export default Location;
