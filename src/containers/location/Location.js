import React, { useContext, useRef, useState, useEffect } from 'react';

import { IconButton, Typography } from '@material-ui/core';
import { Gear } from '../../assets/icons/icons';
import { LocationsContext } from '../../context/locations';
import { SnackbarContext } from '../../context/snackbar';
import LocationDropdown from '../../components/locationDropdown';
import LocationOffsets from '../../components/locationOffsets';
import LocationContent from '../../components/locationContent';
import css from './Location.module.scss';

const Location = ({ timezone, city, country, offset, host, id, message }) => {
    const { hours, minutes } = offset;
    const { actions } = useContext(LocationsContext);
    const {
        actions: { OpenSnackbar, SnackbarHandler },
        state: { isSnackbarOpen }
    } = useContext(SnackbarContext);
    const textAreaRef = useRef(null);

    const [drawerVisibility, setDrawerVisibility] = useState(false);
    const [messageVisibility, setMessageVisibility] = useState(false);

    useEffect(() => {
        if (messageVisibility && textAreaRef.current) {
            textAreaRef.current.focus();
        }
    }, [messageVisibility]);

    const handleDelete = () => {
        actions.DeleteLocation(id);
        setDrawerVisibility(false);
    };

    const onBlurHandler = event => {
        const comment = event.target?.value;
        if (comment.length > 100) {
            return OpenSnackbar('Comment message must not be longer than 100 characters');
        }
        if (isSnackbarOpen) {
            SnackbarHandler(false);
        }
        actions.AddComment(id, event.target.value);
        setMessageVisibility(false);
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
                        onBlur={onBlurHandler}
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
