import React, { useContext, useRef } from 'react';

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
    const textAreaRef = useRef(null);

    const [drawerVisibility, setDrawerVisibility] = React.useState(false);
    const [messageVisibility, setMessageVisibility] = React.useState(false);

    React.useEffect(() => {
        if (messageVisibility && textAreaRef.current) {
            textAreaRef.current.focus();
        }
    }, [messageVisibility]);

    const handleDelete = () => {
        actions.DeleteLocation(id);
        setDrawerVisibility(false);
    };

    return (
        <div className={css.card}>
            <div className={css.gear}>
                <IconButton onClick={() => setDrawerVisibility(true)}>
                    <Gear />
                </IconButton>
            </div>
            <LocationDropdown
                visibility={drawerVisibility}
                isHost={host}
                setVisibility={value => setDrawerVisibility(value)}
                addComment={() => setMessageVisibility(true)}
                deleteCity={handleDelete}
            />
            <div className={css.content}>
                <LocationOffsets hours={hours} minutes={minutes} host={host} />
                <LocationContent city={city} country={country} timezone={timezone} />

                {messageVisibility ? (
                    <textarea
                        ref={textAreaRef}
                        defaultValue={message}
                        onBlur={event => {
                            actions.AddComment(id, event.target.value);
                            setMessageVisibility(false);
                        }}
                        maxLength={100}
                        className={css.textArea}
                        rows="3"
                    />
                ) : (
                    <Typography onClick={() => setMessageVisibility(true)} className={css.message} variant="body1">
                        {message}
                    </Typography>
                )}
            </div>
        </div>
    );
};

export default Location;
