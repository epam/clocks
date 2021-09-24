import React, { useContext, useRef, useState, useEffect } from 'react';

import { IconButton, Typography } from '@material-ui/core';
import { LocationsContext } from '../../context/locations';
import { SnackbarContext } from '../../context/snackbar';
import { ModalContext } from '../../context/modal';
import LocationOffsets from '../../components/locationOffsets';
import LocationContent from '../../components/locationContent';
import css from './Location.module.scss';
import { Comment } from '../../assets/icons/icons';
import recycleBinIcon from '../../assets/icons/recycle-bin.svg';

const Location = ({ timezone, city, country, offset, host, id, message }) => {
    const { hours, minutes } = offset;
    const {
        actions: { AddComment }
    } = useContext(LocationsContext);
    const {
        actions: { OpenDeleteModal }
    } = useContext(ModalContext);
    const {
        actions: { OpenSnackbar, SnackbarHandler },
        state: { isSnackbarOpen }
    } = useContext(SnackbarContext);
    const textAreaRef = useRef(null);

    const [messageVisibility, setMessageVisibility] = useState(false);

    useEffect(() => {
        if (messageVisibility && textAreaRef.current) {
            textAreaRef.current.focus();
        }
    }, [messageVisibility]);

    const onBlurHandler = event => {
        const comment = event.target?.value;
        if (comment.length > 100) {
            return OpenSnackbar('Comment message must not be longer than 100 characters');
        }
        if (isSnackbarOpen) {
            SnackbarHandler(false);
        }
        AddComment(id, event.target.value);
        setMessageVisibility(false);
    };

    const openDeleteModal = () => {
        OpenDeleteModal(id);
    };

    return (
        <div className={css.card}>
            <div className={css['recycle-bin']}>
                <IconButton onClick={openDeleteModal}>
                    <img src={recycleBinIcon} alt="recycle-bin" className="icon" />
                </IconButton>
            </div>
            <div className={css.content}>
                {/* <LocationOffsets hours={hours} minutes={minutes} host={host} /> */}
                <LocationContent
                    hours={hours}
                    minutes={minutes}
                    host={host}
                    city={city}
                    country={country}
                    timezone={timezone}
                />

                {messageVisibility ? (
                    <textarea
                        ref={textAreaRef}
                        defaultValue={message}
                        maxLength={100}
                        onBlur={onBlurHandler}
                        className={css.textArea}
                        rows="3"
                    />
                ) : message ? (
                    <Typography onClick={() => setMessageVisibility(true)} className={css.message} variant="body1">
                        {message}
                    </Typography>
                ) : (
                    <IconButton className={css['comment-icon']} onClick={() => setMessageVisibility(true)}>
                        <Comment />
                    </IconButton>
                )}
            </div>
        </div>
    );
};

export default Location;
